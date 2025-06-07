import Image from 'next/image';
import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icons from '@/components/icons'; // Assuming Phone, Mail, MapPin are available

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-primary/10 rounded-xl">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">අප අමතන්න</h1>
        <p className="text-xl text-foreground max-w-2xl mx-auto">
          Contact Us. We're here to help with any questions you may have.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form Section */}
        <section>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Send us a Message (පණිවිඩයක් එවන්න)</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
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
              <CardTitle className="font-headline text-2xl text-primary">Other Ways to Reach Us (වෙනත් මාර්ග)</CardTitle>
              <CardDescription>You can also contact us directly through these channels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <Icons.Phone className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">WhatsApp / Phone</h3>
                  <a href="tel:+94771234567" className="text-muted-foreground hover:text-primary transition-colors">
                    +94 77 123 4567 (Placeholder)
                  </a>
                  <p className="text-xs text-muted-foreground">Available 9 AM - 5 PM (Weekdays)</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Icons.Mail className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Email Address (විද්‍යුත් තැපෑල)</h3>
                  <a href="mailto:info@gurugedara.lk" className="text-muted-foreground hover:text-primary transition-colors">
                    info@gurugedara.lk (Placeholder)
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Icons.MapPin className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Our Location (ස්ථානය)</h3>
                  <p className="text-muted-foreground">
                    No. 123, Main Street, Colombo, Sri Lanka (Online Operations Hub - Placeholder)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
            <Image 
              src="https://placehold.co/600x400.png?font=pt-sans" 
              alt="Map placeholder showing Colombo" 
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
