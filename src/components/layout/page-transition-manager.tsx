
"use client";

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Preloader } from '@/components/preloader';

export function PageTransitionManager({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // This effect runs once on mount to mark that the initial load has completed.
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    // Don't show preloader on the very first page load/render.
    if (isInitialLoad) {
      return;
    }

    // Show preloader for subsequent navigations.
    setIsLoading(true);

    // Set a timer to hide the preloader.
    // This duration should ideally be long enough for most page transitions
    // but can be adjusted.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 750); // Preloader will be visible for 750ms

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, searchParams, isInitialLoad]);

  return (
    <>
      {isLoading && <Preloader />}
      {children}
    </>
  );
}
