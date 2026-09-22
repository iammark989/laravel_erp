import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';

type Supplier = {
    id: number;
    supplier_code: string;
    name: string;
};

type Warehouse = {
    id: number;
    warehouse_code: string;
    name: string;
};

type ProductVariant = {
    id: number;
    sku: string;
    variant_name: string;
    product?: {
        id: number;
        name: string;
    };
};

type Uom = {
    id: number;
    code: string;
};

type PurchaseOrderItem = {
    product_variant_id: string;
    purchase_uom_id: string;
    quantity: string;
    cost_price: string;
    amount: string;
    conversion_qty: string;
    tax_type: 'vatable' | 'vat_exempt' | 'zero_rated';
    remarks: string;
};

type PurchaseOrderForm = {
    po_number: string;
    supplier_id: string;
    warehouse_id: string;
    order_date: string;
    expected_delivery: string;
    payment_terms: 'cash' | 'cod' | 'net15' | 'net30';
    supplier_quotation_no: string;
    reference_number: string;
    discount: string;
    tax: string;
    remarks: string;
    status:
        | 'draft'
        | 'submitted'
        | 'completed'
        | 'cancelled'
        | 'partially_received';
    items: PurchaseOrderItem[];
};

type Props = {
    suppliers: Supplier[];
    warehouses: Warehouse[];
    productVariants: ProductVariant[];
    uoms: Uom[];
};

const createItem = (): PurchaseOrderItem => ({
    product_variant_id: '',
    purchase_uom_id: '',
    quantity: '',
    cost_price: '',
    amount: '0',
    conversion_qty: '',
    tax_type: 'vatable',
    remarks: '',
});

export default function Create({
    suppliers,
    warehouses,
    productVariants,
    uoms,
}: Props) {
    const { data, setData, post, processing, errors } =
        useForm<PurchaseOrderForm>({
            po_number: '',
            supplier_id: '',
            warehouse_id: '',
            order_date: new Date().toISOString().split('T')[0],
            expected_delivery: '',
            payment_terms: 'cash',
            supplier_quotation_no: '',
            reference_number: '',
            discount: '0',
            tax: '0',
            remarks: '',
            status: 'draft',
            items: [createItem()],
        });

    const addItem = () => {
        setData('items', [...data.items, createItem()]);
    };

    const removeItem = (index: number) => {
        if (data.items.length === 1) {
            return;
        }

        setData(
            'items',
            data.items.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const updateItem = (
        index: number,
        field: keyof PurchaseOrderItem,
        value: string,
    ) => {
        const items = [...data.items];

        items[index] = {
            ...items[index],
            [field]: value,
        };

        if (field === 'quantity' || field === 'cost_price') {
            const quantity = Number(items[index].quantity) || 0;
            const costPrice = Number(items[index].cost_price) || 0;

            items[index].amount = (quantity * costPrice).toFixed(2);
        }

        setData('items', items);
    };

    const subtotal = data.items.reduce(
        (total, item) => total + (Number(item.amount) || 0),
        0,
    );

    const discount = Number(data.discount) || 0;
    const tax = Number(data.tax) || 0;

    const grandTotal = Math.max(subtotal - discount + tax, 0);

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        console.log('SUBMIT FIRED');
        console.log('FORM DATA:', data);

        post('/admin/purchase-orders', {
                onStart: () => {
                    console.log('POST STARTED');
                },
                onSuccess: (page) => {
                    console.log('POST SUCCESS', page);
                },
                onError: (errors) => {
                    console.log('POST VALIDATION ERRORS', errors);
                },
                onFinish: () => {
                    console.log('POST FINISHED');
                },
        });
    };

    return (
        <AppLayout>
            <Head title="Create Purchase Order" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/purchase-orders"
                        className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Link>

                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create Purchase Order
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Create a purchase order for a supplier.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Header */}
                    <div className="rounded-xl border bg-card p-6">
                        <h2 className="mb-4 text-lg font-semibold">
                            Purchase Order Details
                        </h2>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="space-y-2">
                                <label
                                    htmlFor="po_number"
                                    className="text-sm font-medium"
                                >
                                    PO Number
                                </label>

                                <input
                                    id="po_number"
                                    type="text"
                                    value={data.po_number}
                                    onChange={(e) =>
                                        setData('po_number', e.target.value)
                                    }
                                    placeholder="PO-0001"
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                                />

                                {errors.po_number && (
                                    <p className="text-sm text-destructive">
                                        {errors.po_number}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="supplier_id"
                                    className="text-sm font-medium"
                                >
                                    Supplier
                                </label>

                                <select
                                    id="supplier_id"
                                    value={data.supplier_id}
                                    onChange={(e) =>
                                        setData(
                                            'supplier_id',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                                >
                                    <option value="">
                                        Select supplier
                                    </option>

                                    {suppliers.map((supplier) => (
                                        <option
                                            key={supplier.id}
                                            value={supplier.id}
                                        >
                                            {supplier.supplier_code} -{' '}
                                            {supplier.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.supplier_id && (
                                    <p className="text-sm text-destructive">
                                        {errors.supplier_id}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="warehouse_id"
                                    className="text-sm font-medium"
                                >
                                    Warehouse
                                </label>

                                <select
                                    id="warehouse_id"
                                    value={data.warehouse_id}
                                    onChange={(e) =>
                                        setData(
                                            'warehouse_id',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                                >
                                    <option value="">
                                        Select warehouse
                                    </option>

                                    {warehouses.map((warehouse) => (
                                        <option
                                            key={warehouse.id}
                                            value={warehouse.id}
                                        >
                                            {warehouse.warehouse_code} -{' '}
                                            {warehouse.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.warehouse_id && (
                                    <p className="text-sm text-destructive">
                                        {errors.warehouse_id}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="order_date"
                                    className="text-sm font-medium"
                                >
                                    Order Date
                                </label>

                                <input
                                    id="order_date"
                                    type="date"
                                    value={data.order_date}
                                    onChange={(e) =>
                                        setData('order_date', e.target.value)
                                    }
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                                />

                                {errors.order_date && (
                                    <p className="text-sm text-destructive">
                                        {errors.order_date}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="expected_delivery"
                                    className="text-sm font-medium"
                                >
                                    Expected Delivery
                                </label>

                                <input
                                    id="expected_delivery"
                                    type="date"
                                    value={data.expected_delivery}
                                    onChange={(e) =>
                                        setData(
                                            'expected_delivery',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                                />

                                {errors.expected_delivery && (
                                    <p className="text-sm text-destructive">
                                        {errors.expected_delivery}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="payment_terms"
                                    className="text-sm font-medium"
                                >
                                    Payment Terms
                                </label>

                                <select
                                    id="payment_terms"
                                    value={data.payment_terms}
                                    onChange={(e) =>
                                        setData(
                                            'payment_terms',
                                            e.target.value as PurchaseOrderForm['payment_terms'],
                                        )
                                    }
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                                >
                                    <option value="cash">Cash</option>
                                    <option value="cod">COD</option>
                                    <option value="net15">Net 15</option>
                                    <option value="net30">Net 30</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="supplier_quotation_no"
                                    className="text-sm font-medium"
                                >
                                    Supplier Quotation No.
                                </label>

                                <input
                                    id="supplier_quotation_no"
                                    type="text"
                                    value={data.supplier_quotation_no}
                                    onChange={(e) =>
                                        setData(
                                            'supplier_quotation_no',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="reference_number"
                                    className="text-sm font-medium"
                                >
                                    Reference Number
                                </label>

                                <input
                                    id="reference_number"
                                    type="text"
                                    value={data.reference_number}
                                    onChange={(e) =>
                                        setData(
                                            'reference_number',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="status"
                                    className="text-sm font-medium"
                                >
                                    Status
                                </label>

                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData(
                                            'status',
                                            e.target.value as PurchaseOrderForm['status'],
                                        )
                                    }
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="submitted">
                                        Submitted
                                    </option>
                                    <option value="completed">
                                        Completed
                                    </option>
                                    <option value="cancelled">
                                        Cancelled
                                    </option>
                                    <option value="partially_received">
                                        Partially Received
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="rounded-xl border bg-card p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Purchase Order Items
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Add the products and quantities being
                                    ordered.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={addItem}
                                className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
                            >
                                <Plus className="h-4 w-4" />
                                Add Item
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-300 text-sm">
                                <thead className="border-b bg-muted/50">
                                    <tr>
                                        <th className="px-3 py-3 text-left font-medium">
                                            Product Variant
                                        </th>

                                        <th className="px-3 py-3 text-left font-medium">
                                            Purchase UOM
                                        </th>

                                        <th className="px-3 py-3 text-right font-medium">
                                            Quantity
                                        </th>

                                        <th className="px-3 py-3 text-right font-medium">
                                            Cost Price
                                        </th>

                                        <th className="px-3 py-3 text-right font-medium">
                                            Amount
                                        </th>

                                        <th className="px-3 py-3 text-right font-medium">
                                            Conversion Qty
                                        </th>

                                        <th className="px-3 py-3 text-left font-medium">
                                            Tax Type
                                        </th>

                                        <th className="px-3 py-3 text-right font-medium">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y">
                                    {data.items.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-3 py-3">
                                                <select
                                                    value={
                                                        item.product_variant_id
                                                    }
                                                    onChange={(e) =>
                                                        updateItem(
                                                            index,
                                                            'product_variant_id',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full min-w-30 rounded-md border bg-background px-3 py-2 text-sm"
                                                >
                                                    <option value="">
                                                        Select variant
                                                    </option>

                                                    {productVariants.map(
                                                        (variant) => (
                                                            <option
                                                                key={variant.id}
                                                                value={
                                                                    variant.id
                                                                }
                                                            >
                                                                {variant.sku} -{' '}
                                                                {
                                                                    variant.variant_name
                                                                }
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </td>

                                            <td className="px-3 py-3">
                                                <select
                                                    value={
                                                        item.purchase_uom_id
                                                    }
                                                    onChange={(e) =>
                                                        updateItem(
                                                            index,
                                                            'purchase_uom_id',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full min-w-30 rounded-md border bg-background px-3 py-2 text-sm"
                                                >
                                                    <option value="">
                                                        Select UOM
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
                                            </td>

                                            <td className="px-3 py-3">
                                                <input
                                                    type="number"
                                                    min="0.001"
                                                    step="0.001"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            index,
                                                            'quantity',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-28 rounded-md border bg-background px-3 py-2 text-right text-sm"
                                                />
                                            </td>

                                            <td className="px-3 py-3">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={item.cost_price}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            index,
                                                            'cost_price',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-32 rounded-md border bg-background px-3 py-2 text-right text-sm"
                                                />
                                            </td>

                                            <td className="px-3 py-3 text-right font-medium">
                                                ₱
                                                {Number(
                                                    item.amount || 0,
                                                ).toLocaleString('en-PH', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                            </td>

                                            <td className="px-3 py-3">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.001"
                                                    value={item.conversion_qty}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            index,
                                                            'conversion_qty',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-32 rounded-md border bg-background px-3 py-2 text-right text-sm"
                                                />
                                            </td>

                                            <td className="px-3 py-3">
                                                <select
                                                    value={item.tax_type}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            index,
                                                            'tax_type',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-36 rounded-md border bg-background px-3 py-2 text-sm"
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
                                            </td>

                                            <td className="px-3 py-3 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeItem(index)
                                                    }
                                                    disabled={
                                                        data.items.length === 1
                                                    }
                                                    className="inline-flex items-center rounded-md border border-destructive/30 p-2 text-destructive hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-40"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {errors.items && (
                            <p className="mt-3 text-sm text-destructive">
                                {errors.items}
                            </p>
                        )}
                    </div>

                    {/* Totals */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-xl border bg-card p-6">
                            <div className="space-y-2">
                                <label
                                    htmlFor="remarks"
                                    className="text-sm font-medium"
                                >
                                    Remarks
                                </label>

                                <textarea
                                    id="remarks"
                                    rows={5}
                                    value={data.remarks}
                                    onChange={(e) =>
                                        setData('remarks', e.target.value)
                                    }
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                        </div>

                        <div className="rounded-xl border bg-card p-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Subtotal
                                    </span>

                                    <span className="font-medium">
                                        ₱
                                        {subtotal.toLocaleString('en-PH', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <label
                                        htmlFor="discount"
                                        className="text-sm text-muted-foreground"
                                    >
                                        Discount
                                    </label>

                                    <input
                                        id="discount"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.discount}
                                        onChange={(e) =>
                                            setData(
                                                'discount',
                                                e.target.value,
                                            )
                                        }
                                        className="w-40 rounded-md border bg-background px-3 py-2 text-right text-sm"
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <label
                                        htmlFor="tax"
                                        className="text-sm text-muted-foreground"
                                    >
                                        Tax
                                    </label>

                                    <input
                                        id="tax"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.tax}
                                        onChange={(e) =>
                                            setData('tax', e.target.value)
                                        }
                                        className="w-40 rounded-md border bg-background px-3 py-2 text-right text-sm"
                                    />
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">
                                            Grand Total
                                        </span>

                                        <span className="text-lg font-bold">
                                            ₱
                                            {grandTotal.toLocaleString('en-PH', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Link
                            href="/admin/purchase-orders"
                            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Purchase Order'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}