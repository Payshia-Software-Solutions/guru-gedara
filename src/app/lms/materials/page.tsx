
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Icons from '@/components/icons';
import { useLanguage } from '@/contexts/language-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface LearningMaterial {
  id: string;
  titleKey: string;
  descriptionKey: string;
  type: 'PDF' | 'Video' | 'Link' | 'Presentation';
  courseContextKey: string; // e.g., 'courses.subjects.science.name'
  link: string; // URL to the material
  dateAdded: string;
}

const learningMaterialsData: LearningMaterial[] = [
  {
    id: 'lm1',
    titleKey: 'lms.materials.item1.title',
    descriptionKey: 'lms.materials.item1.description',
    type: 'PDF',
    courseContextKey: 'courses.subjects.science.name',
    link: '#', // Placeholder link
    dateAdded: '2024-08-01',
  },
  {
    id: 'lm2',
    titleKey: 'lms.materials.item2.title',
    descriptionKey: 'lms.materials.item2.description',
    type: 'Video',
    courseContextKey: 'courses.subjects.mathematics.name',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder video link
    dateAdded: '2024-07-25',
  },
  {
    id: 'lm3',
    titleKey: 'lms.materials.item3.title',
    descriptionKey: 'lms.materials.item3.description',
    type: 'Link',
    courseContextKey: 'courses.subjects.english.name',
    link: '#', // Placeholder link
    dateAdded: '2024-07-20',
  },
  {
    id: 'lm4',
    titleKey: 'lms.materials.item4.title',
    descriptionKey: 'lms.materials.item4.description',
    type: 'Presentation',
    courseContextKey: 'courses.subjects.ict.name',
    link: '#', // Placeholder link
    dateAdded: '2024-08-05',
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

export default function LearningMaterialsPage() {
  const { t, language } = useLanguage();

  const getPageTitle = () => {
    if (language === 'si') return t('lms.materials.titleSinhala', t('lms.materials.title'));
    if (language === 'ta') return t('lms.materials.titleTamil', t('lms.materials.title'));
    return t('lms.materials.title');
  };

  const getMaterialTypeIcon = (type: LearningMaterial['type']) => {
    switch (type) {
      case 'PDF': return <Icons.FileText className="w-5 h-5 text-destructive group-hover:text-destructive/80" />;
      case 'Video': return <Icons.PlayCircle className="w-5 h-5 text-red-500 group-hover:text-red-500/80" />;
      case 'Link': return <Icons.Link className="w-5 h-5 text-blue-500 group-hover:text-blue-500/80" />; // You might need to add Link icon to Icons.tsx
      case 'Presentation': return <Icons.MonitorSmartphone className="w-5 h-5 text-purple-500 group-hover:text-purple-500/80" />; // Example, replace with better icon
      default: return <Icons.FolderOpen className="w-5 h-5 text-muted-foreground" />;
    }
  };
  
  const getAccessButtonText = (type: LearningMaterial['type']) => {
    switch (type) {
      case 'PDF': return t('lms.materials.buttons.downloadPdf', "Download PDF");
      case 'Video': return t('lms.materials.buttons.watchVideo', "Watch Video");
      case 'Link': return t('lms.materials.buttons.openLink', "Open Link");
      case 'Presentation': return t('lms.materials.buttons.viewPresentation', "View Presentation");
      default: return t('lms.materials.buttons.accessMaterial', "Access Material");
    }
  };


  return (
    <div className="space-y-8 md:space-y-12">
      <AnimatedSection>
        <div className="text-left pb-8 md:pb-12 border-b">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-2">
            {getPageTitle()}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('lms.materials.subtitle', "Find all your course notes, videos, and additional resources here.")}
          </p>
        </div>
      </AnimatedSection>

      {learningMaterialsData.length > 0 ? (
        <AnimatedSection delay={200} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningMaterialsData.map((material) => (
            <Card 
              key={material.id} 
              className="bg-card shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col group"
            >
              <CardHeader className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs py-1 px-2 border-primary/50 text-primary">
                        {t(material.courseContextKey, material.courseContextKey.split('.').pop())}
                    </Badge>
                     <Badge variant="secondary" className="text-xs py-1 px-2">{material.dateAdded}</Badge>
                </div>
                <CardTitle className="font-headline text-lg md:text-xl text-primary flex items-start gap-2">
                   <span className="mt-0.5">{getMaterialTypeIcon(material.type)}</span>
                   <span>{t(material.titleKey)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-5 pt-0 flex-grow">
                <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">{t(material.descriptionKey)}</p>
              </CardContent>
              <CardFooter className="p-4 sm:p-5 pt-0">
                <Button asChild size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-transform group-hover:scale-105">
                  <Link href={material.link} target="_blank" rel="noopener noreferrer">
                    {getAccessButtonText(material.type)} 
                    {material.type === 'Link' || material.type === 'Video' ? <Icons.ExternalLink className="ml-2 h-4 w-4" /> : <Icons.Download className="ml-2 h-4 w-4"/>}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </AnimatedSection>
      ) : (
        <AnimatedSection delay={200}>
          <Card className="text-center p-8 md:p-12 bg-card shadow-lg">
            <Icons.FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-primary mb-3">{t('lms.materials.noMaterials.title', "No Learning Materials Available")}</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">{t('lms.materials.noMaterials.description', "There are no learning materials uploaded yet. Please check back later or contact your instructor.")}</p>
          </Card>
        </AnimatedSection>
      )}
    </div>
  );
}

    

