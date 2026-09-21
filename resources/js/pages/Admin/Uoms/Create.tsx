import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface UomForm {
    code: string;
    description: string;
    is_active: boolean;
}

export default function Create() {
    const { data, setData, post, processing, errors } =
        useForm<UomForm>({
            code: '',
            description: '',
            is_active: true,
        });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();

        post('/admin/uoms');
    };

    return (
        <AppLayout>
            <Head title="Create UOM" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold">Create UOM</h1>
                    <p className="text-sm text-muted-foreground">
                        Add a new unit of measure.
                    </p>
                </div>

                <div className="max-w-2xl rounded-lg border p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <label
                                htmlFor="code"
                                className="text-sm font-medium"
                            >
                                Code
                            </label>

                            <input
                                id="code"
                                type="text"
                                value={data.code}
                                onChange={(event) =>
                                    setData('code', event.target.value)
                                }
                                className="w-full rounded-md border px-3 py-2"
                                placeholder="e.g. PCS"
                                maxLength={10}
                            />

                            {errors.code && (
                                <p className="text-sm text-red-600">
                                    {errors.code}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="description"
                                className="text-sm font-medium"
                            >
                                Description
                            </label>

                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(event) =>
                                    setData(
                                        'description',
                                        event.target.value,
                                    )
                                }
                                className="min-h-32 w-full rounded-md border px-3 py-2"
                                placeholder="Enter UOM description"
                            />

                            {errors.description && (
                                <p className="text-sm text-red-600">
                                    {errors.description}
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
                                {processing ? 'Saving...' : 'Save UOM'}
                            </button>

                            <Link
                                href="/admin/uoms"
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