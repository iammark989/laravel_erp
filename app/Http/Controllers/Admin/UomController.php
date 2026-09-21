<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUomRequest;
use App\Http\Requests\UpdateUomRequest;
use App\Models\Uom;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UomController extends Controller
{
    public function index(): Response
    {
        $uoms = Uom::query()
            ->orderBy('code')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Uoms/Index', [
            'uoms' => $uoms,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Uoms/Create');
    }

    public function store(StoreUomRequest $request): RedirectResponse
    {
        Uom::create($request->validated());

        return to_route('admin.uoms.index')
            ->with('success', 'UOM created successfully.');
    }

    public function edit(Uom $uom): Response
    {
        return Inertia::render('Admin/Uoms/Edit', [
            'uom' => $uom,
        ]);
    }

    public function update(
        UpdateUomRequest $request,
        Uom $uom
    ): RedirectResponse {
        $uom->update($request->validated());

        return to_route('admin.uoms.index')
            ->with('success', 'UOM updated successfully.');
    }

    public function destroy(Uom $uom): RedirectResponse
    {
        $uom->update([
            'is_active' => false,
        ]);

        return to_route('admin.uoms.index')
            ->with('success', 'UOM deactivated successfully.');
    }
}