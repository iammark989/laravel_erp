<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGoodsReceiptRequest;
use App\Http\Requests\UpdateGoodsReceiptRequest;
use App\Models\GoodsReceipt;
use App\Models\GoodsReceiptItem;
use App\Models\InventoryTransaction;
use App\Models\InventoryTransactionItem;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderItem;
use App\Models\Supplier;
use App\Models\VariantInventory;
use App\Models\Warehouse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
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

            /*
            |--------------------------------------------------------------------------
            | Post to Inventory
            |--------------------------------------------------------------------------
            */

            if ($goodsReceipt->status === 'posted') {
                $this->postGoodsReceiptToInventory($goodsReceipt);
            }
        });

        return redirect()
            ->route('admin.goods-receipts.index')
            ->with('success', 'Goods Receipt created successfully.');
    }

    public function edit(GoodsReceipt $goodsReceipt): Response|RedirectResponse
    {
        if ($goodsReceipt->status !== 'draft') {
            return redirect()
                ->route('admin.goods-receipts.index')
                ->with('error', 'Only draft Goods Receipts can be edited.');
        }

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
        if ($goodsReceipt->status !== 'draft') {
            return redirect()
                ->route('admin.goods-receipts.index')
                ->with('error', 'Only draft Goods Receipts can be edited.');
        }

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

            /*
            |--------------------------------------------------------------------------
            | Post to Inventory when Draft becomes Posted
            |--------------------------------------------------------------------------
            */

            if ($goodsReceipt->status === 'posted') {
                $this->postGoodsReceiptToInventory($goodsReceipt);
            }
        });

        return redirect()
            ->route('admin.goods-receipts.index')
            ->with('success', 'Goods Receipt updated successfully.');
    }

    private function postGoodsReceiptToInventory(
        GoodsReceipt $goodsReceipt
    ): void {
        $goodsReceipt->load([
            'items',
            'purchaseOrder.items',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Create Inventory Transaction
        |--------------------------------------------------------------------------
        */

        $inventoryTransaction = InventoryTransaction::create([
            'transaction_type' => 'stock_in',
            'reason' => 'supplier_delivery',
            'status' => 'posted',
            'reference_type' => 'goods_receipt',
            'invoice_no' => $goodsReceipt->reference_number,
            'reference_number' => $goodsReceipt->gr_number,
            'warehouse_id' => $goodsReceipt->warehouse_id,
            'remarks' => $goodsReceipt->remarks,
            'created_by' => auth()->id(),
            'posted_at' => now(),
        ]);

        /*
        |--------------------------------------------------------------------------
        | Process Goods Receipt Items
        |--------------------------------------------------------------------------
        */

        foreach ($goodsReceipt->items as $item) {
            /*
            |--------------------------------------------------------------------------
            | Lock inventory row while updating
            |--------------------------------------------------------------------------
            |
            | This helps prevent two transactions from updating the same
            | inventory balance at the same time.
            |
            */

            $variantInventory = VariantInventory::where(
                'product_variant_id',
                $item->product_variant_id
            )
                ->where(
                    'warehouse_id',
                    $goodsReceipt->warehouse_id
                )
                ->lockForUpdate()
                ->first();

            if (!$variantInventory) {
                $variantInventory = VariantInventory::create([
                    'product_variant_id' => $item->product_variant_id,
                    'warehouse_id' => $goodsReceipt->warehouse_id,
                    'quantity_on_hand' => 0,
                    'reorder_level' => 0,
                ]);
            }

            /*
            |--------------------------------------------------------------------------
            | Stock Before / After
            |--------------------------------------------------------------------------
            */

            $stockBefore = (float) $variantInventory->quantity_on_hand;

            $receivedQuantity = (float) $item->received_qty;

            $stockAfter = $stockBefore + $receivedQuantity;

            /*
            |--------------------------------------------------------------------------
            | Update Variant Inventory
            |--------------------------------------------------------------------------
            */

            $variantInventory->update([
                'quantity_on_hand' => $stockAfter,
            ]);

            /*
            |--------------------------------------------------------------------------
            | Create Inventory Transaction Item
            |--------------------------------------------------------------------------
            */

            InventoryTransactionItem::create([
                'inventory_transaction_id' => $inventoryTransaction->id,
                'product_variant_id' => $item->product_variant_id,
                'quantity' => $receivedQuantity,
                'stock_before' => $stockBefore,
                'stock_after' => $stockAfter,
                'remarks' => $item->remarks,
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Update Purchase Order Received Quantities
        |--------------------------------------------------------------------------
        */

        foreach ($goodsReceipt->purchaseOrder->items as $purchaseOrderItem) {
            $totalReceived = GoodsReceiptItem::whereHas(
                'goodsReceipt',
                function ($query) use ($goodsReceipt) {
                    $query
                        ->where('purchase_order_id', $goodsReceipt->purchase_order_id)
                        ->where('status', 'posted');
                }
            )
                ->where(
                    'purchase_order_item_id',
                    $purchaseOrderItem->id
                )
                ->sum('received_qty');

            $purchaseOrderItem->update([
                'received_qty' => $totalReceived,
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Update Purchase Order Status
        |--------------------------------------------------------------------------
        */

        $purchaseOrder = $goodsReceipt->purchaseOrder()->with('items')->first();

        if (!$purchaseOrder) {
            return;
        }

        $allReceived = true;
        $partiallyReceived = false;

        foreach ($purchaseOrder->items as $purchaseOrderItem) {
            $orderedQuantity = (float) $purchaseOrderItem->quantity;
            $receivedQuantity = (float) $purchaseOrderItem->received_qty;

            if ($receivedQuantity > 0) {
                $partiallyReceived = true;
            }

            if ($receivedQuantity < $orderedQuantity) {
                $allReceived = false;
            }
        }

        if ($allReceived) {
            $purchaseOrder->update([
                'status' => 'completed',
            ]);
        } elseif ($partiallyReceived) {
            $purchaseOrder->update([
                'status' => 'partially_received',
            ]);
        }
    }
}