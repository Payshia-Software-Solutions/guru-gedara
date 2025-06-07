
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
import { BookOpenText } from 'lucide-react';

export function LmsSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const { setOpenMobile, isMobile } = useSidebar(); // Added isMobile

  const navItems = [
    { href: '/lms/dashboard', labelKey: 'lms.sidebar.dashboard', icon: Icons.LayoutDashboard },
    { href: '/lms/courses', labelKey: 'lms.sidebar.myCourses', icon: Icons.BookMarked }, // Changed from My Courses
    { href: '/lms/announcements', labelKey: 'lms.sidebar.announcements', icon: Icons.Megaphone },
    { href: '/lms/materials', labelKey: 'lms.sidebar.materials', icon: Icons.FolderOpen },
    { href: '/lms/profile', labelKey: 'lms.sidebar.profile', icon: Icons.UserCircle },
  ];

  const isActive = (path: string) => pathname === path || (path === '/lms/courses' && pathname.startsWith('/lms/courses'));


  const handleLogout = () => {
    console.log("User logged out (simulated from LMS sidebar)");
    if (isMobile) setOpenMobile(false); // Ensure mobile sidebar closes
    router.push('/');
  };

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="p-4">
        <Link href="/lms/dashboard" className="flex items-center gap-2" onClick={() => { if (isMobile) setOpenMobile(false);}}>
          <BookOpenText className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
          <span className="font-headline text-xl font-bold text-primary group-data-[collapsible=icon]:hidden">
            ගුරු ගෙදර <span className="text-accent">LMS</span>
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
                tooltip={t(item.labelKey)}
                onClick={() => {
                  if (isMobile) {
                    setOpenMobile(false);
                  }
                }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{t(item.labelKey)}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 mt-auto border-t">
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
                title={t('lms.sidebar.logout')}
            >
                <Icons.LogOut />
                <span className="sr-only group-data-[collapsible=icon]:hidden">{t('lms.sidebar.logout')}</span>
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
            <Icons.ArrowLeft className="mr-2"/>
            {t('lms.sidebar.backToSite', 'Back to Main Site')}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
