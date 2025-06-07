
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icons from '@/components/icons';
import type { CourseDefinition } from '@/types';
import { useLanguage } from '@/contexts/language-context';
import { Badge } from '@/components/ui/badge';

// This data should ideally come from a centralized place or be fetched.
// For now, mirroring the structure from courses/page.tsx for consistency.
const coursesData: CourseDefinition[] = [
  { id: 'science', Icon: Icons.Microscope, imageHint: 'science classroom' },
  { id: 'mathematics', Icon: Icons.Calculator, imageHint: 'math chalkboard' },
  { id: 'english', Icon: Icons.BookOpenText, imageHint: 'library books' },
  { id: 'ict', Icon: Icons.Laptop2, imageHint: 'computer lab' },
];

export default function CourseDetailsPage() {
  const { t, language } = useLanguage();
  const params = useParams();
  const courseId = params.courseId as string;

  const course = coursesData.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold text-destructive mb-4">{t('courseDetails.courseNotFound.title', 'Course Not Found')}</h1>
        <p className="text-muted-foreground mb-6">{t('courseDetails.courseNotFound.message', 'The course you are looking for does not exist or may have been moved.')}</p>
        <Button asChild>
          <Link href="/courses">{t('courseDetails.backToCourses', 'Back to Courses')}</Link>
        </Button>
      </div>
    );
  }

  const getCourseName = (id: string) => {
    if (language === 'si') return t(`courses.subjects.${id}.sinhalaName`, t(`courses.subjects.${id}.name`));
    if (language === 'ta') return t(`courses.subjects.${id}.tamilName`, t(`courses.subjects.${id}.name`));
    return t(`courses.subjects.${id}.name`);
  };

  const courseName = getCourseName(course.id);

  const learningOutcomes = [
    t(`courseDetails.subjects.${course.id}.learningOutcome1`, `Default outcome 1 for ${course.id}`),
    t(`courseDetails.subjects.${course.id}.learningOutcome2`, `Default outcome 2 for ${course.id}`),
    t(`courseDetails.subjects.${course.id}.learningOutcome3`, `Default outcome 3 for ${course.id}`),
  ];

  const syllabusHighlights = [
     t(`courseDetails.subjects.${course.id}.syllabusHighlight1`, `Default highlight 1 for ${course.id}`),
     t(`courseDetails.subjects.${course.id}.syllabusHighlight2`, `Default highlight 2 for ${course.id}`),
     t(`courseDetails.subjects.${course.id}.syllabusHighlight3`, `Default highlight 3 for ${course.id}`),
  ];

  return (
    <div className="space-y-20">
      <div className="mb-6">
        <Button variant="outline" asChild className="text-sm">
          <Link href="/courses">
            <Icons.ArrowLeft className="mr-2 h-4 w-4" />
            {t('courseDetails.backToCourses', 'Back to Courses')}
          </Link>
        </Button>
      </div>

      <section className="relative py-12 md:py-20 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image
            src={`https://placehold.co/1200x400.png`}
            alt={t('courseDetails.heroImageAlt', `Hero image for ${courseName}`, { courseName })}
            layout="fill"
            objectFit="cover"
            data-ai-hint={`${course.imageHint} panoramic`}
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <course.Icon className="w-16 h-16 text-accent mb-4 inline-block" />
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-3">
            {courseName}
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-foreground max-w-2xl mx-auto">
            {t(`courses.subjects.${course.id}.description`)}
          </p>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary flex items-center">
                <Icons.FileText className="w-6 h-6 mr-3 text-accent" />
                {t('courseDetails.overviewTitle', 'Course Overview')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground space-y-3">
              <p className="text-lg leading-relaxed">{t(`courseDetails.subjects.${course.id}.detailedDescription`, `Detailed description for ${courseName}. This course provides an in-depth exploration of key concepts, practical applications, and prepares students thoroughly for their G.C.E. O/L examinations. We focus on building a strong foundation and fostering critical thinking skills.`)}</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary flex items-center">
                <Icons.Sparkles className="w-6 h-6 mr-3 text-accent" />
                {t('courseDetails.whatYouWillLearnTitle', 'What You Will Learn')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground">
              <ul className="list-disc list-inside space-y-2">
                {learningOutcomes.map((item, index) => (
                  <li key={index} className="text-lg leading-relaxed">{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary flex items-center">
                <Icons.ListChecks className="w-6 h-6 mr-3 text-accent" />
                {t('courseDetails.syllabusTitle', 'Syllabus Outline')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground">
               <ul className="list-decimal list-inside space-y-2">
                {syllabusHighlights.map((item, index) => (
                  <li key={index} className="text-lg leading-relaxed">{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                {t('courseDetails.syllabusNote', 'Note: This is a general outline. The full syllabus will be covered comprehensively during the course.')}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 md:sticky md:top-24">
          <Card className="shadow-lg">
            <CardHeader>
                <Image
                    src={`https://placehold.co/600x400.png`}
                    alt={t('courseDetails.instructorImageAlt', `Instructor for ${courseName}`, { courseName })}
                    width={600}
                    height={400}
                    className="rounded-md object-cover mb-4"
                    data-ai-hint="teacher professional"
                />
              <CardTitle className="font-headline text-xl text-primary flex items-center">
                <Icons.UserCircle className="w-6 h-6 mr-2 text-accent" />
                {t('courseDetails.instructorTitle', 'Meet Your Instructor')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground space-y-2">
              <p className="font-semibold">{t(`courseDetails.subjects.${course.id}.instructorName`, `Mr./Ms. Instructor Name for ${course.id}`)}</p>
              <p className="text-base leading-relaxed">{t(`courseDetails.subjects.${course.id}.instructorBio`, `An experienced and dedicated educator specializing in ${getCourseName(course.id)}, committed to helping students achieve their academic goals with engaging teaching methods.`)}</p>
              <Badge variant="secondary">{t(`courseDetails.subjects.${course.id}.instructorExperience`, `10+ Years Experience`)}</Badge>
            </CardContent>
          </Card>
          <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            <Icons.Edit3 className="mr-2 h-5 w-5" />
            {t('courseDetails.enrollNow', 'Enroll in this Course')}
          </Button>
        </div>
      </div>
    </div>
  );
}
