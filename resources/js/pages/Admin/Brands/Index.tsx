import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';


interface Brand {
    id: number;
    name: string;
    slug: string;
    logo: string | null;
    description: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedBrands {
    data: Brand[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    brands: PaginatedBrands;
}

export default function Index({ brands }: Props) {
    return (
        <AdminLayout>
            <Head title="Brands" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Brands
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Manage product brands.
                        </p>
                    </div>

                    <Link
                        href="/admin/brands/create"
                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Add Brand
                    </Link>
                </div>

                <div className="rounded-lg border">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b bg-muted/50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium">
                                        Brand
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Slug
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
                                {brands.data.length > 0 ? (
                                    brands.data.map((brand) => (
                                        <tr
                                            key={brand.id}
                                            className="border-b last:border-0"
                                        >
                                            <td className="px-4 py-3 font-medium">
                                                {brand.name}
                                            </td>

                                            <td className="px-4 py-3 text-muted-foreground">
                                                {brand.slug}
                                            </td>

                                            <td className="px-4 py-3">
                                                {brand.is_active ? (
                                                    <span className="text-sm font-medium text-green-600">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="text-sm font-medium text-muted-foreground">
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-4 py-3 text-right">
                                                <Link
                                                    href={`/admin/brands/${brand.id}/edit`}
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
                                            colSpan={4}
                                            className="px-4 py-8 text-center text-muted-foreground"
                                        >
                                            No brands found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {brands.last_page > 1 && (
                    <div className="flex flex-wrap gap-2">
                        {brands.links.map((link, index) => (
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
        </AdminLayout>
    );
}