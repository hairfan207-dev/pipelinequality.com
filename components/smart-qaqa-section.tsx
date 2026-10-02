'use client';

import { useTranslations } from 'next-intl';

export function SmartQAQCSection() {
  const t = useTranslations('smartQAQC');
  const partners = useTranslations('partners');

  return (
    <section id='bw-digit' className='border-y-2 border-accent bg-white'>
      <div className='pq-shell grid gap-8 py-14 lg:grid-cols-2 lg:items-center lg:py-16'>
        <div>
          <h2 className='text-navy'>{t('title')}</h2>
          <a
            href='#contact'
            className='pq-btn mt-6 inline-flex !px-5 !py-3 text-[11px] tracking-[0.12em]'
          >
            {partners('cta')}
          </a>
          <img
            src='/client/bw-field.jpg?v=2'
            alt={t('fieldAlt')}
            className='mt-6 h-56 w-full rounded-2xl object-cover'
          />
        </div>
        <div>
          <img
            src='/client/bw-digital.jpg?v=2'
            alt={t('docsAlt')}
            className='h-72 w-full rounded-2xl object-cover lg:h-80'
          />
          <p className='mt-5 text-[0.98rem] leading-relaxed text-navy/75'>
            {t('description')}
          </p>
        </div>
      </div>
    </section>
  );
}
