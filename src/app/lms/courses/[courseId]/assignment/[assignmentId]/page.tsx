
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import Icons from '@/components/icons';
import { useLanguage } from '@/contexts/language-context';
import { FileInput } from '@/components/ui/file-input';
import { useToast } from '@/hooks/use-toast';
import { Preloader } from '@/components/preloader';
import { allCourseContentDataLocal, coursesDataLocal, type CourseUIDefinitionExtended, type MonthlyContentItem } from '@/lib/lms-data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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

export default function AssignmentDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { t, language } = useLanguage();
  const { toast } = useToast();

  const courseId = params.courseId as string;
  const assignmentId = params.assignmentId as string;

  const [isLoading, setIsLoading] = useState(true);
  const [courseDetails, setCourseDetails] = useState<CourseUIDefinitionExtended | null>(null);
  const [assignment, setAssignment] = useState<MonthlyContentItem | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const foundCourse = coursesDataLocal.find(c => c.id === courseId);
    setCourseDetails(foundCourse || null);

    let foundAssignment: MonthlyContentItem | undefined = undefined;
    if (foundCourse) {
      const courseContent = allCourseContentDataLocal[courseId];
      if (courseContent) {
        for (const monthContent of Object.values(courseContent)) {
          const assignmentsInMonth = Array.isArray(monthContent.assignments) ? monthContent.assignments : [];
          foundAssignment = assignmentsInMonth.find(item => item.id === assignmentId && item.itemType === 'assignment');
          if (foundAssignment) break;
        }
      }
    }
    setAssignment(foundAssignment || null);
    setIsLoading(false);
  }, [courseId, assignmentId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmitAssignment = async () => {
    if (!selectedFile) {
      toast({
        title: t('lms.assignmentPage.noFileTitle', "No File Selected"),
        description: t('lms.assignmentPage.noFileDescription', "Please select a file to submit for your assignment."),
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    // Simulate API call for submission
    console.log("Submitting assignment:", selectedFile.name, "for assignment ID:", assignmentId);
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: t('lms.assignmentPage.submissionSuccessTitle', "Assignment Submitted (Simulated)"),
      description: t('lms.assignmentPage.submissionSuccessDescription', "Your assignment '{{assignmentTitle}}' has been successfully submitted.", { assignmentTitle: assignment ? t(assignment.titleKey) : ''}),
      variant: "default",
    });
    setSelectedFile(null); 
    // Optionally, clear the file input if it's a controlled component or reset the form
    const fileInput = document.getElementById('assignment-file-input') as HTMLInputElement;
    if (fileInput) fileInput.value = '';

    setIsSubmitting(false);
    // Optionally, redirect or update UI to show submission status
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

  if (!courseDetails || !assignment) {
    return (
      <AnimatedSection>
        <div className="container mx-auto py-8 md:py-12 text-center">
          <Card className="max-w-md mx-auto shadow-lg">
            <CardHeader>
              <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit mb-4">
                <Icons.AlertTriangle className="w-10 h-10 text-destructive" />
              </div>
              <CardTitle className="text-2xl font-bold text-destructive">
                {t('lms.assignmentPage.notFoundTitle', 'Assignment Not Found')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                {t('lms.assignmentPage.notFoundMessage', 'The assignment you are looking for could not be found or is unavailable for this course.')}
              </p>
              <Button asChild>
                <Link href={`/lms/courses/${courseId}/content`}>
                  <Icons.ArrowLeft className="mr-2 h-4 w-4" />
                  {t('lms.assignmentPage.backToContent', 'Back to Course Content')}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <div className="space-y-8 md:space-y-10">
        <AnimatedSection>
            <div className="mb-6">
            <Button variant="outline" asChild className="text-sm hover:bg-accent/10 transition-colors">
                <Link href={`/lms/courses/${courseId}/content`}>
                <Icons.ArrowLeft className="mr-2 h-4 w-4" />
                 {t('lms.assignmentPage.backToContentShort', 'Back to {{courseName}} Content', {courseName: getCourseName(courseId, courseDetails)})}
                </Link>
            </Button>
            </div>
        </AnimatedSection>

      <AnimatedSection delay={100}>
        <Card className="shadow-xl border-none bg-card">
          <CardHeader className="p-4 sm:p-6 border-b">
            <div className="flex items-center space-x-3 mb-1">
                {courseDetails.Icon && <courseDetails.Icon className="w-8 h-8 text-primary flex-shrink-0"/>}
                 <p className="text-sm text-muted-foreground">{getCourseName(courseId, courseDetails)}</p>
            </div>
            <CardTitle className="font-headline text-2xl md:text-3xl text-primary">
              {t(assignment.titleKey)}
            </CardTitle>
            {assignment.dueDate && (
              <CardDescription className="text-base text-destructive font-medium pt-1">
                {t('lms.assignmentPage.dueDateLabel', 'Due Date:')} {assignment.dueDate}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            {assignment.descriptionKey && (
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{t('lms.assignmentPage.descriptionTitle', 'Assignment Description')}</h3>
                <p className="text-base text-foreground/80 leading-relaxed whitespace-pre-line">
                  {t(assignment.descriptionKey)}
                </p>
              </div>
            )}
            {assignment.link && (
                 <Alert variant="default" className="bg-accent/5 border-accent/20">
                    <Icons.Link className="h-5 w-5 text-accent" />
                    <AlertTitle className="text-accent">{t('lms.assignmentPage.externalLinkTitle', "External Resources")}</AlertTitle>
                    <AlertDescription className="text-accent/90">
                      {t('lms.assignmentPage.externalLinkDescription', "This assignment may require external resources. You can access them here:")}{' '}
                      <a href={assignment.link} target="_blank" rel="noopener noreferrer" className="font-medium underline hover:text-accent/70">
                        {t('lms.assignmentPage.openLink', "Open Link")}
                      </a>
                    </AlertDescription>
                </Alert>
            )}
          </CardContent>
        </Card>
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <Card className="shadow-xl border-none bg-card">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="font-headline text-xl md:text-2xl text-primary flex items-center">
              <Icons.UploadCloud className="w-6 h-6 mr-3 text-accent" />
              {t('lms.assignmentPage.submissionTitle', 'Submit Your Assignment')}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {t('lms.assignmentPage.submissionDescription', 'Upload your completed assignment file here. Ensure it meets all requirements.')}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <FileInput id="assignment-file-input" onChange={handleFileChange} disabled={isSubmitting} accept=".pdf,.doc,.docx,.txt,.zip" />
            {selectedFile && (
              <p className="text-sm text-muted-foreground">
                {t('lms.assignmentPage.selectedFileLabel', 'Selected file:')} {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
              </p>
            )}
            <p className="text-xs text-muted-foreground">{t('lms.assignmentPage.allowedFileTypes', 'Allowed file types: PDF, DOC, DOCX, TXT, ZIP. Max size: 5MB (simulated).')}</p>
          </CardContent>
          <CardFooter className="p-4 sm:p-6 border-t">
            <Button 
              onClick={handleSubmitAssignment} 
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base" 
              disabled={!selectedFile || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Icons.Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t('lms.assignmentPage.submittingButton', 'Submitting...')}
                </>
              ) : (
                 <>
                  <Icons.Send className="mr-2 h-5 w-5" />
                  {t('lms.assignmentPage.submitButton', 'Submit Assignment')}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </AnimatedSection>
    </div>
  );
}

    