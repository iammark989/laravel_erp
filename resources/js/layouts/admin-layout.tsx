import { SidebarProvider } from '@/components/ui/sidebar';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({
    children,
}: AdminLayoutProps) {
    return (
        <SidebarProvider>
            <main className="min-w-0 flex-1">
                {children}
            </main>
        </SidebarProvider>
    );
}