
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { QuizRunner } from '@/components/lms/quiz-runner';
import { allCourseContentDataLocal, coursesDataLocal, type CourseUIDefinitionExtended, type Quiz } from '@/lib/lms-data';
import Icons from '@/components/icons';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Preloader } from '@/components/preloader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const { t, language } = useLanguage(); // Added language
  const courseId = params.courseId as string;
  const quizId = params.quizId as string;

  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [courseDetails, setCourseDetails] = useState<CourseUIDefinitionExtended | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const foundCourse = coursesDataLocal.find(c => c.id === courseId);
    if (!foundCourse) {
      setError(t('lms.quizPage.courseNotFound', 'Course not found.'));
      setIsLoading(false);
      return;
    }
    setCourseDetails(foundCourse);

    let foundQuiz: Quiz | undefined = undefined;
    const courseContent = allCourseContentDataLocal[courseId];
    if (courseContent) {
      for (const monthContent of Object.values(courseContent)) {
        // Ensure monthContent.quizzes is an array before calling find
        const quizzesInMonth = Array.isArray(monthContent.quizzes) ? monthContent.quizzes : [];
        const q = quizzesInMonth.find(quizItem => quizItem.quizData?.id === quizId);
        if (q && q.quizData) {
          foundQuiz = q.quizData;
          break;
        }
      }
    }

    if (!foundQuiz) {
      setError(t('lms.quizPage.quizNotFound', 'Quiz not found for this course.'));
    } else {
      setCurrentQuiz(foundQuiz);
    }
    setIsLoading(false);
  }, [courseId, quizId, t]);

  const handleQuizCloseOrComplete = (score?: number, totalPoints?: number) => {
    // On quiz completion or close, redirect back to the course content page
    // For now, just redirect. If score needs to be passed, use query params.
    router.push(`/lms/courses/${courseId}/content`);
  };
  
  const getCourseName = (cId: string, cDetails: CourseUIDefinitionExtended | null) => {
    if (!cDetails) return cId;
    const fallbackName = t(`courses.subjects.${cId}.name`);
    if (language === 'si') return t(`courses.subjects.${cId}.sinhalaName`, fallbackName);
    if (language === 'ta') return t(`courses.subjects.${cId}.tamilName`, fallbackName);
    return fallbackName;
  };


  if (isLoading) {
    return <Preloader />;
  }

  if (error || !currentQuiz) {
    return (
      <div className="container mx-auto py-8 md:py-12 text-center">
        <Card className="max-w-md mx-auto shadow-lg">
            <CardHeader>
                <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit mb-4">
                    <Icons.AlertTriangle className="w-10 h-10 text-destructive" />
                </div>
                <CardTitle className="text-2xl font-bold text-destructive">
                    {error ? t('lms.quizPage.errorTitle', 'Error Loading Quiz') : t('lms.quizPage.quizNotFoundTitle', 'Quiz Not Found')}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-6">
                    {error || t('lms.quizPage.quizNotFoundMessage', 'The quiz you are trying to access could not be found or is unavailable.')}
                </p>
                <Button asChild>
                    <Link href={`/lms/courses/${courseId}/content`}>
                        <Icons.ArrowLeft className="mr-2 h-4 w-4" />
                        {t('lms.quizPage.backToContent', 'Back to Course Content')}
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start pt-4 md:pt-8">
        <div className="w-full max-w-4xl px-2 md:px-4">
            <div className="mb-4 md:mb-6 text-left">
                <Button variant="outline" size="sm" asChild className="mb-4">
                    <Link href={`/lms/courses/${courseId}/content`}>
                        <Icons.ArrowLeft className="mr-2 h-4 w-4" />
                        {t('lms.quizPage.backToContentShort', 'Back to {{courseName}}', {courseName: getCourseName(courseId, courseDetails)})}
                    </Link>
                </Button>
            </div>
            <QuizRunner
                quiz={currentQuiz}
                onClose={handleQuizCloseOrComplete}
                onQuizComplete={(score, totalPoints, results) => {
                // This callback is for when the quiz logic itself determines completion.
                // Results are displayed by QuizRunner; handleQuizCloseOrComplete handles navigation.
                console.log("Quiz completed on separate page!", { score, totalPoints, results, courseId, quizId });
                // The QuizRunner will show results, then its "Close" button will call onClose.
                }}
            />
        </div>
    </div>
  );
}
