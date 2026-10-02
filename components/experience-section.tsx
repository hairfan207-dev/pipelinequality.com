'use client';

import { useTranslations } from 'next-intl';

export function ExperienceSection() {
  const t = useTranslations('experience');

  return (
    <section id='experience' className='bg-white text-navy'>
      <div className='pq-shell pb-8'>
        <div className='rounded-[2rem] bg-[#f4f7fb] px-6 py-10 lg:px-10 lg:py-12'>
          <div className='grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start'>
            <h2 className='text-navy'>{t('title')}</h2>
            <div className='space-y-4 text-[0.98rem] leading-relaxed text-navy/75'>
              <p className='pq-index'>{t('label')}</p>
              <p>{t('summary1')}</p>
              <p>{t('summary2')}</p>
            </div>
          </div>
          <div className='mt-8 grid gap-4 md:grid-cols-2'>
            <img
              src='/client/hero-monopile.jpg?v=4'
              alt={t('imageAlt')}
              className='h-64 w-full rounded-2xl object-cover lg:h-80'
            />
            <img
              src='/client/industry-offshore.jpg?v=3'
              alt={t('offshoreTitle')}
              className='h-64 w-full rounded-2xl object-cover lg:h-80'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
