'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';

export function SiteHeader() {
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const onHome = pathname === '/' || pathname === '';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const sectionHref = (hash: string) => (onHome ? hash : `/${hash}`);

  const switchLocale = (nextLocale: 'en' | 'de') => {
    setLangOpen(false);
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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const root = document.querySelector('.pq-design');
    root?.classList.toggle('menu-open', menuOpen);
    return () => root?.classList.remove('menu-open');
  }, [menuOpen]);

  useEffect(() => {
    if (!langOpen) return;
    const close = (event: MouseEvent) => {
      if (!langMenuRef.current?.contains(event.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [langOpen]);

  return (
    <nav className={`nav shell${scrolled && !menuOpen ? ' is-scrolled' : ''}`}>
      <a href={onHome ? '#top' : '/'} className='brand' aria-label={tNav('homeAria')}>
        <span className='brand-logo-stack'>
          <img className='brand-logo brand-logo-light' src='/logo-mark-white.png' alt='' />
          <img className='brand-logo brand-logo-dark' src='/logo-mark.png' alt='' />
        </span>
        <span className='brand-copy'>
          <b>PIPELINE</b>
          <em>QUALITY</em>
        </span>
      </a>
      <div className='nav-tools'>
        <a className='nav-contact' href={sectionHref('#contact')} onClick={() => setMenuOpen(false)}>{tNav('contact')}</a>
        <button
          type='button'
          className='menu-btn'
          aria-expanded={menuOpen}
          aria-controls='pq-nav-menu'
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className='menu-label'>{tNav('menu')}</span>
        </button>
      </div>
      <div id='pq-nav-menu' className={`nav-links${menuOpen ? ' is-open' : ''}`}>
        <a href={sectionHref('#services')} onClick={() => setMenuOpen(false)}>{tNav('services')}</a>
        <a href={sectionHref('#industries')} onClick={() => setMenuOpen(false)}>{tNav('industries')}</a>
        <a href={sectionHref('#expertise')} onClick={() => setMenuOpen(false)}>{tNav('expertise')}</a>
        <a href={sectionHref('#experience')} onClick={() => setMenuOpen(false)}>{tNav('experience')}</a>
        <a href={sectionHref('#contact')} onClick={() => setMenuOpen(false)}>{tNav('contact')}</a>
        <div className='lang-menu' ref={langMenuRef}>
          <button
            type='button'
            className='lang-btn'
            aria-expanded={langOpen}
            aria-haspopup='menu'
            aria-label={tNav('language')}
            onClick={() => setLangOpen((open) => !open)}
          >
            {locale === 'en' ? 'ENGLISH +' : 'DEUTSCH +'}
          </button>
          {langOpen ? (
            <div className='lang-drop' role='menu'>
              <button type='button' role='menuitem' className={locale === 'en' ? 'on' : ''} onClick={() => switchLocale('en')}>English</button>
              <button type='button' role='menuitem' className={locale === 'de' ? 'on' : ''} onClick={() => switchLocale('de')}>Deutsch</button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export const Navigation = SiteHeader;
