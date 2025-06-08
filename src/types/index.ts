
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
  avatarUrl: string; // Added for specific avatar URLs
}

export interface TimetableEntryDefinition {
  id: string;
  day: string;
  time: string;
  subjectKey: string;
  teacher: string;
}

// Quiz Types
export interface QuizOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: 'mcq' | 'tf'; // Multiple Choice Question or True/False
  options?: QuizOption[]; // For MCQ
  correctAnswer?: boolean; // For TF (true or false)
  points: number;
  userAnswer?: string | boolean; // Store user's selection
  isUserCorrect?: boolean; // For results review
}

export interface Quiz {
  id: string;
  titleKey: string; // Translation key for the quiz title
  questions: QuizQuestion[];
  timeLimitMinutes: number; // Time limit in minutes
}

// Extended MonthlyContentItem for Course Content Page
export interface MonthlyContentItem {
  id: string;
  titleKey: string;
  descriptionKey?: string;
  videoUrl?: string;
  duration?: string;
  fileSize?: string;
  link?: string;
  date?: string;
  quizData?: Quiz; // To hold the actual quiz structure
  dueDate?: string; // For assignments
  itemType?: 'video' | 'pdf' | 'recording' | 'quiz' | 'assignment'; // To help differentiate
}
