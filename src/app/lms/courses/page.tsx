
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import Icons from '@/components/icons';
import { useLanguage } from '@/contexts/language-context';
import { Badge } from '@/components/ui/badge';
import type { CourseDefinition } from '@/types';

// Placeholder data for enrolled courses - in a real app, this would come from a user's profile/API
const enrolledCoursesData: CourseDefinition[] = [
  { id: 'science', Icon: Icons.Microscope, imageHint: 'science lab tools' },
  { id: 'mathematics', Icon: Icons.Calculator, imageHint: 'math graph paper' },
  // { id: 'english', Icon: Icons.BookOpenText, imageHint: 'classic books stack' }, // Example of potentially more courses
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

export default function MyCoursesPage() {
  const { t, language } = useLanguage();

  const getPageTitle = () => {
    if (language === 'si') return t('lms.myCourses.titleSinhala', t('lms.myCourses.title'));
    if (language === 'ta') return t('lms.myCourses.titleTamil', t('lms.myCourses.title'));
    return t('lms.myCourses.title');
  };

  const getCourseName = (id: string) => {
    const fallbackName = t(`courses.subjects.${id}.name`); // English name as fallback
    if (language === 'si') return t(`courses.subjects.${id}.sinhalaName`, fallbackName);
    if (language === 'ta') return t(`courses.subjects.${id}.tamilName`, fallbackName);
    return fallbackName;
  };

  return (
    <div className="space-y-8 md:space-y-12">
      <AnimatedSection>
        <div className="text-left pb-8 md:pb-12 border-b">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-2">
            {getPageTitle()}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('lms.myCourses.subtitle', "Access your enrolled courses, view content, and track your progress.")}
          </p>
        </div>
      </AnimatedSection>

      {enrolledCoursesData.length > 0 ? (
        <AnimatedSection delay={200} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {enrolledCoursesData.map((course) => (
            <Card key={course.id} className="bg-card shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col group">
              <CardHeader className="p-0 relative">
                <Image 
                  src={`https://placehold.co/600x350.png`} 
                  alt={t('lms.myCourses.courseImageAlt', `Image for ${getCourseName(course.id)}`, { courseName: getCourseName(course.id) })}
                  width={600}
                  height={350}
                  className="rounded-t-lg object-cover w-full aspect-[16/9]"
                  data-ai-hint={course.imageHint}
                />
                <Badge variant="secondary" className="absolute top-3 right-3 bg-green-500/80 text-white dark:bg-green-600/80 dark:text-white text-xs px-2 py-1">
                  {t('lms.myCourses.enrolledBadge', "Enrolled")}
                </Badge>
              </CardHeader>
              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                 <div className="flex items-start space-x-3 mb-4">
                    <div className="p-2.5 bg-primary/10 rounded-full transition-colors group-hover:bg-primary/20">
                        <course.Icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary transition-transform group-hover:scale-110" />
                    </div>
                    <div>
                        <CardTitle className="font-headline text-lg sm:text-xl md:text-2xl font-semibold text-primary mb-1">{getCourseName(course.id)}</CardTitle>
                        {(language === 'si' || language === 'ta') && (
                            <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                            {t(`courses.subjects.${course.id}.name`)} {/* English name as secondary info */}
                            </CardDescription>
                        )}
                    </div>
                </div>
                <CardContent className="p-0 text-muted-foreground flex-grow mb-5">
                  <p className="text-sm leading-relaxed line-clamp-3">{t(`courses.subjects.${course.id}.description`)}</p>
                  {/* Placeholder for progress bar or next lesson */}
                  <div className="mt-3">
                    <p className="text-xs text-accent font-medium">{t('lms.myCourses.placeholder.nextUp', "Next up: Introduction Video")}</p>
                  </div>
                </CardContent>
                <CardFooter className="p-0 mt-auto">
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 sm:py-3 text-sm sm:text-base rounded-md transition-transform group-hover:scale-105">
                    <Link href={`/lms/courses/${course.id}/content`}>
                      {t('lms.myCourses.viewContentButton', "View Course Content")} <Icons.ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </AnimatedSection>
      ) : (
        <AnimatedSection delay={200}>
          <Card className="text-center p-6 sm:p-8 md:p-12 bg-card shadow-lg">
            <Icons.BookOpenText className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-3">{t('lms.myCourses.noCourses.title', "No Courses Enrolled Yet")}</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-md mx-auto">{t('lms.myCourses.noCourses.description', "It looks like you haven't enrolled in any courses. Explore our available courses and start your learning journey!")}</p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3">
              <Link href="/courses">
                {t('lms.myCourses.noCourses.exploreButton', "Explore Courses")}
              </Link>
            </Button>
          </Card>
        </AnimatedSection>
      )}
    </div>
  );
}

