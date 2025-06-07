
import { Facebook, Twitter, Instagram, Youtube, Send, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-headline text-xl font-bold text-primary mb-3">ගුරු ගෙදර E-School</h3>
            <p className="text-sm leading-relaxed">Empowering Sri Lankan students with quality online education for G.C.E. O/L examinations.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-primary mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/courses" className="hover:text-primary transition-colors">Courses</Link></li>
              <li><Link href="/timetable" className="hover:text-primary transition-colors">Timetable</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-primary mb-3">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <Link href="#" aria-label="Facebook" className="p-2 rounded-full hover:bg-primary/10 transition-colors"><Facebook size={20} className="text-primary" /></Link>
              <Link href="#" aria-label="Twitter" className="p-2 rounded-full hover:bg-primary/10 transition-colors"><Twitter size={20} className="text-primary" /></Link>
              <Link href="#" aria-label="Instagram" className="p-2 rounded-full hover:bg-primary/10 transition-colors"><Instagram size={20} className="text-primary" /></Link>
              <Link href="#" aria-label="YouTube" className="p-2 rounded-full hover:bg-primary/10 transition-colors"><Youtube size={20} className="text-primary" /></Link>
            </div>
            <div className="text-sm space-y-1">
                <p className="flex items-center"><Send size={16} className="mr-2 text-primary" /> info@gurugedara.lk</p>
                <p className="flex items-center"><Phone size={16} className="mr-2 text-primary" /> +94 77 123 4567</p>
                <p className="flex items-center"><MapPin size={16} className="mr-2 text-primary" /> Colombo, Sri Lanka</p>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center">
          <p className="text-xs">
            &copy; {currentYear} ගුරු ගෙදර E-School. All rights reserved.
          </p>
          <p className="text-xs mt-1">
            Designed & Developed with ❤️ for the students of Sri Lanka.
          </p>
        </div>
      </div>
    </footer>
  );
}
