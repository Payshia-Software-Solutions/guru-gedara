
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import Icons from '@/components/icons';
import { useLanguage } from '@/contexts/language-context';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress'; // Import Progress component

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

// Placeholder data
const enrolledCoursesData = [
  { id: 'science', titleKey: 'courses.subjects.science.name', progress: 75, Icon: Icons.Microscope },
  { id: 'mathematics', titleKey: 'courses.subjects.mathematics.name', progress: 40, Icon: Icons.Calculator },
  { id: 'english', titleKey: 'courses.subjects.english.name', progress: 60, Icon: Icons.BookOpenText },
];

const announcementsData = [
  { id: 'an1', titleKey: 'lms.announcements.item1.title', date: '2024-08-10', contentKey: 'lms.announcements.item1.content', courseContextKey: 'lms.announcements.item1.courseContext' },
  { id: 'an2', titleKey: 'lms.announcements.item2.title', date: '2024-08-05', contentKey: 'lms.announcements.item2.content' },
  { id: 'an3', titleKey: 'lms.announcements.item3.title', date: '2024-07-28', contentKey: 'lms.announcements.item3.content', courseContextKey: 'lms.announcements.item3.courseContext' },
];

export default function LmsDashboardPage() {
  const { t, language } = useLanguage();

  const getPageTitle = () => {
    if (language === 'si') return t('dashboard.titleSinhala', t('dashboard.title'));
    if (language === 'ta') return t('dashboard.titleTamil', t('dashboard.title'));
    return t('dashboard.title');
  };

  const getCourseName = (titleKey: string) => {
    const fallbackName = t(titleKey); 
    const idParts = titleKey.split('.');
    if (idParts.length < 3) return fallbackName;
    const id = idParts[2]; 

    if (language === 'si') {
      const sinhalaNameKey = `courses.subjects.${id}.sinhalaName`;
      return t(sinhalaNameKey, fallbackName);
    }
    if (language === 'ta') {
      const tamilNameKey = `courses.subjects.${id}.tamilName`;
      return t(tamilNameKey, fallbackName);
    }
    return fallbackName;
  }

  const recentAnnouncements = announcementsData.slice(0, 3);

  return (
    <div className="space-y-8 md:space-y-12">
      <AnimatedSection>
        <div className="text-left pb-8 md:pb-10 border-b mb-8 md:mb-12">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-2">
            {getPageTitle()}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('dashboard.subtitle', "Your personal learning space.")}
          </p>
        </div>
      </AnimatedSection>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Main content area for courses */}
        <AnimatedSection delay={200} className="lg:col-span-2 space-y-8">
          <Card className="shadow-xl border-none bg-card">
            <CardHeader className="p-5 sm:p-6">
              <div className="flex items-center space-x-3">
                <Icons.BookMarked className="w-7 h-7 text-primary" />
                <CardTitle className="font-headline text-2xl md:text-3xl text-primary">
                  {t('dashboard.myCourses.title', "My Courses")}
                </CardTitle>
              </div>
               <CardDescription className="text-muted-foreground pt-1">{t('dashboard.myCourses.subtitle', "Continue your learning journey.")}</CardDescription>
            </CardHeader>
            <CardContent className="p-5 sm:p-6 space-y-6">
              {enrolledCoursesData.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {enrolledCoursesData.map(course => (
                    <Card key={course.id} className="bg-background/70 dark:bg-card/80 hover:shadow-lg transition-shadow flex flex-col">
                      <CardHeader className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <course.Icon className="w-7 h-7 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-semibold text-primary">{getCourseName(course.titleKey)}</CardTitle>
                            {(language === 'si' || language === 'ta') && (
                              <CardDescription className="text-xs text-muted-foreground">
                                {t(course.titleKey)}
                              </CardDescription>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 flex-grow">
                         <div className="text-xs text-muted-foreground mb-1">{t('dashboard.progressLabel', 'Progress')}: {course.progress}%</div>
                         <Progress value={course.progress} className="h-2" />
                         <p className="text-xs text-accent mt-2 font-medium">{t('dashboard.myCourses.nextUpPlaceholder', 'Next: Introduction Quiz')}</p>
                      </CardContent>
                      <CardFooter className="p-4 border-t">
                        <Button asChild variant="default" size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          <Link href={`/lms/courses/${course.id}/content`}>
                            {t('dashboard.myCourses.viewContentButton', 'View Content')} <Icons.ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="mt-4 p-6 border border-dashed rounded-lg text-center text-muted-foreground">
                  <Icons.BookOpenText className="w-12 h-12 mx-auto text-muted-foreground mb-3"/>
                  <p className="font-semibold text-lg">{t('dashboard.myCourses.noCoursesYet.title', "No Courses Yet")}</p>
                  <p className="text-sm mb-4">{t('dashboard.myCourses.noCoursesYet.description', "Explore available courses and enroll to start learning.")}</p>
                  <Button asChild variant="outline">
                    <Link href="/courses">
                        <Icons.Sparkles className="mr-2 h-4 w-4"/>
                        {t('dashboard.myCourses.noCoursesYet.exploreButton', "Explore Courses")}
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Sidebar-like content for announcements */}
        <AnimatedSection delay={400} className="lg:col-span-1 space-y-8">
          <Card className="shadow-xl border-none bg-card">
            <CardHeader className="p-5 sm:p-6">
               <div className="flex items-center space-x-3">
                <Icons.Megaphone className="w-7 h-7 text-primary" />
                <CardTitle className="font-headline text-2xl md:text-3xl text-primary">
                  {t('dashboard.recentAnnouncements.title', "Recent Announcements")}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-5 sm:p-6 space-y-4">
              {recentAnnouncements.length > 0 ? (
                recentAnnouncements.map(announcement => (
                  <Link href="/lms/announcements" key={announcement.id} className="block p-4 border rounded-lg bg-background/70 dark:bg-card/80 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-md text-foreground group-hover:text-primary">{t(announcement.titleKey)}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{announcement.date}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{t(announcement.contentKey)}</p>
                  </Link>
                ))
              ) : (
                 <div className="mt-4 p-6 border border-dashed rounded-lg text-center text-muted-foreground">
                    <Icons.Megaphone className="w-12 h-12 mx-auto text-muted-foreground mb-3"/>
                    <p>{t('dashboard.announcements.noAnnouncements', "No new announcements.")}</p>
                </div>
              )}
            </CardContent>
            {announcementsData.length > 0 && (
                <CardFooter className="p-5 sm:p-6 border-t">
                    <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href="/lms/announcements">
                            {t('dashboard.recentAnnouncements.viewAllButton', "View All Announcements")} <Icons.ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            )}
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}
