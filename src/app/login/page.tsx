
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Icons from "@/components/icons";
import { useLanguage } from "@/contexts/language-context";
import { useToast } from "@/hooks/use-toast";

const AnimatedSection: React.FC<{children: React.ReactNode, className?: string, delay?: number}> = ({ children, className, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`${className || ''} transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      {children}
    </div>
  );
};

const getLoginFormSchema = (t: (key: string, fallback?: string) => string) => z.object({
  email: z.string().email({ message: t('login.validation.emailInvalid', "Invalid email address.") }),
  password: z.string().min(6, { message: t('login.validation.passwordMin', "Password must be at least 6 characters.") }),
});

export type LoginFormValues = z.infer<ReturnType<typeof getLoginFormSchema>>;

export default function LoginPage() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const router = useRouter(); 

  const loginFormSchema = React.useMemo(() => getLoginFormSchema(t), [t]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  React.useEffect(() => {
    form.reset(form.getValues()); 
  }, [t, form]);

  const getPageTitle = () => {
    if (language === 'si') return t('login.titleSinhala', t('login.title'));
    if (language === 'ta') return t('login.titleTamil', t('login.title'));
    return t('login.title');
  };

  async function onSubmit(values: LoginFormValues) {
    console.log("Login form submitted:", values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: t('login.toast.success.title', "Login Attempt"),
      description: t('login.toast.success.descriptionPlaceholder', "Redirecting to dashboard..."), 
      variant: "default",
    });
    
    // Redirect to LMS dashboard page
    router.push('/lms/dashboard'); 
  }

  return (
    <div className="space-y-24 md:space-y-32">
      <AnimatedSection>
        <div className="text-center py-16 md:py-24 bg-gradient-to-br from-primary to-sky-400 dark:from-primary dark:to-sky-700 rounded-xl">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            {getPageTitle()}
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            {t('login.subtitle', "Access your student dashboard and learning materials.")}
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={200} className="max-w-md mx-auto">
        <Card className="shadow-xl border-none bg-card p-2 sm:p-4">
          <CardHeader className="text-center">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4 mx-auto w-fit">
                <Icons.LogIn className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl md:text-3xl text-primary">
              {t('login.form.title', "Student Login")}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {t('login.form.description', "Enter your credentials to access your account.")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Icons.Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        {t('login.form.emailLabel', "Email Address")}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder={t('login.form.emailPlaceholder', 'your.email@example.com')} 
                          {...field} 
                          className="text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Icons.KeyRound className="mr-2 h-4 w-4 text-muted-foreground" />
                        {t('login.form.passwordLabel', "Password")}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder={t('login.form.passwordPlaceholder', '••••••••')} 
                          {...field} 
                          className="text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting 
                    ? (<><Icons.Loader2 className="mr-2 h-5 w-5 animate-spin" /> {t('login.form.submittingButton', 'Logging in...')}</>)
                    : t('login.form.submitButton', 'Login to Your Account')}
                </Button>
              </form>
            </Form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {t('login.form.noAccount', "Don't have an account?")}{' '}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                {t('login.form.signUpLink', "Sign up here")}
              </Link>
            </p>
             <p className="mt-2 text-center text-sm text-muted-foreground">
              <Link href="/forgot-password" className="font-medium text-primary hover:underline">
                {t('login.form.forgotPasswordLink', "Forgot password?")}
              </Link>
            </p>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}
