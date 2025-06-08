
import type { ReactNode } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/layout/admin-sidebar';
import Link from 'next/link';
import Icons from '@/components/icons'; // Ensure Icons.ShieldAlert is available

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      <AdminSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md md:justify-end">
           <div className="md:hidden flex items-center">
             <Link href="/admin" className="flex items-center gap-2 mr-4">
                <Icons.ShieldAlert className="h-6 w-6 text-primary" />
                <span className="font-headline text-lg font-bold text-primary">Admin Panel</span>
              </Link>
            </div>
          <SidebarTrigger className="md:hidden" />
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-muted/40"> {/* Added bg-muted/40 and padding here */}
          {children}
        </main>
        <footer className="border-t p-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Admin Panel. All rights reserved.
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
