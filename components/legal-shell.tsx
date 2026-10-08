'use client';

import type { ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { SiteFooter } from '@/components/footer';
import { SiteHeader } from '@/components/navigation';

export function LegalShell({ children }: { children: ReactNode }) {
  const locale = useLocale();

  return (
    <div className='pq-design' lang={locale}>
      <SiteHeader />
      <main className='legal-document'>{children}</main>
      <SiteFooter />
    </div>
  );
}
