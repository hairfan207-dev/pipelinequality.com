'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ClipboardCheck, FileText, Search, Users } from 'lucide-react';

type ServiceBlock = {
  title: string;
  items: string[];
};

const serviceImages = [
  '/client/service-engineering.jpg?v=9',
  '/client/service-welding.jpg?v=6',
  '/client/service-docs-yard.jpg?v=7',
  '/client/service-project.jpg?v=7',
];

const icons = [ClipboardCheck, FileText, Search, Users];
const displayOrder = [0, 2, 1, 3];

export function ServicesOverview() {
  const t = useTranslations('services');
  const blocks = t.raw('blocks') as ServiceBlock[];
  const [active, setActive] = useState(0);
  const current = blocks[active];

  return (
    <section id='services' className='bg-white text-navy'>
      <div className='pq-shell pb-16 lg:pb-20'>
        <div className='grid items-start gap-8 lg:grid-cols-2 lg:gap-12'>
          <div>
            <p className='pq-index'>{t('keyAreasTitle')}</p>
            <h2 className='mt-3 max-w-xl text-navy'>
              {t('designTitle')}{' '}
              <span className='text-accent'>{t('designTitleAccent')}</span>
            </h2>
            <p className='mt-4 max-w-xl text-[0.98rem] leading-relaxed text-navy/70'>
              {t('designLead')}
            </p>

            <div className='mt-8 overflow-hidden rounded-2xl border border-navy/10 bg-[#FFFFFF]'>
              {displayOrder.map((index) => {
                const service = blocks[index];
                const isActive = active === index;
                const Icon = icons[displayOrder.indexOf(index)] ?? ClipboardCheck;
                return (
                  <div key={service.title} className='border-b border-navy/10 last:border-b-0'>
                    <button
                      type='button'
                      onClick={() => setActive(index)}
                      className='flex w-full items-center gap-4 px-4 py-4 text-left'
                      aria-expanded={isActive}
                    >
                      <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy text-white'>
                        <Icon className='h-5 w-5' strokeWidth={1.6} />
                      </span>
                      <span className='flex-1 text-[1.05rem] font-semibold text-navy'>
                        {service.title}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-navy/50 transition ${isActive ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isActive && (
                      <ul className='grid gap-x-6 gap-y-2 px-5 pb-5 sm:grid-cols-2 sm:px-16'>
                        {service.items.map((item) => (
                          <li
                            key={item}
                            className='text-[13px] leading-snug text-navy/75 before:mr-2 before:text-accent before:content-["▸"]'
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className='relative overflow-hidden rounded-3xl bg-navy'>
            <img
              src={serviceImages[active]}
              alt={current?.title ?? ''}
              className='h-[420px] w-full object-cover lg:h-[560px]'
            />
            <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/80 to-transparent p-5 pt-16'>
              <div className='flex items-center gap-3 text-white'>
                <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-white text-navy'>
                  <ClipboardCheck className='h-5 w-5' />
                </span>
                <p className='text-[1.05rem] font-semibold'>{current?.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
