import { Head, Link } from '@inertiajs/react';
import { Pencil, Plus } from 'lucide-react';

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

type PurchaseOrder = {
    id: number;
    po_number: string;
    supplier_id: number;
    warehouse_id: number;
    order_date: string;
    expected_delivery: string | null;
    payment_terms: string;
    discount: string | number;
    tax: string | number;
    subtotal: string | number;
    grand_total: string | number;
    status: string;
    supplier: Supplier;
    warehouse: Warehouse;
};

type PaginatedPurchaseOrders = {
    data: PurchaseOrder[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

type Props = {
    purchaseOrders: PaginatedPurchaseOrders;
};

const statusLabels: Record<string, string> = {
    draft: 'Draft',
    submitted: 'Submitted',
    completed: 'Completed',
    cancelled: 'Cancelled',
    partially_received: 'Partially Received',
};

const paymentTermsLabels: Record<string, string> = {
    cash: 'Cash',
    cod: 'COD',
    net15: 'Net 15',
    net30: 'Net 30',
};

export default function Index({ purchaseOrders }: Props) {
    const formatAmount = (amount: string | number) => {
        return Number(amount).toLocaleString('en-PH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const formatDate = (date: string | null) => {
        if (!date) {
            return '—';
        }

        return new Date(date).toLocaleDateString('en-PH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'submitted':
                return 'bg-blue-100 text-blue-700';

            case 'completed':
                return 'bg-green-100 text-green-700';

            case 'partially_received':
                return 'bg-yellow-100 text-yellow-700';

            case 'cancelled':
                return 'bg-red-100 text-red-700';

            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <AppLayout>
            <Head title="Purchase Orders" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Purchase Orders
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Manage supplier purchase orders.
                        </p>
                    </div>

                    <Link
                        href="/admin/purchase-orders/create"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        <Plus className="h-4 w-4" />
                        Create Purchase Order
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl border bg-card">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b bg-muted/50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium">
                                        PO Number
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Supplier
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Warehouse
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Order Date
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Expected Delivery
                                    </th>

                                    <th className="px-4 py-3 text-left font-medium">
                                        Payment Terms
                                    </th>

                                    <th className="px-4 py-3 text-right font-medium">
                                        Grand Total
                                    </th>

                                    <th className="px-4 py-3 text-center font-medium">
                                        Status
                                    </th>

                                    <th className="px-4 py-3 text-right font-medium">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {purchaseOrders.data.length > 0 ? (
                                    purchaseOrders.data.map((purchaseOrder) => (
                                        <tr
                                            key={purchaseOrder.id}
                                            className="hover:bg-muted/30"
                                        >
                                            <td className="px-4 py-3 font-medium">
                                                {purchaseOrder.po_number}
                                            </td>

                                            <td className="px-4 py-3">
                                                <div>
                                                    <div className="font-medium">
                                                        {
                                                            purchaseOrder
                                                                .supplier.name
                                                        }
                                                    </div>

                                                    <div className="text-xs text-muted-foreground">
                                                        {
                                                            purchaseOrder
                                                                .supplier
                                                                .supplier_code
                                                        }
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-4 py-3">
                                                <div>
                                                    <div className="font-medium">
                                                        {
                                                            purchaseOrder
                                                                .warehouse.name
                                                        }
                                                    </div>

                                                    <div className="text-xs text-muted-foreground">
                                                        {
                                                            purchaseOrder
                                                                .warehouse
                                                                .warehouse_code
                                                        }
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-4 py-3">
                                                {formatDate(
                                                    purchaseOrder.order_date,
                                                )}
                                            </td>

                                            <td className="px-4 py-3">
                                                {formatDate(
                                                    purchaseOrder.expected_delivery,
                                                )}
                                            </td>

                                            <td className="px-4 py-3">
                                                {paymentTermsLabels[
                                                    purchaseOrder.payment_terms
                                                ] ??
                                                    purchaseOrder.payment_terms}
                                            </td>

                                            <td className="px-4 py-3 text-right font-medium">
                                                ₱
                                                {formatAmount(
                                                    purchaseOrder.grand_total,
                                                )}
                                            </td>

                                            <td className="px-4 py-3 text-center">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                                                        purchaseOrder.status,
                                                    )}`}
                                                >
                                                    {statusLabels[
                                                        purchaseOrder.status
                                                    ] ??
                                                        purchaseOrder.status}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex justify-end">
                                                    <Link
                                                        href={`/admin/purchase-orders/${purchaseOrder.id}/edit`}
                                                        className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                                                    >
                                                        <Pencil className="h-3.5 w-3.5" />
                                                        Edit
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="px-4 py-10 text-center text-muted-foreground"
                                        >
                                            No purchase orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {purchaseOrders.last_page > 1 && (
                        <div className="flex items-center justify-between border-t px-4 py-3">
                            <p className="text-sm text-muted-foreground">
                                Showing{' '}
                                {(purchaseOrders.current_page - 1) *
                                    purchaseOrders.per_page +
                                    1}{' '}
                                to{' '}
                                {Math.min(
                                    purchaseOrders.current_page *
                                        purchaseOrders.per_page,
                                    purchaseOrders.total,
                                )}{' '}
                                of {purchaseOrders.total} purchase orders
                            </p>

                            <div className="flex gap-2">
                                {purchaseOrders.current_page > 1 && (
                                    <Link
                                        href={`/admin/purchase-orders?page=${
                                            purchaseOrders.current_page - 1
                                        }`}
                                        className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
                                    >
                                        Previous
                                    </Link>
                                )}

                                {purchaseOrders.current_page <
                                    purchaseOrders.last_page && (
                                    <Link
                                        href={`/admin/purchase-orders?page=${
                                            purchaseOrders.current_page + 1
                                        }`}
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
        </AppLayout>
    );
}