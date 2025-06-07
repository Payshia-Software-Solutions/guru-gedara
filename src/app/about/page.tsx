import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icons from '@/components/icons';

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-primary/10 rounded-xl">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">අප ගැන</h1>
        <p className="text-xl text-foreground max-w-2xl mx-auto">
          About ගුරු ගෙදර E-School
        </p>
      </section>

      <section>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-primary flex items-center">
              <Icons.Award className="w-8 h-8 mr-3 text-accent" /> Our Mission (අපගේ මෙහෙවර)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground">
            <p>
              At ගුරු ගෙදර E-School, our mission is to provide high-quality, accessible, and affordable online education to G.C.E. Ordinary Level students across Sri Lanka. We aim to empower students with the knowledge and skills necessary to excel in their examinations and build a strong foundation for their future academic and professional pursuits.
            </p>
            <p>
              We believe in fostering a supportive and engaging learning environment that caters to individual student needs, leveraging technology to make learning interactive and effective. Our commitment is to bridge educational gaps and contribute to the academic success of every student who joins our platform.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Image 
                src="https://placehold.co/600x400.png?font=pt-sans" 
                alt="Online class in session" 
                width={600} 
                height={400} 
                className="rounded-lg shadow-md"
                data-ai-hint="students learning" 
              />
              <Image 
                src="https://placehold.co/600x400.png?font=pt-sans" 
                alt="Teacher guiding students" 
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
              <Icons.Users className="w-8 h-8 mr-3 text-accent" /> Our Educators (අපගේ ගුරු මණ්ඩලය)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground">
            <p>
              Our team of educators at ගුරු ගෙදර E-School comprises experienced and dedicated teachers who are passionate about their subjects and committed to student success. They bring a wealth of teaching experience, a deep understanding of the G.C.E. O/L curriculum, and innovative teaching methodologies to the online classroom.
            </p>
            <p>
              Each teacher is carefully selected for their expertise, ability to engage students in an online setting, and their dedication to providing personalized support. We are proud to have a team that not only imparts knowledge but also inspires and motivates students to achieve their full potential.
            </p>
            {/* Placeholder for founder/teacher profiles */}
            <div className="mt-6 grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Mr. A. B. C. Perera", subject: "Founder & Mathematics Lead", imageHint: "teacher portrait" },
                { name: "Ms. D. E. F. Silva", subject: "Science Coordinator", imageHint: "educator smiling" }
              ].map(teacher => (
                <div key={teacher.name} className="flex items-center space-x-4 p-4 border rounded-lg bg-background">
                  <Image 
                    src={`https://placehold.co/80x80.png?font=pt-sans`} 
                    alt={teacher.name} 
                    width={80} 
                    height={80} 
                    className="rounded-full"
                    data-ai-hint={teacher.imageHint}
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-primary">{teacher.name}</h3>
                    <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="text-center py-10">
        <p className="font-headline text-2xl text-accent">
        "ಜ್ಞಾನದ ಹಾದಿಯಲ್ಲಿ ನಿಮ್ಮೊಂದಿಗೆ" <br/> (Accompanying you on the path of knowledge)
        </p>
         <p className="text-md text-foreground mt-2">
           Join us to build a successful academic future!
        </p>
      </section>
    </div>
  );
}
