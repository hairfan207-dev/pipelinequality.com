'use client';

import type { ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { SiteFooter } from '@/components/footer';
import { SiteHeader } from '@/components/navigation';

type LegalSection = { title: string; content: string };

export function LegalShell({ children }: { children: ReactNode }) {
  const locale = useLocale();

  return (
    <div className='pq-site' lang={locale}>
      <SiteHeader />
      <main className='legal-page'>
        <div className='site-container legal-container'>{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function LegalDocument({ title, sections }: { title: string; sections: LegalSection[] }) {
  return (
    <LegalShell>
      <h1 className='legal-title'>{title}</h1>
      <div className='legal-sections'>
        {sections.map((section, index) => (
          <section key={index} className='legal-section' id={`section-${index}`}>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </section>
        ))}
      </div>
    </LegalShell>
  );
}
