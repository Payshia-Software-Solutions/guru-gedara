
"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Icons from '@/components/icons';
import type { TimetableEntryDefinition } from '@/types';
import { useLanguage } from '@/contexts/language-context';
import React, { useEffect, useState } from 'react';

const timetableData: TimetableEntryDefinition[] = [
  { id: 'tt1', day: 'Monday', time: '4:00 PM - 6:00 PM', subjectKey: 'mathematics', teacher: 'Mr. A. Perera' },
  { id: 'tt2', day: 'Tuesday', time: '5:00 PM - 7:00 PM', subjectKey: 'science', teacher: 'Ms. B. Silva' },
  { id: 'tt3', day: 'Wednesday', time: '3:00 PM - 5:00 PM', subjectKey: 'english', teacher: 'Mr. C. Fernando' },
  { id: 'tt4', day: 'Thursday', time: '6:00 PM - 8:00 PM', subjectKey: 'ict', teacher: 'Ms. D. Kumari' },
  { id: 'tt5', day: 'Friday', time: '4:00 PM - 6:00 PM', subjectKey: 'mathematicsRevision', teacher: 'Mr. A. Perera' },
  { id: 'tt6', day: 'Saturday', time: '9:00 AM - 11:00 AM', subjectKey: 'scienceRevision', teacher: 'Ms. B. Silva' },
  { id: 'tt7', day: 'Saturday', time: '2:00 PM - 4:00 PM', subjectKey: 'englishPaperClass', teacher: 'Mr. C. Fernando' },
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

export default function TimetablePage() {
  const { t, language } = useLanguage();

  const getPageTitle = () => {
    if (language === 'si') return t('timetable.titleSinhala');
    if (language === 'ta') return t('timetable.titleTamil', t('timetable.title'));
    return t('timetable.title');
  };

  const getSubjectDisplay = (subjectKey: string) => {
    if (language === 'si') return t(`timetable.subjects.${subjectKey}Sinhala`);
    if (language === 'ta') return t(`timetable.subjects.${subjectKey}Tamil`, t(`timetable.subjects.${subjectKey}`));
    return t(`timetable.subjects.${subjectKey}`);
  };

  const getTableHeaderText = (baseKey: string, additionSinhalaKey: string, additionTamilKey: string) => {
    let text = t(baseKey);
    if (language === 'si' && t(additionSinhalaKey)) text += ` (${t(additionSinhalaKey)})`;
    if (language === 'ta' && t(additionTamilKey)) text += ` (${t(additionTamilKey)})`;
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
            {t('timetable.subtitle')}
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <Card className="shadow-xl border-none bg-card overflow-hidden">
          <CardHeader className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <Icons.CalendarDays className="w-10 h-10 text-accent flex-shrink-0" />
                <div>
                  <CardTitle className="font-headline text-2xl md:text-3xl text-primary">{t('timetable.card.title')}</CardTitle>
                  <CardDescription className="text-muted-foreground mt-1">{t('timetable.card.description')}</CardDescription>
                </div>
              </div>
               <p className="text-sm text-muted-foreground bg-secondary/50 dark:bg-secondary/30 px-3 py-1.5 rounded-md">
                {t('timetable.card.footerNote')}
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-0 md:p-2">
            <p className="text-sm text-muted-foreground mb-6 px-6 md:px-8">
              {t('timetable.card.note')}
            </p>
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="bg-secondary/30 dark:bg-secondary/20">
                    <TableHead className="py-4 px-6 font-semibold text-primary">
                      {getTableHeaderText('timetable.table.headerDay', 'timetable.table.headerDayAdditionSinhala', 'timetable.table.headerDayAdditionTamil')}
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-primary">
                      {getTableHeaderText('timetable.table.headerTime', 'timetable.table.headerTimeAdditionSinhala', 'timetable.table.headerTimeAdditionTamil')}
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-primary">
                      {getTableHeaderText('timetable.table.headerSubject', 'timetable.table.headerSubjectAdditionSinhala', 'timetable.table.headerSubjectAdditionTamil')}
                    </TableHead>
                    <TableHead className="py-4 px-6 font-semibold text-primary">
                      {getTableHeaderText('timetable.table.headerTeacher', 'timetable.table.headerTeacherAdditionSinhala', 'timetable.table.headerTeacherAdditionTamil')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timetableData.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-muted/20 dark:hover:bg-muted/10 transition-colors border-b last:border-b-0">
                      <TableCell className="py-4 px-6">{entry.day}</TableCell> 
                      <TableCell className="py-4 px-6">{entry.time}</TableCell>
                      <TableCell className="py-4 px-6 font-medium text-foreground">{getSubjectDisplay(entry.subjectKey)}</TableCell>
                      <TableCell className="py-4 px-6">{entry.teacher}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}
