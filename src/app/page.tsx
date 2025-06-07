
"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icons from '@/components/icons';
import type { CourseDefinition, Testimonial, TimetableEntryDefinition } from '@/types';
import { useLanguage } from '@/contexts/language-context';
import { Badge } from '@/components/ui/badge'; 

const featuredCourseKeys: CourseDefinition[] = [
  { id: 'science', Icon: Icons.Microscope, imageHint: 'science laboratory' },
  { id: 'mathematics', Icon: Icons.Calculator, imageHint: 'mathematics equations' },
  { id: 'english', Icon: Icons.BookOpenText, imageHint: 'books library' },
  { id: 'ict', Icon: Icons.Laptop2, imageHint: 'computer technology' },
];

const testimonialsData: Testimonial[] = [
  { id: 't1', quoteKey: 'home.testimonials.quote1', name: 'Nimal Perera', roleKey: 'home.testimonials.roleStudent', avatarHint: 'smiling student', avatarUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzbWlsaW5nJTIwc3R1ZGVudHxlbnwwfHx8fDE3NDkzMjczMzh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 't2', quoteKey: 'home.testimonials.quote2', name: 'Kamala Silva', roleKey: 'home.testimonials.roleParent', avatarHint: 'happy parent', avatarUrl: 'https://images.unsplash.com/photo-1486704155675-e4c07f8ad160?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxoYXBweSUyMHBhcmVudHxlbnwwfHx8fDE3NDkzMjczMzd8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 't3', quoteKey: 'home.testimonials.quote3', name: 'Aisha Mohamed', roleKey: 'home.testimonials.roleStudent', avatarHint: 'focused student', avatarUrl: 'https://images.unsplash.com/photo-1699215395165-f5171c7f9556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxmb2N1c2VkJTIwc3R1ZGVudHxlbnwwfHx8fDE3NDkzMjczMzd8MA&ixlib=rb-4.1.0&q=80&w=1080' },
];

const whyChooseUsData = [
  { id: 'wc1', titleKey: 'home.whyChooseUs.item1.title', descriptionKey: 'home.whyChooseUs.item1.description', Icon: Icons.Users },
  { id: 'wc2', titleKey: 'home.whyChooseUs.item2.title', descriptionKey: 'home.whyChooseUs.item2.description', Icon: Icons.Clock },
  { id: 'wc3', titleKey: 'home.whyChooseUs.item3.title', descriptionKey: 'home.whyChooseUs.item3.description', Icon: Icons.Target },
];

const upcomingClassesData: Partial<TimetableEntryDefinition>[] = [
  { id: 'uc1', day: 'Monday', time: '4:00 PM - 6:00 PM', subjectKey: 'mathematics', teacher: 'Mr. A. Perera' },
  { id: 'uc2', day: 'Tuesday', time: '5:00 PM - 7:00 PM', subjectKey: 'science', teacher: 'Ms. B. Silva' },
  { id: 'uc3', day: 'Wednesday', time: '3:00 PM - 5:00 PM', subjectKey: 'english', teacher: 'Mr. C. Fernando' },
];

const AnimatedSection: React.FC<{children: React.ReactNode, className?: string, delay?: number}> = ({ children, className, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <section className={`${className || ''} transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      {children}
    </section>
  );
};


export default function HomePage() {
  const { t, language } = useLanguage();

  const getCourseName = (id: string) => {
    if (language === 'si') return t(`courses.subjects.${id}.sinhalaName`, t(`courses.subjects.${id}.name`));
    if (language === 'ta') return t(`courses.subjects.${id}.tamilName`, t(`courses.subjects.${id}.name`));
    return t(`courses.subjects.${id}.name`);
  };

  const getSubjectDisplay = (subjectKey: string) => {
    if (language === 'si') return t(`timetable.subjects.${subjectKey}Sinhala`, t(`timetable.subjects.${subjectKey}`));
    if (language === 'ta') return t(`timetable.subjects.${subjectKey}Tamil`, t(`timetable.subjects.${subjectKey}`));
    return t(`timetable.subjects.${subjectKey}`);
  };

  return (
    <div className="space-y-24 md:space-y-32">
      {/* Hero Section */}
      <section className="relative text-center py-24 md:py-40 min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-primary to-sky-400 dark:from-primary dark:to-sky-700 rounded-xl overflow-hidden">
         <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url('https://placehold.co/1600x900.png')", backgroundSize: 'cover', backgroundPosition: 'center'}} data-ai-hint="education background pattern"></div>
        <AnimatedSection className="relative z-10 container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            {t('home.hero.titleNew', 'Learn Smart. Learn Anywhere.')}
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-primary-foreground/90 mb-10 max-w-3xl mx-auto">
            {t('home.hero.subtitleNew', 'Join ගුරු ගෙදර E-School and unlock your potential with our expert-led G.C.E. O/L classes.')}
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6 rounded-lg transition-transform hover:scale-105">
            <Link href="/courses">{t('home.hero.joinButtonNew', 'Join a Class')}</Link>
          </Button>
        </AnimatedSection>
      </section>

      {/* Courses Section */}
      <AnimatedSection delay={200}>
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-primary mb-4">{t('nav.courses', 'Courses')}</h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">{t('home.featuredSubjects.subtitle', 'Explore the subjects we offer for G.C.E. O/L students.')}</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCourseKeys.map((courseDef) => (
            <Card key={courseDef.id} className="bg-card shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col group">
              <CardHeader className="items-center text-center p-6">
                <div className="p-4 bg-accent/10 rounded-full mb-4 transition-colors group-hover:bg-accent/20">
                  <courseDef.Icon className="w-14 h-14 text-accent transition-transform group-hover:scale-110" />
                </div>
                <CardTitle className="font-headline text-2xl font-semibold text-primary">{getCourseName(courseDef.id)}</CardTitle>
                 {(language === 'si' || language === 'ta') && (
                    <CardDescription className="text-sm text-foreground/80 mt-1">
                      {t(`courses.subjects.${courseDef.id}.name`)}
                    </CardDescription>
                  )}
              </CardHeader>
              <CardContent className="text-center flex-grow px-6 pb-4">
                <p className="text-base leading-relaxed text-muted-foreground">{t(`courses.subjects.${courseDef.id}.description`)}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Link href={`/courses/${courseDef.id}`}>{t('courses.viewDetailsButton', 'Learn More')}</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </AnimatedSection>

      {/* Why Choose Us Section */}
      <AnimatedSection delay={400} className="py-16 bg-secondary/50 dark:bg-secondary/20 rounded-xl">
        <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-primary mb-4">{t('home.whyChooseUs.title', 'Why Choose Us?')}</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">{t('home.whyChooseUs.subtitle', 'Discover the advantages of learning with ගුරු ගෙදර E-School.')}</p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {whyChooseUsData.map((item) => (
                <div key={item.id} className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-5">
                     <item.Icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-headline text-xl font-semibold text-primary mb-2">{t(item.titleKey)}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{t(item.descriptionKey)}</p>
                </div>
              ))}
            </div>
        </div>
      </AnimatedSection>
      
      {/* Upcoming Classes Section */}
      <AnimatedSection delay={600}>
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-primary mb-4">{t('home.upcomingClasses.title', 'Upcoming Classes')}</h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">{t('home.upcomingClasses.subtitle', 'Join our live interactive sessions.')}</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingClassesData.map((session) => (
            <Card key={session.id} className="bg-card shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col">
              <CardHeader className="p-6">
                 <Badge variant="secondary" className="absolute top-4 right-4">{session.day}</Badge>
                <CardTitle className="font-headline text-xl font-semibold text-primary">{getSubjectDisplay(session.subjectKey!)}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{session.time}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow px-6 pb-6">
                <p className="text-sm text-muted-foreground">{t('home.upcomingClasses.taughtBy', 'Taught by:')} <span className="font-medium text-foreground">{session.teacher}</span></p>
              </CardContent>
               <div className="p-6 pt-0">
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href={`/timetable`}>{t('home.upcomingClasses.viewTimetable', 'View Full Timetable')}</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection delay={800} className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-primary mb-4">{t('home.testimonials.title', 'Student Feedback')}</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">{t('home.testimonials.subtitle', 'Hear what our students and parents have to say.')}</p>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial) => (
              <Card key={testimonial.id} className="bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
                <CardContent className="pt-8 p-6 flex-grow flex flex-col">
                  <Icons.Quote className="w-10 h-10 text-accent mb-5 transform rotate-180" />
                  <p className="text-lg text-foreground italic mb-6 leading-relaxed flex-grow">"{t(testimonial.quoteKey)}"</p>
                  <div className="flex items-center space-x-4 mt-auto pt-4 border-t border-border">
                    <Image
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                      data-ai-hint={testimonial.avatarHint}
                    />
                    <div>
                      <p className="font-semibold text-primary text-md">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{t(testimonial.roleKey, testimonial.roleKey.includes('Student') ? 'Student' : 'Parent')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

