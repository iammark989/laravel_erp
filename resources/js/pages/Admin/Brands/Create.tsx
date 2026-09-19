import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface BrandForm {
    name: string;
    slug: string;
    logo: string;
    description: string;
    is_active: boolean;
}

export default function Create() {
    const { data, setData, post, processing, errors } =
        useForm<BrandForm>({
            name: '',
            slug: '',
            logo: '',
            description: '',
            is_active: true,
        });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        post('/admin/brands')
    };

    return (
        <AppLayout>
            <Head title="Create Brand" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Create Brand
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Add a new product brand.
                    </p>
                </div>

                <div className="max-w-2xl rounded-lg border p-6">
                    <form
                        onSubmit={submit}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium"
                            >
                                Brand Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(event) =>
                                    setData('name', event.target.value)
                                }
                                className="w-full rounded-md border px-3 py-2"
                                placeholder="Enter brand name"
                            />

                            {errors.name && (
                                <p className="text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="slug"
                                className="text-sm font-medium"
                            >
                                Slug
                            </label>

                            <input
                                id="slug"
                                type="text"
                                value={data.slug}
                                onChange={(event) =>
                                    setData('slug', event.target.value)
                                }
                                className="w-full rounded-md border px-3 py-2"
                                placeholder="brand-slug"
                            />

                            {errors.slug && (
                                <p className="text-sm text-red-600">
                                    {errors.slug}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="logo"
                                className="text-sm font-medium"
                            >
                                Logo
                            </label>

                            <input
                                id="logo"
                                type="text"
                                value={data.logo}
                                onChange={(event) =>
                                    setData('logo', event.target.value)
                                }
                                className="w-full rounded-md border px-3 py-2"
                                placeholder="Logo path or URL"
                            />

                            {errors.logo && (
                                <p className="text-sm text-red-600">
                                    {errors.logo}
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
                                placeholder="Enter brand description"
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
                                {processing
                                    ? 'Saving...'
                                    : 'Save Brand'}
                            </button>

                            <Link
                                href="/admin/brands"
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