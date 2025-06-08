
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icons from '@/components/icons';
import type { CourseDefinition } from '@/types';
import { useLanguage } from '@/contexts/language-context';
import { Badge } from '@/components/ui/badge';
import React, { useEffect, useState } from 'react';

const coursesData: CourseDefinition[] = [
  { id: 'science', Icon: Icons.Microscope, imageHint: 'science classroom' },
  { id: 'mathematics', Icon: Icons.Calculator, imageHint: 'math chalkboard' },
  { id: 'english', Icon: Icons.BookOpenText, imageHint: 'library books' },
  { id: 'ict', Icon: Icons.Laptop2, imageHint: 'computer lab' },
];

const AnimatedSection: React.FC<{children: React.ReactNode, className?: string, delay?: number}> = ({ children, className, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`${className || ''} transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      {children}
    </div>
  );
};


export default function CourseDetailsPage() {
  const { t, language } = useLanguage();
  const params = useParams();
  const courseId = params.courseId as string;

  const course = coursesData.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="text-center py-20">
        <Icons.AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-destructive mb-4">{t('courseDetails.courseNotFound.title', 'Course Not Found')}</h1>
        <p className="text-muted-foreground mb-8 text-lg">{t('courseDetails.courseNotFound.message', 'The course you are looking for does not exist or may have been moved.')}</p>
        <Button asChild size="lg">
          <Link href="/courses">
            <Icons.ArrowLeft className="mr-2 h-5 w-5" />
            {t('courseDetails.backToCourses', 'Back to Courses')}
          </Link>
        </Button>
      </div>
    );
  }

  const getCourseName = (id: string) => {
    if (language === 'si') return t(`courses.subjects.${id}.sinhalaName`, t(`courses.subjects.${id}.name`));
    if (language === 'ta') return t(`courses.subjects.${id}.tamilName`, t(`courses.subjects.${id}.name`));
    return t(`courses.subjects.${id}.name`);
  };

  const courseName = getCourseName(course.id);

  const learningOutcomes = [
    t(`courseDetails.subjects.${course.id}.learningOutcome1`, `Default outcome 1 for ${course.id}`),
    t(`courseDetails.subjects.${course.id}.learningOutcome2`, `Default outcome 2 for ${course.id}`),
    t(`courseDetails.subjects.${course.id}.learningOutcome3`, `Default outcome 3 for ${course.id}`),
  ];

  const syllabusHighlights = [
     t(`courseDetails.subjects.${course.id}.syllabusHighlight1`, `Default highlight 1 for ${course.id}`),
     t(`courseDetails.subjects.${course.id}.syllabusHighlight2`, `Default highlight 2 for ${course.id}`),
     t(`courseDetails.subjects.${course.id}.syllabusHighlight3`, `Default highlight 3 for ${course.id}`),
  ];

  return (
    <div className="space-y-16 md:space-y-24">
      <AnimatedSection>
        <div className="mb-8">
          <Button variant="outline" asChild className="text-sm hover:bg-accent/10 transition-colors">
            <Link href="/courses">
              <Icons.ArrowLeft className="mr-2 h-4 w-4" />
              {t('courseDetails.backToCourses', 'Back to Courses')}
            </Link>
          </Button>
        </div>

        <div className="relative py-20 md:py-32 rounded-xl overflow-hidden bg-gradient-to-br from-primary to-sky-400 dark:from-primary dark:to-sky-700">
          <div className="absolute inset-0 z-0 opacity-10">
            <Image
              src={`https://placehold.co/1200x500.png`}
              alt={t('courseDetails.heroImageAlt', `Hero image for ${courseName}`, { courseName })}
              layout="fill"
              objectFit="cover"
              data-ai-hint={`${course.imageHint} panoramic education`}
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="inline-block p-4 bg-primary-foreground/20 dark:bg-primary-foreground/10 rounded-full mb-6 shadow-md">
              <course.Icon className="w-16 h-16 md:w-20 md:h-20 text-accent" />
            </div>
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              {courseName}
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-primary-foreground/90 max-w-3xl mx-auto">
              {t(`courses.subjects.${course.id}.description`)}
            </p>
          </div>
        </div>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-10 lg:gap-12 items-start">
        <div className="md:col-span-2 space-y-10">
          <AnimatedSection delay={200}>
            <Card className="shadow-xl border-none bg-card">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="font-headline text-2xl md:text-3xl text-primary flex items-center">
                  <Icons.FileText className="w-7 h-7 mr-3 text-accent" />
                  {t('courseDetails.overviewTitle', 'Course Overview')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0 text-foreground/90">
                <p className="text-base md:text-lg leading-relaxed">{t(`courseDetails.subjects.${course.id}.detailedDescription`, `Detailed description for ${courseName}. This course provides an in-depth exploration of key concepts, practical applications, and prepares students thoroughly for their G.C.E. O/L examinations. We focus on building a strong foundation and fostering critical thinking skills.`)}</p>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <Card className="shadow-xl border-none bg-card">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="font-headline text-2xl md:text-3xl text-primary flex items-center">
                  <Icons.Sparkles className="w-7 h-7 mr-3 text-accent" />
                  {t('courseDetails.whatYouWillLearnTitle', 'What You Will Learn')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0 text-foreground/90">
                <ul className="space-y-3">
                  {learningOutcomes.map((item, index) => (
                    <li key={index} className="text-base md:text-lg leading-relaxed flex items-start">
                       <Icons.CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={600}>
            <Card className="shadow-xl border-none bg-card">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="font-headline text-2xl md:text-3xl text-primary flex items-center">
                  <Icons.ListChecks className="w-7 h-7 mr-3 text-accent" />
                  {t('courseDetails.syllabusTitle', 'Syllabus Outline')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0 text-foreground/90">
                 <ul className="space-y-3">
                  {syllabusHighlights.map((item, index) => (
                    <li key={index} className="text-base md:text-lg leading-relaxed flex items-start">
                      <Icons.ChevronRight className="w-5 h-5 text-accent mr-2 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-muted-foreground italic">
                  {t('courseDetails.syllabusNote', 'Note: This is a general outline. The full syllabus will be covered comprehensively during the course.')}
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={800} className="space-y-8 md:sticky md:top-24">
          <Card className="shadow-xl border-none bg-card">
            <CardHeader className="p-4 md:p-6">
                <Image
                    src={`https://placehold.co/600x400.png`}
                    alt={t('courseDetails.instructorImageAlt', `Instructor for ${courseName}`, { courseName })}
                    width={600}
                    height={400}
                    className="rounded-lg object-cover mb-5 shadow-md aspect-video"
                    data-ai-hint="teacher professional friendly"
                />
              <CardTitle className="font-headline text-xl md:text-2xl text-primary flex items-center">
                <Icons.UserCircle className="w-7 h-7 mr-2 text-accent" />
                {t('courseDetails.instructorTitle', 'Meet Your Instructor')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0 text-foreground/90 space-y-2">
              <p className="font-semibold text-base md:text-lg">{t(`courseDetails.subjects.${course.id}.instructorName`, `Mr./Ms. Instructor Name for ${course.id}`)}</p>
              <p className="text-base leading-relaxed">{t(`courseDetails.subjects.${course.id}.instructorBio`, `An experienced and dedicated educator specializing in ${getCourseName(course.id)}, committed to helping students achieve their academic goals with engaging teaching methods.`)}</p>
              <Badge variant="secondary" className="bg-accent/10 text-accent-foreground dark:text-accent text-sm py-1 px-3">{t(`courseDetails.subjects.${course.id}.instructorExperience`, `10+ Years Experience`)}</Badge>
            </CardContent>
          </Card>
          <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-lg rounded-md transition-transform hover:scale-105">
            <Icons.Edit3 className="mr-2 h-5 w-5" />
            {t('courseDetails.enrollNow', 'Enroll in this Course')}
          </Button>
        </AnimatedSection>
      </div>
    </div>
  );
}

