<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWarehouseRequest;
use App\Http\Requests\UpdateWarehouseRequest;
use App\Models\Warehouse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class WarehouseController extends Controller
{
    public function index(): Response
    {
        $warehouses = Warehouse::query()
            ->orderBy('name')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Warehouses/Index', [
            'warehouses' => $warehouses,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Warehouses/Create');
    }

    public function store(StoreWarehouseRequest $request): RedirectResponse
    {
        Warehouse::create([
            ...$request->validated(),
            'created_by' => auth()->id(),
        ]);

        return to_route('admin.warehouses.index')
            ->with('success', 'Warehouse created successfully.');
    }

    public function edit(Warehouse $warehouse): Response
    {
        return Inertia::render('Admin/Warehouses/Edit', [
            'warehouse' => $warehouse,
        ]);
    }

    public function update(
        UpdateWarehouseRequest $request,
        Warehouse $warehouse
    ): RedirectResponse {
        $warehouse->update([
            ...$request->validated(),
            'updated_by' => auth()->id(),
        ]);

        return to_route('admin.warehouses.index')
            ->with('success', 'Warehouse updated successfully.');
    }

    public function destroy(Warehouse $warehouse): RedirectResponse
    {
        $warehouse->update([
            'is_active' => false,
            'updated_by' => auth()->id(),
        ]);

        return to_route('admin.warehouses.index')
            ->with('success', 'Warehouse deactivated successfully.');
    }
}