
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import Icons from '@/components/icons';
import { useLanguage } from '@/contexts/language-context';
import { Badge } from '@/components/ui/badge';
import ReactPlayer from 'react-player/lazy';
import { FileInput } from '@/components/ui/file-input';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// Import data and types from the new centralized file
import { 
  coursesDataLocal, 
  allCourseContentDataLocal,
  placeholderVideoUrl,
  type MonthlyPaymentStatus,
  type MonthlyContent,
  type CourseUIDefinitionExtended
} from '@/lib/lms-data';
import type { QuizQuestion } from '@/types'; // QuizQuestion is still in global types

interface VideoToPlay {
  title: string;
  url: string;
}

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

export default function CourseContentPage() {
  const { t, language } = useLanguage();
  const params = useParams();
  const { toast } = useToast();
  const courseId = params.courseId as string;

  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoToPlay | null>(null);
  const [isClient, setIsClient] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [courseMonthlyPayments, setCourseMonthlyPayments] = useState<Record<string, MonthlyPaymentStatus> | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmittingSlip, setIsSubmittingSlip] = useState(false);

  const [viewState, setViewState] = useState<'selectingMonth' | 'viewingMonthContent'>('selectingMonth');
  
  const courseDetails = useMemo(() => coursesDataLocal.find(c => c.id === courseId), [courseId]);
  const courseContentForCourse = useMemo(() => allCourseContentDataLocal[courseId] || {}, [courseId]);

  useEffect(() => {
    setIsClient(true);
    if (courseDetails) {
      setCourseMonthlyPayments(courseDetails.monthlyPayments);
      if (viewState === 'selectingMonth' && !selectedMonth && courseDetails.monthOrder && courseDetails.monthOrder.length > 0) {
         // No auto-select for month to let user pick.
      }
    } else {
      setCourseMonthlyPayments(null);
      setSelectedMonth(null);
    }
  }, [courseId, courseDetails, viewState, selectedMonth]);


  const hasAccessForSelectedMonth = useMemo(() => {
    if (!selectedMonth || !courseMonthlyPayments) return false;
    return courseMonthlyPayments[selectedMonth]?.paid === true && courseMonthlyPayments[selectedMonth]?.available === true;
  }, [selectedMonth, courseMonthlyPayments]);

  const isContentAvailableForSelectedMonth = useMemo(() => {
    if (!selectedMonth || !courseMonthlyPayments) return false;
    return courseMonthlyPayments[selectedMonth]?.available === true;
  }, [selectedMonth, courseMonthlyPayments]);

  const contentForSelectedMonth: MonthlyContent | null = useMemo(() => {
    if (!selectedMonth || !courseContentForCourse) return null;
    const monthData = courseContentForCourse[selectedMonth];
    return {
        videoLessons: monthData?.videoLessons || [],
        pdfNotes: monthData?.pdfNotes || [],
        recordings: monthData?.recordings || [],
        quizzes: monthData?.quizzes || [],
        assignments: monthData?.assignments || [],
    };
  }, [selectedMonth, courseContentForCourse]);

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setViewState('viewingMonthContent');
  };

  const handleBackToMonthNavigator = () => {
    setViewState('selectingMonth');
  };

  const handleWatchVideo = (titleKey: string, videoUrl?: string) => {
    if (videoUrl) {
      setCurrentVideo({ title: t(titleKey, titleKey), url: videoUrl });
      setIsVideoPlayerOpen(true);
    } else {
      toast({
          title: t('lms.courseContent.videoPlayer.notAvailableTitle', "Video Not Available"),
          description: t('lms.courseContent.videoPlayer.notAvailableDescription', "The video for this lesson is currently not available."),
          variant: "destructive",
        });
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmitSlip = async () => {
    if (!selectedFile || !selectedMonth) {
      toast({
        title: t('lms.courseContent.payment.noFileTitle', "No File Selected"),
        description: t('lms.courseContent.payment.noFileDescription', "Please select a bank slip image to upload."),
        variant: "destructive",
      });
      return;
    }
    setIsSubmittingSlip(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast({
      title: t('lms.courseContent.payment.slipSubmittedTitle', "Slip Submitted (Simulated)"),
      description: t('lms.courseContent.payment.slipSubmittedSpecificMonthDescription', "Your bank slip for {{month}} has been submitted for review. Access will be granted upon verification.", {month: selectedMonth}),
      variant: "default",
    });
    setSelectedFile(null);
    setIsSubmittingSlip(false);
  };

  const handlePayNow = async () => {
    if (!selectedMonth) return;
    toast({
      title: t('lms.courseContent.payment.payNowInitiatedTitle', "Payment Process Started (Simulated)"),
      description: t('lms.courseContent.payment.payNowInitiatedDescription', "Redirecting to payment gateway..."),
      variant: "default",
    });
    await new Promise(resolve => setTimeout(resolve, 2500));

    setCourseMonthlyPayments(prev => {
      if (!prev || !selectedMonth) return prev;
      return {
        ...prev,
        [selectedMonth]: { ...(prev[selectedMonth] || { paid: false, available: true }), paid: true, available: true }
      };
    });

    toast({
      title: t('lms.courseContent.payment.payNowSuccessTitle', "Payment Successful (Simulated)"),
      description: t('lms.courseContent.payment.payNowSuccessSpecificMonthDescription', "You now have access to the content for {{month}}.", {month: selectedMonth}),
      variant: "default",
    });
  };


  if (!courseDetails) {
    return (
      <AnimatedSection>
        <div className="text-center py-20">
          <Icons.AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-destructive mb-4">{t('lms.courseContent.notFound.title', 'Course Content Not Found')}</h1>
          <p className="text-muted-foreground mb-8 text-base md:text-lg">{t('lms.courseContent.notFound.message', 'The content for this course is not available or the course ID is invalid.')}</p>
          <Button asChild size="lg">
            <Link href="/lms/courses">
              <Icons.ArrowLeft className="mr-2 h-5 w-5" />
              {t('lms.courseContent.backToMyCourses', 'Back to My Courses')}
            </Link>
          </Button>
        </div>
      </AnimatedSection>
    );
  }

  const getCourseName = (id: string) => {
    const fallbackName = t(`courses.subjects.${id}.name`);
    if (language === 'si') return t(`courses.subjects.${id}.sinhalaName`, fallbackName);
    if (language === 'ta') return t(`courses.subjects.${id}.tamilName`, fallbackName);
    return fallbackName;
  };
  const courseName = getCourseName(courseDetails.id);

  const getMonthPaymentStatusText = (month: string) => {
    const status = courseMonthlyPayments?.[month];
    if (!status) return t('lms.courseContent.month.status.unknown', 'Unknown');
    if (!status.available) return t('lms.courseContent.month.status.notAvailableYet', 'Not Available Yet');
    if (status.paid) return t('lms.courseContent.month.status.paid', 'Paid');
    return t('lms.courseContent.month.status.paymentDue', 'Payment Due');
  };

  return (
    <div className="space-y-10 md:space-y-12">
      <AnimatedSection>
        <div className="mb-6">
          <Button variant="outline" asChild className="text-sm hover:bg-accent/10 transition-colors">
            <Link href="/lms/courses">
              <Icons.ArrowLeft className="mr-2 h-4 w-4" />
              {t('lms.courseContent.backToMyCourses', 'Back to My Courses')}
            </Link>
          </Button>
        </div>

        <div className="text-left pb-8 md:pb-10 border-b">
          <div className="flex items-center space-x-3 mb-3">
            <courseDetails.Icon className="w-10 h-10 md:w-12 md:h-12 text-primary" />
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary">
              {courseName}
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground">
            {t(`courses.subjects.${courseDetails.id}.description`)}
          </p>
        </div>
      </AnimatedSection>

      {viewState === 'selectingMonth' && (
        <AnimatedSection delay={100}>
          <Card className="shadow-lg border-none bg-card">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="font-headline text-xl md:text-2xl text-primary flex items-center">
                <Icons.CalendarDays className="w-6 h-6 mr-3 text-accent"/>
                {t('lms.courseContent.month.selectMonthTitle', "Select Month")}
              </CardTitle>
              <CardDescription className="text-base md:text-lg">{t('lms.courseContent.month.selectMonthDescription', "Choose a month to view its content or manage payment.")}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 md:p-6">
              {(courseDetails.monthOrder && courseDetails.monthOrder.length > 0) ? courseDetails.monthOrder.map(month => (
                <Button
                  key={month}
                  variant={selectedMonth === month ? "default" : "outline"}
                  className={`flex flex-col items-start justify-between p-3 h-auto text-left transition-all duration-200 ease-in-out transform hover:scale-105
                    ${selectedMonth === month ? 'ring-2 ring-primary shadow-lg' : 'hover:bg-muted/20'}`}
                  onClick={() => handleMonthSelect(month)}
                >
                  <span className="font-semibold text-base mb-1">{month}</span>
                  <Badge
                    variant={courseMonthlyPayments?.[month]?.paid && courseMonthlyPayments?.[month]?.available ? "default" :
                             (!courseMonthlyPayments?.[month]?.available ? "secondary" : "destructive")}
                    className="text-xs py-0.5 px-1.5"
                  >
                    {getMonthPaymentStatusText(month)}
                  </Badge>
                </Button>
              )) : <p className="col-span-full text-center text-muted-foreground p-4">{t('lms.courseContent.month.noMonthsAvailable', "No months available for this course yet.")}</p>}
            </CardContent>
          </Card>
        </AnimatedSection>
      )}

      {viewState === 'viewingMonthContent' && selectedMonth && (
        <AnimatedSection delay={100}>
          <div className="mb-6">
            <Button variant="outline" onClick={handleBackToMonthNavigator} className="text-sm hover:bg-accent/10 transition-colors">
              <Icons.ArrowLeft className="mr-2 h-4 w-4" />
              {t('lms.courseContent.month.backToMonthNavigator', "Back to Month Selection")}
            </Button>
          </div>

          {!isContentAvailableForSelectedMonth ? (
            <Card className="shadow-xl border-none bg-card p-6 md:p-8 text-center">
              <Icons.Info className="w-12 h-12 text-accent mx-auto mb-4" />
              <CardTitle className="font-headline text-2xl md:text-3xl text-accent">
                {t('lms.courseContent.month.contentNotReadyTitle', "Content Not Yet Available")}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base md:text-lg">
                {t('lms.courseContent.month.contentNotReadyMessage', "Content for {{month}} is currently being prepared and will be available soon.", { month: selectedMonth })}
              </CardDescription>
            </Card>
          ) : !hasAccessForSelectedMonth ? (
            <Card className="shadow-xl border-none bg-card p-6 md:p-8">
              <CardHeader className="p-0 mb-6 text-center">
                <Icons.Lock className="w-12 h-12 text-destructive mx-auto mb-4" />
                <CardTitle className="font-headline text-2xl md:text-3xl text-destructive">
                  {t('lms.courseContent.payment.accessDeniedSpecificMonthTitle', "Access Denied for {{month}}", {month: selectedMonth})}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-base md:text-lg">
                  {t('lms.courseContent.payment.accessDeniedSpecificMonthMessage', "Payment for {{month}}'s content is required to proceed.", {month: selectedMonth})}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-8">
                 <Alert variant="default" className="bg-accent/10 border-accent/30">
                    <Icons.Info className="h-5 w-5 text-accent" />
                    <AlertTitle className="text-accent">{t('lms.courseContent.payment.importantNoteTitle', "Important Note")}</AlertTitle>
                    <AlertDescription className="text-accent/90">
                      {t('lms.courseContent.payment.importantNoteMessage', "Access to previous months' content (if applicable and paid for) remains available. This restriction applies to the current month's new materials.")}
                    </AlertDescription>
                </Alert>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-background/50 dark:bg-card/70 p-4 sm:p-6">
                    <CardTitle className="text-xl text-primary mb-3 flex items-center">
                      <Icons.UploadCloud className="mr-2 h-6 w-6 text-primary" />
                      {t('lms.courseContent.payment.uploadSlipTitle', "Upload Bank Slip")}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground mb-4">
                       {t('lms.courseContent.payment.uploadSlipDescription', "If you've already paid via bank transfer, upload your slip for verification.")}
                    </CardDescription>
                    <FileInput onChange={handleFileChange} disabled={isSubmittingSlip} accept="image/*" />
                    {selectedFile && <p className="text-xs text-muted-foreground mt-2">{t('lms.courseContent.payment.selectedFile', "Selected: {{fileName}}", { fileName: selectedFile.name })}</p>}
                    <Button onClick={handleSubmitSlip} className="w-full mt-4" disabled={!selectedFile || isSubmittingSlip}>
                      {isSubmittingSlip ? <><Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('lms.courseContent.payment.submittingButton', "Submitting...")}</> : t('lms.courseContent.payment.submitSlipButton', "Submit Slip")}
                    </Button>
                  </Card>
                  <Card className="bg-background/50 dark:bg-card/70 p-4 sm:p-6 flex flex-col justify-center items-center text-center">
                    <Icons.CreditCard className="mr-2 h-8 w-8 text-primary mb-3" />
                    <CardTitle className="text-xl text-primary mb-3">{t('lms.courseContent.payment.payOnlineTitle', "Pay Online")}</CardTitle>
                    <CardDescription className="text-muted-foreground mb-4">{t('lms.courseContent.payment.payOnlineDescription', "Complete your payment securely online to get instant access.")}</CardDescription>
                    <Button onClick={handlePayNow} className="w-full bg-green-600 hover:bg-green-700 text-white">
                       <Icons.ShieldCheck className="mr-2 h-5 w-5" /> {t('lms.courseContent.payment.payNowButton', "Pay Now (Simulate)")}
                    </Button>
                  </Card>
                </div>
              </CardContent>
            </Card>
          ) : contentForSelectedMonth ? (
            <>
              <Accordion type="multiple" defaultValue={['videos', 'notes', 'recordings', 'quizzesAssignments']} className="w-full space-y-6">
                {contentForSelectedMonth.videoLessons.length > 0 && (
                  <AnimatedSection delay={0}>
                    <Card className="shadow-lg border-none bg-card overflow-hidden">
                      <AccordionItem value="videos" className="border-b-0">
                        <AccordionTrigger className="px-4 md:px-6 py-3 md:py-4 hover:bg-muted/10">
                          <div className="flex items-center space-x-3">
                            <Icons.PlayCircle className="w-6 md:w-7 h-6 md:h-7 text-accent" />
                            <h2 className="font-headline text-lg md:text-xl text-primary">{t('lms.courseContent.sections.videos.title', "Video Lessons")}</h2>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 md:px-6 pb-4 md:pb-6 pt-2">
                          <ul className="space-y-4">
                            {contentForSelectedMonth.videoLessons.map(video => (
                              <li key={video.id} className="p-3 md:p-4 border rounded-lg bg-background/50 dark:bg-card/70 hover:shadow-md transition-shadow">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                  <div>
                                    <h3 className="text-base md:text-lg font-semibold text-foreground">{t(video.titleKey, video.titleKey)}</h3>
                                    {video.descriptionKey && <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{t(video.descriptionKey, video.descriptionKey)}</p>}
                                  </div>
                                  <div className="flex items-center space-x-3 mt-3 sm:mt-0">
                                    {video.duration && <Badge variant="outline" className="text-xs">{video.duration}</Badge>}
                                    <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10 text-xs md:text-sm" onClick={() => handleWatchVideo(video.titleKey, video.videoUrl)}>
                                      <Icons.Play className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" /> {t('lms.courseContent.watchButton', "Watch")}
                                    </Button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Card>
                  </AnimatedSection>
                )}
                {contentForSelectedMonth.pdfNotes.length > 0 && (
                  <AnimatedSection delay={50}>
                      <Card className="shadow-lg border-none bg-card overflow-hidden">
                      <AccordionItem value="notes" className="border-b-0">
                        <AccordionTrigger className="px-4 md:px-6 py-3 md:py-4 hover:bg-muted/10">
                          <div className="flex items-center space-x-3">
                            <Icons.FileText className="w-6 md:w-7 h-6 md:h-7 text-accent" />
                            <h2 className="font-headline text-lg md:text-xl text-primary">{t('lms.courseContent.sections.notes.title', "PDF Notes & Materials")}</h2>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 md:px-6 pb-4 md:pb-6 pt-2">
                          <ul className="space-y-4">
                            {contentForSelectedMonth.pdfNotes.map(note => (
                              <li key={note.id} className="p-3 md:p-4 border rounded-lg bg-background/50 dark:bg-card/70 hover:shadow-md transition-shadow">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                  <h3 className="text-base md:text-lg font-semibold text-foreground">{t(note.titleKey, note.titleKey)}</h3>
                                  <div className="flex items-center space-x-3 mt-3 sm:mt-0">
                                    {note.fileSize && <Badge variant="outline" className="text-xs">{note.fileSize}</Badge>}
                                    <Button size="sm" variant="ghost" asChild className="text-primary hover:bg-primary/10 text-xs md:text-sm">
                                      <a href={note.link || '#'} target="_blank" rel="noopener noreferrer">
                                        <Icons.Download className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" /> {t('lms.courseContent.downloadButton', "Download")}
                                      </a>
                                    </Button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Card>
                  </AnimatedSection>
                )}
                {contentForSelectedMonth.recordings.length > 0 && (
                  <AnimatedSection delay={100}>
                    <Card className="shadow-lg border-none bg-card overflow-hidden">
                      <AccordionItem value="recordings" className="border-b-0">
                        <AccordionTrigger className="px-4 md:px-6 py-3 md:py-4 hover:bg-muted/10">
                          <div className="flex items-center space-x-3">
                            <Icons.Video className="w-6 md:w-7 h-6 md:h-7 text-accent" />
                            <h2 className="font-headline text-lg md:text-xl text-primary">{t('lms.courseContent.sections.recordings.title', "Class Recordings")}</h2>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 md:px-6 pb-4 md:pb-6 pt-2">
                          <ul className="space-y-4">
                            {contentForSelectedMonth.recordings.map(recording => (
                              <li key={recording.id} className="p-3 md:p-4 border rounded-lg bg-background/50 dark:bg-card/70 hover:shadow-md transition-shadow">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                  <div>
                                    <h3 className="text-base md:text-lg font-semibold text-foreground">{t(recording.titleKey, recording.titleKey)}</h3>
                                    {recording.date && recording.duration && <p className="text-xs text-muted-foreground">{t('lms.courseContent.recordedOn', "Recorded on:")} {recording.date} &bull; {t('lms.courseContent.duration', "Duration:")} {recording.duration}</p>}
                                  </div>
                                   <Button size="sm" variant="ghost" className="mt-3 sm:mt-0 text-primary hover:bg-primary/10 text-xs md:text-sm" onClick={() => handleWatchVideo(recording.titleKey, recording.videoUrl)}>
                                      <Icons.Play className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" /> {t('lms.courseContent.watchButton', "Watch")}
                                    </Button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Card>
                  </AnimatedSection>
                )}
                {(contentForSelectedMonth.quizzes.length > 0 || contentForSelectedMonth.assignments.length > 0) && (
                    <AnimatedSection delay={150}>
                    <Card className="shadow-lg border-none bg-card overflow-hidden">
                        <AccordionItem value="quizzesAssignments" className="border-b-0">
                        <AccordionTrigger className="px-4 md:px-6 py-3 md:py-4 hover:bg-muted/10">
                            <div className="flex items-center space-x-3">
                            <Icons.ListChecks className="w-6 md:w-7 h-6 md:h-7 text-accent" />
                            <h2 className="font-headline text-lg md:text-xl text-primary">{t('lms.courseContent.sections.quizzesAssignments.title', "Quizzes & Assignments")}</h2>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 md:px-6 pb-4 md:pb-6 pt-2">
                            {contentForSelectedMonth.quizzes.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-md md:text-lg font-semibold text-foreground mb-3">{t('lms.courseContent.sections.quizzes.subTitle', "Quizzes")}</h3>
                                <ul className="space-y-4">
                                {contentForSelectedMonth.quizzes.map(quiz => (
                                    <li key={quiz.id} className="p-3 md:p-4 border rounded-lg bg-background/50 dark:bg-card/70 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                        <h4 className="text-base md:text-lg font-semibold text-foreground">{t(quiz.titleKey, quiz.titleKey)}</h4>
                                        {quiz.descriptionKey && <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{t(quiz.descriptionKey, quiz.descriptionKey)}</p>}
                                        </div>
                                        {quiz.quizData?.id && (
                                           <Button asChild size="sm" variant="default" className="mt-3 sm:mt-0 text-xs md:text-sm bg-primary hover:bg-primary/90">
                                             <Link href={`/lms/courses/${courseId}/quiz/${quiz.quizData.id}`}>
                                               <Icons.Play className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" /> {t('lms.courseContent.sections.quizzes.takeQuizButton', "Take Quiz")}
                                             </Link>
                                           </Button>
                                        )}
                                    </div>
                                    </li>
                                ))}
                                </ul>
                            </div>
                            )}
                            {contentForSelectedMonth.assignments.length > 0 && (
                            <div>
                                <h3 className="text-md md:text-lg font-semibold text-foreground mb-3">{t('lms.courseContent.sections.assignments.subTitle', "Assignments")}</h3>
                                <ul className="space-y-4">
                                {contentForSelectedMonth.assignments.map(assignment => (
                                    <li key={assignment.id} className="p-3 md:p-4 border rounded-lg bg-background/50 dark:bg-card/70 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                        <h4 className="text-base md:text-lg font-semibold text-foreground">{t(assignment.titleKey, assignment.titleKey)}</h4>
                                        {assignment.descriptionKey && <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{t(assignment.descriptionKey, assignment.descriptionKey)}</p>}
                                        {assignment.dueDate && <p className="text-xs text-destructive mt-1">{t('lms.courseContent.sections.assignments.dueDate', "Due:")} {assignment.dueDate}</p>}
                                        </div>
                                        <Button size="sm" variant="outline" asChild className="mt-3 sm:mt-0 text-xs md:text-sm">
                                        <a href={assignment.link || '#'} target="_blank" rel="noopener noreferrer">
                                            {t('lms.courseContent.sections.assignments.viewAssignmentButton', "View Assignment")} <Icons.ExternalLink className="ml-1 md:ml-2 h-3 md:h-4 w-3 md:w-4" />
                                        </a>
                                        </Button>
                                    </div>
                                    </li>
                                ))}
                                </ul>
                            </div>
                            )}
                            {(contentForSelectedMonth.quizzes.length === 0 && contentForSelectedMonth.assignments.length === 0) && (
                                <p className="text-muted-foreground text-center py-4 text-sm md:text-base">{t('lms.courseContent.sections.quizzesAssignments.empty', "No quizzes or assignments available for this month yet.")}</p>
                            )}
                        </AccordionContent>
                        </AccordionItem>
                    </Card>
                 </AnimatedSection>
                )}
              </Accordion>
            </>
          ) : (
            <AnimatedSection delay={0}>
              <Card className="shadow-xl border-none bg-card p-6 md:p-8 text-center">
                <Icons.Info className="w-12 h-12 text-accent mx-auto mb-4" />
                <CardTitle className="font-headline text-2xl md:text-3xl text-accent">
                  {t('lms.courseContent.month.noContentForMonthTitle', "No Content Yet for {{month}}", {month: selectedMonth})}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-base md:text-lg">
                  {t('lms.courseContent.month.noContentForMonthMessage', "It seems there's no specific content uploaded for {{month}} for this course yet, or the content is not marked as available in the data.", {month: selectedMonth})}
                </CardDescription>
              </Card>
            </AnimatedSection>
          )}
        </AnimatedSection>
      )}

      {viewState === 'viewingMonthContent' && !selectedMonth && (
         <AnimatedSection delay={100}>
            <Card className="shadow-xl border-none bg-card p-6 md:p-8 text-center">
              <Icons.CalendarCheck2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle className="font-headline text-2xl md:text-3xl text-primary">
                {t('lms.courseContent.month.pleaseSelectMonthTitle', "Select a Month")}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base md:text-lg">
                {t('lms.courseContent.month.pleaseSelectMonthMessage', "Something went wrong. Please go back and select a month.")}
              </CardDescription>
              <Button onClick={handleBackToMonthNavigator} className="mt-6">
                {t('lms.courseContent.month.backToMonthNavigator', "Back to Month Selection")}
              </Button>
            </Card>
          </AnimatedSection>
      )}

        {currentVideo && (
          <Dialog open={isVideoPlayerOpen} onOpenChange={setIsVideoPlayerOpen}>
            <DialogContent className="sm:max-w-[800px] p-0 aspect-video bg-black rounded-lg overflow-hidden">
              <DialogHeader className="absolute top-0 left-0 right-0 z-10 p-3 bg-gradient-to-b from-black/70 to-transparent">
                <DialogTitle className="text-white text-base md:text-lg truncate">{t('lms.courseContent.videoPlayer.nowPlaying', "Now Playing: {{videoTitle}}", { videoTitle: currentVideo.title })}</DialogTitle>
              </DialogHeader>
              <div className="w-full h-full flex items-center justify-center">
                {isClient && currentVideo.url ? (
                  <ReactPlayer
                    url={currentVideo.url}
                    playing={true}
                    controls={true}
                    width="100%"
                    height="100%"
                    config={{ file: { attributes: { playsInline: true, preload: 'metadata' } } }}
                    onError={(e) => {
                      console.error('ReactPlayer Error:', e);
                       toast({
                        title: t('lms.courseContent.videoPlayer.errorTitle', "Video Playback Error"),
                        description: t('lms.courseContent.videoPlayer.errorDescription', "There was an error playing this video. Please try again later."),
                        variant: "destructive",
                      });
                       setIsVideoPlayerOpen(false);
                    }}
                  />
                ) : ( <div className="w-full h-full flex items-center justify-center bg-black text-white">{t('lms.courseContent.videoPlayer.loading', "Loading player...")}</div>)}
              </div>
              <DialogFooter className="absolute bottom-0 left-0 right-0 z-10 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <DialogClose asChild><Button type="button" variant="secondary" size="sm" className="opacity-80 hover:opacity-100 text-xs md:text-sm">{t('lms.courseContent.videoPlayer.closeButton', "Close")}</Button></DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
    </div>
  );
}
