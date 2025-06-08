
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from '@/contexts/language-context';
import { PageTransitionManager } from '@/components/layout/page-transition-manager';
import { MainContentWrapper } from '@/components/layout/main-content-wrapper';
import { PreferencesModalManager } from '@/components/layout/preferences-modal-manager';
import { Suspense } from 'react';
import { Preloader } from '@/components/preloader';

export const metadata: Metadata = {
  title: 'ගුරු ගෙදර E-School | Modern Online Learning Platform',
  description: 'Join ගුරු ගෙදර E-School for G.C.E. O/L classes in Science, Mathematics, English, and ICT. Learn smart, learn anywhere with expert Sri Lankan educators.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..0,900;1,200..1,900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <PreferencesModalManager>
              <Suspense fallback={<Preloader />}>
                <PageTransitionManager>
                  <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <MainContentWrapper>{children}</MainContentWrapper>
                    <Footer />
                  </div>
                  <Toaster />
                </PageTransitionManager>
              </Suspense>
            </PreferencesModalManager>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
