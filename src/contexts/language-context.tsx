
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Import JSON files statically
import enTranslationsData from '@/locales/en.json';
import siTranslationsData from '@/locales/si.json';
import taTranslationsData from '@/locales/ta.json';

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
  translations: Record<string, any>; // Changed to any to simplify handling of imported JSON
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper to get nested values from translation object
const getNestedValue = (obj: any, path: string, fallback?: string): string => {
  const value = path.split('.').reduce((acc, part) => acc && acc[part], obj);
  return value || fallback || path;
};

// Map language codes to their statically imported data
const allTranslations: Record<LanguageCode, Record<string, any>> = {
  en: enTranslationsData,
  si: siTranslationsData,
  ta: taTranslationsData,
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [translations, setTranslations] = useState<Record<string, any>>(allTranslations.en);
  const [isLoading, setIsLoading] = useState(true);

  const loadTranslationsForLanguage = useCallback((lang: LanguageCode) => {
    setIsLoading(true);
    const selectedTranslations = allTranslations[lang];

    if (selectedTranslations) {
      setTranslations(selectedTranslations);
    } else {
      console.error(`Could not load translations for ${lang}: No static import found.`);
      // Fallback to English if selected lang fails
      setTranslations(allTranslations.en);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const storedLang = localStorage.getItem('app-language') as LanguageCode | null;
    const initialLang = storedLang && languages.some(l => l.code === storedLang) ? storedLang : 'en';
    setLanguageState(initialLang);
    // Initial load of translations will be triggered by the effect below
  }, []);

  useEffect(() => {
    loadTranslationsForLanguage(language);
  }, [language, loadTranslationsForLanguage]);

  const setLanguage = (lang: LanguageCode) => {
    if (languages.some(l => l.code === lang)) {
      setLanguageState(lang);
      localStorage.setItem('app-language', lang);
      // The useEffect watching `language` will call loadTranslationsForLanguage
    }
  };

  const t = useCallback((key: string, fallback?: string) => {
    if (isLoading && Object.keys(translations).length === 0) { // Only return fallback if translations truly haven't loaded
        return fallback || key; 
    }
    return getNestedValue(translations, key, fallback);
  }, [translations, isLoading]);

  // Set initial loading to false once the first batch of translations is available
  useEffect(() => {
    if (Object.keys(translations).length > 0) {
        setIsLoading(false);
    }
  }, [translations]);


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
