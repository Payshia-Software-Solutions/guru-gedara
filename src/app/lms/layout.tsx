
import type { ReactNode } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { LmsSidebar } from '@/components/layout/lms-sidebar';
import { Button } from '@/components/ui/button';
import Icons from '@/components/icons';
import Link from 'next/link';
import { BookOpenText } from 'lucide-react';


export default function LmsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen>
      <LmsSidebar />
      <SidebarInset>
        {/* Optional minimal header within LMS pages */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md md:justify-end">
           <div className="md:hidden flex items-center"> {/* Mobile logo + LMS title */}
             <Link href="/lms/dashboard" className="flex items-center gap-2 mr-4">
                <BookOpenText className="h-6 w-6 text-primary" />
                <span className="font-headline text-lg font-bold text-primary">ගුරු ගෙදර <span className="text-accent">LMS</span></span>
              </Link>
            </div>
          <SidebarTrigger className="md:hidden" /> {/* Hamburger for mobile sidebar */}
          {/* You could add breadcrumbs or user profile dropdown here if needed */}
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
        <footer className="border-t p-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} ගුරු ගෙදර E-School LMS. All rights reserved.
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
