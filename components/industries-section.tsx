'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';

type Industry = {
  title: string;
  items: string[];
};

const industryImages = [
  '/client/industry-offshore.jpg?v=3',
  '/client/industry-pipeline.jpg?v=3',
  '/client/industry-oilgas.jpg?v=4',
  '/client/industry-chemical.jpg?v=3',
  '/client/industry-energy.jpg?v=3',
  '/client/industry-epc.jpg?v=4',
  '/client/industry-construction.jpg?v=4',
  '/client/industry-maintenance.jpg?v=4',
];

const displayOrder = [2, 0, 4, 1, 5, 3, 7, 6];

export function IndustriesSection() {
  const t = useTranslations('industries');
  const items = t.raw('sectors') as Industry[];
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <section id='industries' className='bg-white'>
      <div className='bg-navy py-14 text-center text-white'>
        <p className='pq-index'>{t('label')}</p>
        <h2 className='mt-3 text-white'>
          {t('title').split(' ').slice(0, 1).join(' ')}{' '}
          <span className='text-accent'>{t('title').split(' ').slice(1).join(' ')}</span>
        </h2>
      </div>
      <div className='pq-shell py-10'>
        <div className='rounded-3xl border border-navy/15 p-4 sm:p-6 lg:p-8'>
          <div className='grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center'>
            <ul>
              {displayOrder.map((index) => {
                const item = items[index];
                const isActive = active === index;
                return (
                  <li key={item.title} className='border-b border-navy/10'>
                    <button
                      type='button'
                      onClick={() => setActive(index)}
                      className={`flex w-full items-center justify-between py-3.5 text-left text-[1.02rem] ${
                        isActive ? 'font-semibold text-navy' : 'text-navy/80'
                      }`}
                    >
                      {item.title}
                      <ChevronRight className='h-4 w-4 text-navy/40' />
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className='grid items-center gap-5 rounded-2xl bg-[#f4f7fb] p-4 sm:grid-cols-[0.9fr_1fr]'>
              <div className='relative overflow-hidden rounded-2xl'>
                <img
                  src={industryImages[active]}
                  alt={current.title}
                  className='h-56 w-full object-cover'
                />
                <p className='absolute inset-x-0 bottom-0 bg-navy/90 py-2 text-center text-[12px] font-semibold tracking-[0.14em] text-white uppercase'>
                  {current.title}
                </p>
              </div>
              <div>
                <h3 className='text-[1.15rem] font-semibold text-navy'>{current.title}</h3>
                <ul className='mt-3 space-y-1.5'>
                  {current.items.map((entry) => (
                    <li key={entry} className='text-[14px] leading-snug text-navy/70'>
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
