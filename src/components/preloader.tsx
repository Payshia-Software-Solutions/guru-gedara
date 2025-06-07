
"use client";
import { Icons } from '@/components/icons';

export const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn">
      <Icons.Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
      <p className="text-lg font-medium text-primary">Loading...</p>
    </div>
  );
};
