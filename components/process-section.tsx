'use client';

import { useTranslations } from 'next-intl';

type Step = {
  id: string;
  title: string;
  text: string;
};

const images = [
  '/client/team-network.jpg?v=1',
  '/client/service-project.jpg?v=7',
  '/client/service-docs.jpg?v=5',
  '/client/service-engineering.jpg?v=9',
  '/client/industry-offshore.jpg?v=3',
];

export function ProcessSection() {
  const t = useTranslations('workProcess');
  const steps = t.raw('steps') as Step[];

  return (
    <section id='how-we-work' className='bg-white'>
      <div className='pq-shell py-16 text-center lg:py-20'>
        <p className='pq-index'>{t('label')}</p>
        <h2 className='mt-3 text-navy'>{t('title')}</h2>
        <div className='mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5'>
          {steps.map((step, index) => (
            <article key={step.id} className='text-center'>
              <div className='relative overflow-hidden rounded-2xl'>
                <img
                  src={images[index]}
                  alt={step.title}
                  className='h-52 w-full object-cover'
                />
                <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy to-transparent px-2 py-3 pt-12'>
                  <p className='text-[15px] font-semibold text-white'>{step.title}</p>
                </div>
              </div>
              <p className='mt-3 text-[13px] leading-relaxed text-navy/70'>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
