<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\PriceList;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Role;
use App\Models\Supplier;
use App\Models\Uom;
use App\Models\User;
use App\Models\VariantInventory;
use App\Models\Warehouse;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class MasterDataSeeder extends Seeder
{
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Roles
        |--------------------------------------------------------------------------
        */

        $roles = [
            [
                'name' => 'Administrator',
                'slug' => 'administrator',
                'description' => 'Full system access.',
                'is_active' => true,
            ],
            [
                'name' => 'Purchasing',
                'slug' => 'purchasing',
                'description' => 'Handles suppliers and purchase orders.',
                'is_active' => true,
            ],
            [
                'name' => 'Inventory',
                'slug' => 'inventory',
                'description' => 'Handles warehouses and inventory operations.',
                'is_active' => true,
            ],
            [
                'name' => 'Sales',
                'slug' => 'sales',
                'description' => 'Handles sales and customer transactions.',
                'is_active' => true,
            ],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['slug' => $role['slug']],
                $role
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Users
        |--------------------------------------------------------------------------
        */

        $administratorRole = Role::where(
            'slug',
            'administrator'
        )->firstOrFail();

        $purchasingRole = Role::where(
            'slug',
            'purchasing'
        )->firstOrFail();

        $inventoryRole = Role::where(
            'slug',
            'inventory'
        )->firstOrFail();

        $salesRole = Role::where(
            'slug',
            'sales'
        )->firstOrFail();

        $users = [
            [
                'username' => 'admin',
                'first_name' => 'System',
                'middle_name' => null,
                'last_name' => 'Administrator',
                'suffix' => null,
                'email' => 'admin@example.com',
                'mobile' => '09170000001',
                'role_id' => $administratorRole->id,
            ],
            [
                'username' => 'purchasing',
                'first_name' => 'Purchasing',
                'middle_name' => null,
                'last_name' => 'Staff',
                'suffix' => null,
                'email' => 'purchasing@example.com',
                'mobile' => '09170000002',
                'role_id' => $purchasingRole->id,
            ],
            [
                'username' => 'inventory',
                'first_name' => 'Inventory',
                'middle_name' => null,
                'last_name' => 'Staff',
                'suffix' => null,
                'email' => 'inventory@example.com',
                'mobile' => '09170000003',
                'role_id' => $inventoryRole->id,
            ],
            [
                'username' => 'sales',
                'first_name' => 'Sales',
                'middle_name' => null,
                'last_name' => 'Staff',
                'suffix' => null,
                'email' => 'sales@example.com',
                'mobile' => '09170000004',
                'role_id' => $salesRole->id,
            ],
        ];

        foreach ($users as $userData) {
            User::updateOrCreate(
                ['username' => $userData['username']],
                [
                    ...$userData,
                    'password' => Hash::make('password'),
                    'is_active' => true,
                ]
            );
        }

        $adminUser = User::where('username', 'admin')->first();

        /*
        |--------------------------------------------------------------------------
        | UOMs
        |--------------------------------------------------------------------------
        */

        $uoms = [
            [
                'code' => 'PC',
                'description' => 'Piece',
            ],
            [
                'code' => 'BOX',
                'description' => 'Box',
            ],
            [
                'code' => 'PACK',
                'description' => 'Pack',
            ],
            [
                'code' => 'KG',
                'description' => 'Kilogram',
            ],
            [
                'code' => 'L',
                'description' => 'Liter',
            ],
            [
                'code' => 'BOTTLE',
                'description' => 'Bottle',
            ],
        ];

        foreach ($uoms as $uomData) {
            Uom::updateOrCreate(
                ['code' => $uomData['code']],
                [
                    'description' => $uomData['description'],
                    'is_active' => true,
                ]
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Brands
        |--------------------------------------------------------------------------
        */

        $brands = [
            [
                'name' => 'Northstar Foods',
                'slug' => 'northstar-foods',
                'description' => 'Sample food and beverage brand.',
            ],
            [
                'name' => 'BluePeak',
                'slug' => 'bluepeak',
                'description' => 'Sample consumer goods brand.',
            ],
            [
                'name' => 'FreshVale',
                'slug' => 'freshvale',
                'description' => 'Sample beverage and grocery brand.',
            ],
            [
                'name' => 'DailyChoice',
                'slug' => 'dailychoice',
                'description' => 'Sample everyday products brand.',
            ],
            [
                'name' => 'PrimeHarvest',
                'slug' => 'primeharvest',
                'description' => 'Sample food products brand.',
            ],
        ];

        foreach ($brands as $brandData) {
            Brand::updateOrCreate(
                ['slug' => $brandData['slug']],
                [
                    'name' => $brandData['name'],
                    'description' => $brandData['description'],
                    'is_active' => true,
                ]
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Categories
        |--------------------------------------------------------------------------
        */

        $categories = [
            [
                'name' => 'Coffee',
                'slug' => 'coffee',
                'description' => 'Coffee and coffee-based products.',
            ],
            [
                'name' => 'Juices',
                'slug' => 'juices',
                'description' => 'Fruit juices and related beverages.',
            ],
            [
                'name' => 'Bottled Water',
                'slug' => 'bottled-water',
                'description' => 'Bottled drinking water.',
            ],
            [
                'name' => 'Snacks',
                'slug' => 'snacks',
                'description' => 'Packaged snacks and light food products.',
            ],
            [
                'name' => 'Grocery',
                'slug' => 'grocery',
                'description' => 'General grocery products.',
            ],
        ];

        foreach ($categories as $categoryData) {
            Category::updateOrCreate(
                ['slug' => $categoryData['slug']],
                [
                    'name' => $categoryData['name'],
                    'description' => $categoryData['description'],
                    'is_active' => true,
                ]
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Warehouses
        |--------------------------------------------------------------------------
        */

        $warehouses = [
            [
                'warehouse_code' => 'WH-001',
                'name' => 'Main Warehouse',
                'contact_person' => 'Warehouse Staff',
                'contact_number' => '09180000001',
                'email' => 'warehouse1@example.com',
                'address' => 'Main Warehouse',
                'remarks' => 'Primary inventory warehouse.',
            ],
            [
                'warehouse_code' => 'WH-002',
                'name' => 'Secondary Warehouse',
                'contact_person' => 'Warehouse Staff',
                'contact_number' => '09180000002',
                'email' => 'warehouse2@example.com',
                'address' => 'Secondary Warehouse',
                'remarks' => 'Secondary storage location.',
            ],
        ];

        foreach ($warehouses as $warehouseData) {
            Warehouse::updateOrCreate(
                ['warehouse_code' => $warehouseData['warehouse_code']],
                [
                    ...$warehouseData,
                    'is_active' => true,
                    'created_by' => $adminUser?->id,
                    'updated_by' => $adminUser?->id,
                ]
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Suppliers
        |--------------------------------------------------------------------------
        */

        $suppliers = [
            [
                'supplier_code' => 'SUP-001',
                'name' => 'Alpha Trade Supply',
                'contact_person' => 'John Supplier',
                'contact_number' => '09190000001',
                'email' => 'alpha@example.com',
                'address' => 'Sample Supplier Address 1',
                'tin_number' => '000-111-222-000',
                'remarks' => 'Food and beverage supplier.',
            ],
            [
                'supplier_code' => 'SUP-002',
                'name' => 'Bright Star Trading',
                'contact_person' => 'Maria Supplier',
                'contact_number' => '09190000002',
                'email' => 'brightstar@example.com',
                'address' => 'Sample Supplier Address 2',
                'tin_number' => '000-222-333-000',
                'remarks' => 'Consumer goods supplier.',
            ],
            [
                'supplier_code' => 'SUP-003',
                'name' => 'Central Goods Distributor',
                'contact_person' => 'Peter Supplier',
                'contact_number' => '09190000003',
                'email' => 'centralgoods@example.com',
                'address' => 'Sample Supplier Address 3',
                'tin_number' => '000-333-444-000',
                'remarks' => 'General goods distributor.',
            ],
            [
                'supplier_code' => 'SUP-004',
                'name' => 'Evergreen Wholesale',
                'contact_person' => 'Anna Supplier',
                'contact_number' => '09190000004',
                'email' => 'evergreen@example.com',
                'address' => 'Sample Supplier Address 4',
                'tin_number' => '000-444-555-000',
                'remarks' => 'Wholesale supplier.',
            ],
            [
                'supplier_code' => 'SUP-005',
                'name' => 'Prime Source Trading',
                'contact_person' => 'Mark Supplier',
                'contact_number' => '09190000005',
                'email' => 'primesource@example.com',
                'address' => 'Sample Supplier Address 5',
                'tin_number' => '000-555-666-000',
                'remarks' => 'Food products supplier.',
            ],
        ];

        foreach ($suppliers as $supplierData) {
            Supplier::updateOrCreate(
                ['supplier_code' => $supplierData['supplier_code']],
                [
                    ...$supplierData,
                    'is_active' => true,
                ]
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Price Lists
        |--------------------------------------------------------------------------
        */

        $priceLists = [
            [
                'code' => 'RETAIL',
                'description' => 'Retail Price',
            ],
            [
                'code' => 'WHOLESALE',
                'description' => 'Wholesale Price',
            ],
        ];

        foreach ($priceLists as $priceListData) {
            PriceList::updateOrCreate(
                ['code' => $priceListData['code']],
                [
                    'description' => $priceListData['description'],
                    'is_active' => true,
                ]
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Products
        |--------------------------------------------------------------------------
        */

        $productDefinitions = [
            [
                'category' => 'Coffee',
                'brand' => 'Northstar Foods',
                'name' => 'Classic Coffee',
                'short_description' => 'Classic roasted coffee.',
                'description' => 'Sample coffee product for purchasing and inventory testing.',
            ],
            [
                'category' => 'Juices',
                'brand' => 'FreshVale',
                'name' => 'Orange Juice',
                'short_description' => 'Refreshing orange juice.',
                'description' => 'Sample orange juice product for purchasing and inventory testing.',
            ],
            [
                'category' => 'Bottled Water',
                'brand' => 'BluePeak',
                'name' => 'Pure Drinking Water',
                'short_description' => 'Bottled drinking water.',
                'description' => 'Sample bottled water product for inventory testing.',
            ],
            [
                'category' => 'Snacks',
                'brand' => 'DailyChoice',
                'name' => 'Potato Chips',
                'short_description' => 'Crispy potato snack.',
                'description' => 'Sample potato chips product for inventory testing.',
            ],
            [
                'category' => 'Grocery',
                'brand' => 'PrimeHarvest',
                'name' => 'Premium Rice',
                'short_description' => 'Premium quality rice.',
                'description' => 'Sample rice product for purchasing and inventory testing.',
            ],
        ];

        foreach ($productDefinitions as $productData) {
            $category = Category::where(
                'slug',
                Str::slug($productData['category'])
            )->firstOrFail();

            $brand = Brand::where(
                'slug',
                Str::slug($productData['brand'])
            )->firstOrFail();

            Product::updateOrCreate(
                ['slug' => Str::slug($productData['name'])],
                [
                    'category_id' => $category->id,
                    'brand_id' => $brand->id,
                    'name' => $productData['name'],
                    'short_description' => $productData['short_description'],
                    'description' => $productData['description'],
                    'featured_image' => null,
                    'is_active' => true,
                    'created_by' => $adminUser?->id,
                ]
            );
        }

        /*
        |--------------------------------------------------------------------------
        | UOM IDs
        |--------------------------------------------------------------------------
        */

        $pcUom = Uom::where('code', 'PC')->firstOrFail();
        $boxUom = Uom::where('code', 'BOX')->firstOrFail();
        $packUom = Uom::where('code', 'PACK')->firstOrFail();
        $kgUom = Uom::where('code', 'KG')->firstOrFail();
        $bottleUom = Uom::where('code', 'BOTTLE')->firstOrFail();

        /*
        |--------------------------------------------------------------------------
        | Product Variants
        |--------------------------------------------------------------------------
        */

        $variants = [
            [
                'product' => 'Classic Coffee',
                'sku' => 'COF-55G',
                'barcode' => '100000000001',
                'variant_name' => 'Classic Coffee 55g',
                'cost_price' => 85.00,
                'base_uom_id' => $pcUom->id,
                'selling_uom_id' => $pcUom->id,
                'selling_qty' => 1,
                'purchasing_uom_id' => $boxUom->id,
                'purchasing_qty' => 12,
            ],
            [
                'product' => 'Classic Coffee',
                'sku' => 'COF-100G',
                'barcode' => '100000000002',
                'variant_name' => 'Classic Coffee 100g',
                'cost_price' => 145.00,
                'base_uom_id' => $pcUom->id,
                'selling_uom_id' => $pcUom->id,
                'selling_qty' => 1,
                'purchasing_uom_id' => $boxUom->id,
                'purchasing_qty' => 12,
            ],
            [
                'product' => 'Orange Juice',
                'sku' => 'OJ-250ML',
                'barcode' => '100000000003',
                'variant_name' => 'Orange Juice 250ml',
                'cost_price' => 25.00,
                'base_uom_id' => $bottleUom->id,
                'selling_uom_id' => $bottleUom->id,
                'selling_qty' => 1,
                'purchasing_uom_id' => $boxUom->id,
                'purchasing_qty' => 24,
            ],
            [
                'product' => 'Orange Juice',
                'sku' => 'OJ-1L',
                'barcode' => '100000000004',
                'variant_name' => 'Orange Juice 1L',
                'cost_price' => 75.00,
                'base_uom_id' => $bottleUom->id,
                'selling_uom_id' => $bottleUom->id,
                'selling_qty' => 1,
                'purchasing_uom_id' => $boxUom->id,
                'purchasing_qty' => 12,
            ],
            [
                'product' => 'Pure Drinking Water',
                'sku' => 'WTR-350ML',
                'barcode' => '100000000005',
                'variant_name' => 'Pure Drinking Water 350ml',
                'cost_price' => 10.00,
                'base_uom_id' => $bottleUom->id,
                'selling_uom_id' => $bottleUom->id,
                'selling_qty' => 1,
                'purchasing_uom_id' => $boxUom->id,
                'purchasing_qty' => 24,
            ],
            [
                'product' => 'Pure Drinking Water',
                'sku' => 'WTR-15L',
                'barcode' => '100000000006',
                'variant_name' => 'Pure Drinking Water 1.5L',
                'cost_price' => 20.00,
                'base_uom_id' => $bottleUom->id,
                'selling_uom_id' => $bottleUom->id,
                'selling_qty' => 1,
                'purchasing_uom_id' => $boxUom->id,
                'purchasing_qty' => 12,
            ],
            [
                'product' => 'Potato Chips',
                'sku' => 'CHP-50G',
                'barcode' => '100000000007',
                'variant_name' => 'Potato Chips 50g',
                'cost_price' => 30.00,
                'base_uom_id' => $packUom->id,
                'selling_uom_id' => $packUom->id,
                'selling_qty' => 1,
                'purchasing_uom_id' => $boxUom->id,
                'purchasing_qty' => 24,
            ],
            [
                'product' => 'Potato Chips',
                'sku' => 'CHP-100G',
                'barcode' => '100000000008',
                'variant_name' => 'Potato Chips 100g',
                'cost_price' => 55.00,
                'base_uom_id' => $packUom->id,
                'selling_uom_id' => $packUom->id,
                'selling_qty' => 1,
                'purchasing_uom_id' => $boxUom->id,
                'purchasing_qty' => 12,
            ],
            [
                'product' => 'Premium Rice',
                'sku' => 'RICE-5KG',
                'barcode' => '100000000009',
                'variant_name' => 'Premium Rice 5kg',
                'cost_price' => 320.00,
                'base_uom_id' => $kgUom->id,
                'selling_uom_id' => $kgUom->id,
                'selling_qty' => 1,
                'purchasing_uom_id' => $kgUom->id,
                'purchasing_qty' => 5,
            ],
            [
                'product' => 'Premium Rice',
                'sku' => 'RICE-25KG',
                'barcode' => '100000000010',
                'variant_name' => 'Premium Rice 25kg',
                'cost_price' => 1500.00,
                'base_uom_id' => $kgUom->id,
                'selling_uom_id' => $kgUom->id,
                'selling_qty' => 1,
                'purchasing_uom_id' => $kgUom->id,
                'purchasing_qty' => 25,
            ],
        ];

        foreach ($variants as $variantData) {
            $product = Product::where(
                'slug',
                Str::slug($variantData['product'])
            )->firstOrFail();

            ProductVariant::updateOrCreate(
                ['sku' => $variantData['sku']],
                [
                    'product_id' => $product->id,
                    'barcode' => $variantData['barcode'],
                    'variant_name' => $variantData['variant_name'],
                    'cost_price' => $variantData['cost_price'],
                    'tax_type' => 'vatable',
                    'base_uom_id' => $variantData['base_uom_id'],
                    'selling_uom_id' => $variantData['selling_uom_id'],
                    'selling_qty' => $variantData['selling_qty'],
                    'purchasing_uom_id' => $variantData['purchasing_uom_id'],
                    'purchasing_qty' => $variantData['purchasing_qty'],
                    'remarks' => null,
                    'created_by' => $adminUser?->id,
                    'updated_by' => $adminUser?->id,
                    'is_active' => true,
                ]
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Variant Prices
        |--------------------------------------------------------------------------
        */

        $retailPriceList = PriceList::where(
            'code',
            'RETAIL'
        )->firstOrFail();

        $wholesalePriceList = PriceList::where(
            'code',
            'WHOLESALE'
        )->firstOrFail();

        $prices = [
            'COF-55G' => [
                'retail' => 125.00,
                'wholesale' => 115.00,
            ],
            'COF-100G' => [
                'retail' => 185.00,
                'wholesale' => 170.00,
            ],
            'OJ-250ML' => [
                'retail' => 40.00,
                'wholesale' => 36.00,
            ],
            'OJ-1L' => [
                'retail' => 110.00,
                'wholesale' => 100.00,
            ],
            'WTR-350ML' => [
                'retail' => 15.00,
                'wholesale' => 12.00,
            ],
            'WTR-15L' => [
                'retail' => 25.00,
                'wholesale' => 22.00,
            ],
            'CHP-50G' => [
                'retail' => 40.00,
                'wholesale' => 36.00,
            ],
            'CHP-100G' => [
                'retail' => 65.00,
                'wholesale' => 58.00,
            ],
            'RICE-5KG' => [
                'retail' => 390.00,
                'wholesale' => 365.00,
            ],
            'RICE-25KG' => [
                'retail' => 1750.00,
                'wholesale' => 1650.00,
            ],
        ];

        foreach ($prices as $sku => $priceData) {
            $variant = ProductVariant::where(
                'sku',
                $sku
            )->firstOrFail();

            $variant->prices()->updateOrCreate(
                [
                    'price_list_id' => $retailPriceList->id,
                ],
                [
                    'price' => $priceData['retail'],
                ]
            );

            $variant->prices()->updateOrCreate(
                [
                    'price_list_id' => $wholesalePriceList->id,
                ],
                [
                    'price' => $priceData['wholesale'],
                ]
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Variant Inventories
        |--------------------------------------------------------------------------
        |
        | Current ERP design:
        | product_variants do NOT contain warehouse_id.
        | Warehouse-specific stock belongs here.
        |
        */

        $warehouses = Warehouse::whereIn(
            'warehouse_code',
            ['WH-001', 'WH-002']
        )->get();

        $variants = ProductVariant::all();

        foreach ($warehouses as $warehouse) {
            foreach ($variants as $variant) {
                VariantInventory::updateOrCreate(
                    [
                        'product_variant_id' => $variant->id,
                        'warehouse_id' => $warehouse->id,
                    ],
                    [
                        'quantity_on_hand' => 0,
                        'reorder_level' => 10,
                    ]
                );
            }
        }
    }
}