'use client';

import { useTranslations } from 'next-intl';

type Stage = {
  id: string;
  title: string;
  items: string[];
};

const images = [
  '/client/service-welding.jpg?v=6',
  '/client/service-docs.jpg?v=5',
  '/client/service-project.jpg?v=7',
];

export function FieldHandoverSection() {
  const t = useTranslations('fieldHandover');
  const stages = t.raw('stages') as Stage[];

  return (
    <section className='bg-[#f7f8fa] text-navy'>
      <div className='pq-shell py-16 text-center lg:py-20'>
        <p className='pq-index'>{t('label')}</p>
        <h2 className='mx-auto mt-3 max-w-3xl text-navy'>{t('title')}</h2>
        <p className='mx-auto mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-navy/70'>
          {t('lead')}
        </p>

        <div className='mt-10 grid gap-6 lg:grid-cols-3'>
          {stages.map((stage, index) => (
            <article key={stage.id} className='relative text-left'>
              {index < stages.length - 1 && (
                <span
                  className='absolute top-1/3 -right-3 z-10 hidden h-8 w-8 items-center justify-center rounded-full bg-accent text-sm text-white lg:flex'
                  aria-hidden
                >
                  →
                </span>
              )}
              <div className='relative overflow-hidden rounded-2xl'>
                <img
                  src={images[index]}
                  alt={stage.title}
                  className='h-64 w-full object-cover'
                />
                <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy to-transparent px-4 py-4 pt-16'>
                  <p className='text-center text-[13px] font-semibold tracking-[0.16em] text-white uppercase'>
                    {stage.title}
                  </p>
                </div>
              </div>
              <ul className='mt-4 flex flex-wrap justify-center gap-3'>
                {stage.items.map((item) => (
                  <li
                    key={item}
                    className='rounded-full bg-white px-3 py-1 text-[12px] text-navy/70 shadow-sm'
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
