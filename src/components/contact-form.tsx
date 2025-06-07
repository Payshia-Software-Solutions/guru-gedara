
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context"; // Import useLanguage

export type ContactFormValues = z.infer<ReturnType<typeof getFormSchema>>;


// Function to generate schema with translated messages
const getFormSchema = (t: (key: string, fallback?: string) => string) => z.object({
  name: z.string().min(2, { message: t('contactForm.validation.nameMin', "Name must be at least 2 characters.") }),
  email: z.string().email({ message: t('contactForm.validation.emailInvalid', "Invalid email address.") }),
  subject: z.string().min(5, { message: t('contactForm.validation.subjectMin', "Subject must be at least 5 characters.") }),
  message: z.string()
    .min(10, { message: t('contactForm.validation.messageMin', "Message must be at least 10 characters.") })
    .max(500, { message: t('contactForm.validation.messageMax', "Message must not exceed 500 characters.") }),
});


export function ContactForm() {
  const { toast } = useToast();
  const { t, language } = useLanguage(); // Get t and language

  // Memoize the schema to avoid re-creation on every render unless t changes
  const formSchema = React.useMemo(() => getFormSchema(t), [t]);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  // Effect to update validation messages if language changes
  React.useEffect(() => {
    // Re-evaluate resolver with the new 't' function if language changes
    // This is a bit of a trick with react-hook-form. Resetting the form or triggering re-validation might be needed.
    // For simplicity, we rely on the fact that zodResolver will use the new schema on next validation.
    // To be more robust, one might need to trigger form.trigger() or reset the resolver.
    form.reset(form.getValues()); // This re-runs validation with the new schema context
  }, [t, form]);


  async function onSubmit(values: ContactFormValues) {
    console.log("Form submitted:", values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: t('contactForm.toast.success.title', 'Message Sent!') + (language === 'si' || language === 'ta' ? ` (${t('contactForm.toast.success.titleSinhala')})` : ''),
      description: t('contactForm.toast.success.description', "Thank you for contacting us. We will get back to you soon."),
      variant: "default",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('contactForm.name.label', 'Your Name')} ({language === 'si' || language === 'ta' ? t('contactForm.name.labelSinhala', 'ඔබගේ නම') : ''})
              </FormLabel>
              <FormControl>
                <Input placeholder={t('contactForm.name.placeholder', 'e.g., Sunil Perera')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('contactForm.email.label', 'Email Address')} ({language === 'si' || language === 'ta' ? t('contactForm.email.labelSinhala', 'විද්‍යුත් තැපෑල') : ''})
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder={t('contactForm.email.placeholder', 'e.g., sunil@example.com')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('contactForm.subject.label', 'Subject')} ({language === 'si' || language === 'ta' ? t('contactForm.subject.labelSinhala', 'විෂය') : ''})
              </FormLabel>
              <FormControl>
                <Input placeholder={t('contactForm.subject.placeholder', 'e.g., Inquiry about Science class')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('contactForm.message.label', 'Message')} ({language === 'si' || language === 'ta' ? t('contactForm.message.labelSinhala', 'පණිවිඩය') : ''})
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('contactForm.message.placeholder', 'Type your message here...')}
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting 
            ? t('contactForm.submittingButton', 'Sending...') 
            : `${t('contactForm.submitButton', 'Send Message')} (${language === 'si' || language === 'ta' ? t('contactForm.submitButtonSinhala', 'යවන්න') : ''})`}
        </Button>
      </form>
    </Form>
  );
}

    