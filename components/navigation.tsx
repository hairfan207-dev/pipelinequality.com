'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';

const SECTIONS = [
  { hash: '#services', key: 'services' },
  { hash: '#industries', key: 'industries' },
  { hash: '#expertise', key: 'expertise' },
  { hash: '#experience', key: 'experience' },
] as const;

export function SiteHeader() {
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const onHome = pathname === '/' || pathname === '';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionHref = (hash: string) => (onHome ? hash : `/${hash}`);
  const closeMenu = () => setMenuOpen(false);

  const switchLocale = (nextLocale: 'en' | 'de') => {
    setMenuOpen(false);
    if (nextLocale === locale) return;
    const hash = window.location.hash;
    const y = window.scrollY;
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=lax`;
    router.replace(pathname || '/', { locale: nextLocale });
    router.refresh();
    window.setTimeout(() => {
      if (hash && document.querySelector(hash)) {
        history.replaceState(null, '', `${window.location.pathname}${window.location.search}${hash}`);
        document.querySelector(hash)?.scrollIntoView();
      } else {
        window.scrollTo(0, y);
      }
    }, 80);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 1100) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const languageSwitch = (
    <div className='site-lang' role='group' aria-label={tNav('language')}>
      <button type='button' lang='en' aria-label='English' aria-pressed={locale === 'en'} onClick={() => switchLocale('en')}>EN</button>
      <span aria-hidden='true'>/</span>
      <button type='button' lang='de' aria-label='Deutsch' aria-pressed={locale === 'de'} onClick={() => switchLocale('de')}>DE</button>
    </div>
  );

  return (
    <header className={`site-header${scrolled || menuOpen ? ' is-scrolled' : ''}`}>
      <div className='site-container site-header-inner'>
        <a href={onHome ? '#top' : '/'} className='site-brand' aria-label={tNav('homeAria')} onClick={closeMenu}>
          <img src='/logo-mark.png' alt='' width={40} height={32} />
          <span className='site-brand-word'>
            <b>PIPELINE</b>
            <em>QUALITY</em>
          </span>
        </a>

        <nav className='site-nav'>
          {SECTIONS.map((item) => (
            <a key={item.hash} href={sectionHref(item.hash)}>{tNav(item.key)}</a>
          ))}
        </nav>

        <div className='site-header-tools'>
          {languageSwitch}
          <a className='site-btn site-btn-primary site-header-contact' href={sectionHref('#contact')} onClick={closeMenu}>{tNav('contact')}</a>
          <button
            type='button'
            className='site-menu-toggle'
            aria-expanded={menuOpen}
            aria-controls='site-mobile-menu'
            aria-label={menuOpen ? tNav('closeMenu') : tNav('openMenu')}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className='site-menu-icon' aria-hidden='true'><span /><span /></span>
            <span className='site-menu-label'>{tNav('menu')}</span>
          </button>
        </div>
      </div>

      <div id='site-mobile-menu' className={`site-mobile-menu${menuOpen ? ' is-open' : ''}`} hidden={!menuOpen}>
        <nav className='site-container'>
          {SECTIONS.map((item) => (
            <a key={item.hash} href={sectionHref(item.hash)} onClick={closeMenu}>{tNav(item.key)}</a>
          ))}
          <a href={sectionHref('#contact')} onClick={closeMenu}>{tNav('contact')}</a>
          {languageSwitch}
        </nav>
      </div>
    </header>
  );
}

export const Navigation = SiteHeader;
