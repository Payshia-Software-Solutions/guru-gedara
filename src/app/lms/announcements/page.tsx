
"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icons from '@/components/icons';
import { useLanguage } from '@/contexts/language-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Announcement {
  id: string;
  titleKey: string;
  date: string;
  contentKey: string;
  courseContextKey?: string;
  read: boolean;
}

const announcementsData: Announcement[] = [
  {
    id: 'an1',
    titleKey: 'lms.announcements.item1.title',
    date: '2024-08-10',
    contentKey: 'lms.announcements.item1.content',
    courseContextKey: 'lms.announcements.item1.courseContext',
    read: false,
  },
  {
    id: 'an2',
    titleKey: 'lms.announcements.item2.title',
    date: '2024-08-05',
    contentKey: 'lms.announcements.item2.content',
    read: true,
  },
  {
    id: 'an3',
    titleKey: 'lms.announcements.item3.title',
    date: '2024-07-28',
    contentKey: 'lms.announcements.item3.content',
    courseContextKey: 'lms.announcements.item3.courseContext',
    read: true,
  },
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

export default function AnnouncementsPage() {
  const { t, language } = useLanguage();
  const [currentAnnouncements, setCurrentAnnouncements] = useState<Announcement[]>(announcementsData);

  const getPageTitle = () => {
    if (language === 'si') return t('lms.announcements.titleSinhala', t('lms.announcements.title'));
    if (language === 'ta') return t('lms.announcements.titleTamil', t('lms.announcements.title'));
    return t('lms.announcements.title');
  };

  const markAsRead = (id: string) => {
    setCurrentAnnouncements(prev => 
      prev.map(ann => ann.id === id ? { ...ann, read: true } : ann)
    );
  };

  return (
    <div className="space-y-8 md:space-y-12">
      <AnimatedSection>
        <div className="text-left pb-8 md:pb-12 border-b">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-2">
            {getPageTitle()}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('lms.announcements.subtitle', "Stay updated with the latest news and notices.")}
          </p>
        </div>
      </AnimatedSection>

      {currentAnnouncements.length > 0 ? (
        <AnimatedSection delay={200} className="space-y-6">
          {currentAnnouncements.map((announcement) => (
            <Card 
              key={announcement.id} 
              className={`bg-card shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out ${!announcement.read ? 'border-primary border-2' : 'border-border'}`}
            >
              <CardHeader className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <CardTitle className="font-headline text-xl md:text-2xl text-primary mb-1 sm:mb-0">
                    {t(announcement.titleKey)}
                  </CardTitle>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Badge variant="outline" className="text-xs py-1">{announcement.date}</Badge>
                    {!announcement.read && <Badge variant="default" className="text-xs py-1 bg-accent text-accent-foreground">{t('lms.announcements.unreadBadge', 'New')}</Badge>}
                  </div>
                </div>
                {announcement.courseContextKey && (
                  <CardDescription className="text-xs text-accent font-medium mt-1">
                     {t(announcement.courseContextKey)}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <p className="text-base text-foreground/90 leading-relaxed">{t(announcement.contentKey)}</p>
                {!announcement.read && (
                  <div className="mt-4 text-right">
                    <Button variant="ghost" size="sm" onClick={() => markAsRead(announcement.id)} className="text-primary hover:bg-primary/10">
                      <Icons.CheckCircle2 className="mr-2 h-4 w-4" />
                      {t('lms.announcements.markAsReadButton', "Mark as Read")}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </AnimatedSection>
      ) : (
        <AnimatedSection delay={200}>
          <Card className="text-center p-8 md:p-12 bg-card shadow-lg">
            <Icons.Megaphone className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-primary mb-3">{t('lms.announcements.noAnnouncements.title', "No Announcements")}</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">{t('lms.announcements.noAnnouncements.description', "There are no new announcements at the moment. Please check back later.")}</p>
          </Card>
        </AnimatedSection>
      )}
    </div>
  );
}

