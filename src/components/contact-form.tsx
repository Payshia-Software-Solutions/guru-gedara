
"use client";

import React from "react"; // Import React
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
import { useLanguage } from "@/contexts/language-context"; 

export type ContactFormValues = z.infer<ReturnType<typeof getFormSchema>>;


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
  const { t, language } = useLanguage(); 

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
  
  React.useEffect(() => {
    form.reset(form.getValues()); 
  }, [t, form]);

  const getLabelWithAddition = (baseKey: string, sinhalaAdditionKey: string, tamilAdditionKey: string) => {
    let label = t(baseKey);
    if (language === 'si' && t(sinhalaAdditionKey)) label += ` (${t(sinhalaAdditionKey)})`;
    if (language === 'ta' && t(tamilAdditionKey)) label += ` (${t(tamilAdditionKey)})`;
    return label;
  };

  const getButtonTextWithAddition = (baseKey: string, sinhalaAdditionKey: string, tamilAdditionKey: string) => {
    let text = t(baseKey);
    if (language === 'si' && t(sinhalaAdditionKey)) text += ` (${t(sinhalaAdditionKey)})`;
    if (language === 'ta' && t(tamilAdditionKey)) text += ` (${t(tamilAdditionKey)})`;
    return text;
  };
  
  const getToastTitleWithAddition = (baseKey: string, sinhalaAdditionKey: string, tamilAdditionKey: string) => {
    let title = t(baseKey);
    if (language === 'si' && t(sinhalaAdditionKey)) title += ` (${t(sinhalaAdditionKey)})`;
    if (language === 'ta' && t(tamilAdditionKey)) title += ` (${t(tamilAdditionKey)})`;
    return title;
  };


  async function onSubmit(values: ContactFormValues) {
    console.log("Form submitted:", values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: getToastTitleWithAddition('contactForm.toast.success.title', 'contactForm.toast.success.titleAdditionSinhala', 'contactForm.toast.success.titleAdditionTamil'),
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
                {getLabelWithAddition('contactForm.name.label', 'contactForm.name.labelAdditionSinhala', 'contactForm.name.labelAdditionTamil')}
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
                {getLabelWithAddition('contactForm.email.label', 'contactForm.email.labelAdditionSinhala', 'contactForm.email.labelAdditionTamil')}
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
                {getLabelWithAddition('contactForm.subject.label', 'contactForm.subject.labelAdditionSinhala', 'contactForm.subject.labelAdditionTamil')}
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
                {getLabelWithAddition('contactForm.message.label', 'contactForm.message.labelAdditionSinhala', 'contactForm.message.labelAdditionTamil')}
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
            : getButtonTextWithAddition('contactForm.submitButton', 'contactForm.submitButtonAdditionSinhala', 'contactForm.submitButtonAdditionTamil')}
        </Button>
      </form>
    </Form>
  );
}
