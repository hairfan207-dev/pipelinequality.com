'use client';

import { useTranslations } from 'next-intl';
import { HardHat, ShieldCheck, Target, Users } from 'lucide-react';

const pillarIcons = [HardHat, Target, ShieldCheck, Users];

export function HeroSection() {
  const t = useTranslations('hero');
  const pillars = t.raw('pillars') as Array<{ title: string; text: string }>;

  return (
    <section id='home' className='bg-white'>
      <div className='bg-[#012A60] text-white'>
        <div className='relative lg:min-h-[720px]'>
          <div className='relative h-[240px] sm:h-[320px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[48%]'>
            <img
              src='/client/hero-platform.jpg'
              alt={t('imageAlt')}
              className='h-full w-full object-cover object-[70%_40%]'
            />
            <div
              className='pointer-events-none absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-[#012A60] to-transparent lg:block'
              aria-hidden
            />
          </div>

          <div className='pq-shell relative flex items-center pt-28 pb-14 lg:min-h-[720px] lg:pt-24 lg:pb-16'>
            <div className='max-w-[34rem] lg:max-w-[46%]'>
              <h1 className='m-0 font-sans text-[clamp(2.75rem,4.8vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.035em] text-white'>
                {t('brand')}
              </h1>
              <p className='mt-1 font-sans text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-white'>
                {t('heroLine2')}
              </p>
              <div className='mt-6 space-y-1 text-[1.05rem] leading-snug font-medium text-white lg:text-[1.15rem]'>
                <p>{t('subtitle')}</p>
                <p>{t('subtitleLine2')}</p>
              </div>
              <div className='mt-8 flex flex-wrap gap-3'>
                <a
                  href='#contact'
                  className='inline-flex items-center bg-[#FB7200] px-5 py-3.5 text-[11px] font-semibold tracking-[0.12em] text-white uppercase transition hover:bg-[#FB7200]'
                >
                  {t('cta1')}
                </a>
                <a
                  href='#network'
                  className='inline-flex items-center border border-white/75 px-5 py-3.5 text-[11px] font-semibold tracking-[0.12em] text-white uppercase transition hover:bg-white hover:text-[#012A60]'
                >
                  {t('cta2')}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='pq-shell grid sm:grid-cols-2 lg:grid-cols-4'>
          {pillars.map((pillar, index) => {
            const Icon = pillarIcons[index] ?? HardHat;
            return (
              <div
                key={pillar.title}
                className='px-4 py-8 text-center lg:border-r lg:border-[#FB7200] lg:px-6 lg:py-9 last:lg:border-r-0'
              >
                <Icon className='mx-auto h-8 w-8' strokeWidth={1.4} />
                <p className='mx-auto mt-4 max-w-[11rem] font-sans text-[12px] leading-snug font-semibold tracking-[0.16em] uppercase'>
                  {pillar.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className='border-b border-navy/10 bg-[#FFFFFF]'>
        <div className='pq-shell grid sm:grid-cols-2 lg:grid-cols-4'>
          {pillars.map((pillar, index) => (
            <p
              key={pillar.text}
              className={`px-4 py-5 text-center text-[13px] leading-relaxed text-navy/65 lg:border-r lg:border-navy/10 lg:px-6 lg:py-6 ${
                index === pillars.length - 1 ? 'lg:border-r-0' : ''
              }`}
            >
              {pillar.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
