
"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import Icons from '@/components/icons';
import { useLanguage } from '@/contexts/language-context';
import { Badge } from '@/components/ui/badge';
import type { CourseDefinition as ExternalCourseDefinition } from '@/types'; // Renamed to avoid conflict
import ReactPlayer from 'react-player/lazy';
import { FileInput } from '@/components/ui/file-input'; // New component
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


// Extended CourseDefinition for local simulation purposes
interface CourseUIDefinition extends ExternalCourseDefinition {
  simulatedPaidForCurrentMonth: boolean;
}


const coursesData: CourseUIDefinition[] = [
  { id: 'science', Icon: Icons.Microscope, imageHint: 'science classroom details', simulatedPaidForCurrentMonth: true },
  { id: 'mathematics', Icon: Icons.Calculator, imageHint: 'math textbook details', simulatedPaidForCurrentMonth: false },
  { id: 'english', Icon: Icons.BookOpenText, imageHint: 'english dictionary details', simulatedPaidForCurrentMonth: true },
  { id: 'ict', Icon: Icons.Laptop2, imageHint: 'coding screen details', simulatedPaidForCurrentMonth: false },
];

const placeholderVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const courseContentPlaceholder = {
  science: {
    videoLessons: [
      { id: 'vid1', titleKey: 'lms.courseContent.science.video1.title', duration: '10:32', descriptionKey: 'lms.courseContent.science.video1.description', videoUrl: placeholderVideoUrl },
      { id: 'vid2', titleKey: 'lms.courseContent.science.video2.title', duration: '15:05', descriptionKey: 'lms.courseContent.science.video2.description', videoUrl: placeholderVideoUrl },
    ],
    pdfNotes: [
      { id: 'note1', titleKey: 'lms.courseContent.science.note1.title', fileSize: '2.5MB', link: '#' },
      { id: 'note2', titleKey: 'lms.courseContent.science.note2.title', fileSize: '1.8MB', link: '#' },
    ],
    recordings: [
      { id: 'rec1', titleKey: 'lms.courseContent.science.recording1.title', date: '2024-08-01', duration: '01:45:20', link: '#', videoUrl: placeholderVideoUrl },
    ]
  },
  mathematics: {
    videoLessons: [
      { id: 'vid1', titleKey: 'lms.courseContent.mathematics.video1.title', duration: '12:15', descriptionKey: 'lms.courseContent.mathematics.video1.description', videoUrl: placeholderVideoUrl },
      { id: 'vid2', titleKey: 'lms.courseContent.mathematics.video2.title', duration: '18:40', descriptionKey: 'lms.courseContent.mathematics.video2.description', videoUrl: placeholderVideoUrl },
    ],
    pdfNotes: [
      { id: 'note1', titleKey: 'lms.courseContent.mathematics.note1.title', fileSize: '3.1MB', link: '#' },
    ],
    recordings: []
  },
  english: { 
    videoLessons: [{ id: 'vid-en-1', titleKey: 'lms.courseContent.english.video1.title', duration: '08:50', descriptionKey: 'lms.courseContent.english.video1.description', videoUrl: placeholderVideoUrl }], 
    pdfNotes: [{ id: 'note-en-1', titleKey: 'lms.courseContent.english.note1.title', fileSize: '1.2MB', link: '#' }], 
    recordings: [{ id: 'rec-en-1', titleKey: 'lms.courseContent.english.recording1.title', date: '2024-08-05', duration: '01:15:00', link: '#', videoUrl: placeholderVideoUrl }] 
  },
  ict: { 
    videoLessons: [{ id: 'vid-ict-1', titleKey: 'lms.courseContent.ict.video1.title', duration: '22:30', descriptionKey: 'lms.courseContent.ict.video1.description', videoUrl: placeholderVideoUrl }], 
    pdfNotes: [{ id: 'note-ict-1', titleKey: 'lms.courseContent.ict.note1.title', fileSize: '4.0MB', link: '#' }], 
    recordings: [] 
  },
};

type CourseContentKey = keyof typeof courseContentPlaceholder;

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
  const courseId = params.courseId as CourseContentKey;

  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoToPlay | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  const courseDetails = coursesData.find(c => c.id === courseId);
  const [hasAccess, setHasAccess] = useState(courseDetails?.simulatedPaidForCurrentMonth || false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmittingSlip, setIsSubmittingSlip] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const currentCourseDetails = coursesData.find(c => c.id === courseId);
    setHasAccess(currentCourseDetails?.simulatedPaidForCurrentMonth || false);
  }, [courseId]);


  const content = courseContentPlaceholder[courseId] || { videoLessons: [], pdfNotes: [], recordings: [] };

  const handleWatchVideo = (titleKey: string, videoUrl?: string) => {
    if (videoUrl) {
      setCurrentVideo({ title: t(titleKey), url: videoUrl });
      setIsVideoPlayerOpen(true);
    } else {
      console.warn("No video URL provided for:", titleKey);
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
    if (!selectedFile) {
      toast({
        title: t('lms.courseContent.payment.noFileTitle', "No File Selected"),
        description: t('lms.courseContent.payment.noFileDescription', "Please select a bank slip image to upload."),
        variant: "destructive",
      });
      return;
    }
    setIsSubmittingSlip(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast({
      title: t('lms.courseContent.payment.slipSubmittedTitle', "Slip Submitted (Simulated)"),
      description: t('lms.courseContent.payment.slipSubmittedDescription', "Your bank slip has been submitted for review. Access will be granted upon verification."),
      variant: "default",
    });
    setSelectedFile(null); // Reset file input
    setIsSubmittingSlip(false);
    // In a real app, you wouldn't grant access here immediately. This is just for prototype.
  };

  const handlePayNow = async () => {
    toast({
      title: t('lms.courseContent.payment.payNowInitiatedTitle', "Payment Process Started (Simulated)"),
      description: t('lms.courseContent.payment.payNowInitiatedDescription', "Redirecting to payment gateway..."),
      variant: "default",
    });
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    setHasAccess(true); // Simulate successful payment
    toast({
      title: t('lms.courseContent.payment.payNowSuccessTitle', "Payment Successful (Simulated)"),
      description: t('lms.courseContent.payment.payNowSuccessDescription', "You now have access to the course content."),
      variant: "default", 
    });
  };


  if (!courseDetails) {
    return (
      <AnimatedSection>
        <div className="text-center py-20">
          <Icons.AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-destructive mb-4">{t('lms.courseContent.notFound.title', 'Course Content Not Found')}</h1>
          <p className="text-muted-foreground mb-8 text-lg">{t('lms.courseContent.notFound.message', 'The content for this course is not available or the course ID is invalid.')}</p>
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
          <p className="text-lg text-muted-foreground">
            {t(`courses.subjects.${courseDetails.id}.description`)}
          </p>
        </div>
      </AnimatedSection>

      {!hasAccess ? (
        <AnimatedSection delay={100}>
          <Card className="shadow-xl border-none bg-card p-6 md:p-8">
            <CardHeader className="p-0 mb-6 text-center">
              <Icons.Lock className="w-12 h-12 text-destructive mx-auto mb-4" />
              <CardTitle className="font-headline text-2xl md:text-3xl text-destructive">
                {t('lms.courseContent.payment.accessDeniedTitle', "Access Denied")}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-lg">
                {t('lms.courseContent.payment.accessDeniedMessage', "Payment for the current month's content is required to proceed.")}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-8">
              <Alert variant="default" className="bg-accent/10 border-accent/30">
                <Icons.Info className="h-5 w-5 text-accent" />
                <AlertTitle className="text-accent">
                  {t('lms.courseContent.payment.importantNoteTitle', "Important Note")}
                </AlertTitle>
                <AlertDescription className="text-accent/90">
                  {t('lms.courseContent.payment.importantNoteMessage', "Access to previous months' content (if applicable and paid for) remains available. This restriction applies to the current month's new materials.")}
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-background/50 dark:bg-card/70 p-6">
                  <CardTitle className="text-xl text-primary mb-3 flex items-center">
                    <Icons.UploadCloud className="mr-2 h-6 w-6 text-primary" /> 
                    {t('lms.courseContent.payment.uploadSlipTitle', "Upload Bank Slip")}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mb-4">
                     {t('lms.courseContent.payment.uploadSlipDescription', "If you've already paid via bank transfer, upload your slip for verification.")}
                  </CardDescription>
                  <FileInput onChange={handleFileChange} disabled={isSubmittingSlip} />
                  {selectedFile && <p className="text-xs text-muted-foreground mt-2">{t('lms.courseContent.payment.selectedFile', "Selected: {{fileName}}", { fileName: selectedFile.name })}</p>}
                  <Button 
                    onClick={handleSubmitSlip} 
                    className="w-full mt-4" 
                    disabled={!selectedFile || isSubmittingSlip}
                  >
                    {isSubmittingSlip ? (
                      <><Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('lms.courseContent.payment.submittingButton', "Submitting...")}</>
                    ) : (
                      <>{t('lms.courseContent.payment.submitSlipButton', "Submit Slip")}</>
                    )}
                  </Button>
                </Card>

                <Card className="bg-background/50 dark:bg-card/70 p-6 flex flex-col justify-center items-center text-center">
                  <Icons.CreditCard className="mr-2 h-8 w-8 text-primary mb-3" /> 
                  <CardTitle className="text-xl text-primary mb-3">
                    {t('lms.courseContent.payment.payOnlineTitle', "Pay Online")}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mb-4">
                    {t('lms.courseContent.payment.payOnlineDescription', "Complete your payment securely online to get instant access.")}
                  </CardDescription>
                  <Button onClick={handlePayNow} className="w-full bg-green-600 hover:bg-green-700 text-white">
                     <Icons.ShieldCheck className="mr-2 h-5 w-5" /> {t('lms.courseContent.payment.payNowButton', "Pay Now (Simulate)")}
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      ) : (
        <>
          <Accordion type="multiple" defaultValue={['videos', 'notes', 'recordings']} className="w-full space-y-6">
            <AnimatedSection delay={200}>
              <Card className="shadow-lg border-none bg-card overflow-hidden">
                <AccordionItem value="videos" className="border-b-0">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/10">
                    <div className="flex items-center space-x-3">
                      <Icons.PlayCircle className="w-7 h-7 text-accent" />
                      <h2 className="font-headline text-xl md:text-2xl text-primary">{t('lms.courseContent.sections.videos.title', "Video Lessons")}</h2>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2">
                    {content.videoLessons.length > 0 ? (
                      <ul className="space-y-4">
                        {content.videoLessons.map(video => (
                          <li key={video.id} className="p-4 border rounded-lg bg-background/50 dark:bg-card/70 hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <h3 className="text-lg font-semibold text-foreground">{t(video.titleKey)}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{t(video.descriptionKey, `Description for ${video.titleKey}`)}</p>
                              </div>
                              <div className="flex items-center space-x-3 mt-3 sm:mt-0">
                                <Badge variant="outline" className="text-xs">{video.duration}</Badge>
                                <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10" onClick={() => handleWatchVideo(video.titleKey, video.videoUrl)}>
                                  <Icons.Play className="mr-2 h-4 w-4" /> {t('lms.courseContent.watchButton', "Watch")}
                                </Button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">{t('lms.courseContent.sections.videos.empty', "No video lessons available for this course yet.")}</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={400}>
                <Card className="shadow-lg border-none bg-card overflow-hidden">
                <AccordionItem value="notes" className="border-b-0">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/10">
                    <div className="flex items-center space-x-3">
                      <Icons.FileText className="w-7 h-7 text-accent" />
                      <h2 className="font-headline text-xl md:text-2xl text-primary">{t('lms.courseContent.sections.notes.title', "PDF Notes & Materials")}</h2>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2">
                    {content.pdfNotes.length > 0 ? (
                      <ul className="space-y-4">
                        {content.pdfNotes.map(note => (
                          <li key={note.id} className="p-4 border rounded-lg bg-background/50 dark:bg-card/70 hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <h3 className="text-lg font-semibold text-foreground">{t(note.titleKey)}</h3>
                              <div className="flex items-center space-x-3 mt-3 sm:mt-0">
                                <Badge variant="outline" className="text-xs">{note.fileSize}</Badge>
                                <Button size="sm" variant="ghost" asChild className="text-primary hover:bg-primary/10">
                                  <a href={note.link} target="_blank" rel="noopener noreferrer">
                                    <Icons.Download className="mr-2 h-4 w-4" /> {t('lms.courseContent.downloadButton', "Download")}
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">{t('lms.courseContent.sections.notes.empty', "No PDF notes available for this course yet.")}</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <Card className="shadow-lg border-none bg-card overflow-hidden">
                <AccordionItem value="recordings" className="border-b-0">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/10">
                    <div className="flex items-center space-x-3">
                      <Icons.Video className="w-7 h-7 text-accent" />
                      <h2 className="font-headline text-xl md:text-2xl text-primary">{t('lms.courseContent.sections.recordings.title', "Class Recordings")}</h2>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2">
                    {content.recordings.length > 0 ? (
                      <ul className="space-y-4">
                        {content.recordings.map(recording => (
                          <li key={recording.id} className="p-4 border rounded-lg bg-background/50 dark:bg-card/70 hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <h3 className="text-lg font-semibold text-foreground">{t(recording.titleKey)}</h3>
                                <p className="text-xs text-muted-foreground">{t('lms.courseContent.recordedOn', "Recorded on:")} {recording.date} &bull; {t('lms.courseContent.duration', "Duration:")} {recording.duration}</p>
                              </div>
                               <Button size="sm" variant="ghost" className="mt-3 sm:mt-0 text-primary hover:bg-primary/10" onClick={() => handleWatchVideo(recording.titleKey, recording.videoUrl)}>
                                  <Icons.Play className="mr-2 h-4 w-4" /> {t('lms.courseContent.watchButton', "Watch")}
                                </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">{t('lms.courseContent.sections.recordings.empty', "No class recordings available for this course yet.")}</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Card>
            </AnimatedSection>
          </Accordion>

            <AnimatedSection delay={800}>
                <Card className="shadow-lg border-none bg-card">
                    <CardHeader className="p-6">
                        <div className="flex items-center space-x-3">
                            <Icons.ListChecks className="w-7 h-7 text-accent" />
                            <CardTitle className="font-headline text-xl md:text-2xl text-primary">
                                {t('lms.courseContent.sections.quizzes.title', "Quizzes & Assignments")}
                            </CardTitle>
                        </div>
                         <CardDescription className="text-muted-foreground pt-1">
                            {t('lms.courseContent.sections.quizzes.description', "Test your knowledge and complete assignments.")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                         <p className="text-muted-foreground text-center py-4">{t('lms.courseContent.sections.quizzes.empty', "Quizzes and assignments will appear here. (Coming Soon)")}</p>
                    </CardContent>
                </Card>
            </AnimatedSection>
        </>
      )}

        {currentVideo && (
          <Dialog open={isVideoPlayerOpen} onOpenChange={setIsVideoPlayerOpen}>
            <DialogContent className="sm:max-w-[800px] p-0 aspect-video bg-black rounded-lg overflow-hidden">
              <DialogHeader className="absolute top-0 left-0 right-0 z-10 p-3 bg-gradient-to-b from-black/70 to-transparent">
                <DialogTitle className="text-white text-lg truncate">{t('lms.courseContent.videoPlayer.nowPlaying', "Now Playing: {{videoTitle}}", { videoTitle: currentVideo.title })}</DialogTitle>
              </DialogHeader>
              <div className="w-full h-full flex items-center justify-center">
                {isClient && currentVideo.url ? (
                  <ReactPlayer
                    url={currentVideo.url}
                    playing={true}
                    controls={true}
                    width="100%"
                    height="100%"
                    config={{
                      file: {
                        attributes: {
                          playsInline: true,
                          preload: 'metadata'
                        }
                      }
                    }}
                    onError={(e) => {
                      console.error('ReactPlayer Error:', e);
                       toast({
                        title: t('lms.courseContent.videoPlayer.errorTitle', "Video Playback Error"),
                        description: t('lms.courseContent.videoPlayer.errorDescription', "There was an error playing this video. Please try again later."),
                        variant: "destructive",
                      });
                       setIsVideoPlayerOpen(false); // Close player on error
                    }}
                  />
                ) : (
                   <div className="w-full h-full flex items-center justify-center bg-black text-white">
                     {t('lms.courseContent.videoPlayer.loading', "Loading player...")}
                   </div>
                 )}
              </div>
              <DialogFooter className="absolute bottom-0 left-0 right-0 z-10 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <DialogClose asChild>
                  <Button type="button" variant="secondary" size="sm" className="opacity-80 hover:opacity-100">
                    {t('lms.courseContent.videoPlayer.closeButton', "Close")}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
    </div>
  );
}
