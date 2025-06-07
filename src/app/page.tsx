
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icons from '@/components/icons';
import type { Course, Testimonial } from '@/types';
import { useLanguage } from '@/contexts/language-context';

const featuredCourseKeys: Array<{ id: 'science' | 'mathematics' | 'english' | 'ict'; Icon: typeof Icons.Microscope, imageHint: string }> = [
  { id: 'science', Icon: Icons.Microscope, imageHint: 'science laboratory' },
  { id: 'mathematics', Icon: Icons.Calculator, imageHint: 'mathematics equations' },
  { id: 'english', Icon: Icons.BookOpenText, imageHint: 'books library' },
  { id: 'ict', Icon: Icons.Laptop2, imageHint: 'computer technology' },
];

const testimonials: Testimonial[] = [
  { id: 't1', quote: 'ගුරු ගෙදර E-School helped me understand difficult concepts easily. The teachers are very supportive!', name: 'Nimal Perera', roleKey: 'home.testimonials.roleStudent', avatarHint: 'smiling student' },
  { id: 't2', quote: 'My child\'s grades have improved significantly after joining these online classes. Highly recommended!', name: 'Kamala Silva', roleKey: 'home.testimonials.roleParent', avatarHint: 'happy parent' },
  { id: 't3', quote: 'The flexible schedule and quality teaching made learning enjoyable and effective for my O/L exams.', name: 'Aisha Mohamed', roleKey: 'home.testimonials.roleStudent', avatarHint: 'focused student' },
];

const learningBenefitKeys = [
  { textKey: "home.benefits.item1", Icon: Icons.Users },
  { textKey: "home.benefits.item2", Icon: Icons.Sparkles },
  { textKey: "home.benefits.item3", Icon: Icons.Clock },
  { textKey: "home.benefits.item4", Icon: Icons.CheckCircle2 },
  { textKey: "home.benefits.item5", Icon: Icons.TrendingUp },
  { textKey: "home.benefits.item6", Icon: Icons.Lightbulb },
];


export default function HomePage() {
  const { t, language } = useLanguage();

  const getFeaturedCourseName = (id: string) => {
    if (language === 'si') {
      return t(`home.featuredSubjects.${id}.sinhalaName`, t(`home.featuredSubjects.${id}.name`));
    }
    return t(`home.featuredSubjects.${id}.name`);
  }
  
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative text-center py-20 md:py-32 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 via-background to-background">
        <Image
          src="https://placehold.co/1200x600.png?font=pt-sans"
          alt={t('home.hero.imageAlt', "Students learning online")}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-20"
          data-ai-hint="education online learning"
        />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary mb-4"
            dangerouslySetInnerHTML={{ __html: t('home.hero.title', 'Welcome to ගුරු ගෙදර E-School!') }}
          />
          <p className="text-lg md:text-2xl text-foreground mb-8 max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: t('home.hero.subtitle', "Empowering the future of Sri Lankan students through quality online education. <br /> ශ්‍රී ලාංකීය දූ දරුවන්ගේ අනාගතය සවිබල ගැන්වීම.") }}
          />
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/courses">{t('home.hero.joinButton', 'Join Our Classes')}</Link>
          </Button>
        </div>
      </section>

      {/* Featured Subjects Section */}
      <section>
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-primary mb-2">{language === 'si' ? t('nav.courses', 'පාඨමාලා') : t('home.featuredSubjects.title', 'Our Subjects')}</h2>
        <p className="text-center text-muted-foreground mb-10">{t('home.featuredSubjects.subtitle', 'Explore the subjects we offer for G.C.E. O/L students.')}</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCourseKeys.map((courseKey) => (
            <Card key={courseKey.id} className="hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col">
              <CardHeader className="items-center text-center">
                <courseKey.Icon className="w-16 h-16 text-accent mb-4" />
                <CardTitle className="font-headline text-2xl text-primary">{getFeaturedCourseName(courseKey.id)}</CardTitle>
                <CardDescription className="text-sm text-foreground">{language !== 'si' ? t(`home.featuredSubjects.${courseKey.id}.name`) : ''}</CardDescription>
              </CardHeader>
              <CardContent className="text-center flex-grow">
                <p className="text-muted-foreground text-sm">{t(`home.featuredSubjects.${courseKey.id}.description`)}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                  <Link href={`/courses/${courseKey.id}`}>{t('home.featuredSubjects.learnMoreButton', 'Learn More')}</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits of Online Learning Section */}
      <section className="py-12 bg-background/70 rounded-xl">
        <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-primary mb-2">{t('home.benefits.title', 'Why Choose Us?')}</h2>
            <p className="text-center text-muted-foreground mb-10">{t('home.benefits.subtitle', 'Discover the advantages of learning with ගුරු ගෙදර E-School.')}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {learningBenefitKeys.map((benefit, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow duration-300 bg-card">
                  <CardContent className="pt-6 flex items-start space-x-4">
                    <benefit.Icon className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">{t(benefit.textKey)}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section>
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-primary mb-2">{language === 'si' ? t('home.testimonials.title', 'Student Feedback') : t('home.testimonials.title', 'Student Feedback')}</h2>
        <p className="text-center text-muted-foreground mb-10">{t('home.testimonials.subtitle', 'Hear what our students and parents have to say.')}</p>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-xl transition-shadow duration-300 ease-in-out bg-card flex flex-col">
              <CardContent className="pt-6 flex-grow">
                <Icons.Sparkles className="w-8 h-8 text-accent mb-4" />
                <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center space-x-3">
                  <Image
                    src={`https://placehold.co/40x40.png?font=pt-sans`}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                    data-ai-hint={testimonial.avatarHint}
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{t(testimonial.roleKey, testimonial.roleKey.includes('Student') ? 'Student' : 'Parent')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
