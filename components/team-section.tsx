'use client';

import { useTranslations } from 'next-intl';
import {
  ClipboardList,
  FileText,
  Headphones,
  Ruler,
  Search,
  Settings,
  ShieldCheck,
  User,
  Users,
  Wrench,
} from 'lucide-react';

const roleIcons = [
  User,
  ClipboardList,
  Settings,
  Wrench,
  Users,
  ShieldCheck,
  Search,
  Ruler,
  FileText,
  Headphones,
  ShieldCheck,
];

const photos = [
  { src: '/client/intro-inspection.jpg?v=1', labelKey: 7 },
  { src: '/client/service-docs.jpg?v=5', labelKey: 9 },
  { src: '/client/service-engineering.jpg?v=9', labelKey: 8 },
  { src: '/client/service-welding.jpg?v=6', labelKey: 5 },
];

export function TeamSection() {
  const t = useTranslations('team');
  const roles = t.raw('roles') as string[];

  return (
    <section id='network' className='bg-[#f7f8fa] text-navy'>
      <div className='pq-shell py-16 lg:py-20'>
        <div className='grid items-start gap-8 lg:grid-cols-2 lg:gap-12'>
          <div className='grid grid-cols-2 gap-4'>
            {photos.map((photo) => (
              <div key={photo.src} className='relative overflow-hidden rounded-2xl'>
                <img src={photo.src} alt='' className='h-44 w-full object-cover sm:h-52' />
                <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-3 pt-10'>
                  <p className='text-[12px] font-semibold text-white'>
                    {roles[photo.labelKey]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className='pq-index'>{t('label')}</p>
            <h2 className='mt-3 text-navy'>{t('title')}</h2>
            <p className='mt-4 text-[0.98rem] leading-relaxed text-navy/70'>
              {t('paragraph1')}
            </p>
            <div className='mt-6 rounded-2xl bg-white p-5 shadow-sm'>
              <p className='text-[13px] font-semibold tracking-[0.14em] text-navy uppercase'>
                {t('networkLabel')}
              </p>
              <ul className='mt-4 grid gap-3 sm:grid-cols-2'>
                {roles.map((role, index) => {
                  const Icon = roleIcons[index] ?? User;
                  return (
                    <li key={role} className='flex items-start gap-3 text-[14px] text-navy'>
                      <span className='mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent'>
                        <Icon className='h-4 w-4' strokeWidth={1.6} />
                      </span>
                      <span className='pt-1 leading-snug'>{role}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
