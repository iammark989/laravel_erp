<?php

use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CategoryController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

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
    
    });

    



require __DIR__.'/settings.php';
