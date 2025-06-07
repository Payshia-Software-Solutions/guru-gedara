
"use client";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icons from '@/components/icons';
import { useLanguage } from '@/contexts/language-context';
import React, { useEffect, useState } from 'react';

const teachersData = [
  { name: "Mr. A. B. C. Perera", roleKey: "about.educators.teacher1Role", imageHint: "teacher portrait" },
  { name: "Ms. D. E. F. Silva", roleKey: "about.educators.teacher2Role", imageHint: "educator smiling" }
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

export default function AboutPage() {
  const { t, language } = useLanguage();

  const getPageTitle = () => {
    if (language === 'si') return t('about.titleSinhala', 'අප ගැන');
    if (language === 'ta') return t('about.titleTamil', t('about.title'));
    return t('about.title', 'About Us');
  };

  const getMissionTitle = () => {
    if (language === 'si') return t('about.mission.titleSinhala');
    if (language === 'ta') return t('about.mission.titleTamil', t('about.mission.title'));
    return t('about.mission.title');
  };

  const getEducatorsTitle = () => {
    if (language === 'si') return t('about.educators.titleSinhala');
    if (language === 'ta') return t('about.educators.titleTamil', t('about.educators.title'));
    return t('about.educators.title');
  };

  return (
    <div className="space-y-24 md:space-y-32">
      <AnimatedSection>
        <div className="text-center py-16 md:py-24 bg-gradient-to-br from-primary to-sky-400 dark:from-primary dark:to-sky-700 rounded-xl">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            {getPageTitle()}
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            {t('about.subtitle', 'Learn more about ගුරු ගෙදර E-School, our mission, and our dedicated team.')}
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <Card className="shadow-lg border-none bg-card overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <Image 
                src="https://placehold.co/800x600.png"
                alt={t('about.mission.image1Alt', "Online class in session")} 
                width={800} 
                height={600} 
                className="object-cover w-full h-64 md:h-full"
                data-ai-hint="students online class" 
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="font-headline text-3xl text-primary flex items-center">
                  <Icons.Award className="w-8 h-8 mr-3 text-accent" /> 
                  {getMissionTitle()}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4 text-foreground/90">
                <p className="text-lg leading-relaxed">
                  {t('about.mission.p1')}
                </p>
                <p className="text-lg leading-relaxed">
                  {t('about.mission.p2')}
                </p>
              </CardContent>
            </div>
          </div>
        </Card>
      </AnimatedSection>

      <AnimatedSection delay={400}>
        <Card className="shadow-lg border-none bg-card overflow-hidden">
           <div className="md:flex md:flex-row-reverse">
            <div className="md:w-1/2">
              <Image 
                src="https://placehold.co/800x600.png"
                alt={t('about.mission.image2Alt', "Teacher guiding students")} 
                width={800} 
                height={600} 
                className="object-cover w-full h-64 md:h-full"
                data-ai-hint="teacher online education"
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="font-headline text-3xl text-primary flex items-center">
                  <Icons.Users className="w-8 h-8 mr-3 text-accent" /> 
                  {getEducatorsTitle()}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4 text-foreground/90">
                <p className="text-lg leading-relaxed">
                  {t('about.educators.p1')}
                </p>
                <p className="text-lg leading-relaxed">
                  {t('about.educators.p2')}
                </p>
              </CardContent>
            </div>
          </div>
        </Card>
      </AnimatedSection>
      
      <AnimatedSection delay={600} className="mt-12 grid sm:grid-cols-1 md:grid-cols-2 gap-8">
          {teachersData.map(teacher => (
            <Card key={teacher.name} className="flex flex-col items-center text-center p-6 md:p-8 bg-card shadow-lg hover:shadow-xl transition-shadow">
              <Image 
                src={`https://placehold.co/120x120.png`}
                alt={t('about.educators.teacherImageAlt', `Educator ${teacher.name}`, { name: teacher.name })} 
                width={120} 
                height={120} 
                className="rounded-full mb-5 border-4 border-accent/50"
                data-ai-hint={teacher.imageHint}
              />
              <h3 className="font-semibold text-xl text-primary mb-1">{teacher.name}</h3>
              <p className="text-sm text-accent font-medium">{t(teacher.roleKey)}</p>
            </Card>
          ))}
        </AnimatedSection>

      <AnimatedSection delay={800} className="text-center py-12">
        <p className="font-headline text-3xl text-accent mb-3">
          {t('about.quote.kannada')}
        </p>
        <p className="text-lg text-muted-foreground mb-6">({t('about.quote.english')})</p>
         <p className="text-xl text-primary font-semibold">
           {t('about.quote.cta')}
        </p>
      </AnimatedSection>
    </div>
  );
}
