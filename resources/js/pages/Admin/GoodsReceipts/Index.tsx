import { Head, Link } from '@inertiajs/react';

interface PurchaseOrder {
    id: number;
    po_number: string;
}

interface Supplier {
    id: number;
    name: string;
}

interface Warehouse {
    id: number;
    name: string;
}

interface GoodsReceipt {
    id: number;
    gr_number: string;
    received_date: string;
    status: 'draft' | 'posted' | 'cancelled';
    reference_number: string | null;
    purchase_order: PurchaseOrder;
    supplier: Supplier;
    warehouse: Warehouse;
}

interface PaginatedGoodsReceipts {
    data: GoodsReceipt[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    goodsReceipts: PaginatedGoodsReceipts;
}

export default function Index({ goodsReceipts }: Props) {
    return (
        <>
            <Head title="Goods Receipts" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Goods Receipts
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Manage received items from purchase orders.
                        </p>
                    </div>

                    <Link
                        href="/admin/goods-receipts/create"
                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Add Goods Receipt
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg border bg-background">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b bg-muted/50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium">
                                        GR Number
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Purchase Order
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Supplier
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Warehouse
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Received Date
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Status
                                    </th>

                                    <th className="px-4 py-3 text-right font-medium">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {goodsReceipts.data.length > 0 ? (
                                    goodsReceipts.data.map((goodsReceipt) => (
                                        <tr
                                            key={goodsReceipt.id}
                                            className="hover:bg-muted/30"
                                        >
                                            <td className="px-4 py-3 font-medium">
                                                {goodsReceipt.gr_number}
                                            </td>

                                            <td className="px-4 py-3">
                                                {goodsReceipt.purchase_order
                                                    ?.po_number ?? '-'}
                                            </td>

                                            <td className="px-4 py-3">
                                                {goodsReceipt.supplier?.name ??
                                                    '-'}
                                            </td>

                                            <td className="px-4 py-3">
                                                {goodsReceipt.warehouse?.name ??
                                                    '-'}
                                            </td>

                                            <td className="px-4 py-3">
                                                {goodsReceipt.received_date}
                                            </td>

                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                        goodsReceipt.status ===
                                                        'posted'
                                                            ? 'bg-green-100 text-green-700'
                                                            : goodsReceipt.status ===
                                                                'cancelled'
                                                              ? 'bg-red-100 text-red-700'
                                                              : 'bg-yellow-100 text-yellow-700'
                                                    }`}
                                                >
                                                    {goodsReceipt.status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        goodsReceipt.status.slice(
                                                            1,
                                                        )}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3 text-right">
                                                {goodsReceipt.status === 'draft' ? (
                                                        <Link
                                                            href={`/admin/goods-receipts/${goodsReceipt.id}/edit`}
                                                            className="text-sm font-medium text-primary hover:underline"
                                                        >
                                                            Edit
                                                        </Link>
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">
                                                            Locked
                                                        </span>
                                                    )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-4 py-8 text-center text-muted-foreground"
                                        >
                                            No goods receipts found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {goodsReceipts.last_page > 1 && (
                        <div className="flex items-center justify-between border-t px-4 py-3">
                            <div className="text-sm text-muted-foreground">
                                Page {goodsReceipts.current_page} of{' '}
                                {goodsReceipts.last_page}
                            </div>

                            <div className="flex gap-2">
                                {goodsReceipts.current_page > 1 && (
                                    <Link
                                        href={`/admin/goods-receipts?page=${goodsReceipts.current_page - 1}`}
                                        className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
                                    >
                                        Previous
                                    </Link>
                                )}

                                {goodsReceipts.current_page <
                                    goodsReceipts.last_page && (
                                    <Link
                                        href={`/admin/goods-receipts?page=${goodsReceipts.current_page + 1}`}
                                        className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}