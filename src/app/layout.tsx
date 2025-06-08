
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
import { PT_Sans, Source_Code_Pro } from 'next/font/google';

const ptSans = PT_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
  display: 'swap',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['400', '700'], // Add more weights if needed
  variable: '--font-source-code-pro',
  display: 'swap',
});

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
    <html lang="en" suppressHydrationWarning className={`${ptSans.variable} ${sourceCodePro.variable}`}>
      <head>
        {/* Google Font <link> tags are removed as next/font handles this */}
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
