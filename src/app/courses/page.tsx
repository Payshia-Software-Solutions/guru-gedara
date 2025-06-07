
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icons from '@/components/icons';
import type { CourseDefinition } from '@/types'; 
import { useLanguage } from '@/contexts/language-context';
import React, { useEffect, useState } from 'react';

const coursesData: CourseDefinition[] = [
  { 
    id: 'science', 
    Icon: Icons.Microscope,
    imageHint: 'science experiment'
  },
  { 
    id: 'mathematics', 
    Icon: Icons.Calculator,
    imageHint: 'math problems'
  },
  { 
    id: 'english', 
    Icon: Icons.BookOpenText,
    imageHint: 'english learning'
  },
  { 
    id: 'ict', 
    Icon: Icons.Laptop2,
    imageHint: 'ict class'
  },
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

export default function CoursesPage() {
  const { t, language } = useLanguage();

  const getPageTitle = () => {
    if (language === 'si') return t('courses.titleSinhala');
    if (language === 'ta') return t('courses.titleTamil', t('courses.title'));
    return t('courses.title');
  };

  const getCourseName = (id: string) => {
    if (language === 'si') return t(`courses.subjects.${id}.sinhalaName`);
    if (language === 'ta') return t(`courses.subjects.${id}.tamilName`, t(`courses.subjects.${id}.name`));
    return t(`courses.subjects.${id}.name`);
  };
  
  const getViewDetailsButtonText = () => {
    let text = t('courses.viewDetailsButton', 'Learn More');
    if (language === 'si') text = t('courses.viewDetailsButtonAdditionSinhala', text);
    if (language === 'ta') text = t('courses.viewDetailsButtonAdditionTamil', text);
    return text;
  };

  return (
    <div className="space-y-24 md:space-y-32">
      <AnimatedSection>
        <div className="text-center py-16 md:py-24 bg-gradient-to-br from-primary to-sky-400 dark:from-primary dark:to-sky-700 rounded-xl">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            {getPageTitle()}
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            {t('courses.subtitle')}
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={200} className="grid md:grid-cols-2 gap-10">
        {coursesData.map((courseDef) => (
          <Card key={courseDef.id} className="bg-card shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col group transform hover:-translate-y-2">
            <CardHeader className="p-0">
               <Image 
                  src={`https://placehold.co/600x350.png`}
                  alt={t(`courses.subjects.${courseDef.id}.imageAlt`, `${getCourseName(courseDef.id)} illustration`)}
                  width={600}
                  height={350}
                  className="rounded-t-lg object-cover w-full aspect-[16/9]"
                  data-ai-hint={courseDef.imageHint}
                />
            </CardHeader>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-start space-x-4 mb-4">
                <div className="p-3 bg-accent/10 rounded-full transition-colors group-hover:bg-accent/20">
                  <courseDef.Icon className="w-10 h-10 text-accent transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <CardTitle className="font-headline text-2xl font-semibold text-primary">{getCourseName(courseDef.id)}</CardTitle>
                  {(language === 'si' || language === 'ta') && (
                    <CardDescription className="text-md text-muted-foreground mt-1">
                      {t(`courses.subjects.${courseDef.id}.name`)}
                    </CardDescription>
                  )}
                </div>
              </div>
              <CardContent className="p-0 text-muted-foreground flex-grow mb-6">
                <p className="text-base leading-relaxed">{t(`courses.subjects.${courseDef.id}.description`)}</p>
              </CardContent>
              <CardFooter className="p-0 mt-auto">
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-base rounded-md transition-transform group-hover:scale-105">
                  <Link href={`/courses/${courseDef.id}`}>
                    {getViewDetailsButtonText()} <Icons.ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </AnimatedSection>
    </div>
  );
}
