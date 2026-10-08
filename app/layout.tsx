import './globals.css';
import type { Metadata } from 'next';
import type React from 'react';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { defaultLocale } from '@/i18n';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pipeline Quality | Industrial Quality, NDT & HSE',
  description:
    'Industrial quality, NDT inspection, and HSE management for heavy infrastructure, pipelines, and data centers.',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang={defaultLocale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${inter.className} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
