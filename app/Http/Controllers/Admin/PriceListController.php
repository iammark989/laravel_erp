<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePriceListRequest;
use App\Http\Requests\UpdatePriceListRequest;
use App\Models\PriceList;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PriceListController extends Controller
{
    public function index(): Response
    {
        $priceLists = PriceList::query()
            ->orderBy('code')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/PriceLists/Index', [
            'priceLists' => $priceLists,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/PriceLists/Create');
    }

    public function store(StorePriceListRequest $request): RedirectResponse
    {
        PriceList::create($request->validated());

        return to_route('admin.price-lists.index')
            ->with('success', 'Price list created successfully.');
    }

    public function edit(PriceList $priceList): Response
    {
        return Inertia::render('Admin/PriceLists/Edit', [
            'priceList' => $priceList,
        ]);
    }

    public function update(
        UpdatePriceListRequest $request,
        PriceList $priceList
    ): RedirectResponse {
        $priceList->update($request->validated());

        return to_route('admin.price-lists.index')
            ->with('success', 'Price list updated successfully.');
    }

    public function destroy(PriceList $priceList): RedirectResponse
    {
        $priceList->update([
            'is_active' => false,
        ]);

        return to_route('admin.price-lists.index')
            ->with('success', 'Price list deactivated successfully.');
    }
}