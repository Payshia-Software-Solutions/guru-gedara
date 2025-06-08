
"use client";

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useTheme } from 'next-themes';
import { useLanguage, languages, type LanguageCode } from '@/contexts/language-context';
import Icons from './icons';

interface PreferencesModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (language: LanguageCode, theme: string) => void;
}

export function PreferencesModal({ isOpen, onOpenChange, onSave }: PreferencesModalProps) {
  const { theme: currentTheme } = useTheme();
  const { language: currentLanguage, t } = useLanguage();

  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(currentLanguage);
  const [selectedTheme, setSelectedTheme] = useState<string>(currentTheme || 'system');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Sync modal's internal state with current global preferences when it opens or they change
    setSelectedLanguage(currentLanguage);
    setSelectedTheme(currentTheme || 'system');
  }, [currentLanguage, currentTheme, isOpen]);


  const handleSave = () => {
    onSave(selectedLanguage, selectedTheme);
  };

  if (!isMounted) {
    return null; 
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline text-primary">
            {t('preferencesModal.title', 'Choose Your Preferences')}
          </DialogTitle>
          <DialogDescription>
            {t('preferencesModal.description', 'Select your preferred language and theme for the best experience.')}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Language Selection */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">
              {t('preferencesModal.languageTitle', 'Language')}
            </h3>
            <RadioGroup
              value={selectedLanguage}
              onValueChange={(value) => setSelectedLanguage(value as LanguageCode)}
              className="space-y-2"
            >
              {languages.map((lang) => (
                <div key={lang.code} className="flex items-center space-x-2">
                  <RadioGroupItem value={lang.code} id={`pref-lang-${lang.code}`} />
                  <Label htmlFor={`pref-lang-${lang.code}`} className="cursor-pointer text-base">
                    {lang.nativeName} ({t(`languageSwitcher.${lang.code}`, lang.name)})
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Theme Selection */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">
              {t('preferencesModal.themeTitle', 'Theme')}
            </h3>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              {[
                { value: 'light', labelKey: 'preferencesModal.themeLight', Icon: Icons.Sun },
                { value: 'dark', labelKey: 'preferencesModal.themeDark', Icon: Icons.Moon },
                { value: 'system', labelKey: 'preferencesModal.themeSystem', Icon: Icons.Laptop2 },
              ].map(({ value, labelKey, Icon }) => (
                <Button
                  key={value}
                  variant={selectedTheme === value ? 'default' : 'outline'}
                  onClick={() => setSelectedTheme(value)}
                  className="flex-1 text-sm h-auto py-2 sm:py-2.5"
                >
                  <Icon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  {t(labelKey, value.charAt(0).toUpperCase() + value.slice(1))}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-base py-2.5">
            <Icons.CheckCircle2 className="mr-2 h-5 w-5" />
            {t('preferencesModal.saveButton', 'Save Preferences')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
