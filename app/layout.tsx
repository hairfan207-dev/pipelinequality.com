import './globals.css';
import type { Metadata } from 'next';
import type React from 'react';
import { Inter, Outfit, Open_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { FontLoader } from '@/components/font-loader';
import { defaultLocale } from '@/i18n';

const inter = Inter({ subsets: ['latin'] });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['700'], variable: '--font-open-sans' });

export const metadata: Metadata = {
    title: 'Pipeline Quality',
    description: 'Pipeline Quality Control Services',
};

type Props = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang={defaultLocale} suppressHydrationWarning>
            <body
                className={`${inter.className} ${outfit.variable} ${openSans.variable} font-sans antialiased`}
                suppressHydrationWarning
            >
                <FontLoader />
                {children}
                <Analytics />
            </body>
        </html>
    );
}
