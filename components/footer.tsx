'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';
import { Link } from '@/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    const scrollY = window.scrollY;
    const nextLocale = newLocale as 'en' | 'de';
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=lax`;
    router.replace(pathname || '/', { locale: nextLocale });
    router.refresh();
    setTimeout(() => window.scrollTo(0, scrollY), 80);
  };

  const links = [
    { href: '/#services', label: tNav('services') },
    { href: '/#industries', label: tNav('industries') },
    { href: '/#experience', label: tNav('experience') },
    { href: '/#contact', label: tNav('contact') },
  ];

  const legal = [
    { href: '/privacy', label: t('privacyPolicy') },
    locale === 'de'
      ? { href: '/agb', label: t('terms') }
      : { href: '/terms', label: t('terms') },
    locale === 'de'
      ? { href: '/impressum', label: t('imprint') }
      : { href: '/legal-notice', label: t('imprint') },
  ];

  return (
    <footer className='bg-navy text-white'>
      <div className='h-px bg-white/15' />

      <div className='pq-shell py-4 md:py-5 lg:py-6'>
        <div className='grid gap-4 md:gap-5 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-12'>
          <div className='min-w-0'>
            <div className='flex items-center gap-3 md:gap-3.5'>
              <img
                src='/logo-mark-footer.png?v=1'
                alt='Pipeline Quality'
                className='h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.18)] md:h-11'
              />
              <p className='font-sans text-[16px] font-semibold'>
                <span className='text-white'>Pipeline </span>
                <span className='text-[var(--accent-teal)]'>Quality</span>
              </p>
            </div>

            <p className='mt-2.5 max-w-xl font-sans text-[0.875rem] leading-[1.5] font-normal text-white/80 md:mt-3 md:text-[0.9375rem] md:leading-[1.55]'>
              {t('description')}
            </p>

            <nav
              aria-label='Footer'
              className='mt-2.5 flex flex-nowrap items-center justify-between gap-1.5 md:mt-3 md:justify-start md:gap-x-3 lg:gap-x-4'
            >
              {links.map((item, index) => (
                <span key={item.href} className='contents'>
                  {index > 0 ? (
                    <span className='shrink-0 text-[9px] text-accent/55' aria-hidden>
                      ·
                    </span>
                  ) : null}
                  <Link
                    href={item.href}
                    className='shrink-0 whitespace-nowrap font-sans text-[16px] font-normal text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--accent-teal)]'
                  >
                    {item.label}
                  </Link>
                </span>
              ))}
            </nav>
          </div>

          <div className='min-w-0 flex flex-col gap-1 lg:items-end lg:text-right'>
            <div className='flex flex-wrap items-center gap-x-3 gap-y-1 lg:justify-end'>
              <p className='font-sans text-[12px] font-normal text-white/80 md:text-[13px]'>
                {t('location')}
              </p>
              <span className='hidden text-accent/50 lg:inline' aria-hidden>
                |
              </span>
              <div className='flex items-center gap-2'>
                <button
                  type='button'
                  onClick={() => switchLocale('en')}
                  className={`font-sans text-[12px] font-semibold tracking-[0.16em] transition hover:text-accent ${
                    locale === 'en' ? 'text-accent' : 'text-white/80'
                  }`}
                >
                  EN
                </button>
                <span className='text-accent/40'>/</span>
                <button
                  type='button'
                  onClick={() => switchLocale('de')}
                  className={`font-sans text-[12px] font-semibold tracking-[0.16em] transition hover:text-accent ${
                    locale === 'de' ? 'text-accent' : 'text-white/80'
                  }`}
                >
                  DE
                </button>
              </div>
            </div>
            <p className='font-sans text-[10px] font-normal leading-snug text-white/55 md:text-[11px]'>
              {t('brandNote')}
            </p>
          </div>
        </div>
      </div>

      <div className='border-t border-accent/25'>
        <div className='pq-shell flex flex-col gap-1.5 py-2.5 md:py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-x-8'>
          <p className='font-sans text-[11px] font-normal text-accent md:text-[12px]'>
            {t('copyright')}
          </p>
          <nav
            aria-label='Legal'
            className='flex w-full flex-nowrap items-center justify-between gap-1.5 lg:w-auto lg:justify-end lg:gap-x-4'
          >
            {legal.map((item, index) => (
              <span key={item.href} className='contents'>
                {index > 0 ? (
                  <span className='shrink-0 text-[9px] text-accent/55' aria-hidden>
                    ·
                  </span>
                ) : null}
                <Link
                  href={item.href}
                  className='shrink-0 whitespace-nowrap font-sans text-[16px] font-normal text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--accent-teal)]'
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
