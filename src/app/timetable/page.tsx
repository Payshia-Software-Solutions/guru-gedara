
"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Icons from '@/components/icons';
import type { TimetableEntryDefinition } from '@/types'; // Renamed
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

  const getSubjectDisplay = (subjectKey: string) => {
    return language === 'si' ? t(`timetable.subjects.${subjectKey}Sinhala`) : t(`timetable.subjects.${subjectKey}`);
  };
  
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-primary/10 rounded-xl">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
          {language === 'si' ? t('timetable.titleSinhala') : t('timetable.title')}
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
                      {t('timetable.table.headerDay')} ({language === 'si' || language === 'ta' ? t('timetable.table.headerDaySinhala') : ''})
                    </TableHead>
                    <TableHead className="font-semibold">
                      {t('timetable.table.headerTime')} ({language === 'si' || language === 'ta' ? t('timetable.table.headerTimeSinhala') : ''})
                    </TableHead>
                    <TableHead className="font-semibold">
                      {t('timetable.table.headerSubject')} ({language === 'si' || language === 'ta' ? t('timetable.table.headerSubjectSinhala') : ''})
                    </TableHead>
                    <TableHead className="font-semibold">
                      {t('timetable.table.headerTeacher')} ({language === 'si' || language === 'ta' ? t('timetable.table.headerTeacherSinhala') : ''})
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timetableData.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell>{entry.day}</TableCell> {/* Day names are usually fine in English or handled by date libs */}
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

    