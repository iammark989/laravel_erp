import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';

type Supplier = {
    id: number;
    supplier_code: string;
    name: string;
    contact_person: string | null;
    contact_number: string | null;
    email: string | null;
    address: string | null;
    tin_number: string | null;
    is_active: boolean;
    remarks: string | null;
};

type PaginatedSuppliers = {
    data: Supplier[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

type Props = {
    suppliers: PaginatedSuppliers;
};

export default function Index({ suppliers }: Props) {
    const handleDeactivate = (supplier: Supplier) => {
        if (
            !confirm(
                `Are you sure you want to deactivate "${supplier.name}"?`,
            )
        ) {
            return;
        }

        router.delete(`/admin/suppliers/${supplier.id}`);
    };

    return (
        <AppLayout>
            <Head title="Suppliers" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Suppliers
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Manage your suppliers and supplier information.
                        </p>
                    </div>

                    <Link
                        href="/admin/suppliers/create"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        <Plus className="h-4 w-4" />
                        Add Supplier
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl border bg-card">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b bg-muted/50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium">
                                        Code
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Supplier
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Contact Person
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Contact Number
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Email
                                    </th>

                                    <th className="px-4 py-3 text-center font-medium">
                                        Status
                                    </th>

                                    <th className="px-4 py-3 text-right font-medium">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {suppliers.data.length > 0 ? (
                                    suppliers.data.map((supplier) => (
                                        <tr
                                            key={supplier.id}
                                            className="hover:bg-muted/30"
                                        >
                                            <td className="px-4 py-3 font-medium">
                                                {supplier.supplier_code}
                                            </td>

                                            <td className="px-4 py-3">
                                                {supplier.name}
                                            </td>

                                            <td className="px-4 py-3">
                                                {supplier.contact_person ?? '—'}
                                            </td>

                                            <td className="px-4 py-3">
                                                {supplier.contact_number ?? '—'}
                                            </td>

                                            <td className="px-4 py-3">
                                                {supplier.email ?? '—'}
                                            </td>

                                            <td className="px-4 py-3 text-center">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                        supplier.is_active
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-gray-100 text-gray-600'
                                                    }`}
                                                >
                                                    {supplier.is_active
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/admin/suppliers/${supplier.id}/edit`}
                                                        className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                                                    >
                                                        <Pencil className="h-3.5 w-3.5" />
                                                        Edit
                                                    </Link>

                                                    {supplier.is_active && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDeactivate(
                                                                    supplier,
                                                                )
                                                            }
                                                            className="inline-flex items-center gap-1 rounded-md border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                            Deactivate
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-4 py-10 text-center text-muted-foreground"
                                        >
                                            No suppliers found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {suppliers.last_page > 1 && (
                        <div className="flex items-center justify-between border-t px-4 py-3">
                            <p className="text-sm text-muted-foreground">
                                Showing{' '}
                                {(suppliers.current_page - 1) *
                                    suppliers.per_page +
                                    1}{' '}
                                to{' '}
                                {Math.min(
                                    suppliers.current_page *
                                        suppliers.per_page,
                                    suppliers.total,
                                )}{' '}
                                of {suppliers.total} suppliers
                            </p>

                            <div className="flex gap-2">
                                {suppliers.current_page > 1 && (
                                    <Link
                                        href={`/admin/suppliers?page=${suppliers.current_page - 1}`}
                                        className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
                                    >
                                        Previous
                                    </Link>
                                )}

                                {suppliers.current_page <
                                    suppliers.last_page && (
                                    <Link
                                        href={`/admin/suppliers?page=${suppliers.current_page + 1}`}
                                        className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}