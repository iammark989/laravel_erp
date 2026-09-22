<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGoodsReceiptRequest;
use App\Http\Requests\UpdateGoodsReceiptRequest;
use App\Models\GoodsReceipt;
use App\Models\GoodsReceiptItem;
use App\Models\PurchaseOrder;
use App\Models\Supplier;
use App\Models\Warehouse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class GoodsReceiptController extends Controller
{
    public function index(): Response
    {
        $goodsReceipts = GoodsReceipt::with([
            'purchaseOrder:id,po_number',
            'supplier:id,name',
            'warehouse:id,name',
        ])
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/GoodsReceipts/Index', [
            'goodsReceipts' => $goodsReceipts,
        ]);
    }

    public function create(): Response
    {
        $purchaseOrders = PurchaseOrder::with([
            'supplier:id,name',
            'warehouse:id,name',
            'items.productVariant:id,product_id,sku,variant_name',
            'items.productVariant.product:id,name',
            'items.purchaseUom:id,code,description',
        ])
            ->whereIn('status', [
                'submitted',
                'partially_received',
            ])
            ->latest()
            ->get();

        $suppliers = Supplier::where('is_active', true)
            ->orderBy('name')
            ->get([
                'id',
                'name',
            ]);

        $warehouses = Warehouse::where('is_active', true)
            ->orderBy('name')
            ->get([
                'id',
                'name',
            ]);

        return Inertia::render('Admin/GoodsReceipts/Create', [
            'purchaseOrders' => $purchaseOrders,
            'suppliers' => $suppliers,
            'warehouses' => $warehouses,
        ]);
    }

    public function store(
        StoreGoodsReceiptRequest $request
    ): RedirectResponse {
        $validated = $request->validated();

        DB::transaction(function () use ($validated) {
            $goodsReceipt = GoodsReceipt::create([
                'gr_number' => $validated['gr_number'],
                'purchase_order_id' => $validated['purchase_order_id'],
                'supplier_id' => $validated['supplier_id'],
                'warehouse_id' => $validated['warehouse_id'],
                'received_date' => $validated['received_date'],
                'reference_number' => $validated['reference_number'] ?? null,
                'remarks' => $validated['remarks'] ?? null,
                'status' => $validated['status'],
                'created_by' => auth()->id(),
            ]);

            foreach ($validated['items'] as $item) {
                GoodsReceiptItem::create([
                    'goods_receipt_id' => $goodsReceipt->id,
                    'purchase_order_item_id' => $item['purchase_order_item_id'],
                    'product_variant_id' => $item['product_variant_id'],
                    'received_qty' => $item['received_qty'],
                    'cost_price' => $item['cost_price'],
                    'remarks' => $item['remarks'] ?? null,
                ]);
            }
        });

        return redirect()
            ->route('admin.goods-receipts.index')
            ->with('success', 'Goods Receipt created successfully.');
    }

    public function edit(GoodsReceipt $goodsReceipt): Response
    {
        $goodsReceipt->load([
            'items',
            'purchaseOrder:id,po_number',
            'supplier:id,name',
            'warehouse:id,name',
        ]);

        $purchaseOrders = PurchaseOrder::with([
            'supplier:id,name',
            'warehouse:id,name',
            'items.productVariant:id,product_id,sku,variant_name',
            'items.productVariant.product:id,name',
            'items.purchaseUom:id,code,description',
        ])
            ->whereIn('status', [
                'submitted',
                'partially_received',
                'completed',
            ])
            ->orWhere('id', $goodsReceipt->purchase_order_id)
            ->latest()
            ->get();

        $suppliers = Supplier::where('is_active', true)
            ->orderBy('name')
            ->get([
                'id',
                'name',
            ]);

        $warehouses = Warehouse::where('is_active', true)
            ->orderBy('name')
            ->get([
                'id',
                'name',
            ]);

        return Inertia::render('Admin/GoodsReceipts/Edit', [
            'goodsReceipt' => $goodsReceipt,
            'purchaseOrders' => $purchaseOrders,
            'suppliers' => $suppliers,
            'warehouses' => $warehouses,
        ]);
    }

    public function update(
        UpdateGoodsReceiptRequest $request,
        GoodsReceipt $goodsReceipt
    ): RedirectResponse {
        $validated = $request->validated();

        DB::transaction(function () use ($validated, $goodsReceipt) {
            $goodsReceipt->update([
                'gr_number' => $validated['gr_number'],
                'purchase_order_id' => $validated['purchase_order_id'],
                'supplier_id' => $validated['supplier_id'],
                'warehouse_id' => $validated['warehouse_id'],
                'received_date' => $validated['received_date'],
                'reference_number' => $validated['reference_number'] ?? null,
                'remarks' => $validated['remarks'] ?? null,
                'status' => $validated['status'],
            ]);

            $goodsReceipt->items()->delete();

            foreach ($validated['items'] as $item) {
                GoodsReceiptItem::create([
                    'goods_receipt_id' => $goodsReceipt->id,
                    'purchase_order_item_id' => $item['purchase_order_item_id'],
                    'product_variant_id' => $item['product_variant_id'],
                    'received_qty' => $item['received_qty'],
                    'cost_price' => $item['cost_price'],
                    'remarks' => $item['remarks'] ?? null,
                ]);
            }
        });

        return redirect()
            ->route('admin.goods-receipts.index')
            ->with('success', 'Goods Receipt updated successfully.');
    }
}