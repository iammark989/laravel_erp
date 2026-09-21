import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
}

interface Uom {
    id: number;
    code: string;
    description: string | null;
}

interface ProductVariant {
    id: number;
    product_id: number;
    sku: string;
    barcode: string | null;
    variant_name: string;
    cost_price: string;
    tax_type: 'vatable' | 'vat_exempt' | 'zero_rated';
    selling_qty: string;
    purchasing_qty: string;
    is_active: boolean;
    product: Product;
    base_uom: Uom;
    selling_uom: Uom;
    purchasing_uom: Uom;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedVariants {
    data: ProductVariant[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
}

interface Props {
    variants: PaginatedVariants;
}

export default function Index({ variants }: Props) {
    return (
        <AppLayout>
            <Head title="Product Variants" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Product Variants
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Manage product variants, SKUs, UOMs, and costs.
                        </p>
                    </div>

                    <Link
                        href="/admin/product-variants/create"
                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Add Variant
                    </Link>
                </div>

                <div className="rounded-lg border">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="px-4 py-3 text-left font-medium">
                                        Product
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Variant
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        SKU
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Cost
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        UOM
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Status
                                    </th>

                                    <th className="px-4 py-3 text-right font-medium">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {variants.data.length > 0 ? (
                                    variants.data.map((variant) => (
                                        <tr
                                            key={variant.id}
                                            className="border-b last:border-0"
                                        >
                                            <td className="px-4 py-3 font-medium">
                                                {variant.product?.name ?? '—'}
                                            </td>

                                            <td className="px-4 py-3">
                                                {variant.variant_name}
                                            </td>

                                            <td className="px-4 py-3">
                                                {variant.sku}
                                            </td>

                                            <td className="px-4 py-3">
                                                {variant.cost_price}
                                            </td>

                                            <td className="px-4 py-3">
                                                {variant.selling_uom?.code ??
                                                    '—'}
                                            </td>

                                            <td className="px-4 py-3">
                                                <span
                                                    className={
                                                        variant.is_active
                                                            ? 'text-green-600'
                                                            : 'text-red-600'
                                                    }
                                                >
                                                    {variant.is_active
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3 text-right">
                                                <Link
                                                    href={`/admin/product-variants/${variant.id}/edit`}
                                                    className="text-sm font-medium text-primary hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-4 py-8 text-center text-muted-foreground"
                                        >
                                            No product variants found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {variants.links.length > 3 && (
                    <div className="flex flex-wrap items-center gap-2">
                        {variants.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url ?? '#'}
                                className={`rounded-md border px-3 py-1.5 text-sm ${
                                    link.active
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-muted'
                                } ${
                                    !link.url
                                        ? 'pointer-events-none opacity-50'
                                        : ''
                                }`}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}