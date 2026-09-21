import { Link } from '@inertiajs/react';
import {
    BadgeDollarSign,
    BarChart3,
    Boxes,
    ClipboardList,
    LayoutDashboard,
    Package,
    ShoppingCart,
    Tags,
    Warehouse,
} from 'lucide-react';

import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },

    {
        title: 'Catalog',
        icon: Boxes,
        items: [
            {
                title: 'Products',
                href: '/admin/products',
                icon: Package,
            },
            {
                title: 'Categories',
                href: '/admin/categories',
            },
            {
                title: 'Brands',
                href: '/admin/brands',
                icon: Tags,
            },
            {
                title: 'UOMs',
                href: '/admin/uoms',
            },
            {
                title: 'Warehouses',
                href: '/admin/warehouses',
            },
            {
                title: 'Price List',
                href: '/admin/price-lists',
            },
        ],
    },

    {
        title: 'Inventory',
        icon: Warehouse,
        items: [
            {
                title: 'Warehouses',
                href: '/admin/warehouses',
            },
            {
                title: 'Stocks',
                href: '/admin/stocks',
            },
            {
                title: 'Transactions',
                href: '/admin/inventory-transactions',
            },
            {
                title: 'Adjustments',
                href: '/admin/inventory-adjustments',
            },
        ],
    },

    {
        title: 'Purchasing',
        icon: ShoppingCart,
        items: [
            {
                title: 'Suppliers',
                href: '/admin/suppliers',
            },
            {
                title: 'Purchase Orders',
                href: '/admin/purchase-orders',
            },
            {
                title: 'Goods Receipts',
                href: '/admin/goods-receipts',
            },
        ],
    },

    {
        title: 'Pricing',
        icon: BadgeDollarSign,
        items: [
            {
                title: 'Price Lists',
                href: '/admin/price-lists',
            },
        ],
    },

    {
        title: 'Reports',
        href: '/admin/reports',
        icon: BarChart3,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {footerNavItems.length > 0 && (
                    <NavFooter
                        items={footerNavItems}
                        className="mt-auto"
                    />
                )}

                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}