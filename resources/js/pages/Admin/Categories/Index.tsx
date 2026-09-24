import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    is_active: boolean;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedCategories {
    data: Category[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
}

interface Props {
    categories: PaginatedCategories;
}

export default function Index({ categories }: Props) {
    return (
        <AdminLayout>
            <Head title="Categories" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Categories
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Manage your product categories.
                        </p>
                    </div>

                    <Link
                        href="/admin/categories/create"
                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Add Category
                    </Link>
                </div>

                <div className="rounded-lg border">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="px-4 py-3 text-left font-medium">
                                        Name
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Slug
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
                                {categories.data.length > 0 ? (
                                    categories.data.map((category) => (
                                        <tr
                                            key={category.id}
                                            className="border-b last:border-0"
                                        >
                                            <td className="px-4 py-3 font-medium">
                                                {category.name}
                                            </td>

                                            <td className="px-4 py-3 text-muted-foreground">
                                                {category.slug}
                                            </td>

                                            <td className="px-4 py-3 text-muted-foreground">
                                                {category.description || '—'}
                                            </td>

                                            <td className="px-4 py-3">
                                                <span
                                                    className={
                                                        category.is_active
                                                            ? 'text-green-600'
                                                            : 'text-muted-foreground'
                                                    }
                                                >
                                                    {category.is_active
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3 text-right">
                                                <Link
                                                    href={`/admin/categories/${category.id}/edit`}
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
                                            colSpan={5}
                                            className="px-4 py-8 text-center text-muted-foreground"
                                        >
                                            No categories found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {categories.links.length > 3 && (
                    <div className="flex flex-wrap gap-2">
                        {categories.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url ?? '#'}
                                preserveScroll
                                className={`rounded-md border px-3 py-2 text-sm ${
                                    link.active
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-muted'
                                } ${
                                    !link.url
                                        ? 'pointer-events-none opacity-50'
                                        : ''
                                }`}
                            >
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}