import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icons from '@/components/icons';
import type { Course } from '@/types';

const coursesData: Course[] = [
  { 
    id: 'science', 
    name: 'Science', 
    sinhalaName: 'විද්‍යාව', 
    description: 'Delve into the principles of Physics, Chemistry, and Biology. Our Science course is designed to build a strong conceptual understanding and prepare students for practical applications.', 
    Icon: Icons.Microscope,
    imageHint: 'science experiment'
  },
  { 
    id: 'mathematics', 
    name: 'Mathematics', 
    sinhalaName: 'ගණිතය', 
    description: 'Develop critical thinking and problem-solving abilities with our comprehensive Mathematics curriculum. Covers all O/L topics with clear explanations and practice.', 
    Icon: Icons.Calculator,
    imageHint: 'math problems'
  },
  { 
    id: 'english', 
    name: 'English Language', 
    sinhalaName: 'ඉංග්‍රීසි භාෂාව', 
    description: 'Improve your grammar, vocabulary, reading, and writing skills. Our English course focuses on effective communication and O/L exam success.', 
    Icon: Icons.BookOpenText,
    imageHint: 'english learning'
  },
  { 
    id: 'ict', 
    name: 'Information & Communication Technology', 
    sinhalaName: 'තොරතුරු හා සන්නිවේදන තාක්ෂණය', 
    description: 'Gain essential digital literacy and ICT skills. This course covers theoretical concepts and practical applications relevant to the O/L syllabus and modern world.', 
    Icon: Icons.Laptop2,
    imageHint: 'ict class'
  },
];

export default function CoursesPage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-primary/10 rounded-xl">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">අපගේ පාඨමාලා</h1>
        <p className="text-xl text-foreground max-w-2xl mx-auto">
          Explore the subjects offered at ගුරු ගෙදර E-School for G.C.E. O/L students.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        {coursesData.map((course) => (
          <Card key={course.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-4 mb-4">
                <course.Icon className="w-12 h-12 text-accent" />
                <div>
                  <CardTitle className="font-headline text-2xl text-primary">{course.sinhalaName}</CardTitle>
                  <CardDescription className="text-md text-foreground">{course.name}</CardDescription>
                </div>
              </div>
               <Image 
                  src={`https://placehold.co/600x300.png?font=pt-sans`}
                  alt={`${course.name} illustration`}
                  width={600}
                  height={300}
                  className="rounded-md object-cover"
                  data-ai-hint={course.imageHint}
                />
            </CardHeader>
            <CardContent className="text-muted-foreground flex-grow">
              <p>{course.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Enroll Now (ලියාපදිංචි වන්න)
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
