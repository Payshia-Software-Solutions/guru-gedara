
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Home, Users, BookOpen, Settings, ShieldAlert } from 'lucide-react';
import { PageTransitionManager } from '@/components/layout/page-transition-manager';

// AdminSidebar component remains the same as provided in context
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
  // This layout is nested within RootLayout.
  // It should not redefine <html>, <body>, ThemeProvider, LanguageProvider, or Toaster.
  return (
    <div className="flex flex-1 w-full"> {/* This div takes up space within RootLayout's structure */}
      <AdminSidebar />
      <main className="flex-1 bg-muted/40 overflow-y-auto"> {/* Changed flex-grow to flex-1 */}
        <PageTransitionManager>
          {children}
        </PageTransitionManager>
      </main>
    </div>
  );
}
