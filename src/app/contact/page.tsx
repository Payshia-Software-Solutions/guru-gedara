
"use client";
import Image from 'next/image';
import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icons from '@/components/icons';
import { useLanguage } from '@/contexts/language-context';

export default function ContactPage() {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-primary/10 rounded-xl">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
          {language === 'si' ? t('contact.titleSinhala') : t('contact.title')}
        </h1>
        <p className="text-xl text-foreground max-w-2xl mx-auto">
          {t('contact.subtitle')}
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form Section */}
        <section>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">
                {t('contact.form.title')} ({language === 'si' || language === 'ta' ? t('contact.form.titleSinhala') : ''})
              </CardTitle>
              <CardDescription>{t('contact.form.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </section>

        {/* Contact Information Section */}
        <section className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">
                {t('contact.otherWays.title')} ({language === 'si' || language === 'ta' ? t('contact.otherWays.titleSinhala') : ''})
              </CardTitle>
              <CardDescription>{t('contact.otherWays.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <Icons.Phone className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">{t('contact.otherWays.phone.title')}</h3>
                  <a href="tel:+94771234567" className="text-muted-foreground hover:text-primary transition-colors">
                    {t('contact.otherWays.phone.number')}
                  </a>
                  <p className="text-xs text-muted-foreground">{t('contact.otherWays.phone.availability')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Icons.Mail className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">
                    {t('contact.otherWays.email.title')} ({language === 'si' || language === 'ta' ? t('contact.otherWays.email.titleSinhala') : ''})
                  </h3>
                  <a href="mailto:info@gurugedara.lk" className="text-muted-foreground hover:text-primary transition-colors">
                    {t('contact.otherWays.email.address')}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Icons.MapPin className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">
                    {t('contact.otherWays.location.title')} ({language === 'si' || language === 'ta' ? t('contact.otherWays.location.titleSinhala') : ''})
                  </h3>
                  <p className="text-muted-foreground">
                    {t('contact.otherWays.location.address')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
            <Image 
              src="https://placehold.co/600x400.png" 
              alt={t('contact.mapAlt', "Map placeholder showing Colombo")}
              width={600} 
              height={400} 
              className="w-full object-cover"
              data-ai-hint="map Sri Lanka"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

    