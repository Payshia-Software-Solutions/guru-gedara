
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Define available languages
export const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
] as const;

export type LanguageCode = typeof languages[number]['code'];

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
  translations: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper to get nested values from translation object
// e.g., t('nav.home')
const getNestedValue = (obj: any, path: string, fallback?: string): string => {
  const value = path.split('.').reduce((acc, part) => acc && acc[part], obj);
  return value || fallback || path;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchTranslations = useCallback(async (lang: LanguageCode) => {
    setIsLoading(true);
    try {
      const mod = await import(`@/locales/${lang}.json`);
      setTranslations(mod.default || mod);
    } catch (error) {
      console.error(`Could not load translations for ${lang}:`, error);
      if (lang !== 'en') { // Fallback to English if selected lang fails
        const enMod = await import(`@/locales/en.json`);
        setTranslations(enMod.default || enMod);
      } else {
        setTranslations({}); // No translations if English itself fails
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const storedLang = localStorage.getItem('app-language') as LanguageCode | null;
    const initialLang = storedLang && languages.some(l => l.code === storedLang) ? storedLang : 'en';
    setLanguageState(initialLang);
    fetchTranslations(initialLang);
  }, [fetchTranslations]);

  const setLanguage = (lang: LanguageCode) => {
    if (languages.some(l => l.code === lang)) {
      setLanguageState(lang);
      localStorage.setItem('app-language', lang);
      fetchTranslations(lang);
    }
  };

  const t = useCallback((key: string, fallback?: string) => {
    if (isLoading) return fallback || key; // Return fallback or key if still loading
    return getNestedValue(translations, key, fallback);
  }, [translations, isLoading]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
