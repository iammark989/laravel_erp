import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';

interface Warehouse {
    id: number;
    warehouse_code: string;
    name: string;
    contact_person: string | null;
    contact_number: string | null;
    email: string | null;
    address: string | null;
    remarks: string | null;
    is_active: boolean;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedWarehouses {
    data: Warehouse[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
}

interface Props {
    warehouses: PaginatedWarehouses;
}

export default function Index({ warehouses }: Props) {
    return (
        <AdminLayout>
            <Head title="Warehouses" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Warehouses
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Manage your warehouses and storage locations.
                        </p>
                    </div>

                    <Link
                        href="/admin/warehouses/create"
                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Add Warehouse
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
                                        Warehouse
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Contact Person
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Contact Number
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
                                {warehouses.data.length > 0 ? (
                                    warehouses.data.map((warehouse) => (
                                        <tr
                                            key={warehouse.id}
                                            className="border-b last:border-0"
                                        >
                                            <td className="px-4 py-3 font-medium">
                                                {warehouse.warehouse_code}
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="font-medium">
                                                    {warehouse.name}
                                                </div>

                                                {warehouse.email && (
                                                    <div className="text-xs text-muted-foreground">
                                                        {warehouse.email}
                                                    </div>
                                                )}
                                            </td>

                                            <td className="px-4 py-3">
                                                {warehouse.contact_person ??
                                                    '—'}
                                            </td>

                                            <td className="px-4 py-3">
                                                {warehouse.contact_number ??
                                                    '—'}
                                            </td>

                                            <td className="px-4 py-3">
                                                <span
                                                    className={
                                                        warehouse.is_active
                                                            ? 'text-green-600'
                                                            : 'text-red-600'
                                                    }
                                                >
                                                    {warehouse.is_active
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3 text-right">
                                                <Link
                                                    href={`/admin/warehouses/${warehouse.id}/edit`}
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
                                            colSpan={6}
                                            className="px-4 py-8 text-center text-muted-foreground"
                                        >
                                            No warehouses found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {warehouses.links.length > 3 && (
                    <div className="flex flex-wrap items-center gap-2">
                        {warehouses.links.map((link, index) => (
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