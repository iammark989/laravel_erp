<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Models\Brand;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BrandController extends Controller
{
     /**
     * Display a listing of brands.
     */
    public function index(): Response
    {
        $brands = Brand::query()
            ->orderBy('name')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Brands/Index', [
            'brands' => $brands,
        ]);
    }

    /**
     * Show the form for creating a new brand.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Brands/Create');
    }

    /**
     * Store a newly created brand.
     */
    public function store(StoreBrandRequest $request): RedirectResponse
    {
        Brand::create($request->validated());

        return to_route('admin.brands.index')
            ->with('success', 'Brand created successfully.');
    }

    /**
     * Show the form for editing the specified brand.
     */
    public function edit(Brand $brand): Response
    {
        return Inertia::render('Admin/Brands/Edit', [
            'brand' => $brand,
        ]);
    }

    /**
     * Update the specified brand.
     */
    public function update(
        UpdateBrandRequest $request,
        Brand $brand
    ): RedirectResponse {
        $brand->update($request->validated());

        return to_route('admin.brands.index')
            ->with('success', 'Brand updated successfully.');
    }

    /**
     * Deactivate the specified brand.
     */
    public function destroy(Brand $brand): RedirectResponse
    {
        $brand->update([
            'is_active' => false,
        ]);

        return to_route('admin.brands.index')
            ->with('success', 'Brand deactivated successfully.');
    }
}
