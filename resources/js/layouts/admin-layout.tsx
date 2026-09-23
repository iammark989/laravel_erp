import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({
    children,
}: AdminLayoutProps) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar />

                <div className="flex min-w-0 flex-1 flex-col">
                    {/* Navbar */}
                    <header className="flex h-14 shrink-0 items-center border-b px-4">
                        <SidebarTrigger />

                        <div className="ml-3 text-sm font-semibold">
                            Magna Vertex ERP
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex flex-1 flex-col">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}