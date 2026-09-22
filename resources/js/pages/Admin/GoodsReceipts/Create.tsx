import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';

interface Product {
    id: number;
    name: string;
}

interface ProductVariant {
    id: number;
    product_id: number;
    sku: string;
    variant_name: string;
    product?: Product;
}

interface Uom {
    id: number;
    code: string;
    description: string | null;
}

interface PurchaseOrderItem {
    id: number;
    product_variant_id: number;
    purchase_uom_id: number;
    quantity: string | number;
    cost_price: string | number;
    received_qty: string | number;
    conversion_qty: string | number;
    productVariant: ProductVariant;
    purchaseUom: Uom;
}

interface Supplier {
    id: number;
    name: string;
}

interface Warehouse {
    id: number;
    name: string;
}

interface PurchaseOrder {
    id: number;
    po_number: string;
    supplier_id: number;
    warehouse_id: number;
    supplier: Supplier;
    warehouse: Warehouse;
    items: PurchaseOrderItem[];
}

interface GoodsReceiptItem {
    purchase_order_item_id: number;
    product_variant_id: number;
    received_qty: string;
    cost_price: string;
    remarks: string;
}

interface GoodsReceiptForm {
    gr_number: string;
    purchase_order_id: string;
    supplier_id: string;
    warehouse_id: string;
    received_date: string;
    reference_number: string;
    remarks: string;
    status: 'draft' | 'posted' | 'cancelled';
    items: GoodsReceiptItem[];
}

interface Props {
    purchaseOrders: PurchaseOrder[];
    suppliers: Supplier[];
    warehouses: Warehouse[];
}

export default function Create({
    purchaseOrders,
}: Props) {
    const today = new Date().toISOString().split('T')[0];

    const { data, setData, post, processing, errors } =
        useForm<GoodsReceiptForm>({
            gr_number: '',
            purchase_order_id: '',
            supplier_id: '',
            warehouse_id: '',
            received_date: today,
            reference_number: '',
            remarks: '',
            status: 'draft',
            items: [],
        });

    const [selectedPurchaseOrder, setSelectedPurchaseOrder] =
        useState<PurchaseOrder | null>(null);

    useEffect(() => {
        if (!data.purchase_order_id) {
            setSelectedPurchaseOrder(null);

            setData((current) => ({
                ...current,
                supplier_id: '',
                warehouse_id: '',
                items: [],
            }));

            return;
        }

        const purchaseOrder = purchaseOrders.find(
            (po) => po.id === Number(data.purchase_order_id),
        );

        if (!purchaseOrder) {
            return;
        }

        setSelectedPurchaseOrder(purchaseOrder);

        setData((current) => ({
            ...current,
            supplier_id: String(purchaseOrder.supplier_id),
            warehouse_id: String(purchaseOrder.warehouse_id),
            items: purchaseOrder.items
                .map((item) => {
                    const orderedQty = Number(item.quantity) || 0;
                    const receivedQty = Number(item.received_qty) || 0;
                    const remainingQty = Math.max(
                        orderedQty - receivedQty,
                        0,
                    );

                    return {
                        purchase_order_item_id: item.id,
                        product_variant_id: item.product_variant_id,
                        received_qty:
                            remainingQty > 0
                                ? String(remainingQty)
                                : '',
                        cost_price: String(item.cost_price),
                        remarks: '',
                    };
                })
                .filter((item) => item.received_qty !== ''),
        }));
    }, [data.purchase_order_id]);

    const updateItem = (
        index: number,
        field: keyof GoodsReceiptItem,
        value: string,
    ) => {
        const updatedItems = [...data.items];

        updatedItems[index] = {
            ...updatedItems[index],
            [field]: value,
        };

        setData('items', updatedItems);
    };

    const removeItem = (index: number) => {
        const updatedItems = data.items.filter(
            (_, itemIndex) => itemIndex !== index,
        );

        setData('items', updatedItems);
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();

        post('/admin/goods-receipts');
    };

    return (
        <>
            <Head title="Create Goods Receipt" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Create Goods Receipt
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Record items received from a purchase order.
                        </p>
                    </div>

                    <Link
                        href="/admin/goods-receipts"
                        className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                    >
                        Back
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Header */}
                    <div className="rounded-lg border bg-background p-6">
                        <h2 className="mb-4 text-lg font-semibold">
                            Goods Receipt Details
                        </h2>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    GR Number
                                </label>

                                <input
                                    type="text"
                                    value={data.gr_number}
                                    onChange={(e) =>
                                        setData(
                                            'gr_number',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                    placeholder="GR-0001"
                                />

                                {errors.gr_number && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.gr_number}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Purchase Order
                                </label>

                                <select
                                    value={data.purchase_order_id}
                                    onChange={(e) =>
                                        setData(
                                            'purchase_order_id',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                >
                                    <option value="">
                                        Select Purchase Order
                                    </option>

                                    {purchaseOrders.map((po) => (
                                        <option
                                            key={po.id}
                                            value={po.id}
                                        >
                                            {po.po_number}
                                        </option>
                                    ))}
                                </select>

                                {errors.purchase_order_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.purchase_order_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Supplier
                                </label>

                                <input
                                    type="text"
                                    value={
                                        selectedPurchaseOrder?.supplier
                                            ?.name ?? ''
                                    }
                                    readOnly
                                    className="w-full rounded-md border bg-muted px-3 py-2 text-sm"
                                    placeholder="Select a purchase order"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Warehouse
                                </label>

                                <input
                                    type="text"
                                    value={
                                        selectedPurchaseOrder?.warehouse
                                            ?.name ?? ''
                                    }
                                    readOnly
                                    className="w-full rounded-md border bg-muted px-3 py-2 text-sm"
                                    placeholder="Select a purchase order"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Received Date
                                </label>

                                <input
                                    type="date"
                                    value={data.received_date}
                                    onChange={(e) =>
                                        setData(
                                            'received_date',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                />

                                {errors.received_date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.received_date}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Reference Number
                                </label>

                                <input
                                    type="text"
                                    value={data.reference_number}
                                    onChange={(e) =>
                                        setData(
                                            'reference_number',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                    placeholder="Supplier DR / Invoice No."
                                />

                                {errors.reference_number && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.reference_number}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Status
                                </label>

                                <select
                                    value={data.status}
                                    onChange={(e) =>
                                        setData(
                                            'status',
                                            e.target.value as GoodsReceiptForm['status'],
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="posted">Posted</option>
                                    <option value="cancelled">
                                        Cancelled
                                    </option>
                                </select>

                                {errors.status && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.status}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="mb-1 block text-sm font-medium">
                                Remarks
                            </label>

                            <textarea
                                value={data.remarks}
                                onChange={(e) =>
                                    setData('remarks', e.target.value)
                                }
                                rows={3}
                                className="w-full rounded-md border px-3 py-2 text-sm"
                            />

                            {errors.remarks && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.remarks}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Items */}
                    <div className="rounded-lg border bg-background p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Items to Receive
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Select a purchase order to load its
                                    remaining items.
                                </p>
                            </div>
                        </div>

                        {!data.purchase_order_id ? (
                            <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
                                Please select a purchase order first.
                            </div>
                        ) : data.items.length === 0 ? (
                            <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
                                No remaining items available to receive.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b bg-muted/50">
                                        <tr>
                                            <th className="px-3 py-3 text-left font-medium">
                                                Product
                                            </th>

                                            <th className="px-3 py-3 text-left font-medium">
                                                SKU
                                            </th>

                                            <th className="px-3 py-3 text-left font-medium">
                                                UOM
                                            </th>

                                            <th className="px-3 py-3 text-right font-medium">
                                                Ordered
                                            </th>

                                            <th className="px-3 py-3 text-right font-medium">
                                                Previously Received
                                            </th>

                                            <th className="px-3 py-3 text-right font-medium">
                                                Receive
                                            </th>

                                            <th className="px-3 py-3 text-right font-medium">
                                                Cost
                                            </th>

                                            <th className="px-3 py-3 text-left font-medium">
                                                Remarks
                                            </th>

                                            <th className="px-3 py-3 text-right font-medium">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y">
                                        {data.items.map((item, index) => {
                                            const poItem =
                                                selectedPurchaseOrder?.items.find(
                                                    (poItem) =>
                                                        poItem.id ===
                                                        item.purchase_order_item_id,
                                                );

                                            if (!poItem) {
                                                return null;
                                            }

                                            return (
                                                <tr key={item.purchase_order_item_id}>
                                                    <td className="px-3 py-3">
                                                        <div className="font-medium">
                                                            {poItem
                                                                .productVariant
                                                                ?.product
                                                                ?.name ?? '-'}
                                                        </div>

                                                        <div className="text-xs text-muted-foreground">
                                                            {poItem
                                                                .productVariant
                                                                ?.variant_name ??
                                                                '-'}
                                                        </div>
                                                    </td>

                                                    <td className="px-3 py-3">
                                                        {poItem.productVariant
                                                            ?.sku ?? '-'}
                                                    </td>

                                                    <td className="px-3 py-3">
                                                        {poItem.purchaseUom
                                                            ?.code ?? '-'}
                                                    </td>

                                                    <td className="px-3 py-3 text-right">
                                                        {poItem.quantity}
                                                    </td>

                                                    <td className="px-3 py-3 text-right">
                                                        {poItem.received_qty}
                                                    </td>

                                                    <td className="px-3 py-3">
                                                        <input
                                                            type="number"
                                                            min="0.001"
                                                            step="0.001"
                                                            value={
                                                                item.received_qty
                                                            }
                                                            onChange={(e) =>
                                                                updateItem(
                                                                    index,
                                                                    'received_qty',
                                                                    e.target.value,
                                                                )
                                                            }
                                                            className="w-28 rounded-md border px-3 py-2 text-right text-sm"
                                                        />

                                                        {errors[
                                                            `items.${index}.received_qty` as keyof typeof errors
                                                        ] && (
                                                            <p className="mt-1 text-xs text-red-600">
                                                                {
                                                                    errors[
                                                                        `items.${index}.received_qty` as keyof typeof errors
                                                                    ]
                                                                }
                                                            </p>
                                                        )}
                                                    </td>

                                                    <td className="px-3 py-3">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            step="0.01"
                                                            value={
                                                                item.cost_price
                                                            }
                                                            onChange={(e) =>
                                                                updateItem(
                                                                    index,
                                                                    'cost_price',
                                                                    e.target.value,
                                                                )
                                                            }
                                                            className="w-28 rounded-md border px-3 py-2 text-right text-sm"
                                                        />
                                                    </td>

                                                    <td className="px-3 py-3">
                                                        <input
                                                            type="text"
                                                            value={
                                                                item.remarks
                                                            }
                                                            onChange={(e) =>
                                                                updateItem(
                                                                    index,
                                                                    'remarks',
                                                                    e.target.value,
                                                                )
                                                            }
                                                            className="w-40 rounded-md border px-3 py-2 text-sm"
                                                        />
                                                    </td>

                                                    <td className="px-3 py-3 text-right">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeItem(
                                                                    index,
                                                                )
                                                            }
                                                            className="text-sm font-medium text-red-600 hover:underline"
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {errors.items && (
                            <p className="mt-3 text-sm text-red-600">
                                {errors.items}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3">
                        <Link
                            href="/admin/goods-receipts"
                            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing
                                ? 'Saving...'
                                : 'Save Goods Receipt'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}