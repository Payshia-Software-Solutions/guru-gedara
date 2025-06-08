
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { useLanguage, type LanguageCode } from '@/contexts/language-context';
import { PreferencesModal } from '@/components/preferences-modal';

const PREFERENCES_MODAL_SUBMITTED_KEY = 'guruGedaraPreferencesModalSubmitted';
const OPEN_PREFERENCES_MODAL_EVENT = 'openGuruGedaraPreferencesModal';

export function PreferencesModalManager({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { setTheme } = useTheme();
  const { setLanguage } = useLanguage();

  useEffect(() => {
    setIsClient(true);
    const modalPreviouslySubmitted = localStorage.getItem(PREFERENCES_MODAL_SUBMITTED_KEY) === 'true';
    if (!modalPreviouslySubmitted) {
      // Delay slightly to allow initial page render to complete
      setTimeout(() => setIsModalOpen(true), 500);
    }
  }, []);

  const handleOpenModalEvent = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    window.addEventListener(OPEN_PREFERENCES_MODAL_EVENT, handleOpenModalEvent);
    return () => {
      window.removeEventListener(OPEN_PREFERENCES_MODAL_EVENT, handleOpenModalEvent);
    };
  }, [handleOpenModalEvent]);

  const handleSavePreferences = useCallback((language: LanguageCode, themeValue: string) => {
    setLanguage(language);
    setTheme(themeValue);
    localStorage.setItem(PREFERENCES_MODAL_SUBMITTED_KEY, 'true');
    setIsModalOpen(false);
  }, [setLanguage, setTheme]);

  const handleModalCloseWithoutSaving = () => {
    // Check if it was ever submitted. If not, and it's closed without saving,
    // it should still be considered "not submitted" for the next visit.
    const modalPreviouslySubmitted = localStorage.getItem(PREFERENCES_MODAL_SUBMITTED_KEY) === 'true';
    if (!modalPreviouslySubmitted) {
      // User closed initial modal without saving, do nothing to localStorage
    }
    setIsModalOpen(false);
  }

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <PreferencesModal
        isOpen={isModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleModalCloseWithoutSaving();
          } else {
            setIsModalOpen(true);
          }
        }}
        onSave={handleSavePreferences}
      />
    </>
  );
}
