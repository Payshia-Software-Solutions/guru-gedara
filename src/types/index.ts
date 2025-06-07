
import type { LucideIcon } from 'lucide-react';

export interface CourseDefinition {
  id: string; 
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  imageHint: string;
}

export interface Testimonial {
  id: string;
  quoteKey: string; // Key for translation
  name: string;
  roleKey: string; 
  avatarHint: string;
}

export interface TimetableEntryDefinition {
  id: string;
  day: string; 
  time: string;
  subjectKey: string; 
  teacher: string;
}
