'use client';

import { useTranslations } from 'next-intl';

export function IntroSection() {
  const t = useTranslations('intro');

  return (
    <section className='relative overflow-hidden bg-white'>
      <div
        className='pointer-events-none absolute inset-0 bg-[url("/client/industry-offshore.jpg")] bg-cover bg-center opacity-[0.06]'
        aria-hidden
      />
      <div className='pq-shell relative py-16 text-center lg:py-20'>
        <p className='pq-index'>{t('label')}</p>
        <h2 className='mx-auto mt-4 max-w-4xl text-navy'>
          {t('headlineLine1')}
          <span className='mt-1 block text-accent'>{t('headlineLine2')}</span>
        </h2>
        <div className='mx-auto mt-6 max-w-3xl space-y-4 text-[1.02rem] leading-[1.7] text-navy/75'>
          <p>{t('paragraph1')}</p>
          <p>{t('paragraph2')}</p>
        </div>
        <div className='mx-auto mt-10 h-px w-full max-w-5xl bg-accent' />
      </div>
    </section>
  );
}
