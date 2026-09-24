import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';

interface PriceList {
    id: number;
    code: string;
    description: string | null;
    is_active: boolean;
}

interface PaginatedPriceLists {
    data: PriceList[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Props {
    priceLists: PaginatedPriceLists;
}

export default function Index({ priceLists }: Props) {
    return (
        <AdminLayout>
            <Head title="Price Lists" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Price Lists
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Manage pricing groups used for product variants.
                        </p>
                    </div>

                    <Link
                        href="/admin/price-lists/create"
                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Add Price List
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg border">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b bg-muted/50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium">
                                        Code
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Description
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
                                {priceLists.data.length > 0 ? (
                                    priceLists.data.map((priceList) => (
                                        <tr
                                            key={priceList.id}
                                            className="border-b last:border-b-0"
                                        >
                                            <td className="px-4 py-3 font-medium">
                                                {priceList.code}
                                            </td>

                                            <td className="px-4 py-3">
                                                {priceList.description || '—'}
                                            </td>

                                            <td className="px-4 py-3">
                                                <span
                                                    className={
                                                        priceList.is_active
                                                            ? 'text-green-600'
                                                            : 'text-muted-foreground'
                                                    }
                                                >
                                                    {priceList.is_active
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3 text-right">
                                                <Link
                                                    href={`/admin/price-lists/${priceList.id}/edit`}
                                                    className="text-sm font-medium hover:underline"
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
                                            No price lists found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {priceLists.last_page > 1 && (
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground">
                            Showing {priceLists.from ?? 0} to{' '}
                            {priceLists.to ?? 0} of {priceLists.total} price
                            lists
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {priceLists.links.map((link, index) => (
                                <Link
                                    key={`${link.label}-${index}`}
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
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}