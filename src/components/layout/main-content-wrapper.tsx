
"use client";

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export function MainContentWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminOrLmsPage = pathname?.startsWith('/admin') || pathname?.startsWith('/lms');

  if (isAdminOrLmsPage) {
    // For admin/LMS pages, render children directly.
    // Their respective layouts (AdminLayout, LmsLayout) will manage their own structure.
    // The parent div in RootLayout already provides flex-col min-h-screen.
    // The AdminLayout/LmsLayout should use flex-1 to fill the available space.
    return <>{children}</>;
  }

  // For public pages, wrap with the standard container.
  return (
    <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
      {children}
    </main>
  );
}
