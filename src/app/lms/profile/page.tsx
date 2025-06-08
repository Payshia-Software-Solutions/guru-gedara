
"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icons from '@/components/icons';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  name: string;
  email: string;
  studentId: string;
  enrolledSince: string;
  profileImageHint: string;
  contactNumber?: string;
  address?: string;
}

interface UserPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  preferredLanguage: string; // Could be 'en', 'si', 'ta'
  darkMode: 'system' | 'light' | 'dark';
}

const userProfileData: UserProfile = {
  name: 'Ayesha Perera',
  email: 'ayesha.p@example.com',
  studentId: 'GGES-10234',
  enrolledSince: 'July 15, 2024',
  profileImageHint: 'student avatar female',
  contactNumber: '+94 77 123 4568',
  address: '123, Galle Road, Colombo 03, Sri Lanka',
};

const initialUserPreferences: UserPreferences = {
    emailNotifications: true,
    smsNotifications: false,
    preferredLanguage: 'en',
    darkMode: 'system'
};

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

export default function MyProfilePage() {
  const { t, language, setLanguage: setGlobalLanguage } = useLanguage();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>(userProfileData);
  const [preferences, setPreferences] = useState<UserPreferences>(initialUserPreferences);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);

  useEffect(() => {
    // In a real app, fetch profile and preferences from an API
    // For now, also sync initial global language to local pref if different
    setPreferences(prev => ({...prev, preferredLanguage: language }));
  }, [language]);


  const getPageTitle = () => {
    if (language === 'si') return t('lms.profile.titleSinhala', t('lms.profile.title'));
    if (language === 'ta') return t('lms.profile.titleTamil', t('lms.profile.title'));
    return t('lms.profile.title');
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (key: keyof UserPreferences, value: boolean | string) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };
  
  const saveProfile = async () => {
    setIsEditingProfile(false);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: t('lms.profile.toast.profileSavedTitle', "Profile Updated"), description: t('lms.profile.toast.profileSavedDescription', "Your profile information has been saved.") });
  };

  const savePreferences = async () => {
    setIsEditingPreferences(false);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // If language changed, update global context
    if (preferences.preferredLanguage !== language) {
      setGlobalLanguage(preferences.preferredLanguage as 'en' | 'si' | 'ta');
    }
    // Dark mode would be handled by ThemeProvider, this is just a mock UI for it

    toast({ title: t('lms.profile.toast.preferencesSavedTitle', "Preferences Saved"), description: t('lms.profile.toast.preferencesSavedDescription', "Your preferences have been updated.") });
  };


  return (
    <div className="space-y-8 md:space-y-12">
      <AnimatedSection>
        <div className="text-left pb-8 md:pb-12 border-b">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-2">
            {getPageTitle()}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('lms.profile.subtitle', "Manage your account details and preferences.")}
          </p>
        </div>
      </AnimatedSection>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Profile Details Card */}
        <AnimatedSection delay={200} className="lg:col-span-2">
          <Card className="shadow-xl border-none bg-card">
            <CardHeader className="flex flex-row justify-between items-center p-4 sm:p-6">
              <div className="flex items-center space-x-3">
                <Icons.UserCircle className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline text-2xl md:text-3xl text-primary">
                  {t('lms.profile.details.title', "My Details")}
                </CardTitle>
              </div>
              <Button variant={isEditingProfile ? "default" : "outline"} size="sm" onClick={() => isEditingProfile ? saveProfile() : setIsEditingProfile(true)}>
                {isEditingProfile ? <><Icons.CheckCircle2 className="mr-2 h-4 w-4"/>{t('lms.profile.buttons.save', "Save")}</> : <><Icons.Edit3 className="mr-2 h-4 w-4"/>{t('lms.profile.buttons.edit', "Edit")}</>}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <Image
                  src={`https://placehold.co/128x128.png`} // Slightly larger placeholder for consistency
                  alt={t('lms.profile.details.avatarAlt', "User Avatar")}
                  width={100} // base size for mobile
                  height={100} // base size for mobile
                  className="rounded-full border-4 border-accent/30 shadow-md w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover"
                  data-ai-hint={profile.profileImageHint}
                />
                <div className="flex-1 space-y-1 text-center sm:text-left">
                  {isEditingProfile ? (
                     <Input name="name" value={profile.name} onChange={handleProfileChange} placeholder={t('lms.profile.details.namePlaceholder', "Full Name")} className="text-xl sm:text-2xl font-semibold"/>
                  ) : (
                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">{profile.name}</h2>
                  )}
                  <p className="text-xs sm:text-sm text-muted-foreground">{t('lms.profile.details.studentIdLabel', "Student ID:")} {profile.studentId}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{t('lms.profile.details.enrolledSinceLabel', "Enrolled Since:")} {profile.enrolledSince}</p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <Label htmlFor="email">{t('lms.profile.details.emailLabel', "Email Address")}</Label>
                  {isEditingProfile ? (
                    <Input type="email" name="email" id="email" value={profile.email} onChange={handleProfileChange} placeholder="your.email@example.com" />
                  ) : (
                    <p className="text-foreground/90 text-sm sm:text-base">{profile.email}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="contactNumber">{t('lms.profile.details.contactNumberLabel', "Contact Number")}</Label>
                  {isEditingProfile ? (
                    <Input name="contactNumber" id="contactNumber" value={profile.contactNumber || ''} onChange={handleProfileChange} placeholder="+94 XX XXX XXXX" />
                  ) : (
                    <p className="text-foreground/90 text-sm sm:text-base">{profile.contactNumber || t('lms.profile.notSet', 'Not set')}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">{t('lms.profile.details.addressLabel', "Address")}</Label>
                  {isEditingProfile ? (
                     <Input name="address" id="address" value={profile.address || ''} onChange={handleProfileChange} placeholder="Your address" />
                  ) : (
                    <p className="text-foreground/90 text-sm sm:text-base">{profile.address || t('lms.profile.notSet', 'Not set')}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Preferences Card */}
        <AnimatedSection delay={400} className="lg:col-span-1">
          <Card className="shadow-xl border-none bg-card">
            <CardHeader className="flex flex-row justify-between items-center p-4 sm:p-6">
               <div className="flex items-center space-x-3">
                <Icons.Settings className="w-7 h-7 text-primary" />
                <CardTitle className="font-headline text-xl md:text-2xl text-primary">
                  {t('lms.profile.preferences.title', "Preferences")}
                </CardTitle>
              </div>
               <Button variant={isEditingPreferences ? "default" : "outline"} size="sm" onClick={() => isEditingPreferences ? savePreferences() : setIsEditingPreferences(true)}>
                {isEditingPreferences ? <><Icons.CheckCircle2 className="mr-2 h-4 w-4"/>{t('lms.profile.buttons.save', "Save")}</> : <><Icons.Edit3 className="mr-2 h-4 w-4"/>{t('lms.profile.buttons.edit', "Edit")}</>}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6 p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotifications" className="flex-grow text-sm sm:text-base">{t('lms.profile.preferences.emailNotificationsLabel', "Email Notifications")}</Label>
                  <Switch
                    id="emailNotifications"
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
                    disabled={!isEditingPreferences}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="smsNotifications" className="flex-grow text-sm sm:text-base">{t('lms.profile.preferences.smsNotificationsLabel', "SMS Notifications")}</Label>
                   <Switch
                    id="smsNotifications"
                    checked={preferences.smsNotifications}
                    onCheckedChange={(checked) => handlePreferenceChange('smsNotifications', checked)}
                    disabled={!isEditingPreferences}
                  />
                </div>
                <div>
                  <Label htmlFor="preferredLanguage" className="text-sm sm:text-base">{t('lms.profile.preferences.languageLabel', "Preferred Language")}</Label>
                  {isEditingPreferences ? (
                    <select 
                      id="preferredLanguage" 
                      value={preferences.preferredLanguage} 
                      onChange={(e) => handlePreferenceChange('preferredLanguage', e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-sm sm:text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary focus:border-primary rounded-md bg-background border"
                      disabled={!isEditingPreferences}
                    >
                      <option value="en">{t('languageSwitcher.en', "English")}</option>
                      <option value="si">{t('languageSwitcher.si', "Sinhala")}</option>
                      <option value="ta">{t('languageSwitcher.ta', "Tamil")}</option>
                    </select>
                  ) : (
                     <p className="text-foreground/90 text-sm sm:text-base">{t(`languageSwitcher.${preferences.preferredLanguage}`, preferences.preferredLanguage)}</p>
                  )}
                </div>
                 <div>
                  <Label htmlFor="darkMode" className="text-sm sm:text-base">{t('lms.profile.preferences.darkModeLabel', "Dark Mode Preference")}</Label>
                   <p className="text-xs text-muted-foreground">{t('lms.profile.preferences.darkModeNote', "Theme settings are managed globally via the theme toggle.")}</p>
                   <Input value={preferences.darkMode} disabled className="mt-1 bg-muted/50 text-sm sm:text-base"/>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}
    

