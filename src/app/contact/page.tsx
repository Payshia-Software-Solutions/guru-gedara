
"use client";
import Image from 'next/image';
import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icons from '@/components/icons';
import { useLanguage } from '@/contexts/language-context';

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
    if (language === 'ta') title += ` (${t('contact.form.titleAdditionTamil', t('contact.form.titleAdditionSinhala'))})`; // Fallback to Sinhala addition if Tamil not present for addition
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


  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-primary/10 rounded-xl">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
          {getPageTitle()}
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
                {getFormTitle()}
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
                {getOtherWaysTitle()}
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
                    {getEmailTitle()}
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
                    {getLocationTitle()}
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
