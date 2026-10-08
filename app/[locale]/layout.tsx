import type React from 'react';
import type { Metadata } from 'next';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import '../design-home.css';
import '../design-system.css';

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const messages = await getMessages({ locale });
    const meta = messages.meta as any;

    return {
        title: meta.title,
        description: meta.description,
        openGraph: {
            title: meta.title,
            description: meta.description,
            type: 'website',
            locale: locale === 'de' ? 'de_DE' : 'en_US',
        },
        twitter: {
            card: 'summary_large_image',
            title: meta.title,
            description: meta.description,
        },
        icons: {
            icon: '/logo-mark.png',
            apple: '/logo-mark.png',
        },
        other: {
            'font-family': 'Inter',
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    if (!locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}
