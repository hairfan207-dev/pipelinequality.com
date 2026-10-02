'use client';

import { useTranslations } from 'next-intl';
import { HardHat, ShieldCheck, Target, Users } from 'lucide-react';

const pillarIcons = [HardHat, Target, ShieldCheck, Users];

export function HeroSection() {
  const t = useTranslations('hero');
  const pillars = t.raw('pillars') as Array<{ title: string; text: string }>;

  return (
    <section id='home' className='bg-white text-navy'>
      <div className='relative min-h-[88svh] overflow-hidden bg-[#071c33] text-white lg:min-h-[760px]'>
        <img
          src='/client/hero-monopile.jpg?v=4'
          alt={t('imageAlt')}
          className='absolute inset-0 h-full w-full object-cover object-[72%_center]'
        />
        <div
          className='absolute inset-0 bg-[linear-gradient(90deg,#012A60_0%,#012A60_42%,rgba(1,42,96,0.78)_54%,rgba(1,42,96,0.28)_70%,rgba(1,42,96,0.08)_100%)]'
          aria-hidden
        />
        <div className='relative flex min-h-[88svh] items-center pt-28 pb-16 lg:min-h-[760px] lg:pt-32'>
          <div className='pq-shell w-full'>
            <div className='max-w-[40rem]'>
              <h1 className='m-0 font-sans text-[clamp(2.6rem,5vw,4.4rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-white'>
                {t('brand')}
              </h1>
              <p className='mt-3 font-sans text-[clamp(1.7rem,3vw,2.7rem)] leading-tight font-semibold tracking-[-0.03em] text-white'>
                {t('titleLine2').replace(/\.$/, '')}
              </p>
              <div className='mt-6 space-y-1 text-[1.05rem] leading-snug font-medium text-white lg:text-[1.15rem]'>
                <p>{t('subtitle')}</p>
                <p>{t('subtitleLine2')}</p>
              </div>
              <div className='mt-8 flex flex-wrap gap-3'>
                <a href='#contact' className='pq-btn !px-5 !py-3 text-[11px] tracking-[0.12em]'>
                  {t('cta1')}
                </a>
                <a
                  href='#network'
                  className='inline-flex items-center border border-white/80 px-5 py-3 text-[11px] font-semibold tracking-[0.12em] text-white uppercase transition hover:bg-white hover:text-navy'
                >
                  {t('cta2')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-navy text-white'>
        <div className='pq-shell grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:py-10'>
          {pillars.map((pillar, index) => {
            const Icon = pillarIcons[index] ?? HardHat;
            return (
              <div
                key={pillar.title}
                className='px-2 text-center lg:px-6 lg:border-r lg:border-accent/80 last:lg:border-r-0'
              >
                <Icon className='mx-auto h-8 w-8 text-white' strokeWidth={1.5} />
                <p className='mt-4 font-sans text-[12px] font-semibold tracking-[0.14em] uppercase'>
                  {pillar.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className='border-b border-navy/10 bg-[#f7f8fa]'>
        <div className='pq-shell grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:py-7'>
          {pillars.map((pillar) => (
            <p
              key={pillar.title}
              className='px-3 text-center text-[13px] leading-relaxed text-navy/70 lg:px-6'
            >
              {pillar.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
