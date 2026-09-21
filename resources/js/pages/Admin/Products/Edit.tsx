import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Option {
    id: number;
    name: string;
}

interface Product {
    id: number;
    category_id: number;
    brand_id: number;
    name: string;
    slug: string;
    short_description: string | null;
    description: string | null;
    featured_image: string | null;
    is_active: boolean;
}

interface Props {
    product: Product;
    categories: Option[];
    brands: Option[];
}

interface ProductForm {
    category_id: string;
    brand_id: string;
    name: string;
    slug: string;
    short_description: string;
    description: string;
    featured_image: string;
    is_active: boolean;
}

export default function Edit({
    product,
    categories,
    brands,
}: Props) {
    const { data, setData, put, processing, errors } =
        useForm<ProductForm>({
            category_id: String(product.category_id),
            brand_id: String(product.brand_id),
            name: product.name,
            slug: product.slug,
            short_description: product.short_description ?? '',
            description: product.description ?? '',
            featured_image: product.featured_image ?? '',
            is_active: product.is_active,
        });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();

        put(`/admin/products/${product.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Product" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Edit Product
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Update the product information.
                    </p>
                </div>

                <div className="max-w-3xl rounded-lg border p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label
                                    htmlFor="category_id"
                                    className="text-sm font-medium"
                                >
                                    Category
                                </label>

                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(event) =>
                                        setData(
                                            'category_id',
                                            event.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    <option value="">
                                        Select category
                                    </option>

                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.category_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.category_id}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="brand_id"
                                    className="text-sm font-medium"
                                >
                                    Brand
                                </label>

                                <select
                                    id="brand_id"
                                    value={data.brand_id}
                                    onChange={(event) =>
                                        setData(
                                            'brand_id',
                                            event.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    <option value="">
                                        Select brand
                                    </option>

                                    {brands.map((brand) => (
                                        <option
                                            key={brand.id}
                                            value={brand.id}
                                        >
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.brand_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.brand_id}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium"
                            >
                                Product Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(event) =>
                                    setData('name', event.target.value)
                                }
                                className="w-full rounded-md border px-3 py-2"
                                placeholder="Enter product name"
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
                                placeholder="product-slug"
                            />

                            {errors.slug && (
                                <p className="text-sm text-red-600">
                                    {errors.slug}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="short_description"
                                className="text-sm font-medium"
                            >
                                Short Description
                            </label>

                            <input
                                id="short_description"
                                type="text"
                                value={data.short_description}
                                onChange={(event) =>
                                    setData(
                                        'short_description',
                                        event.target.value,
                                    )
                                }
                                className="w-full rounded-md border px-3 py-2"
                                placeholder="Short product description"
                            />

                            {errors.short_description && (
                                <p className="text-sm text-red-600">
                                    {errors.short_description}
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
                                className="min-h-40 w-full rounded-md border px-3 py-2"
                                placeholder="Enter product description"
                            />

                            {errors.description && (
                                <p className="text-sm text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="featured_image"
                                className="text-sm font-medium"
                            >
                                Featured Image
                            </label>

                            <input
                                id="featured_image"
                                type="text"
                                value={data.featured_image}
                                onChange={(event) =>
                                    setData(
                                        'featured_image',
                                        event.target.value,
                                    )
                                }
                                className="w-full rounded-md border px-3 py-2"
                                placeholder="Image path or filename"
                            />

                            {errors.featured_image && (
                                <p className="text-sm text-red-600">
                                    {errors.featured_image}
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
                                    : 'Update Product'}
                            </button>

                            <Link
                                href="/admin/products"
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