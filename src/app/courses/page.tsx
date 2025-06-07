
"use client";
import Image from 'next/image';
import Link from 'next/link'; // Import Link
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icons from '@/components/icons';
import type { CourseDefinition } from '@/types'; 
import { useLanguage } from '@/contexts/language-context';

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
    let text = t('courses.viewDetailsButton', 'View Details'); // Default to 'View Details'
    if (language === 'si') text = t('courses.viewDetailsButtonAdditionSinhala', text);
    if (language === 'ta') text = t('courses.viewDetailsButtonAdditionTamil', text);
    return text;
  };

  return (
    <div className="space-y-20">
      <section className="text-center py-12 bg-primary/10 rounded-xl">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
          {getPageTitle()}
        </h1>
        <p className="text-xl text-foreground max-w-2xl mx-auto">
          {t('courses.subtitle')}
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        {coursesData.map((courseDef) => (
          <Card key={courseDef.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-4 mb-4">
                <courseDef.Icon className="w-12 h-12 text-accent" />
                <div>
                  <CardTitle className="font-headline text-xl font-semibold text-primary">{getCourseName(courseDef.id)}</CardTitle>
                  {(language === 'si' || language === 'ta') && (
                    <CardDescription className="text-md text-foreground">
                      {t(`courses.subjects.${courseDef.id}.name`)} {/* English name as subtitle for SI/TA */}
                    </CardDescription>
                  )}
                </div>
              </div>
               <Image 
                  src={`https://placehold.co/600x300.png`}
                  alt={t(`courses.subjects.${courseDef.id}.imageAlt`, `${getCourseName(courseDef.id)} illustration`)}
                  width={600}
                  height={300}
                  className="rounded-md object-cover"
                  data-ai-hint={courseDef.imageHint}
                />
            </CardHeader>
            <CardContent className="text-muted-foreground flex-grow">
              <p className="text-base leading-relaxed">{t(`courses.subjects.${courseDef.id}.description`)}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href={`/courses/${courseDef.id}`}>
                  {getViewDetailsButtonText()}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
