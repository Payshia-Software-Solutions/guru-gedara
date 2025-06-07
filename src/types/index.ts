
import type { LucideIcon } from 'lucide-react';

// Used in /src/app/courses/page.tsx
export interface CourseDefinition { // Renamed from Course to avoid ambiguity
  id: string; // e.g., 'science', 'mathematics'
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  imageHint: string;
}

// Used in /src/app/page.tsx for featured courses, similar to CourseDefinition
// Kept original 'Course' type name for src/app/page.tsx context as it was originally
// but its structure is now simplified to mainly use keys for translations.
export interface Course {
  id: string; // Used as part of translation key, e.g. 'home.featuredSubjects.science.name'
  sinhalaName?: string; // Kept for potential direct use, but t() function preferred
  name?: string; // Kept for potential direct use, but t() function preferred
  description?: string; // Kept for potential direct use, but t() function preferred
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  imageHint: string;
}


export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  roleKey: string; // e.g., "home.testimonials.roleStudent"
  avatarHint: string;
}

// Used in /src/app/timetable/page.tsx
export interface TimetableEntryDefinition { // Renamed from TimetableEntry
  id: string;
  day: string; // Consider using a date library for localization if days need translation
  time: string;
  subjectKey: string; // e.g., 'mathematics', 'scienceRevision'
  teacher: string;
}

    