import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <p className="font-headline text-lg">ගුරු ගෙදර E-School</p>
          <p className="text-sm">Empowering Sri Lankan students for a brighter future.</p>
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          <Link href="#" aria-label="Facebook" className="hover:text-primary transition-colors"><Facebook size={20} /></Link>
          <Link href="#" aria-label="Twitter" className="hover:text-primary transition-colors"><Twitter size={20} /></Link>
          <Link href="#" aria-label="Instagram" className="hover:text-primary transition-colors"><Instagram size={20} /></Link>
          <Link href="#" aria-label="YouTube" className="hover:text-primary transition-colors"><Youtube size={20} /></Link>
        </div>
        <p className="text-xs">
          &copy; {currentYear} ගුරු ගෙදර E-School. All rights reserved.
        </p>
         <p className="text-xs mt-1">
          Made with ❤️ for the students of Sri Lanka.
        </p>
      </div>
    </footer>
  );
}
