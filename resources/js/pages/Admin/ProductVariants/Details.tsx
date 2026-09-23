import { Head, Link } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
}

interface Uom {
    id: number;
    code: string;
}

interface Warehouse {
    id: number;
    warehouse_code: string;
    name: string;
}

interface Inventory {
    id: number;
    quantity_on_hand: string | number;
    reorder_level: string | number;
    warehouse: Warehouse;
}

interface ProductVariant {
    id: number;
    sku: string;
    barcode?: string | null;
    variant_name: string;
    cost_price: string | number;
    tax_type: string;
    selling_qty: string | number;
    purchasing_qty: string | number;
    remarks?: string | null;
    is_active: boolean;
    base_uom?: Uom | null;
    selling_uom?: Uom | null;
    purchasing_uom?: Uom | null;
    inventories: Inventory[];
    prices: VariantPrice[];
}

interface Props {
    product: Product;
    variant: ProductVariant;
}

interface PriceList {
    id: number;
    code: string;
    description?: string | null;
}

interface VariantPrice {
    id: number;
    price: string | number;
    price_list: PriceList;
}

interface Warehouse {
    id: number;
    warehouse_code: string;
    name: string;
}

interface Props {
    product: Product;
    variant: ProductVariant;
    warehouses: Warehouse[];
}

export default function Details({ product, variant, warehouses, }: Props) {
    return (
        <>
            <Head title={`Variant Details - ${variant.variant_name}`} />

            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Variant Details
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            {product.name} / {variant.variant_name}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={`/admin/products/${product.id}/details`}
                            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                        >
                            Back to Product
                        </Link>

                        <Link
                            href={`/admin/products/${product.id}/variants/${variant.id}/edit`}
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            Edit Variant
                        </Link>
                    </div>
                </div>

                {/* Variant Information */}
                <div className="rounded-lg border bg-card">
                    <div className="border-b px-6 py-4">
                        <h2 className="text-lg font-semibold">
                            Variant Information
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Basic information and configuration for this
                            product variant.
                        </p>
                    </div>

                    <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Product
                            </p>

                            <p className="mt-1 font-medium">
                                {product.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Variant Name
                            </p>

                            <p className="mt-1 font-medium">
                                {variant.variant_name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                SKU
                            </p>

                            <p className="mt-1 font-medium">
                                {variant.sku}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Barcode
                            </p>

                            <p className="mt-1">
                                {variant.barcode || '—'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Cost Price
                            </p>

                            <p className="mt-1 font-medium">
                                {Number(variant.cost_price).toFixed(2)}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Tax Type
                            </p>

                            <p className="mt-1 capitalize">
                                {variant.tax_type.replace('_', ' ')}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Base UOM
                            </p>

                            <p className="mt-1">
                                {variant.base_uom?.code || '—'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Selling UOM
                            </p>

                            <p className="mt-1">
                                {variant.selling_uom?.code || '—'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Selling Quantity
                            </p>

                            <p className="mt-1">
                                {variant.selling_qty}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Purchasing UOM
                            </p>

                            <p className="mt-1">
                                {variant.purchasing_uom?.code || '—'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Purchasing Quantity
                            </p>

                            <p className="mt-1">
                                {variant.purchasing_qty}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Status
                            </p>

                            <p
                                className={`mt-1 font-medium ${
                                    variant.is_active
                                        ? 'text-green-600'
                                        : 'text-muted-foreground'
                                }`}
                            >
                                {variant.is_active ? 'Active' : 'Inactive'}
                            </p>
                        </div>

                        <div className="md:col-span-2 lg:col-span-3">
                            <p className="text-sm text-muted-foreground">
                                Remarks
                            </p>

                            <p className="mt-1 whitespace-pre-line">
                                {variant.remarks || '—'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Variant Pricing */}
                <div className="rounded-lg border bg-card">
                    <div className="border-b px-6 py-4">
                        <h2 className="text-lg font-semibold">
                            Pricing
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Prices configured for this product variant.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b bg-muted/50">
                                <tr>
                                    <th className="px-6 py-3 text-left font-medium">
                                        Price List
                                    </th>

                                    <th className="px-6 py-3 text-left font-medium">
                                        Description
                                    </th>

                                    <th className="px-6 py-3 text-right font-medium">
                                        Price
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {variant.prices.length > 0 ? (
                                    variant.prices.map((variantPrice) => (
                                        <tr key={variantPrice.id}>
                                            <td className="px-6 py-4 font-medium">
                                                {variantPrice.price_list.code}
                                            </td>

                                            <td className="px-6 py-4">
                                                {variantPrice.price_list.description || '—'}
                                            </td>

                                            <td className="px-6 py-4 text-right font-medium">
                                                {Number(variantPrice.price).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="px-6 py-8 text-center text-muted-foreground"
                                        >
                                            No pricing records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Warehouse Inventory */}
                <div className="rounded-lg border bg-card">
                    <div className="border-b px-6 py-4">
                        <h2 className="text-lg font-semibold">
                            Warehouse Inventory
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Current stock information for each warehouse.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b bg-muted/50">
                                <tr>
                                    <th className="px-6 py-3 text-left font-medium">
                                        Warehouse Code
                                    </th>

                                    <th className="px-6 py-3 text-left font-medium">
                                        Warehouse
                                    </th>

                                    <th className="px-6 py-3 text-right font-medium">
                                        Quantity on Hand
                                    </th>

                                    <th className="px-6 py-3 text-right font-medium">
                                        Reorder Level
                                    </th>

                                    <th className="px-6 py-3 text-right font-medium">
                                        Stock Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                            {warehouses.length > 0 ? (
                                warehouses.map((warehouse) => {
                                    const inventory = variant.inventories.find(
                                        (item) => item.warehouse.id === warehouse.id,
                                    );

                                    const quantity = inventory
                                        ? Number(inventory.quantity_on_hand)
                                        : 0;

                                    const reorderLevel = inventory
                                        ? Number(inventory.reorder_level)
                                        : 0;

                                    let stockStatus = 'No Inventory Record';

                                    if (inventory) {
                                        if (quantity <= 0) {
                                            stockStatus = 'Out of Stock';
                                        } else if (quantity <= reorderLevel) {
                                            stockStatus = 'Low Stock';
                                        } else {
                                            stockStatus = 'Normal';
                                        }
                                    }

                                    return (
                                        <tr key={warehouse.id}>
                                            <td className="px-6 py-4 font-medium">
                                                {warehouse.warehouse_code}
                                            </td>

                                            <td className="px-6 py-4">
                                                {warehouse.name}
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                {quantity.toFixed(3)}
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                {reorderLevel.toFixed(3)}
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <span
                                                    className={
                                                        stockStatus === 'Normal'
                                                            ? 'font-medium text-green-600'
                                                            : stockStatus === 'Low Stock'
                                                            ? 'font-medium text-orange-600'
                                                            : 'font-medium text-muted-foreground'
                                                    }
                                                >
                                                    {stockStatus}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-8 text-center text-muted-foreground"
                                    >
                                        No active warehouses found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}