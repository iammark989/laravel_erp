import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

interface Uom {
    id: number;
    code: string;
    description: string | null;
    is_active: boolean;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedUoms {
    data: Uom[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
}

interface Props {
    uoms: PaginatedUoms;
}

export default function Index({ uoms }: Props) {
    return (
        <AppLayout>
            <Head title="UOMs" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">UOMs</h1>
                        <p className="text-sm text-muted-foreground">
                            Manage your units of measure.
                        </p>
                    </div>

                    <Link
                        href="/admin/uoms/create"
                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Add UOM
                    </Link>
                </div>

                <div className="rounded-lg border">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50">
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
                                {uoms.data.length > 0 ? (
                                    uoms.data.map((uom) => (
                                        <tr
                                            key={uom.id}
                                            className="border-b last:border-0"
                                        >
                                            <td className="px-4 py-3 font-medium">
                                                {uom.code}
                                            </td>

                                            <td className="px-4 py-3 text-muted-foreground">
                                                {uom.description || '—'}
                                            </td>

                                            <td className="px-4 py-3">
                                                <span
                                                    className={
                                                        uom.is_active
                                                            ? 'text-green-600'
                                                            : 'text-red-600'
                                                    }
                                                >
                                                    {uom.is_active
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3 text-right">
                                                <Link
                                                    href={`/admin/uoms/${uom.id}/edit`}
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
                                            No UOMs found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {uoms.links.length > 3 && (
                    <div className="flex flex-wrap items-center gap-2">
                        {uoms.links.map((link, index) => (
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