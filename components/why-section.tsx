'use client';

import { useTranslations } from 'next-intl';

type Reason = {
  title: string;
  description: string;
};

export function WhySection() {
  const t = useTranslations('why');
  const reasons = t.raw('reasons') as Reason[];
  const [first, ...rest] = reasons;

  return (
    <section className='bg-white' id='why'>
      <div className='pq-shell py-16 lg:py-20'>
        <div className='grid items-start gap-6 lg:grid-cols-[0.7fr_1.3fr]'>
          <h2 className='text-navy lg:pt-2'>{t('title')}</h2>
          {first && (
            <article className='rounded-2xl bg-[#f4f7fb] p-6'>
              <h3 className='text-navy'>{first.title}</h3>
              <p className='mt-2 text-[0.95rem] leading-relaxed text-navy/70'>
                {first.description}
              </p>
            </article>
          )}
        </div>
        <div className='mt-4 grid gap-4 md:grid-cols-2'>
          {rest.map((item) => (
            <article key={item.title} className='rounded-2xl bg-[#f4f7fb] p-6'>
              <h3 className='text-navy'>{item.title}</h3>
              <p className='mt-2 text-[0.95rem] leading-relaxed text-navy/70'>
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
