import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AppLayout>
            <Head title="ERP Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        ERP Dashboard
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Overview of your business operations.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg border p-6">
                        <p className="text-sm text-muted-foreground">
                            Products
                        </p>

                        <p className="mt-2 text-3xl font-semibold">
                            —
                        </p>
                    </div>

                    <div className="rounded-lg border p-6">
                        <p className="text-sm text-muted-foreground">
                            Inventory
                        </p>

                        <p className="mt-2 text-3xl font-semibold">
                            —
                        </p>
                    </div>

                    <div className="rounded-lg border p-6">
                        <p className="text-sm text-muted-foreground">
                            Suppliers
                        </p>

                        <p className="mt-2 text-3xl font-semibold">
                            —
                        </p>
                    </div>

                    <div className="rounded-lg border p-6">
                        <p className="text-sm text-muted-foreground">
                            Warehouses
                        </p>

                        <p className="mt-2 text-3xl font-semibold">
                            —
                        </p>
                    </div>
                </div>

                <div className="rounded-lg border p-6">
                    <h2 className="text-lg font-semibold">
                        ERP Overview
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Your ERP dashboard will display inventory,
                        purchasing, sales, and operational information
                        as the system modules are completed.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}