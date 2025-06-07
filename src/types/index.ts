import type { LucideIcon } from 'lucide-react';

export interface Course {
  id: string;
  name: string;
  sinhalaName: string;
  description: string;
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>; // Allow LucideIcon or custom SVG component
  imageHint: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string; // e.g., "Student", "Parent"
  avatarHint: string;
}

export interface TimetableEntry {
  id: string;
  day: string;
  time: string;
  subject: string;
  teacher: string;
}
