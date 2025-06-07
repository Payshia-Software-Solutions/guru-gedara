
"use client";
import Image from 'next/image';
import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icons from '@/components/icons';
import { useLanguage } from '@/contexts/language-context';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

export default function ContactPage() {
  const { t, language } = useLanguage();

  const getPageTitle = () => {
    if (language === 'si') return t('contact.titleSinhala');
    if (language === 'ta') return t('contact.titleTamil', t('contact.title'));
    return t('contact.title');
  };

  const getFormTitle = () => {
    let title = t('contact.form.title');
    if (language === 'si') title += ` (${t('contact.form.titleAdditionSinhala')})`;
    if (language === 'ta') title += ` (${t('contact.form.titleAdditionTamil', t('contact.form.titleAdditionSinhala'))})`;
    return title;
  };

  const getOtherWaysTitle = () => {
    let title = t('contact.otherWays.title');
    if (language === 'si') title += ` (${t('contact.otherWays.titleAdditionSinhala')})`;
    if (language === 'ta') title += ` (${t('contact.otherWays.titleAdditionTamil', t('contact.otherWays.titleAdditionSinhala'))})`;
    return title;
  };
  
  const getEmailTitle = () => {
    let title = t('contact.otherWays.email.title');
    if (language === 'si') title += ` (${t('contact.otherWays.email.titleAdditionSinhala')})`;
    if (language === 'ta') title += ` (${t('contact.otherWays.email.titleAdditionTamil', t('contact.otherWays.email.titleAdditionSinhala'))})`;
    return title;
  };

  const getLocationTitle = () => {
    let title = t('contact.otherWays.location.title');
    if (language === 'si') title += ` (${t('contact.otherWays.location.titleAdditionSinhala')})`;
    if (language === 'ta') title += ` (${t('contact.otherWays.location.titleAdditionTamil', t('contact.otherWays.location.titleAdditionSinhala'))})`;
    return title;
  };

  const whatsAppNumber = "+94771234567"; // Replace with actual number
  const whatsAppMessage = "Hello Guru Gedara E-School, I'd like to inquire about your classes.";
  const whatsAppLink = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(whatsAppMessage)}`;

  return (
    <div className="space-y-24 md:space-y-32">
      <AnimatedSection>
        <div className="text-center py-16 md:py-24 bg-gradient-to-br from-primary to-sky-400 dark:from-primary dark:to-sky-700 rounded-xl">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            {getPageTitle()}
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <AnimatedSection delay={200}>
          <Card className="shadow-xl border-none bg-card p-2 sm:p-4">
            <CardHeader>
              <CardTitle className="font-headline text-2xl md:text-3xl text-primary">
                {getFormTitle()}
              </CardTitle>
              <CardDescription className="text-muted-foreground">{t('contact.form.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={400} className="space-y-8">
          <Card className="shadow-xl border-none bg-card p-2 sm:p-4">
            <CardHeader>
              <CardTitle className="font-headline text-2xl md:text-3xl text-primary">
                {getOtherWaysTitle()}
              </CardTitle>
              <CardDescription className="text-muted-foreground">{t('contact.otherWays.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="p-2 bg-accent/10 rounded-full transition-colors group-hover:bg-accent/20">
                  <Icons.Phone className="w-6 h-6 text-accent transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary">{t('contact.otherWays.phone.title')}</h3>
                  <a href={`tel:${t('contact.otherWays.phone.number')}`} className="text-foreground/80 hover:text-primary transition-colors">
                    {t('contact.otherWays.phone.number')}
                  </a>
                  <p className="text-xs text-muted-foreground">{t('contact.otherWays.phone.availability')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                 <div className="p-2 bg-accent/10 rounded-full transition-colors group-hover:bg-accent/20">
                    <Icons.Mail className="w-6 h-6 text-accent transition-transform group-hover:scale-110" />
                  </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary">
                    {getEmailTitle()}
                  </h3>
                  <a href={`mailto:${t('contact.otherWays.email.address')}`} className="text-foreground/80 hover:text-primary transition-colors">
                    {t('contact.otherWays.email.address')}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="p-2 bg-accent/10 rounded-full transition-colors group-hover:bg-accent/20">
                  <Icons.MapPin className="w-6 h-6 text-accent transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary">
                    {getLocationTitle()}
                  </h3>
                  <p className="text-foreground/80">
                    {t('contact.otherWays.location.address')}
                  </p>
                </div>
              </div>
               <Button asChild size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white mt-6 py-3 transition-transform hover:scale-105">
                <Link href={whatsAppLink} target="_blank" rel="noopener noreferrer">
                  <Icons.MessageSquare className="mr-2 h-5 w-5" /> {/* Or a WhatsApp specific icon if available */}
                  {t('contact.whatsappButton', 'Chat on WhatsApp')}
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <div className="mt-10 rounded-lg overflow-hidden shadow-xl">
            <Image 
              src="https://placehold.co/600x400.png" 
              alt={t('contact.mapAlt', "Map placeholder showing Colombo")}
              width={600} 
              height={400} 
              className="w-full object-cover aspect-video"
              data-ai-hint="map Sri Lanka colombo"
            />
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
