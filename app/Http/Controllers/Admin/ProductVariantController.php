<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductVariantRequest;
use App\Http\Requests\UpdateProductVariantRequest;
use App\Models\PriceList;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Uom;
use App\Models\VariantInventory;
use App\Models\VariantPrice;
use App\Models\Warehouse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ProductVariantController extends Controller
{
    public function index(): Response
    {
        $variants = ProductVariant::query()
            ->with(['product', 'baseUom', 'sellingUom', 'purchasingUom'])
            ->orderBy('product_id')
            ->orderBy('variant_name')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/ProductVariants/Index', [
            'variants' => $variants,
        ]);
    }

    public function create(): Response
    {
        $products = Product::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        $uoms = Uom::query()
            ->where('is_active', true)
            ->orderBy('code')
            ->get(['id', 'code', 'description']);

        $warehouses = Warehouse::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'warehouse_code', 'name']);

        $priceLists = PriceList::query()
            ->where('is_active', true)
            ->orderBy('code')
            ->get(['id', 'code', 'description']);

        return Inertia::render('Admin/ProductVariants/Create', [
            'products' => $products,
            'uoms' => $uoms,
            'warehouses' => $warehouses,
            'priceLists' => $priceLists,
        ]);
    }

    public function store(StoreProductVariantRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated) {
            $productVariant = ProductVariant::create([
                'product_id' => $validated['product_id'],
                'sku' => $validated['sku'],
                'barcode' => $validated['barcode'] ?? null,
                'variant_name' => $validated['variant_name'],
                'cost_price' => $validated['cost_price'],
                'tax_type' => $validated['tax_type'],
                'base_uom_id' => $validated['base_uom_id'],
                'selling_uom_id' => $validated['selling_uom_id'],
                'selling_qty' => $validated['selling_qty'],
                'purchasing_uom_id' => $validated['purchasing_uom_id'],
                'purchasing_qty' => $validated['purchasing_qty'],
                'remarks' => $validated['remarks'] ?? null,
                'is_active' => $validated['is_active'] ?? true,
                'created_by' => auth()->id(),
            ]);

            VariantPrice::create([
                'product_variant_id' => $productVariant->id,
                'price_list_id' => $validated['price_list_id'],
                'price' => $validated['price'],
            ]);

            VariantInventory::create([
                'product_variant_id' => $productVariant->id,
                'warehouse_id' => $validated['warehouse_id'],
                'quantity_on_hand' => $validated['quantity_on_hand'],
                'reorder_level' => $validated['reorder_level'],
            ]);
        });

        return to_route('admin.product-variants.index')
            ->with('success', 'Product variant created successfully.');
    }

    public function edit(ProductVariant $productVariant): Response
    {
        $productVariant->load([
            'prices',
            'inventories',
        ]);

        $products = Product::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        $uoms = Uom::query()
            ->where('is_active', true)
            ->orderBy('code')
            ->get(['id', 'code', 'description']);

        $warehouses = Warehouse::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get([
                'id',
                'warehouse_code',
                'name',
            ]);

        $priceLists = PriceList::query()
            ->where('is_active', true)
            ->orderBy('code')
            ->get([
                'id',
                'code',
                'description',
            ]);

        return Inertia::render('Admin/ProductVariants/Edit', [
            'productVariant' => $productVariant,
            'products' => $products,
            'uoms' => $uoms,
            'warehouses' => $warehouses,
            'priceLists' => $priceLists,
        ]);
    }

    public function update(
    UpdateProductVariantRequest $request,
    ProductVariant $productVariant
    ): RedirectResponse {
        $validated = $request->validated();

        DB::transaction(function () use ($validated, $productVariant) {
            $productVariant->update([
                'product_id' => $validated['product_id'],
                'sku' => $validated['sku'],
                'barcode' => $validated['barcode'] ?? null,
                'variant_name' => $validated['variant_name'],
                'cost_price' => $validated['cost_price'],
                'tax_type' => $validated['tax_type'],
                'base_uom_id' => $validated['base_uom_id'],
                'selling_uom_id' => $validated['selling_uom_id'],
                'selling_qty' => $validated['selling_qty'],
                'purchasing_uom_id' => $validated['purchasing_uom_id'],
                'purchasing_qty' => $validated['purchasing_qty'],
                'remarks' => $validated['remarks'] ?? null,
                'is_active' => $validated['is_active'] ?? true,
                'updated_by' => auth()->id(),
            ]);

            $productVariant->prices()
                ->updateOrCreate(
                    [
                        'price_list_id' => $validated['price_list_id'],
                    ],
                    [
                        'price' => $validated['price'],
                    ]
                );

            $productVariant->inventories()
                ->updateOrCreate(
                    [
                        'warehouse_id' => $validated['warehouse_id'],
                    ],
                    [
                        'quantity_on_hand' => $validated['quantity_on_hand'],
                        'reorder_level' => $validated['reorder_level'],
                    ]
                );
        });

        return to_route('admin.product-variants.index')
            ->with('success', 'Product variant updated successfully.');
    }

    public function destroy(
        ProductVariant $productVariant
    ): RedirectResponse {
        $productVariant->update([
            'is_active' => false,
            'updated_by' => auth()->id(),
        ]);

        return to_route('admin.product-variants.index')
            ->with('success', 'Product variant deactivated successfully.');
    }

    public function details(Product $product, ProductVariant $variant): Response
    {
        $variant->load([
            'product:id,name',
            'baseUom:id,code',
            'sellingUom:id,code',
            'purchasingUom:id,code',
            'inventories.warehouse:id,warehouse_code,name',
            'prices.priceList:id,code,description',
        ]);

        $warehouses = Warehouse::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get([
                'id',
                'warehouse_code',
                'name',
            ]);

        return Inertia::render('Admin/ProductVariants/Details', [
            'product' => $product,
            'variant' => $variant,
            'warehouses' => $warehouses,
        ]);
    }

}