<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::query()
            ->with(['category', 'brand'])
            ->orderBy('name')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    public function create(): Response
    {
        $categories = \App\Models\Category::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        $brands = \App\Models\Brand::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories,
            'brands' => $brands,
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        Product::create([
            ...$request->validated(),
            'created_by' => auth()->id(),
        ]);

        return to_route('admin.products.index')
            ->with('success', 'Product created successfully.');
    }

    public function edit(Product $product): Response
    {
        $categories = \App\Models\Category::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        $brands = \App\Models\Brand::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories,
            'brands' => $brands,
        ]);
    }

    public function update(
        UpdateProductRequest $request,
        Product $product
    ): RedirectResponse {
        $product->update($request->validated());

        return to_route('admin.products.index')
            ->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->update([
            'is_active' => false,
        ]);

        return to_route('admin.products.index')
            ->with('success', 'Product deactivated successfully.');
    }

    public function details(Product $product): Response
    {
        $product->load([
            'category:id,name',
            'brand:id,name',
            'variants' => function ($query) {
                $query
                    ->with([
                        'baseUom:id,code',
                        'sellingUom:id,code',
                        'purchasingUom:id,code',
                    ])
                    ->orderBy('variant_name');
            },
        ]);

        return Inertia::render('Admin/Products/Details', [
            'product' => $product,
        ]);
    }
    
}