
"use client"; // Keep if any client-side specific logic might be added, though for data it's usually not needed.

import Icons from '@/components/icons';
import type { CourseDefinition, Quiz, QuizQuestion, MonthlyContentItem as MonthlyContentItemType } from '@/types';

// Re-export types from global types if they are closely related and used here
export type { Quiz, QuizQuestion, MonthlyContentItemType };

export const placeholderVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export interface MonthlyPaymentStatus {
  paid: boolean;
  available: boolean;
}

export interface MonthlyContent {
  videoLessons: MonthlyContentItemType[];
  pdfNotes: MonthlyContentItemType[];
  recordings: MonthlyContentItemType[];
  quizzes: MonthlyContentItemType[];
  assignments: MonthlyContentItemType[];
}

export interface CourseUIDefinitionExtended extends CourseDefinition {
  monthlyPayments: Record<string, MonthlyPaymentStatus>;
  monthOrder?: string[];
}

export type AllCourseContentData = Record<string, Record<string, MonthlyContent>>;

// Sample Quiz Data (example for science)
export const sampleScienceQuizAugust: Quiz = {
  id: 'SCI001-AUG', // This ID will be used in the URL
  titleKey: 'lms.courseContent.science.aug.quiz1.title',
  timeLimitMinutes: 1, // Short for testing
  questions: [
    { id: 'q1', text: 'What is the chemical symbol for Water?', type: 'mcq', options: [{id:'o1', text:'O2'}, {id:'o2', text:'H2O', isCorrect:true}, {id:'o3', text:'CO2'}], points: 10 },
    { id: 'q2', text: 'The Earth is flat.', type: 'tf', correctAnswer: false, points: 5 },
    { id: 'q3', text: 'What is the largest planet in our solar system?', type: 'mcq', options: [{id:'o1', text:'Earth'}, {id:'o2',text:'Mars'}, {id:'o3',text:'Jupiter', isCorrect:true}, {id:'o4',text:'Saturn'}], points: 10 },
    { id: 'q4', text: 'Photosynthesis occurs in plants.', type: 'tf', correctAnswer: true, points: 5 },
  ]
};

// Add more sample quizzes as needed, e.g., sampleMathQuizSeptember
// export const sampleMathQuizSeptember: Quiz = { ... };

export const coursesDataLocal: CourseUIDefinitionExtended[] = [
  {
    id: 'science', Icon: Icons.Microscope, imageHint: 'science classroom details',
    monthOrder: ['August 2024', 'September 2024', 'October 2024'],
    monthlyPayments: {
      'August 2024': { paid: true, available: true },
      'September 2024': { paid: false, available: true },
      'October 2024': { paid: false, available: false },
    }
  },
  {
    id: 'mathematics', Icon: Icons.Calculator, imageHint: 'math textbook details',
    monthOrder: ['August 2024', 'September 2024'],
    monthlyPayments: {
      'August 2024': { paid: false, available: true },
      'September 2024': { paid: false, available: true },
    }
  },
  {
    id: 'english', Icon: Icons.BookOpenText, imageHint: 'english dictionary details',
    monthOrder: ['August 2024'],
    monthlyPayments: {
      'August 2024': { paid: true, available: true },
    }
  },
  {
    id: 'ict', Icon: Icons.Laptop2, imageHint: 'coding screen details',
    monthOrder: ['August 2024', 'September 2024'],
    monthlyPayments: {
      'August 2024': { paid: false, available: true },
      'September 2024': { paid: false, available: false },
    }
  },
];

export const allCourseContentDataLocal: AllCourseContentData = {
  science: {
    'August 2024': {
      videoLessons: [ { id: 'sci-aug-vid1', itemType: 'video', titleKey: 'lms.courseContent.science.aug.video1.title', duration: '10:32', descriptionKey: 'lms.courseContent.science.aug.video1.description', videoUrl: placeholderVideoUrl }, ],
      pdfNotes: [ { id: 'sci-aug-note1', itemType: 'pdf', titleKey: 'lms.courseContent.science.aug.note1.title', fileSize: '2.5MB', link: '#' } ],
      recordings: [],
      quizzes: [ { id: 'sci-aug-qz1', itemType: 'quiz', titleKey: 'lms.courseContent.science.aug.quiz1.title', descriptionKey: 'lms.courseContent.science.aug.quiz1.description', quizData: sampleScienceQuizAugust } ],
      assignments: [ { id: 'sci-aug-as1', itemType: 'assignment', titleKey: 'lms.courseContent.science.aug.assign1.title', descriptionKey: 'lms.courseContent.science.aug.assign1.description', dueDate: '2024-08-31', link: '#' } ]
    },
    'September 2024': {
      videoLessons: [ { id: 'sci-sep-vid1', itemType: 'video', titleKey: 'lms.courseContent.science.sep.video1.title', duration: '15:05', descriptionKey: 'lms.courseContent.science.sep.video1.description', videoUrl: placeholderVideoUrl }, ],
      pdfNotes: [],
      recordings: [ { id: 'sci-sep-rec1', itemType: 'recording', titleKey: 'lms.courseContent.science.sep.recording1.title', date: '2024-09-05', duration: '01:30:00', link: '#', videoUrl: placeholderVideoUrl } ],
      quizzes: [], assignments: []
    },
    'October 2024': { videoLessons: [], pdfNotes: [], recordings: [], quizzes: [], assignments: [] }
  },
  mathematics: {
    'August 2024': {
      videoLessons: [{id: 'math-aug-vid1', itemType: 'video', titleKey: 'lms.courseContent.math.aug.video1.title', duration: '20:00', descriptionKey: 'lms.courseContent.math.aug.video1.description', videoUrl: placeholderVideoUrl}],
      pdfNotes: [], recordings: [], quizzes: [], assignments: []
    },
    'September 2024': {
      videoLessons: [], pdfNotes: [{id: 'math-sep-note1', itemType: 'pdf', titleKey: 'lms.courseContent.math.sep.note1.title', fileSize: '1.5MB', link: '#'}], recordings: [], quizzes: [], assignments: []
    }
  },
  english: {
    'August 2024': {
      videoLessons: [{id: 'eng-aug-vid1', itemType: 'video', titleKey: 'lms.courseContent.english.aug.video1.title', duration: '12:00', descriptionKey: 'lms.courseContent.english.aug.video1.description', videoUrl: placeholderVideoUrl}],
      pdfNotes: [], recordings: [], quizzes: [], assignments: []
    }
  },
  ict: {
    'August 2024': {
      videoLessons: [{id: 'ict-aug-vid1', itemType: 'video', titleKey: 'lms.courseContent.ict.aug.video1.title', duration: '18:30', descriptionKey: 'lms.courseContent.ict.aug.video1.description', videoUrl: placeholderVideoUrl}],
      pdfNotes: [], recordings: [], quizzes: [], assignments: []
    },
     'September 2024': { videoLessons: [], pdfNotes: [], recordings: [], quizzes: [], assignments: [] }
  }
};
