import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

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
    id: number;
    purchase_order_item_id: number;
    product_variant_id: number;
    received_qty: string | number;
    cost_price: string | number;
    remarks: string | null;
}

interface GoodsReceipt {
    id: number;
    gr_number: string;
    purchase_order_id: number;
    supplier_id: number;
    warehouse_id: number;
    received_date: string;
    reference_number: string | null;
    remarks: string | null;
    status: 'draft' | 'posted' | 'cancelled';
    items: GoodsReceiptItem[];
    purchase_order: PurchaseOrder;
    supplier: Supplier;
    warehouse: Warehouse;
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
    items: GoodsReceiptItemForm[];
}

interface GoodsReceiptItemForm {
    purchase_order_item_id: number;
    product_variant_id: number;
    received_qty: string;
    cost_price: string;
    remarks: string;
}

interface Props {
    goodsReceipt: GoodsReceipt;
    purchaseOrders: PurchaseOrder[];
}

export default function Edit({
    goodsReceipt,
    purchaseOrders,
}: Props) {
    const { data, setData, put, processing, errors } =
        useForm<GoodsReceiptForm>({
            gr_number: goodsReceipt.gr_number,
            purchase_order_id: String(goodsReceipt.purchase_order_id),
            supplier_id: String(goodsReceipt.supplier_id),
            warehouse_id: String(goodsReceipt.warehouse_id),
            received_date: goodsReceipt.received_date,
            reference_number: goodsReceipt.reference_number ?? '',
            remarks: goodsReceipt.remarks ?? '',
            status: goodsReceipt.status,
            items: goodsReceipt.items.map((item) => ({
                purchase_order_item_id: item.purchase_order_item_id,
                product_variant_id: item.product_variant_id,
                received_qty: String(item.received_qty),
                cost_price: String(item.cost_price),
                remarks: item.remarks ?? '',
            })),
        });

    const selectedPurchaseOrder =
        purchaseOrders.find(
            (po) => po.id === Number(data.purchase_order_id),
        ) ?? null;

    const updateItem = (
        index: number,
        field: keyof GoodsReceiptItemForm,
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
        setData(
            'items',
            data.items.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();

        put(`/admin/goods-receipts/${goodsReceipt.id}`);
    };

    return (
        <>
            <Head title={`Edit ${goodsReceipt.gr_number}`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Edit Goods Receipt
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Update the goods receipt details and received
                            items.
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
                                    onChange={(e) => {
                                        const purchaseOrderId =
                                            e.target.value;

                                        setData(
                                            'purchase_order_id',
                                            purchaseOrderId,
                                        );

                                        const purchaseOrder =
                                            purchaseOrders.find(
                                                (po) =>
                                                    po.id ===
                                                    Number(purchaseOrderId),
                                            );

                                        if (purchaseOrder) {
                                            setData(
                                                'supplier_id',
                                                String(
                                                    purchaseOrder.supplier_id,
                                                ),
                                            );

                                            setData(
                                                'warehouse_id',
                                                String(
                                                    purchaseOrder.warehouse_id,
                                                ),
                                            );
                                        }
                                    }}
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
                                            ?.name ??
                                        goodsReceipt.supplier?.name ??
                                        ''
                                    }
                                    readOnly
                                    className="w-full rounded-md border bg-muted px-3 py-2 text-sm"
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
                                            ?.name ??
                                        goodsReceipt.warehouse?.name ??
                                        ''
                                    }
                                    readOnly
                                    className="w-full rounded-md border bg-muted px-3 py-2 text-sm"
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
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">
                                Received Items
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Update the quantities and receiving details.
                            </p>
                        </div>

                        {data.items.length === 0 ? (
                            <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
                                No items have been added to this goods
                                receipt.
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
                                                    (purchaseOrderItem) =>
                                                        purchaseOrderItem.id ===
                                                        item.purchase_order_item_id,
                                                );

                                            return (
                                                <tr
                                                    key={
                                                        item.purchase_order_item_id
                                                    }
                                                >
                                                    <td className="px-3 py-3">
                                                        <div className="font-medium">
                                                            {poItem
                                                                ?.productVariant
                                                                ?.product
                                                                ?.name ?? '-'}
                                                        </div>

                                                        <div className="text-xs text-muted-foreground">
                                                            {poItem
                                                                ?.productVariant
                                                                ?.variant_name ??
                                                                '-'}
                                                        </div>
                                                    </td>

                                                    <td className="px-3 py-3">
                                                        {poItem
                                                            ?.productVariant
                                                            ?.sku ?? '-'}
                                                    </td>

                                                    <td className="px-3 py-3">
                                                        {poItem?.purchaseUom
                                                            ?.code ?? '-'}
                                                    </td>

                                                    <td className="px-3 py-3 text-right">
                                                        {poItem?.quantity ?? '-'}
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
                                : 'Update Goods Receipt'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}