import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    is_active: boolean;
}

interface Props {
    category: Category;
}

interface CategoryForm {
    name: string;
    slug: string;
    description: string;
    is_active: boolean;
}

export default function Edit({ category }: Props) {
    const { data, setData, put, processing, errors } =
        useForm<CategoryForm>({
            name: category.name,
            slug: category.slug,
            description: category.description ?? '',
            is_active: category.is_active,
        });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();

        put(`/admin/categories/${category.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Category" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold">Edit Category</h1>
                    <p className="text-sm text-muted-foreground">
                        Update the product category details.
                    </p>
                </div>

                <div className="max-w-2xl rounded-lg border p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium"
                            >
                                Category Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(event) =>
                                    setData('name', event.target.value)
                                }
                                className="w-full rounded-md border px-3 py-2"
                                placeholder="Enter category name"
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
                                placeholder="category-slug"
                            />

                            {errors.slug && (
                                <p className="text-sm text-red-600">
                                    {errors.slug}
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
                                    setData('description', event.target.value)
                                }
                                className="min-h-32 w-full rounded-md border px-3 py-2"
                                placeholder="Enter category description"
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
                                    ? 'Updating...'
                                    : 'Update Category'}
                            </button>

                            <Link
                                href="/admin/categories"
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