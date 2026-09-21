<?php

use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\PriceListController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductVariantController;
use App\Http\Controllers\Admin\UomController;
use App\Http\Controllers\Admin\WarehouseController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return auth()->check()
        ? to_route('dashboard')
        : to_route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::prefix('admin')
    ->name('admin.')
    ->middleware('auth')
    ->group(function () {
        Route::resource('brands', BrandController::class)
            ->except(['show'])
            ->parameters([
                'brands' => 'brand',
            ]);

        Route::resource('categories', CategoryController::class)
            ->except(['show'])
            ->parameters([
                'categories' => 'category',
            ]);

        Route::resource('uoms', UomController::class)
        ->except(['show'])
        ->parameters([
            'uoms' => 'uom',
        ]);

        Route::resource('products', ProductController::class)
        ->except(['show'])
        ->parameters([
            'products' => 'product',
        ]);

        Route::resource('product-variants', ProductVariantController::class)
        ->except(['show'])
        ->parameters([
            'product-variants' => 'productVariant',
        ]);

        Route::resource('warehouses', WarehouseController::class)
        ->except(['show'])
        ->parameters([
            'warehouses' => 'warehouse',
        ]);

        Route::resource('price-lists', PriceListController::class)
        ->except(['show'])
        ->parameters([
            'price-lists' => 'priceList'
        ]);
        
    });

require __DIR__.'/settings.php';