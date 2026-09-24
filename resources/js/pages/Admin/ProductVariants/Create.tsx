import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler, useState  } from 'react';


interface Product {
    id: number;
    name: string;
}

interface Uom {
    id: number;
    code: string;
    description: string | null;
}

interface Warehouse {
    id: number;
    warehouse_code: string;
    name: string;
}

interface PriceList {
    id: number;
    code: string;
    description: string | null;
}

interface Props {
    product: Product;
    uoms: Uom[];
    warehouses: Warehouse[];
    priceLists: PriceList[];
}

interface ProductVariantForm {
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

    prices: {
        price_list_id: string;
        price: string;
    }[];

    inventories: {
        warehouse_id: string;
        quantity_on_hand: string;
        reorder_level: string;
    }[];

    remarks: string;
    is_active: boolean;

    images: File[];
}

export default function Create({
    product,
    uoms,
    warehouses,
    priceLists,
}: Props) {
    const { data, setData, post, processing, errors } =
        useForm<ProductVariantForm>({
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

            prices: priceLists.map((priceList) => ({
                price_list_id: String(priceList.id),
                price: '',
            })),

            inventories: warehouses.map((warehouse) => ({
                warehouse_id: String(warehouse.id),
                quantity_on_hand: '0',
                reorder_level: '0',
            })),

            remarks: '',
            is_active: true,
            images: [],
        });

        {/** add image */}
        const [imageFiles, setImageFiles] = useState<File[]>([]);
        const [imagePreviews, setImagePreviews] = useState<string[]>([]);

        const handleImageChange = (
            event: ChangeEvent<HTMLInputElement>,
        ) => {
            const files = Array.from(event.target.files ?? []);

            setImageFiles(files);

            setImagePreviews(
                files.map((file) => URL.createObjectURL(file)),
            );

            setData('images', files);
        };

        const removeImage = (index: number) => {
            setImageFiles((current) => {
                const updatedFiles = current.filter(
                    (_, fileIndex) => fileIndex !== index,
                );

                setData('images', updatedFiles);

                return updatedFiles;
            });

            setImagePreviews((current) =>
                current.filter(
                    (_, previewIndex) => previewIndex !== index,
                ),
            );
        };

        {/** submit */}
   const submit: FormEventHandler = (event) => {
        event.preventDefault();

        post(`/admin/products/${product.id}/variants`, {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Create Product Variant" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Create Product Variant
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Add a variant, initial price, and initial warehouse
                        inventory.
                    </p>
                </div>

                 <div className="w-full max-w-4xl self-center rounded-lg border p-6">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Product Information */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Product
                                </label>

                                <div className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
                                    {product.name}
                                </div>
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

                        {/* SKU / Barcode */}
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
                                        setData(
                                            'barcode',
                                            event.target.value,
                                        )
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

                        {/* Cost / Tax */}
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
                                    <option value="vatable">
                                        Vatable
                                    </option>
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

                        {/* Variant Images */}
                        <div className="rounded-lg border p-4">
                            <h2 className="mb-1 text-sm font-semibold">
                                Variant Images
                            </h2>

                            <p className="mb-4 text-sm text-muted-foreground">
                                Upload one or more images for this product variant.
                            </p>

                            <div className="space-y-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                />

                                {imagePreviews.length > 0 && (
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                        {imagePreviews.map((preview, index) => (
                                            <div
                                                key={preview}
                                                className="relative overflow-hidden rounded-md border"
                                            >
                                                <img
                                                    src={preview}
                                                    alt={`Variant preview ${index + 1}`}
                                                    className="aspect-square w-full object-cover"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute right-2 top-2 rounded-md bg-black/70 px-2 py-1 text-xs text-white hover:bg-black/80"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Base Unit */}
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

                        {/* Selling Unit */}
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

                        {/* Purchasing Unit */}
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

                        {/* Pricing */}
                        <div className="rounded-lg border p-4">
                            <h2 className="mb-1 text-sm font-semibold">
                                Initial Pricing
                            </h2>

                            <p className="mb-4 text-sm text-muted-foreground">
                                Set the initial price for each active price list.
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="px-3 py-2 font-medium">
                                                Price List
                                            </th>
                                            <th className="px-3 py-2 font-medium">
                                                Description
                                            </th>
                                            <th className="w-48 px-3 py-2 font-medium">
                                                Price
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {priceLists.map((priceList, index) => (
                                            <tr
                                                key={priceList.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="px-3 py-3 font-medium">
                                                    {priceList.code}
                                                </td>

                                                <td className="px-3 py-3 text-muted-foreground">
                                                    {priceList.description || '—'}
                                                </td>

                                                <td className="px-3 py-3">
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        value={data.prices[index]?.price ?? ''}
                                                        onChange={(event) => {
                                                            const prices = [...data.prices];

                                                            prices[index] = {
                                                                ...prices[index],
                                                                price: event.target.value,
                                                            };

                                                            setData('prices', prices);
                                                        }}
                                                        className="w-full rounded-md border px-3 py-2"
                                                        placeholder="0.00"
                                                    />

                                                    {errors[
                                                        `prices.${index}.price` as keyof typeof errors
                                                    ] && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {
                                                                errors[
                                                                    `prices.${index}.price` as keyof typeof errors
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Initial Inventory */}
                        <div className="rounded-lg border p-4">
                            <h2 className="mb-1 text-sm font-semibold">
                                Initial Inventory
                            </h2>

                            <p className="mb-4 text-sm text-muted-foreground">
                                Set the opening stock and reorder level for each active warehouse.
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="px-3 py-2 font-medium">
                                                Warehouse
                                            </th>
                                            <th className="w-48 px-3 py-2 font-medium">
                                                Initial Quantity
                                            </th>
                                            <th className="w-48 px-3 py-2 font-medium">
                                                Reorder Level
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {warehouses.map((warehouse, index) => (
                                            <tr
                                                key={warehouse.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="px-3 py-3 font-medium">
                                                    {warehouse.warehouse_code} — {warehouse.name}
                                                </td>

                                                <td className="px-3 py-3">
                                                    <input
                                                        type="number"
                                                        step="0.001"
                                                        min="0"
                                                        value={
                                                            data.inventories[index]
                                                                ?.quantity_on_hand ?? '0'
                                                        }
                                                        onChange={(event) => {
                                                            const inventories = [
                                                                ...data.inventories,
                                                            ];

                                                            inventories[index] = {
                                                                ...inventories[index],
                                                                quantity_on_hand:
                                                                    event.target.value,
                                                            };

                                                            setData('inventories', inventories);
                                                        }}
                                                        className="w-full rounded-md border px-3 py-2"
                                                        placeholder="0.000"
                                                    />

                                                    {errors[
                                                        `inventories.${index}.quantity_on_hand` as keyof typeof errors
                                                    ] && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {
                                                                errors[
                                                                    `inventories.${index}.quantity_on_hand` as keyof typeof errors
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </td>

                                                <td className="px-3 py-3">
                                                    <input
                                                        type="number"
                                                        step="0.001"
                                                        min="0"
                                                        value={
                                                            data.inventories[index]
                                                                ?.reorder_level ?? '0'
                                                        }
                                                        onChange={(event) => {
                                                            const inventories = [
                                                                ...data.inventories,
                                                            ];

                                                            inventories[index] = {
                                                                ...inventories[index],
                                                                reorder_level:
                                                                    event.target.value,
                                                            };

                                                            setData('inventories', inventories);
                                                        }}
                                                        className="w-full rounded-md border px-3 py-2"
                                                        placeholder="0.000"
                                                    />

                                                    {errors[
                                                        `inventories.${index}.reorder_level` as keyof typeof errors
                                                    ] && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {
                                                                errors[
                                                                    `inventories.${index}.reorder_level` as keyof typeof errors
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Remarks */}
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

                        {/* Active */}
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

                        {/* Actions */}
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
                                href={`/admin/products/${product.id}/details`}
                                className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}