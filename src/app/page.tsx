import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icons from '@/components/icons';
import type { Course, Testimonial } from '@/types';

const featuredCourses: Course[] = [
  { id: 'sci', name: 'Science', sinhalaName: 'විද්‍යාව', description: 'Explore the wonders of the physical and natural world.', Icon: Icons.Microscope, imageHint: 'science laboratory' },
  { id: 'math', name: 'Mathematics', sinhalaName: 'ගණිතය', description: 'Master logical reasoning and problem-solving skills.', Icon: Icons.Calculator, imageHint: 'mathematics equations' },
  { id: 'eng', name: 'English', sinhalaName: 'ඉංග්‍රීසි', description: 'Enhance your communication and language proficiency.', Icon: Icons.BookOpenText, imageHint: 'books library' },
  { id: 'ict', name: 'ICT', sinhalaName: 'ICT', description: 'Navigate the digital world with essential tech skills.', Icon: Icons.Laptop2, imageHint: 'computer technology' },
];

const testimonials: Testimonial[] = [
  { id: 't1', quote: 'ගුරු ගෙදර E-School helped me understand difficult concepts easily. The teachers are very supportive!', name: 'Nimal Perera', role: 'Student', avatarHint: 'smiling student' },
  { id: 't2', quote: 'My child\'s grades have improved significantly after joining these online classes. Highly recommended!', name: 'Kamala Silva', role: 'Parent', avatarHint: 'happy parent' },
  { id: 't3', quote: 'The flexible schedule and quality teaching made learning enjoyable and effective for my O/L exams.', name: 'Aisha Mohamed', role: 'Student', avatarHint: 'focused student' },
];

const learningBenefits = [
  { text: "Expert teachers with proven track records", Icon: Icons.Users },
  { text: "Interactive and engaging online classes", Icon: Icons.Sparkles },
  { text: "Flexible learning from the comfort of your home", Icon: Icons.Clock },
  { text: "Comprehensive syllabus coverage for O/L exams", Icon: Icons.CheckCircle2 },
  { text: "Regular assessments and feedback", Icon: Icons.TrendingUp },
  { text: "Supportive learning community", Icon: Icons.Lightbulb },
];


export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative text-center py-20 md:py-32 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 via-background to-background">
        <Image
          src="https://placehold.co/1200x600.png?font=pt-sans"
          alt="Students learning online"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-20"
          data-ai-hint="education online learning"
        />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary mb-4">
            ගුරු ගෙදර E-School වෙත සාදරයෙන් පිළිගනිමු!
          </h1>
          <p className="text-lg md:text-2xl text-foreground mb-8 max-w-3xl mx-auto">
            Empowering the future of Sri Lankan students through quality online education. <br />
            ශ්‍රී ලාංකීය දූ දරුවන්ගේ අනාගතය සවිබල ගැන්වීම.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/courses">Join Our Classes</Link>
          </Button>
        </div>
      </section>

      {/* Featured Subjects Section */}
      <section>
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-primary mb-2">අපගේ විෂයයන්</h2>
        <p className="text-center text-muted-foreground mb-10">Explore the subjects we offer for G.C.E. O/L students.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCourses.map((course) => (
            <Card key={course.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col">
              <CardHeader className="items-center text-center">
                <course.Icon className="w-16 h-16 text-accent mb-4" />
                <CardTitle className="font-headline text-2xl text-primary">{course.sinhalaName}</CardTitle>
                <CardDescription className="text-sm text-foreground">{course.name}</CardDescription>
              </CardHeader>
              <CardContent className="text-center flex-grow">
                <p className="text-muted-foreground text-sm">{course.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                  <Link href="/courses">Learn More</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits of Online Learning Section */}
      <section className="py-12 bg-secondary/30 rounded-xl">
        <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-primary mb-2">Why Choose Us?</h2>
            <p className="text-center text-muted-foreground mb-10">Discover the advantages of learning with ගුරු ගෙදර E-School.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {learningBenefits.map((benefit, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-background">
                  <CardContent className="pt-6 flex items-start space-x-4">
                    <benefit.Icon className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">{benefit.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section>
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-primary mb-2">ශිෂ්‍ය අදහස්</h2>
        <p className="text-center text-muted-foreground mb-10">Hear what our students and parents have to say.</p>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-background flex flex-col">
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
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
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
