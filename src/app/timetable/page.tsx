import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Icons from '@/components/icons';
import type { TimetableEntry } from '@/types';

const timetableData: TimetableEntry[] = [
  { id: 'tt1', day: 'Monday', time: '4:00 PM - 6:00 PM', subject: 'Mathematics (ගණිතය)', teacher: 'Mr. A. Perera' },
  { id: 'tt2', day: 'Tuesday', time: '5:00 PM - 7:00 PM', subject: 'Science (විද්‍යාව)', teacher: 'Ms. B. Silva' },
  { id: 'tt3', day: 'Wednesday', time: '3:00 PM - 5:00 PM', subject: 'English (ඉංග්‍රීසි)', teacher: 'Mr. C. Fernando' },
  { id: 'tt4', day: 'Thursday', time: '6:00 PM - 8:00 PM', subject: 'ICT (තොරතුරු තාක්ෂණය)', teacher: 'Ms. D. Kumari' },
  { id: 'tt5', day: 'Friday', time: '4:00 PM - 6:00 PM', subject: 'Mathematics (ගණිතය) - Revision', teacher: 'Mr. A. Perera' },
  { id: 'tt6', day: 'Saturday', time: '9:00 AM - 11:00 AM', subject: 'Science (විද්‍යාව) - Practicals/Revision', teacher: 'Ms. B. Silva' },
  { id: 'tt7', day: 'Saturday', time: '2:00 PM - 4:00 PM', subject: 'English (ඉංග්‍රීසි) - Paper Class', teacher: 'Mr. C. Fernando' },
];

export default function TimetablePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-primary/10 rounded-xl">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">පන්ති කාලසටහන</h1>
        <p className="text-xl text-foreground max-w-2xl mx-auto">
          Our Weekly Class Schedule. Stay updated with class timings.
        </p>
      </section>

      <section>
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Icons.CalendarDays className="w-8 h-8 text-accent" />
              <div>
                <CardTitle className="font-headline text-3xl text-primary">Weekly Timetable</CardTitle>
                <CardDescription>Find the schedule for all our G.C.E. O/L classes below.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Please note: This is a sample timetable. Actual class times may be subject to change. Registered students will be notified of any updates.
            </p>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Day (දිනය)</TableHead>
                    <TableHead className="font-semibold">Time (වේලාව)</TableHead>
                    <TableHead className="font-semibold">Subject (විෂය)</TableHead>
                    <TableHead className="font-semibold">Teacher (ගුරුතුමා/ගුරුතුමිය)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timetableData.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell>{entry.day}</TableCell>
                      <TableCell>{entry.time}</TableCell>
                      <TableCell className="font-medium text-foreground">{entry.subject}</TableCell>
                      <TableCell>{entry.teacher}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
             <p className="mt-6 text-sm text-center text-accent font-semibold">
              All times are in Sri Lanka Standard Time (SLST - GMT+5:30).
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
