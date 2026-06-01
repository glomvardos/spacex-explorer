import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';

import { ReactQueryProvider } from '@/components/providers/react-query-provider';

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
      className={cn('h-full', 'antialiased', 'font-sans', notoSans.variable)}
    >
      <body className="flex min-h-full flex-col">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
