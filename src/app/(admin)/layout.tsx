
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Home, Users, BookOpen, Settings, ShieldAlert } from 'lucide-react';
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from '@/contexts/language-context';
import { PageTransitionManager } from '@/components/layout/page-transition-manager';
import { Toaster } from '@/components/ui/toaster';

// Simple Admin Sidebar component
const AdminSidebar = () => {
  const navItems = [
    { href: '/admin', label: 'Admin Dashboard', icon: Home },
    { href: '/admin/students', label: 'Student Management', icon: Users },
    { href: '/admin/lms-content', label: 'LMS Content', icon: BookOpen },
    // Add more admin links here as features are built
    // { href: '/admin/payments', label: 'Payments', icon: CreditCard },
    // { href: '/admin/staff', label: 'Staff Management', icon: Briefcase },
    // { href: '/admin/reports', label: 'Reports', icon: LineChart },
    // { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-card text-card-foreground p-4 border-r border-border flex-shrink-0 hidden md:flex flex-col">
      <div className="mb-6">
        <Link href="/admin" className="flex items-center gap-2 group">
          <ShieldAlert className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
          <span className="font-headline text-xl font-bold text-primary">Admin Panel</span>
        </Link>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
            <Home className="h-5 w-5" />
            Back to Main Site
        </Link>
      </div>
    </aside>
  );
};

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..0,900;1,200..1,900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex min-h-screen bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider> {/* Assuming admin might also need language context */}
            <div className="flex flex-col min-h-screen w-full">
                {/* Admin specific header can go here, or remove Navbar if not needed */}
                {/* <Navbar /> */}
                <div className="flex flex-1">
                    <AdminSidebar />
                    <main className="flex-grow bg-muted/40 overflow-y-auto"> {/* Removed padding, added overflow-y-auto */}
                        <PageTransitionManager> {/* Optional: for transitions within admin */}
                            {children}
                        </PageTransitionManager>
                    </main>
                </div>
                {/* Admin specific footer or remove Footer if not needed */}
                {/* <Footer /> */}
            </div>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
