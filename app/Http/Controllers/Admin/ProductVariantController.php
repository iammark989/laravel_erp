<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductVariantRequest;
use App\Http\Requests\UpdateProductVariantRequest;
use App\Models\ProductVariant;
use App\Models\Product;
use App\Models\Uom;
use Illuminate\Http\RedirectResponse;
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

        return Inertia::render('Admin/ProductVariants/Create', [
            'products' => $products,
            'uoms' => $uoms,
        ]);
    }

    public function store(StoreProductVariantRequest $request): RedirectResponse
    {
        ProductVariant::create([
            ...$request->validated(),
            'created_by' => auth()->id(),
        ]);

        return to_route('admin.product-variants.index')
            ->with('success', 'Product variant created successfully.');
    }

    public function edit(ProductVariant $productVariant): Response
    {
        $products = Product::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        $uoms = Uom::query()
            ->where('is_active', true)
            ->orderBy('code')
            ->get(['id', 'code', 'description']);

        return Inertia::render('Admin/ProductVariants/Edit', [
            'productVariant' => $productVariant,
            'products' => $products,
            'uoms' => $uoms,
        ]);
    }

    public function update(
        UpdateProductVariantRequest $request,
        ProductVariant $productVariant
    ): RedirectResponse {
        $productVariant->update([
            ...$request->validated(),
            'updated_by' => auth()->id(),
        ]);

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
}