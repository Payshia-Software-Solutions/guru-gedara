
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import Icons from '@/components/icons';
import { useLanguage } from '@/contexts/language-context';

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

export default function DashboardPage() {
  const { t, language } = useLanguage();
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, you would clear session/token here
    console.log("User logged out (simulated)");
    router.push('/'); // Redirect to homepage after logout
  };

  const getPageTitle = () => {
    if (language === 'si') return t('dashboard.titleSinhala', t('dashboard.title'));
    if (language === 'ta') return t('dashboard.titleTamil', t('dashboard.title'));
    return t('dashboard.title');
  };

  return (
    <div className="space-y-24 md:space-y-32">
      <AnimatedSection>
        <div className="text-center py-16 md:py-24 bg-gradient-to-br from-primary to-sky-400 dark:from-primary dark:to-sky-700 rounded-xl">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            {getPageTitle()}
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            {t('dashboard.subtitle', "Your personal learning space.")}
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={200} className="max-w-3xl mx-auto">
        <Card className="shadow-xl border-none bg-card p-4 sm:p-6">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-3">
              <Icons.LayoutDashboard className="w-8 h-8 text-primary" />
              <CardTitle className="font-headline text-2xl md:text-3xl text-primary">
                {t('dashboard.welcomeTitle', "Welcome Student!")}
              </CardTitle>
            </div>
            <CardDescription className="text-muted-foreground text-base">
              {t('dashboard.welcomeMessage', "This is your personal dashboard. Here you will find your enrolled courses, progress, assignments, and learning materials. Start your learning journey!")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 mt-4">
            <div>
              <h3 className="font-semibold text-xl text-primary mb-2">{t('dashboard.myCourses', "My Courses")}</h3>
              <p className="text-muted-foreground">
                {t('dashboard.myCoursesPlaceholder', "Your enrolled courses will be listed here. (Placeholder)")}
              </p>
              {/* Placeholder for course list */}
              <div className="mt-4 p-4 border border-dashed rounded-md text-center text-muted-foreground">
                {t('dashboard.noCoursesYet', "No courses enrolled yet.")}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-xl text-primary mb-2">{t('dashboard.myProgress', "My Progress")}</h3>
              <p className="text-muted-foreground">
                {t('dashboard.myProgressPlaceholder', "Your learning progress and achievements will be displayed here. (Placeholder)")}
              </p>
               {/* Placeholder for progress */}
              <div className="mt-4 p-4 border border-dashed rounded-md text-center text-muted-foreground">
                {t('dashboard.progressTrackingComingSoon', "Progress tracking coming soon!")}
              </div>
            </div>
          </CardContent>
          <CardFooter className="mt-6 pt-6 border-t">
            <Button onClick={handleLogout} variant="outline" className="w-full md:w-auto">
              <Icons.LogOut className="mr-2 h-5 w-5" />
              {t('dashboard.logoutButton', "Logout")}
            </Button>
          </CardFooter>
        </Card>
      </AnimatedSection>
    </div>
  );
}
