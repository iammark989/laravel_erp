import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

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

type SupplierForm = {
    supplier_code: string;
    name: string;
    contact_person: string;
    contact_number: string;
    email: string;
    address: string;
    tin_number: string;
    is_active: boolean;
    remarks: string;
};

type Props = {
    supplier: Supplier;
};

export default function Edit({ supplier }: Props) {
    const { data, setData, put, processing, errors } =
        useForm<SupplierForm>({
            supplier_code: supplier.supplier_code,
            name: supplier.name,
            contact_person: supplier.contact_person ?? '',
            contact_number: supplier.contact_number ?? '',
            email: supplier.email ?? '',
            address: supplier.address ?? '',
            tin_number: supplier.tin_number ?? '',
            is_active: supplier.is_active,
            remarks: supplier.remarks ?? '',
        });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        put(`/admin/suppliers/${supplier.id}`);
    };

    return (
        <AppLayout>
            <Head title={`Edit Supplier - ${supplier.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/suppliers"
                        className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Link>

                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Edit Supplier
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Update supplier information.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={submit}
                    className="max-w-4xl space-y-6 rounded-xl border bg-card p-6"
                >
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label
                                htmlFor="supplier_code"
                                className="text-sm font-medium"
                            >
                                Supplier Code
                            </label>

                            <input
                                id="supplier_code"
                                type="text"
                                value={data.supplier_code}
                                onChange={(e) =>
                                    setData('supplier_code', e.target.value)
                                }
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                            />

                            {errors.supplier_code && (
                                <p className="text-sm text-destructive">
                                    {errors.supplier_code}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium"
                            >
                                Supplier Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                            />

                            {errors.name && (
                                <p className="text-sm text-destructive">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="contact_person"
                                className="text-sm font-medium"
                            >
                                Contact Person
                            </label>

                            <input
                                id="contact_person"
                                type="text"
                                value={data.contact_person}
                                onChange={(e) =>
                                    setData(
                                        'contact_person',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                            />

                            {errors.contact_person && (
                                <p className="text-sm text-destructive">
                                    {errors.contact_person}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="contact_number"
                                className="text-sm font-medium"
                            >
                                Contact Number
                            </label>

                            <input
                                id="contact_number"
                                type="text"
                                value={data.contact_number}
                                onChange={(e) =>
                                    setData(
                                        'contact_number',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                            />

                            {errors.contact_number && (
                                <p className="text-sm text-destructive">
                                    {errors.contact_number}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                            />

                            {errors.email && (
                                <p className="text-sm text-destructive">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="tin_number"
                                className="text-sm font-medium"
                            >
                                TIN Number
                            </label>

                            <input
                                id="tin_number"
                                type="text"
                                value={data.tin_number}
                                onChange={(e) =>
                                    setData('tin_number', e.target.value)
                                }
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                            />

                            {errors.tin_number && (
                                <p className="text-sm text-destructive">
                                    {errors.tin_number}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="address"
                            className="text-sm font-medium"
                        >
                            Address
                        </label>

                        <textarea
                            id="address"
                            value={data.address}
                            onChange={(e) =>
                                setData('address', e.target.value)
                            }
                            rows={3}
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                        />

                        {errors.address && (
                            <p className="text-sm text-destructive">
                                {errors.address}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="remarks"
                            className="text-sm font-medium"
                        >
                            Remarks
                        </label>

                        <textarea
                            id="remarks"
                            value={data.remarks}
                            onChange={(e) =>
                                setData('remarks', e.target.value)
                            }
                            rows={3}
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                        />

                        {errors.remarks && (
                            <p className="text-sm text-destructive">
                                {errors.remarks}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            id="is_active"
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) =>
                                setData('is_active', e.target.checked)
                            }
                            className="h-4 w-4 rounded border"
                        />

                        <label
                            htmlFor="is_active"
                            className="text-sm font-medium"
                        >
                            Active
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 border-t pt-6">
                        <Link
                            href="/admin/suppliers"
                            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? 'Updating...' : 'Update Supplier'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}