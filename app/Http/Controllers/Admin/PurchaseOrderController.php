<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePurchaseOrderRequest;
use App\Http\Requests\UpdatePurchaseOrderRequest;
use App\Models\ProductVariant;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderItem;
use App\Models\Supplier;
use App\Models\Uom;
use App\Models\Warehouse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PurchaseOrderController extends Controller
{
    public function index(): Response
    {
        $purchaseOrders = PurchaseOrder::query()
            ->with(['supplier', 'warehouse'])
            ->orderByDesc('order_date')
            ->orderByDesc('id')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/PurchaseOrders/Index', [
            'purchaseOrders' => $purchaseOrders,
        ]);
    }

    public function create(): Response
    {
        $suppliers = Supplier::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get([
                'id',
                'supplier_code',
                'name',
            ]);

        $warehouses = Warehouse::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get([
                'id',
                'warehouse_code',
                'name',
            ]);

        $productVariants = ProductVariant::query()
            ->with('product:id,name')
            ->where('is_active', true)
            ->orderBy('sku')
            ->get([
                'id',
                'product_id',
                'sku',
                'variant_name',
            ]);

        $uoms = Uom::query()
            ->where('is_active', true)
            ->orderBy('code')
            ->get([
                'id',
                'code',
            ]);

        return Inertia::render('Admin/PurchaseOrders/Create', [
            'suppliers' => $suppliers,
            'warehouses' => $warehouses,
            'productVariants' => $productVariants,
            'uoms' => $uoms,
        ]);
    }

    public function store(StorePurchaseOrderRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated) {
            $subtotal = 0;

            foreach ($validated['items'] as $item) {
                $quantity = (float) $item['quantity'];
                $costPrice = (float) $item['cost_price'];

                $amount = round($quantity * $costPrice, 2);

                $subtotal += $amount;
            }

            $discount = (float) $validated['discount'];
            $tax = (float) $validated['tax'];

            $grandTotal = max(
                round($subtotal - $discount + $tax, 2),
                0
            );

            $purchaseOrder = PurchaseOrder::create([
                'po_number' => $validated['po_number'],
                'supplier_id' => $validated['supplier_id'],
                'warehouse_id' => $validated['warehouse_id'],
                'order_date' => $validated['order_date'],
                'expected_delivery' => $validated['expected_delivery'] ?? null,
                'payment_terms' => $validated['payment_terms'],
                'supplier_quotation_no' => $validated['supplier_quotation_no'] ?? null,
                'reference_number' => $validated['reference_number'] ?? null,
                'discount' => $discount,
                'tax' => $tax,
                'subtotal' => $subtotal,
                'grand_total' => $grandTotal,
                'remarks' => $validated['remarks'] ?? null,
                'status' => $validated['status'],
                'created_by' => auth()->id(),
            ]);

            foreach ($validated['items'] as $item) {
                $quantity = (float) $item['quantity'];
                $costPrice = (float) $item['cost_price'];
                $amount = round($quantity * $costPrice, 2);

                PurchaseOrderItem::create([
                    'purchase_order_id' => $purchaseOrder->id,
                    'product_variant_id' => $item['product_variant_id'],
                    'purchase_uom_id' => $item['purchase_uom_id'],
                    'quantity' => $quantity,
                    'cost_price' => $costPrice,
                    'amount' => $amount,
                    'conversion_qty' => $item['conversion_qty'],
                    'received_qty' => 0,
                    'tax_type' => $item['tax_type'],
                    'remarks' => $item['remarks'] ?? null,
                ]);
            }
        });

        return to_route('admin.purchase-orders.index')
            ->with('success', 'Purchase order created successfully.');
    }

    public function edit(PurchaseOrder $purchaseOrder): Response
    {
        $purchaseOrder->load([
            'items',
        ]);

        $suppliers = Supplier::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get([
                'id',
                'supplier_code',
                'name',
            ]);

        $warehouses = Warehouse::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get([
                'id',
                'warehouse_code',
                'name',
            ]);

        $productVariants = ProductVariant::query()
            ->with('product:id,name')
            ->where('is_active', true)
            ->orderBy('sku')
            ->get([
                'id',
                'product_id',
                'sku',
                'variant_name',
            ]);

        $uoms = Uom::query()
            ->where('is_active', true)
            ->orderBy('code')
            ->get([
                'id',
                'code',
            ]);

        return Inertia::render('Admin/PurchaseOrders/Edit', [
            'purchaseOrder' => $purchaseOrder,
            'suppliers' => $suppliers,
            'warehouses' => $warehouses,
            'productVariants' => $productVariants,
            'uoms' => $uoms,
        ]);
    }

    public function update(
        UpdatePurchaseOrderRequest $request,
        PurchaseOrder $purchaseOrder
    ): RedirectResponse {
        $purchaseOrder->update([
            ...$request->validated(),
            'updated_by' => auth()->id(),
        ]);

        return to_route('admin.purchase-orders.index')
            ->with('success', 'Purchase order updated successfully.');
    }
}