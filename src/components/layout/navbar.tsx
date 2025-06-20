
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; 
import { Menu, X, BookOpenText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useLanguage } from '@/contexts/language-context';
import Icons from '@/components/icons'; // Import Icons

const OPEN_PREFERENCES_MODAL_EVENT = 'openGuruGedaraPreferencesModal';

const navItemKeys = [
  { href: '/', labelKey: 'nav.home', icon: Icons.Home },
  { href: '/about', labelKey: 'nav.about', icon: Icons.Info },
  { href: '/courses', labelKey: 'nav.courses', icon: Icons.BookOpenText },
  { href: '/timetable', labelKey: 'nav.timetable', icon: Icons.CalendarDays },
  { href: '/contact', labelKey: 'nav.contact', icon: Icons.Mail },
  { href: '/login', labelKey: 'nav.login', icon: Icons.LogIn },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname(); 

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Do not render Navbar if on an admin page or LMS page
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/lms')) { 
    return null;
  }

  const dispatchOpenPreferencesModalEvent = () => {
    window.dispatchEvent(new CustomEvent(OPEN_PREFERENCES_MODAL_EVENT));
  };

  const NavLinks = ({ onItemClick, inSheet = false }: { onItemClick?: () => void, inSheet?: boolean }) => (
    <>
      {navItemKeys.map((item) => (
        <Link
          key={item.labelKey}
          href={item.href}
          onClick={onItemClick}
          className={`font-medium transition-colors duration-300 ease-in-out hover:text-primary
            ${inSheet ? 'block px-3 py-3 text-lg hover:bg-accent/10 rounded-md' : 'px-3 py-2 rounded-md text-sm'}
          `}
        >
          <span className="flex items-center gap-2">
            <item.icon className="h-5 w-5" />
            {t(item.labelKey, item.labelKey.split('.')[1])}
          </span>
        </Link>
      ))}
    </>
  );

  if (!isMounted) {
    // Skeleton loader for navbar
    return (
      <header className="bg-background/90 backdrop-blur-lg shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
           <div className="animate-pulse h-8 w-48 bg-muted rounded"></div>
           <div className="flex items-center space-x-2">
             <div className="animate-pulse h-8 w-20 bg-muted rounded md:block hidden"></div>
             <div className="animate-pulse h-8 w-20 bg-muted rounded md:block hidden"></div>
             <div className="animate-pulse h-9 w-9 bg-muted rounded-md"></div>
             <div className="animate-pulse h-9 w-9 bg-muted rounded-md"></div>
             <div className="animate-pulse h-8 w-8 bg-muted rounded md:hidden"></div>
           </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-background/90 backdrop-blur-lg shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <BookOpenText className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
          {/* Desktop view: Full name */}
          <span className="font-headline text-2xl font-bold text-primary hidden md:inline">
            ගුරු ගෙදර <span className="text-accent">E-School</span>
          </span>
          {/* Mobile view: Shorter name */}
          <span className="font-headline text-2xl font-bold text-primary md:hidden">
            ගුරු ගෙදර
          </span>
        </Link>

        <div className="flex items-center space-x-1 md:space-x-2">
          <nav className="hidden md:flex space-x-1 items-center">
            <NavLinks />
          </nav>
          <ThemeToggleButton />
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={dispatchOpenPreferencesModalEvent}
            aria-label={t('preferencesModal.settingsButtonLabel', 'Open Preferences')}
          >
            <Icons.Settings className="h-5 w-5" />
          </Button>
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background p-0">
                <div className="p-5">
                  <div className="flex justify-between items-center mb-8">
                     <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <BookOpenText className="h-7 w-7 text-primary" />
                        <span className="font-headline text-xl font-bold text-primary">ගුරු ගෙදර</span>
                      </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-2">
                    <NavLinks onItemClick={() => setIsMobileMenuOpen(false)} inSheet={true} />
                  </nav>
                  <div className="mt-6 pt-4 border-t">
                     <Button
                        variant="outline"
                        className="w-full justify-start text-lg py-3"
                        onClick={() => {
                          dispatchOpenPreferencesModalEvent();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <Icons.Settings className="mr-2 h-5 w-5" />
                        {t('preferencesModal.settingsButtonLabel', 'Preferences')}
                      </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
