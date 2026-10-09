'use client';

import { useTranslations } from 'next-intl';
import {
  FileText,
  Gauge,
  Search,
  Shield,
  Waves,
  Wrench,
  Droplets,
} from 'lucide-react';

const icons = [Shield, Droplets, Gauge, Waves, Wrench, Search, FileText];

export function StandardsSection() {
  const t = useTranslations('standards');
  const groups = t.raw('groups') as Array<{ title: string; items: string[] }>;

  return (
    <section id='standards' className='bg-white'>
      <div className='pq-shell py-16 text-center lg:py-20'>
        <p className='pq-index'>{t('label')}</p>
        <h2 className='mx-auto mt-3 max-w-3xl text-navy'>{t('title')}</h2>
        <div className='mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7'>
          {groups.map((group, index) => {
            const Icon = icons[index] ?? Shield;
            const navy = index % 2 === 0;
            return (
              <article key={group.title} className='text-center'>
                <div
                  className={`mx-auto flex h-24 w-full items-center justify-center rounded-2xl ${
                    navy ? 'bg-navy text-white' : 'bg-[#FFFFFF] text-accent'
                  }`}
                >
                  <Icon className='h-8 w-8' strokeWidth={1.6} />
                </div>
                <div className='mt-3 rounded-2xl border border-navy/10 bg-[#FFFFFF] px-2 py-4'>
                  <p className='text-[13px] font-semibold leading-snug text-navy'>
                    {group.title}
                  </p>
                  <p className='mt-2 text-[12px] leading-snug text-navy/60'>
                    {group.items.join(' · ')}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
