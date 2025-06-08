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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import Icons from '@/components/icons';
import { useLanguage } from '@/contexts/language-context';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { LanguageSwitcher } from '@/components/language-switcher';

interface NavItem {
  href?: string;
  label: string;
  icon: React.ElementType;
  isCollapsible?: boolean;
  subItems?: NavItem[];
  isExternal?: boolean;
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage(); // Assuming you might want to translate labels later
  const { setOpenMobile, isMobile, open, setOpen } = useSidebar();

  const navItems: NavItem[] = [
    { href: '/admin', label: 'Dashboard', icon: Icons.LayoutDashboard },
    {
      label: 'Student Management',
      icon: Icons.Users,
      isCollapsible: true,
      subItems: [
        { href: '/admin/students', label: 'Students', icon: Icons.Users },
        { href: '/admin/students/approve', label: 'Approve Students', icon: Icons.UserCheck },
        { href: '/admin/students/payments', label: 'Payments', icon: Icons.CreditCard },
        { href: '/admin/students/assignments', label: 'Assignments', icon: Icons.FileText },
      ],
    },
    {
      label: 'Course Management',
      icon: Icons.BookCopy,
      isCollapsible: true,
      subItems: [
        { href: '/admin/lms-content', label: 'Courses', icon: Icons.BookOpenText }, // Existing page, re-labeled
        { href: '/admin/course-management/assignments', label: 'Assignments', icon: Icons.ClipboardList },
        { href: '/admin/course-management/quizzes', label: 'Quizzes', icon: Icons.HelpCircle },
        { href: '/admin/course-management/exams', label: 'Exams', icon: Icons.FileCheck2 },
      ],
    },
    {
      label: 'Reports',
      icon: Icons.BarChart3,
      isCollapsible: true,
      subItems: [
        { href: '/admin/reports/students', label: 'Student Reports', icon: Icons.FileSignature },
        { href: '/admin/reports/payments', label: 'Payment Reports', icon: Icons.Banknote },
      ],
    },
  ];

  const isActive = (path: string, isParent = false, subItems?: NavItem[]) => {
    if (isParent && subItems) {
      return subItems.some(subItem => subItem.href && pathname.startsWith(subItem.href));
    }
    return path && (pathname === path || pathname.startsWith(path + '/'));
  };
  
  const handleLinkClick = (isCollapsible?: boolean) => {
    if (isMobile) {
      setOpenMobile(false);
    }
    if (isCollapsible && !isMobile) {
        // Keep sidebar open if parent is clicked and not mobile
    } else if (isCollapsible && isMobile) {
        // On mobile, let submenu toggle its state, don't close main mobile sidebar yet
    }
  };


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
            <SidebarMenuItem key={item.label}>
              {item.isCollapsible && item.subItems ? (
                <SidebarMenuButton
                  tooltip={item.label}
                  isActive={isActive(item.href || '', true, item.subItems)}
                  onClick={() => {
                    if (!isMobile) setOpen(true); // Expand on desktop if collapsed
                    // Submenu expansion is handled by Radix UI state
                  }}
                  data-state={isActive(item.href || '', true, item.subItems) && open ? 'open' : 'closed'}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.href!)}
                  tooltip={item.label}
                  onClick={() => handleLinkClick()}
                >
                  <Link href={item.href!}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              )}
              {item.isCollapsible && item.subItems && (
                 <SidebarMenuSub className={isActive(item.href || '', true, item.subItems) || (open && isMobile) ? 'block' : 'hidden group-data-[state=expanded]:block'}>
                  {item.subItems.map((subItem) => (
                    <SidebarMenuItem key={subItem.label}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isActive(subItem.href!)}
                        onClick={() => handleLinkClick()}
                      >
                        <Link href={subItem.href!}>
                          <subItem.icon className="mr-2 h-4 w-4 group-data-[collapsible=icon]:hidden" />
                          <span className="group-data-[collapsible=icon]:hidden">{subItem.label}</span>
                           {/* For collapsed view, parent tooltip is enough. For expanded, sub-item text is visible */}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenuSub>
              )}
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