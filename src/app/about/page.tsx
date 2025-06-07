
"use client";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icons from '@/components/icons';
import { useLanguage } from '@/contexts/language-context';

const teachersData = [
  { name: "Mr. A. B. C. Perera", roleKey: "about.educators.teacher1Role", imageHint: "teacher portrait" },
  { name: "Ms. D. E. F. Silva", roleKey: "about.educators.teacher2Role", imageHint: "educator smiling" }
];

export default function AboutPage() {
  const { t, language } = useLanguage();

  const getPageTitle = () => {
    if (language === 'si') return t('about.titleSinhala', 'අප ගැන');
    if (language === 'ta') return t('about.titleTamil', t('about.title'));
    return t('about.title', 'About Us');
  };

  const getMissionTitle = () => {
    if (language === 'si') return t('about.mission.titleSinhala');
    if (language === 'ta') return t('about.mission.titleTamil', t('about.mission.title'));
    return t('about.mission.title');
  };

  const getEducatorsTitle = () => {
    if (language === 'si') return t('about.educators.titleSinhala');
    if (language === 'ta') return t('about.educators.titleTamil', t('about.educators.title'));
    return t('about.educators.title');
  };

  return (
    <div className="space-y-20">
      <section className="text-center py-12 bg-primary/10 rounded-xl">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
          {getPageTitle()}
        </h1>
        <p className="text-xl text-foreground max-w-2xl mx-auto">
          {t('about.subtitle', 'About ගුරු ගෙදර E-School')}
        </p>
      </section>

      <section>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-primary flex items-center">
              <Icons.Award className="w-8 h-8 mr-3 text-accent" /> 
              {getMissionTitle()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground">
            <p className="text-lg leading-relaxed">
              {t('about.mission.p1')}
            </p>
            <p className="text-lg leading-relaxed">
              {t('about.mission.p2')}
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Image 
                src="https://placehold.co/600x400.png"
                alt={t('about.mission.image1Alt', "Online class in session")} 
                width={600} 
                height={400} 
                className="rounded-lg shadow-md"
                data-ai-hint="students learning" 
              />
              <Image 
                src="https://placehold.co/600x400.png"
                alt={t('about.mission.image2Alt', "Teacher guiding students")} 
                width={600} 
                height={400} 
                className="rounded-lg shadow-md"
                data-ai-hint="teacher online"
              />
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-primary flex items-center">
              <Icons.Users className="w-8 h-8 mr-3 text-accent" /> 
              {getEducatorsTitle()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground">
            <p className="text-lg leading-relaxed">
              {t('about.educators.p1')}
            </p>
            <p className="text-lg leading-relaxed">
              {t('about.educators.p2')}
            </p>
            <div className="mt-6 grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              {teachersData.map(teacher => (
                <div key={teacher.name} className="flex items-center space-x-4 p-4 border rounded-lg bg-background">
                  <Image 
                    src={`https://placehold.co/80x80.png`}
                    alt={t('about.educators.teacherImageAlt', `Educator ${teacher.name}`, { name: teacher.name })} 
                    width={80} 
                    height={80} 
                    className="rounded-full"
                    data-ai-hint={teacher.imageHint}
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-primary">{teacher.name}</h3>
                    <p className="text-sm text-muted-foreground">{t(teacher.roleKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="text-center py-10">
        <p className="font-headline text-2xl text-accent">
          {t('about.quote.kannada')} <br/> ({t('about.quote.english')})
        </p>
         <p className="text-md text-foreground mt-2">
           {t('about.quote.cta')}
        </p>
      </section>
    </div>
  );
}
