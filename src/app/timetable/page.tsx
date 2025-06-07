
"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Icons from '@/components/icons';
import type { TimetableEntryDefinition } from '@/types';
import { useLanguage } from '@/contexts/language-context';

const timetableData: TimetableEntryDefinition[] = [
  { id: 'tt1', day: 'Monday', time: '4:00 PM - 6:00 PM', subjectKey: 'mathematics', teacher: 'Mr. A. Perera' },
  { id: 'tt2', day: 'Tuesday', time: '5:00 PM - 7:00 PM', subjectKey: 'science', teacher: 'Ms. B. Silva' },
  { id: 'tt3', day: 'Wednesday', time: '3:00 PM - 5:00 PM', subjectKey: 'english', teacher: 'Mr. C. Fernando' },
  { id: 'tt4', day: 'Thursday', time: '6:00 PM - 8:00 PM', subjectKey: 'ict', teacher: 'Ms. D. Kumari' },
  { id: 'tt5', day: 'Friday', time: '4:00 PM - 6:00 PM', subjectKey: 'mathematicsRevision', teacher: 'Mr. A. Perera' },
  { id: 'tt6', day: 'Saturday', time: '9:00 AM - 11:00 AM', subjectKey: 'scienceRevision', teacher: 'Ms. B. Silva' },
  { id: 'tt7', day: 'Saturday', time: '2:00 PM - 4:00 PM', subjectKey: 'englishPaperClass', teacher: 'Mr. C. Fernando' },
];

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
    <div className="space-y-12">
      <section className="text-center py-12 bg-primary/10 rounded-xl">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
          {getPageTitle()}
        </h1>
        <p className="text-xl text-foreground max-w-2xl mx-auto">
          {t('timetable.subtitle')}
        </p>
      </section>

      <section>
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Icons.CalendarDays className="w-8 h-8 text-accent" />
              <div>
                <CardTitle className="font-headline text-3xl text-primary">{t('timetable.card.title')}</CardTitle>
                <CardDescription>{t('timetable.card.description')}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {t('timetable.card.note')}
            </p>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">
                      {getTableHeaderText('timetable.table.headerDay', 'timetable.table.headerDayAdditionSinhala', 'timetable.table.headerDayAdditionTamil')}
                    </TableHead>
                    <TableHead className="font-semibold">
                      {getTableHeaderText('timetable.table.headerTime', 'timetable.table.headerTimeAdditionSinhala', 'timetable.table.headerTimeAdditionTamil')}
                    </TableHead>
                    <TableHead className="font-semibold">
                      {getTableHeaderText('timetable.table.headerSubject', 'timetable.table.headerSubjectAdditionSinhala', 'timetable.table.headerSubjectAdditionTamil')}
                    </TableHead>
                    <TableHead className="font-semibold">
                      {getTableHeaderText('timetable.table.headerTeacher', 'timetable.table.headerTeacherAdditionSinhala', 'timetable.table.headerTeacherAdditionTamil')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timetableData.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell>{entry.day}</TableCell> 
                      <TableCell>{entry.time}</TableCell>
                      <TableCell className="font-medium text-foreground">{getSubjectDisplay(entry.subjectKey)}</TableCell>
                      <TableCell>{entry.teacher}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
             <p className="mt-6 text-sm text-center text-accent font-semibold">
              {t('timetable.card.footerNote')}
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
