'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRightIcon } from '@/components/icons';
import { usePathname, useRouter } from '@/navigation';

const SECTIONS = [
  { hash: '#services', key: 'services' },
  { hash: '#industries', key: 'industries' },
  { hash: '#capabilities', key: 'expertise' },
  { hash: '#experience', key: 'experience' },
] as const;

const TRACKED = [...SECTIONS.map((item) => item.hash.slice(1)), 'contact'];

export function SiteHeader() {
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const onHome = pathname === '/' || pathname === '';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({ x: 0, w: 0, on: false });
  const navRef = useRef<HTMLElement>(null);

  const sectionHref = (hash: string) => (onHome ? hash : `/${hash}`);
  const closeMenu = () => setMenuOpen(false);
  const isActive = (hash: string) => onHome && activeSection === hash.slice(1);

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

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const place = () => {
      const active = nav.querySelector<HTMLElement>('.nav-link.is-active');
      if (!active) {
        setIndicator((current) => (current.on ? { ...current, on: false } : current));
        return;
      }
      setIndicator({ x: active.offsetLeft, w: active.offsetWidth, on: true });
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [activeSection, locale, onHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!onHome || !('IntersectionObserver' in window)) return;
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        setActiveSection(TRACKED.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: '-38% 0px -58% 0px', threshold: 0 },
    );
    TRACKED.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [onHome]);

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
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-menu-open' : ''}`}>
      <div className='site-container site-header-inner'>
        <a href={onHome ? '#top' : '/'} className='site-brand' aria-label={tNav('homeAria')} onClick={closeMenu}>
          <img src='/logo-mark-white.png' alt='' width={52} height={42} />
          <span className='site-brand-word'>
            <b>PIPELINE</b>
            <em>QUALITY</em>
          </span>
        </a>

        <nav ref={navRef} className='site-nav'>
          {SECTIONS.map((item) => (
            <a key={item.hash} className={`nav-link${isActive(item.hash) ? ' is-active' : ''}`} href={sectionHref(item.hash)}>
              {tNav(item.key)}
            </a>
          ))}
          <span
            className={`nav-indicator${indicator.on ? ' is-on' : ''}`}
            style={{ width: indicator.w, transform: `translateX(${indicator.x}px)` }}
            aria-hidden='true'
          />
        </nav>

        <div className='site-header-tools'>
          {languageSwitch}
          <a
            className={`site-btn site-btn-primary site-header-contact${isActive('#contact') ? ' is-active' : ''}`}
            href={sectionHref('#contact')}
            onClick={closeMenu}
          >
            <span>{tNav('contact')}</span>
            <ArrowRightIcon className='site-btn-icon' />
          </a>
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
            <a key={item.hash} className={isActive(item.hash) ? 'is-active' : undefined} href={sectionHref(item.hash)} onClick={closeMenu}>
              {tNav(item.key)}
            </a>
          ))}
          <a href={sectionHref('#contact')} onClick={closeMenu}>{tNav('contact')}</a>
          {languageSwitch}
        </nav>
      </div>
    </header>
  );
}

export const Navigation = SiteHeader;
