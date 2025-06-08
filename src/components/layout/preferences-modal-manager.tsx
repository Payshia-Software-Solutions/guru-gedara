
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { useLanguage, type LanguageCode } from '@/contexts/language-context';
import { PreferencesModal } from '@/components/preferences-modal';

const PREFERENCES_MODAL_SUBMITTED_KEY = 'guruGedaraPreferencesModalSubmitted';

export function PreferencesModalManager({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { setTheme } = useTheme();
  const { setLanguage } = useLanguage();

  useEffect(() => {
    setIsClient(true);
    const modalPreviouslySubmitted = localStorage.getItem(PREFERENCES_MODAL_SUBMITTED_KEY) === 'true';
    if (!modalPreviouslySubmitted) {
      setIsModalOpen(true);
    }
  }, []);

  const handleSavePreferences = useCallback((language: LanguageCode, themeValue: string) => {
    setLanguage(language);
    setTheme(themeValue);
    localStorage.setItem(PREFERENCES_MODAL_SUBMITTED_KEY, 'true');
    setIsModalOpen(false);
  }, [setLanguage, setTheme]);

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <PreferencesModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen} // Allows Dialog's X/overlay to close modal
        onSave={handleSavePreferences}
      />
    </>
  );
}
