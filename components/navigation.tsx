'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';

export function Navigation() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('nav');
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
    setIsLangOpen(false);
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'German' },
  ];
  const currentLanguage =
    languages.find((lang) => lang.code === locale)?.name ?? 'English';

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');

    if (href?.startsWith('#')) {
      if (pathname === '/' || pathname === '') {
        const element = document.querySelector(href);
        if (element) {
          const offset = 0;
          const elementPosition = element.getBoundingClientRect().top;
          window.scrollTo({
            top: elementPosition + window.scrollY - offset,
            behavior: 'smooth',
          });
        }
      } else {
        window.location.assign(`/${href}`);
      }
    } else if (href) {
      router.push(href);
    }
    closeMenu();
  };

  const links = [
    { href: '#services', label: t('services') },
    { href: '#how-we-work', label: t('process') },
    { href: '#industries', label: t('industries') },
    { href: '#experience', label: t('experience') },
    { href: '#contact', label: t('contact') },
  ];

  const solid = scrolled && !isMobileMenuOpen;
  const onDark = !solid;

  const linkClass = onDark
    ? 'text-white hover:text-white'
    : 'text-navy hover:text-navy';

  const langShell = onDark
    ? 'border-white/35 bg-white/10 text-accent hover:bg-white/15'
    : 'border-accent/35 bg-accent/10 text-accent hover:bg-accent/15';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? 'bg-white/95 text-navy shadow-[0_1px_0_rgba(1,42,96,0.08)] backdrop-blur'
            : 'bg-gradient-to-b from-navy/55 via-navy/25 to-transparent text-white'
        }`}
      >
        <div className='pq-shell flex h-[5.5rem] items-center gap-7'>
          <a
            href='#home'
            onClick={handleSmoothScroll}
            className='group flex shrink-0 items-center gap-3.5'
            aria-label='Pipeline Quality'
          >
            <img
              src={
                onDark
                  ? '/logo-mark-white.png?v=2'
                  : '/logo-mark.png?v=2'
              }
              alt=''
              className='h-12 w-auto object-contain sm:h-14'
            />
            <span className='flex flex-col leading-[1.05]'>
              <span
                className={`text-[16px] font-semibold tracking-[0.16em] uppercase sm:text-[18px] sm:tracking-[0.18em] ${
                  onDark ? 'text-white' : 'text-navy'
                }`}
              >
                Pipeline
              </span>
              <span className='text-[16px] font-semibold tracking-[0.16em] text-accent uppercase sm:text-[18px] sm:tracking-[0.18em]'>
                Quality
              </span>
            </span>
          </a>

          <nav className='ml-auto hidden items-center gap-1 lg:flex'>
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleSmoothScroll}
                className={`relative px-3.5 py-2.5 text-[13px] font-semibold tracking-[0.14em] uppercase transition-colors duration-300 after:absolute after:right-3.5 after:bottom-1 after:left-3.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-400 hover:after:scale-x-100 ${linkClass}`}
              >
                {item.label}
              </a>
            ))}

            <div className='relative ml-3'>
              <button
                type='button'
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`flex items-center gap-2 whitespace-nowrap border px-3 py-2 text-[13px] font-semibold tracking-[0.14em] uppercase backdrop-blur-[2px] transition ${langShell}`}
                aria-label='Language'
                aria-expanded={isLangOpen}
              >
                {currentLanguage}
                <span aria-hidden>+</span>
              </button>
              {isLangOpen && (
                <div className='absolute right-0 z-50 mt-2 min-w-[7.5rem] border border-line bg-white text-navy shadow-xl'>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type='button'
                      onClick={() => switchLocale(lang.code)}
                      className={`block w-full px-4 py-2.5 text-left text-[13px] font-semibold tracking-[0.12em] uppercase transition hover:bg-light-gray ${
                        locale === lang.code ? 'text-accent' : 'text-navy'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <button
            type='button'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='ml-auto inline-flex h-11 w-11 items-center justify-center lg:hidden'
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`pq-burger ${onDark ? 'text-white' : 'text-navy'}`}
              data-open={isMobileMenuOpen}
            >
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-navy transition-all duration-500 lg:hidden ${
          isMobileMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className='flex h-full flex-col justify-between px-6 pt-28 pb-10'>
          <div className='space-y-1'>
            {links.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleSmoothScroll}
                className='group flex items-baseline gap-4 border-b border-white/10 py-4 text-white transition-all duration-500'
                style={{
                  transitionDelay: isMobileMenuOpen
                    ? `${100 + index * 60}ms`
                    : '0ms',
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen
                    ? 'translateY(0)'
                    : 'translateY(16px)',
                }}
              >
                <span className='text-[clamp(1.6rem,7vw,2.4rem)] font-semibold tracking-[-0.03em]'>
                  {item.label}
                </span>
              </a>
            ))}
          </div>

          <div
            className='transition-all duration-500'
            style={{
              transitionDelay: isMobileMenuOpen ? '380ms' : '0ms',
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          >
            <div className='inline-flex items-center gap-1 border border-accent/40 bg-accent/10 p-1'>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type='button'
                  onClick={() => {
                    switchLocale(lang.code);
                    closeMenu();
                  }}
                  className={`px-3.5 py-2 text-[13px] font-semibold tracking-[0.14em] uppercase transition ${
                    locale === lang.code
                      ? 'bg-accent text-white'
                      : 'text-accent hover:bg-accent/15'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
