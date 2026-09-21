import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface WarehouseForm {
    warehouse_code: string;
    name: string;
    contact_person: string;
    contact_number: string;
    email: string;
    address: string;
    remarks: string;
    is_active: boolean;
}

export default function Create() {
    const { data, setData, post, processing, errors } =
        useForm<WarehouseForm>({
            warehouse_code: '',
            name: '',
            contact_person: '',
            contact_number: '',
            email: '',
            address: '',
            remarks: '',
            is_active: true,
        });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();

        post('/admin/warehouses');
    };

    return (
        <AppLayout>
            <Head title="Create Warehouse" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Create Warehouse
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Add a new warehouse or storage location.
                    </p>
                </div>

                <div className="max-w-3xl rounded-lg border p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label
                                    htmlFor="warehouse_code"
                                    className="text-sm font-medium"
                                >
                                    Warehouse Code
                                </label>

                                <input
                                    id="warehouse_code"
                                    type="text"
                                    value={data.warehouse_code}
                                    onChange={(event) =>
                                        setData(
                                            'warehouse_code',
                                            event.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                    placeholder="e.g. WH-MAIN"
                                    maxLength={20}
                                />

                                {errors.warehouse_code && (
                                    <p className="text-sm text-red-600">
                                        {errors.warehouse_code}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="name"
                                    className="text-sm font-medium"
                                >
                                    Warehouse Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(event) =>
                                        setData('name', event.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                    placeholder="e.g. Main Warehouse"
                                    maxLength={100}
                                />

                                {errors.name && (
                                    <p className="text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
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
                                    onChange={(event) =>
                                        setData(
                                            'contact_person',
                                            event.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                    placeholder="Contact person"
                                />

                                {errors.contact_person && (
                                    <p className="text-sm text-red-600">
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
                                    onChange={(event) =>
                                        setData(
                                            'contact_number',
                                            event.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                    placeholder="Contact number"
                                />

                                {errors.contact_number && (
                                    <p className="text-sm text-red-600">
                                        {errors.contact_number}
                                    </p>
                                )}
                            </div>
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
                                onChange={(event) =>
                                    setData('email', event.target.value)
                                }
                                className="w-full rounded-md border px-3 py-2"
                                placeholder="warehouse@example.com"
                            />

                            {errors.email && (
                                <p className="text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
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
                                onChange={(event) =>
                                    setData('address', event.target.value)
                                }
                                className="min-h-28 w-full rounded-md border px-3 py-2"
                                placeholder="Warehouse address"
                            />

                            {errors.address && (
                                <p className="text-sm text-red-600">
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
                                onChange={(event) =>
                                    setData('remarks', event.target.value)
                                }
                                className="min-h-28 w-full rounded-md border px-3 py-2"
                                placeholder="Optional remarks"
                            />

                            {errors.remarks && (
                                <p className="text-sm text-red-600">
                                    {errors.remarks}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                id="is_active"
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(event) =>
                                    setData(
                                        'is_active',
                                        event.target.checked,
                                    )
                                }
                            />

                            <label
                                htmlFor="is_active"
                                className="text-sm font-medium"
                            >
                                Active
                            </label>
                        </div>

                        {errors.is_active && (
                            <p className="text-sm text-red-600">
                                {errors.is_active}
                            </p>
                        )}

                        <div className="flex items-center gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                            >
                                {processing
                                    ? 'Saving...'
                                    : 'Save Warehouse'}
                            </button>

                            <Link
                                href="/admin/warehouses"
                                className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}