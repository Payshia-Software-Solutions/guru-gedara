
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import Icons from '@/components/icons';
import { useLanguage } from '@/contexts/language-context';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { LanguageSwitcher } from '@/components/language-switcher';

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const { setOpenMobile, isMobile } = useSidebar();

  const navItems = [
    { href: '/admin', label: 'Admin Dashboard', icon: Icons.LayoutDashboard },
    { href: '/admin/students', label: 'All Students', icon: Icons.Users },
    { href: '/admin/students/approve', label: 'Approve Student Forms', icon: Icons.UserCheck },
    { href: '/admin/lms-content', label: 'LMS Content', icon: Icons.BookOpenText },
    // Add more admin links here as features are built
    // { href: '/admin/payments', label: 'Payments', icon: Icons.CreditCard },
    // { href: '/admin/staff', label: 'Staff Management', icon: Icons.Briefcase },
  ];

  const isActive = (path: string) => pathname === path || (pathname.startsWith(path) && path !== '/admin');

  const handleLogout = () => {
    console.log("Admin logged out (simulated from Admin sidebar)");
    if (isMobile) setOpenMobile(false);
    router.push('/login');
  };

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="p-4">
        <Link href="/admin" className="flex items-center gap-2 group" onClick={() => { if (isMobile) setOpenMobile(false); }}>
          <Icons.ShieldAlert className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
          <span className="font-headline text-xl font-bold text-primary group-data-[collapsible=icon]:hidden">
            Admin Panel
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                tooltip={item.label}
                onClick={() => {
                  if (isMobile) {
                    setOpenMobile(false);
                  }
                }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 mt-auto border-t">
        <div className="pb-2 mb-2 border-b group-data-[collapsible=icon]:hidden">
          <p className="text-xs text-center text-muted-foreground font-medium">Admin User</p>
        </div>
        <div className="flex items-center justify-between gap-1 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center">
          <div className="flex items-center gap-1 group-data-[collapsible=icon]:flex-col">
            <ThemeToggleButton />
            <LanguageSwitcher />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={handleLogout}
            title="Logout"
          >
            <Icons.LogOut />
            <span className="sr-only group-data-[collapsible=icon]:hidden">Logout</span>
          </Button>
        </div>
        <Button
          variant="outline"
          className="w-full mt-2 group-data-[collapsible=icon]:hidden"
          onClick={() => {
            if (isMobile) setOpenMobile(false);
            router.push('/');
          }}
        >
          <Icons.ArrowLeft className="mr-2" />
          Back to Main Site
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
