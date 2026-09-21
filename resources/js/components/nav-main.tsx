import { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    ChevronDown,
    ChevronRight,
} from 'lucide-react';

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

export function NavMain({ items }: { items: NavItem[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>ERP</SidebarGroupLabel>

            <SidebarMenu>
                {items.map((item) => (
                    <NavMenuItem
                        key={item.title}
                        item={item}
                        isCurrentUrl={isCurrentUrl}
                    />
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

function NavMenuItem({
    item,
    isCurrentUrl,
}: {
    item: NavItem;
    isCurrentUrl: (url: string) => boolean;
}) {
    const hasChildren = Boolean(item.items?.length);

    const childIsActive = item.items?.some(
    (child) =>
        typeof child.href === 'string' &&
        isCurrentUrl(child.href),
);

    const [open, setOpen] = useState(
        Boolean(item.isActive || childIsActive),
    );

    /*
     * Normal navigation item
     */
    if (!hasChildren) {
        return (
            <SidebarMenuItem>
                <SidebarMenuButton
                    asChild
                    isActive={
                        typeof item.href === 'string' &&
                        isCurrentUrl(item.href)
                    }
                    tooltip={{ children: item.title }}
                >
                    <Link href={item.href!} prefetch>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    }

    /*
     * Parent navigation item with children
     */
    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                onClick={() => setOpen(!open)}
                isActive={Boolean(childIsActive)}
                tooltip={{ children: item.title }}
            >
                {item.icon && <item.icon />}

                <span>{item.title}</span>

                <span className="ml-auto">
                    {open ? (
                        <ChevronDown className="size-4" />
                    ) : (
                        <ChevronRight className="size-4" />
                    )}
                </span>
            </SidebarMenuButton>

            {open && (
                <div className="ml-4 mt-1 space-y-1">
                    {item.items?.map((child) => (
                        <Link
                            key={child.title}
                            href={child.href!}
                            prefetch
                            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                                typeof child.href === 'string' &&
                                isCurrentUrl(child.href)
                                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                            }`}
                        >
                            {child.icon && (
                                <child.icon className="size-4" />
                            )}

                            <span>{child.title}</span>
                        </Link>
                    ))}
                </div>
            )}
        </SidebarMenuItem>
    );
}