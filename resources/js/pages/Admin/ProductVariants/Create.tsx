import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Product {
    id: number;
    name: string;
}

interface Uom {
    id: number;
    code: string;
    description: string | null;
}

interface Props {
    products: Product[];
    uoms: Uom[];
}

interface ProductVariantForm {
    product_id: string;
    sku: string;
    barcode: string;
    variant_name: string;
    cost_price: string;
    tax_type: 'vatable' | 'vat_exempt' | 'zero_rated';
    base_uom_id: string;
    selling_uom_id: string;
    selling_qty: string;
    purchasing_uom_id: string;
    purchasing_qty: string;
    remarks: string;
    is_active: boolean;
}

export default function Create({ products, uoms }: Props) {
    const { data, setData, post, processing, errors } =
        useForm<ProductVariantForm>({
            product_id: '',
            sku: '',
            barcode: '',
            variant_name: '',
            cost_price: '',
            tax_type: 'vatable',
            base_uom_id: '',
            selling_uom_id: '',
            selling_qty: '1',
            purchasing_uom_id: '',
            purchasing_qty: '1',
            remarks: '',
            is_active: true,
        });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();

        post('/admin/product-variants');
    };

    return (
        <AppLayout>
            <Head title="Create Product Variant" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Create Product Variant
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Add a variant to a product.
                    </p>
                </div>

                <div className="max-w-4xl rounded-lg border p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label
                                    htmlFor="product_id"
                                    className="text-sm font-medium"
                                >
                                    Product
                                </label>

                                <select
                                    id="product_id"
                                    value={data.product_id}
                                    onChange={(event) =>
                                        setData(
                                            'product_id',
                                            event.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    <option value="">
                                        Select product
                                    </option>

                                    {products.map((product) => (
                                        <option
                                            key={product.id}
                                            value={product.id}
                                        >
                                            {product.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.product_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.product_id}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="variant_name"
                                    className="text-sm font-medium"
                                >
                                    Variant Name
                                </label>

                                <input
                                    id="variant_name"
                                    type="text"
                                    value={data.variant_name}
                                    onChange={(event) =>
                                        setData(
                                            'variant_name',
                                            event.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                    placeholder="e.g. 16GB RAM"
                                />

                                {errors.variant_name && (
                                    <p className="text-sm text-red-600">
                                        {errors.variant_name}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label
                                    htmlFor="sku"
                                    className="text-sm font-medium"
                                >
                                    SKU
                                </label>

                                <input
                                    id="sku"
                                    type="text"
                                    value={data.sku}
                                    onChange={(event) =>
                                        setData('sku', event.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                    placeholder="e.g. LAP-001"
                                />

                                {errors.sku && (
                                    <p className="text-sm text-red-600">
                                        {errors.sku}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="barcode"
                                    className="text-sm font-medium"
                                >
                                    Barcode
                                </label>

                                <input
                                    id="barcode"
                                    type="text"
                                    value={data.barcode}
                                    onChange={(event) =>
                                        setData('barcode', event.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                    placeholder="Optional barcode"
                                />

                                {errors.barcode && (
                                    <p className="text-sm text-red-600">
                                        {errors.barcode}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label
                                    htmlFor="cost_price"
                                    className="text-sm font-medium"
                                >
                                    Cost Price
                                </label>

                                <input
                                    id="cost_price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.cost_price}
                                    onChange={(event) =>
                                        setData(
                                            'cost_price',
                                            event.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                    placeholder="0.00"
                                />

                                {errors.cost_price && (
                                    <p className="text-sm text-red-600">
                                        {errors.cost_price}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="tax_type"
                                    className="text-sm font-medium"
                                >
                                    Tax Type
                                </label>

                                <select
                                    id="tax_type"
                                    value={data.tax_type}
                                    onChange={(event) =>
                                        setData(
                                            'tax_type',
                                            event.target.value as ProductVariantForm['tax_type'],
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    <option value="vatable">Vatable</option>
                                    <option value="vat_exempt">
                                        VAT Exempt
                                    </option>
                                    <option value="zero_rated">
                                        Zero Rated
                                    </option>
                                </select>

                                {errors.tax_type && (
                                    <p className="text-sm text-red-600">
                                        {errors.tax_type}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="rounded-lg border p-4">
                            <h2 className="mb-4 text-sm font-semibold">
                                Base Unit
                            </h2>

                            <div className="space-y-2">
                                <label
                                    htmlFor="base_uom_id"
                                    className="text-sm font-medium"
                                >
                                    Base UOM
                                </label>

                                <select
                                    id="base_uom_id"
                                    value={data.base_uom_id}
                                    onChange={(event) =>
                                        setData(
                                            'base_uom_id',
                                            event.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    <option value="">
                                        Select base UOM
                                    </option>

                                    {uoms.map((uom) => (
                                        <option
                                            key={uom.id}
                                            value={uom.id}
                                        >
                                            {uom.code}
                                            {uom.description
                                                ? ` — ${uom.description}`
                                                : ''}
                                        </option>
                                    ))}
                                </select>

                                {errors.base_uom_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.base_uom_id}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="rounded-lg border p-4">
                            <h2 className="mb-4 text-sm font-semibold">
                                Selling Unit
                            </h2>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="selling_uom_id"
                                        className="text-sm font-medium"
                                    >
                                        Selling UOM
                                    </label>

                                    <select
                                        id="selling_uom_id"
                                        value={data.selling_uom_id}
                                        onChange={(event) =>
                                            setData(
                                                'selling_uom_id',
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border px-3 py-2"
                                    >
                                        <option value="">
                                            Select selling UOM
                                        </option>

                                        {uoms.map((uom) => (
                                            <option
                                                key={uom.id}
                                                value={uom.id}
                                            >
                                                {uom.code}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.selling_uom_id && (
                                        <p className="text-sm text-red-600">
                                            {errors.selling_uom_id}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="selling_qty"
                                        className="text-sm font-medium"
                                    >
                                        Selling Quantity
                                    </label>

                                    <input
                                        id="selling_qty"
                                        type="number"
                                        step="0.001"
                                        min="0.001"
                                        value={data.selling_qty}
                                        onChange={(event) =>
                                            setData(
                                                'selling_qty',
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border px-3 py-2"
                                    />

                                    {errors.selling_qty && (
                                        <p className="text-sm text-red-600">
                                            {errors.selling_qty}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border p-4">
                            <h2 className="mb-4 text-sm font-semibold">
                                Purchasing Unit
                            </h2>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="purchasing_uom_id"
                                        className="text-sm font-medium"
                                    >
                                        Purchasing UOM
                                    </label>

                                    <select
                                        id="purchasing_uom_id"
                                        value={data.purchasing_uom_id}
                                        onChange={(event) =>
                                            setData(
                                                'purchasing_uom_id',
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border px-3 py-2"
                                    >
                                        <option value="">
                                            Select purchasing UOM
                                        </option>

                                        {uoms.map((uom) => (
                                            <option
                                                key={uom.id}
                                                value={uom.id}
                                            >
                                                {uom.code}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.purchasing_uom_id && (
                                        <p className="text-sm text-red-600">
                                            {errors.purchasing_uom_id}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="purchasing_qty"
                                        className="text-sm font-medium"
                                    >
                                        Purchasing Quantity
                                    </label>

                                    <input
                                        id="purchasing_qty"
                                        type="number"
                                        step="0.001"
                                        min="0.001"
                                        value={data.purchasing_qty}
                                        onChange={(event) =>
                                            setData(
                                                'purchasing_qty',
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border px-3 py-2"
                                    />

                                    {errors.purchasing_qty && (
                                        <p className="text-sm text-red-600">
                                            {errors.purchasing_qty}
                                        </p>
                                    )}
                                </div>
                            </div>
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
                                    : 'Save Variant'}
                            </button>

                            <Link
                                href="/admin/product-variants"
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