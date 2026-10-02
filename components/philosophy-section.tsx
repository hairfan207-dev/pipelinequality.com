'use client';

import { useTranslations } from 'next-intl';

export function PhilosophySection() {
  const t = useTranslations('philosophy');

  return (
    <section className='relative overflow-hidden text-white'>
      <img
        src='/client/industry-pipeline.jpg?v=3'
        alt=''
        className='absolute inset-0 h-full w-full object-cover'
      />
      <div className='absolute inset-0 bg-navy/35' aria-hidden />
      <div className='pq-shell relative grid items-center gap-6 py-16 lg:grid-cols-2 lg:py-20'>
        <div className='rounded-3xl bg-navy/95 p-8 lg:p-10'>
          <h2 className='text-white'>{t('title')}</h2>
          <div className='mt-6 space-y-4 text-[0.98rem] leading-relaxed text-white/85'>
            <p>{t('paragraph1')}</p>
            <p>{t('paragraph2')}</p>
            <p>{t('paragraph3')}</p>
          </div>
        </div>
        <div className='relative'>
          <div className='overflow-hidden rounded-2xl border-2 border-accent/70'>
            <img
              src='/client/industry-construction.jpg?v=4'
              alt=''
              className='h-72 w-full object-cover lg:h-[420px]'
            />
          </div>
          <div className='absolute right-4 bottom-4 max-w-[11rem] rounded-xl bg-white px-4 py-3 text-center text-[13px] font-semibold tracking-[0.08em] text-navy uppercase shadow-lg'>
            {t('principle')}
          </div>
        </div>
      </div>
    </section>
  );
}
