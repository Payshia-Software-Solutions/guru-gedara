
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, BookOpenText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggleButton } from '@/components/theme-toggle-button';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/courses', label: 'Courses' },
  { href: '/timetable', label: 'Timetable' },
  { href: '/contact', label: 'Contact Us' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const NavLinks = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={onItemClick}
          className="text-foreground hover:text-primary transition-colors duration-300 ease-in-out px-3 py-2 rounded-md text-sm font-medium"
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  if (!isMounted) {
    return (
      <header className="bg-background/80 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
           <div className="animate-pulse h-8 w-48 bg-muted rounded"></div>
           <div className="flex items-center space-x-2">
             <div className="animate-pulse h-8 w-20 bg-muted rounded md:block hidden"></div>
             <div className="animate-pulse h-8 w-20 bg-muted rounded md:block hidden"></div>
             <div className="animate-pulse h-8 w-20 bg-muted rounded md:block hidden"></div>
             <div className="animate-pulse h-9 w-9 bg-muted rounded-md"></div> {/* Placeholder for theme toggle */}
             <div className="animate-pulse h-8 w-8 bg-muted rounded md:hidden"></div>
           </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-background/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpenText className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary">ගුරු ගෙදර E-School</span>
        </Link>

        <div className="flex items-center space-x-2">
          <nav className="hidden md:flex space-x-1 items-center">
            <NavLinks />
          </nav>
          <ThemeToggleButton />
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] bg-background">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-6">
                     <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <BookOpenText className="h-7 w-7 text-primary" />
                        <span className="font-headline text-xl font-bold text-primary">ගුරු ගෙදර</span>
                      </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-3">
                    <NavLinks onItemClick={() => setIsMobileMenuOpen(false)} />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
