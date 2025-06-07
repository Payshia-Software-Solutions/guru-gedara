
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Icons from '@/components/icons';
import { useLanguage } from '@/contexts/language-context';
import { Badge } from '@/components/ui/badge';

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
  { id: 'science', titleKey: 'courses.subjects.science.name', progress: 75, imageHint: "science flask" },
  { id: 'mathematics', titleKey: 'courses.subjects.mathematics.name', progress: 40, imageHint: "math symbols" },
];

const announcementsData = [
  { id: 'an1', titleKey: 'dashboard.announcements.item1.title', date: '2024-07-28', contentKey: 'dashboard.announcements.item1.content' },
  { id: 'an2', titleKey: 'dashboard.announcements.item2.title', date: '2024-07-25', contentKey: 'dashboard.announcements.item2.content' },
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
    if (idParts.length < 3) return fallbackName; // Safety check for key structure
    const id = idParts[2]; 

    if (language === 'si') {
      const sinhalaNameKey = 'courses.subjects.' + id + '.sinhalaName';
      return t(sinhalaNameKey, fallbackName);
    }
    if (language === 'ta') {
      const tamilNameKey = 'courses.subjects.' + id + '.tamilName';
      return t(tamilNameKey, fallbackName);
    }
    return fallbackName;
  }

  return (
    <div className="space-y-8 md:space-y-12">
      <AnimatedSection>
        <div className="text-left pb-8 md:pb-12 border-b">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-2">
            {getPageTitle()}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('dashboard.subtitle', "Your personal learning space.")}
          </p>
        </div>
      </AnimatedSection>

      <div className="space-y-10">
        <AnimatedSection delay={200}>
          <Card className="shadow-xl border-none bg-card">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Icons.BookMarked className="w-7 h-7 text-primary" />
                <CardTitle className="font-headline text-2xl md:text-3xl text-primary">
                  {t('dashboard.myCourses', "My Courses")}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {enrolledCoursesData.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {enrolledCoursesData.map(course => (
                    <Card key={course.id} className="bg-background/50 dark:bg-card/70 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-xl text-primary">{getCourseName(course.titleKey)}</CardTitle>
                      </CardHeader>
                      <CardContent>
                         <div className="text-sm text-muted-foreground mb-2">{t('dashboard.progressLabel', 'Progress')}: {course.progress}%</div>
                         <div className="w-full bg-muted rounded-full h-2.5">
                           <div className="bg-accent h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                         </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={`/courses/${course.id}`}>
                            <Icons.ArrowRight className="mr-2 h-4 w-4" />
                            {t('dashboard.goToCourse', 'Go to Course')}
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="mt-4 p-4 border border-dashed rounded-md text-center text-muted-foreground">
                  {t('dashboard.noCoursesYet', "No courses enrolled yet.")}
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <Card className="shadow-xl border-none bg-card">
            <CardHeader>
               <div className="flex items-center space-x-3">
                <Icons.Megaphone className="w-7 h-7 text-primary" />
                <CardTitle className="font-headline text-2xl md:text-3xl text-primary">
                  {t('dashboard.announcements.title', "Announcements")}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {announcementsData.length > 0 ? (
                announcementsData.map(announcement => (
                  <div key={announcement.id} className="p-4 border rounded-lg bg-background/50 dark:bg-card/70">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-lg text-foreground">{t(announcement.titleKey)}</h4>
                      <Badge variant="secondary" className="text-xs">{announcement.date}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{t(announcement.contentKey)}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">{t('dashboard.announcements.noAnnouncements', "No new announcements.")}</p>
              )}
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}
