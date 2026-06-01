import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';

import { AppHeader } from '@/components/layout/app-header';
import { ReactQueryProvider } from '@/components/providers/react-query-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

import { cn } from '@/lib/utils/cn';

import './globals.css';

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'SpaceX Explorer',
  description: 'Browse SpaceX launches.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('h-full', 'antialiased', 'font-sans', notoSans.variable)}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <AppHeader />
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
