import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
}

interface Brand {
    id: number;
    name: string;
}

interface Uom {
    id: number;
    code: string;
}

interface ProductVariant {
    id: number;
    sku: string;
    barcode?: string | null;
    variant_name: string;
    cost_price: string | number;
    selling_qty: string | number;
    purchasing_qty: string | number;
    is_active: boolean;
    base_uom?: Uom | null;
    selling_uom?: Uom | null;
    purchasing_uom?: Uom | null;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    short_description?: string | null;
    description?: string | null;
    featured_image?: string | null;
    is_active: boolean;
    category?: Category | null;
    brand?: Brand | null;
    variants: ProductVariant[];
}

interface Props {
    product: Product;
}

export default function Details({ product }: Props) {
    return (
        <AdminLayout>
            <Head title={`Product Details - ${product.name}`} />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Product Details
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            View product information and manage its variants.
                        </p>
                    </div>

                    <Link
                        href="/admin/products"
                        className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                    >
                        Back to Products
                    </Link>
                </div>

                {/* Section A - Product Details */}
                <div className="rounded-lg border bg-card">
                    <div className="flex items-center justify-between border-b px-6 py-4">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Product Information
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Basic information about this product.
                            </p>
                        </div>

                        <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            Edit Product
                        </Link>
                    </div>

                    <div className="grid gap-6 p-6 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Product Name
                            </p>

                            <p className="mt-1 font-medium">
                                {product.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Category
                            </p>

                            <p className="mt-1 font-medium">
                                {product.category?.name ?? '—'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Brand
                            </p>

                            <p className="mt-1 font-medium">
                                {product.brand?.name ?? '—'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Status
                            </p>

                            <p
                                className={`mt-1 font-medium ${
                                    product.is_active
                                        ? 'text-green-600'
                                        : 'text-muted-foreground'
                                }`}
                            >
                                {product.is_active ? 'Active' : 'Inactive'}
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <p className="text-sm text-muted-foreground">
                                Short Description
                            </p>

                            <p className="mt-1">
                                {product.short_description || '—'}
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <p className="text-sm text-muted-foreground">
                                Description
                            </p>

                            <p className="mt-1 whitespace-pre-line">
                                {product.description || '—'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section B - Product Variants */}
                <div className="rounded-lg border bg-card">
                    <div className="flex items-center justify-between border-b px-6 py-4">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Product Variants
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Manage variants associated with this product.
                            </p>
                        </div>

                        <Link
                            href={`/admin/products/${product.id}/variants/create`}
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            Add Variant
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b bg-muted/50">
                                <tr>
                                    <th className="px-6 py-3 text-left font-medium">
                                        SKU
                                    </th>

                                    <th className="px-6 py-3 text-left font-medium">
                                        Variant
                                    </th>

                                    <th className="px-6 py-3 text-left font-medium">
                                        Base UOM
                                    </th>

                                    <th className="px-6 py-3 text-left font-medium">
                                        Selling UOM
                                    </th>

                                    <th className="px-6 py-3 text-left font-medium">
                                        Purchasing UOM
                                    </th>

                                    <th className="px-6 py-3 text-left font-medium">
                                        Status
                                    </th>

                                    <th className="px-6 py-3 text-right font-medium">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {product.variants.length > 0 ? (
                                    product.variants.map((variant) => (
                                        <tr key={variant.id}>
                                            <td className="px-6 py-4 font-medium">
                                                {variant.sku}
                                            </td>

                                            <td className="px-6 py-4">
                                                {variant.variant_name}
                                            </td>

                                            <td className="px-6 py-4">
                                                {variant.base_uom?.code ?? '—'}
                                            </td>

                                            <td className="px-6 py-4">
                                                {variant.selling_uom?.code ?? '—'}
                                            </td>

                                            <td className="px-6 py-4">
                                                {variant.purchasing_uom?.code ??
                                                    '—'}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={
                                                        variant.is_active
                                                            ? 'font-medium text-green-600'
                                                            : 'font-medium text-muted-foreground'
                                                    }
                                                >
                                                    {variant.is_active
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-3">
                                                    <Link
                                                        href={`/admin/products/${product.id}/variants/${variant.id}/details`}
                                                        className="text-sm font-medium text-primary hover:underline"
                                                    >
                                                        Details
                                                    </Link>

                                                    <Link
                                                        href={`/admin/products/${product.id}/variants/${variant.id}/edit`}
                                                        className="text-sm font-medium text-primary hover:underline"
                                                    >
                                                        Edit
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-6 py-8 text-center text-muted-foreground"
                                        >
                                            No variants found for this
                                            product.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}