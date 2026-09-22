'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const tCTA = useTranslations('cta');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;

    // Store current scroll position
    const scrollY = window.scrollY;

    // Remove the current locale from the pathname if it exists
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    // Navigate to the new locale
    router.push(newPath);

    // Restore scroll position after navigation
    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 50);

    setIsLangOpen(false);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
  ];

  const currentLang =
    languages.find((lang) => lang.code === locale) || languages[0];

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');

    if (href?.startsWith('#')) {
      if (pathname === `/${locale}` || pathname === '/') {
        // We are on homepage, smooth scroll
        const element = document.querySelector(href);
        if (element) {
          const offset = 80; // Header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      } else {
        // Not on homepage, navigate to home with hash
        router.push(`/${locale}${href}`);
      }
    } else if (href) {
      // Normal link navigation
      router.push(href);
    }
    closeMenu();
  };

  return (
    <nav
      className={`fixed top-4 md:top-10 left-0 right-4 z-50 transition-all duration-300 px-4 md:px-5 mx-auto`}
    >
      <div
        className={`max-w-[1320px] mx-auto bg-white h-14 md:h-16 rounded-xl border border-white/20 backdrop-blur-md ${scrolled ? 'shadow-lg' : 'shadow-md'
          }`}
      >
        <div className='px-4 md:px-12 lg:px-20 flex justify-between items-center h-full'>
          {/* Logo */}
          <div className='flex items-center'>
            <a
              href='#home'
              onClick={handleSmoothScroll}
              className='flex items-center gap-2'
            >
              <img
                src='/logo-horizontal.jpeg'
                alt='Pipeline Quality'
                className='w-24 md:w-30'
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center gap-6'>
            <a
              href='#home'
              onClick={handleSmoothScroll}
              className='text-black text-sm md:text-base font-normal leading-5 hover:text-muted-gold transition-colors'
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {t('home')}
            </a>
            <a
              href='#services'
              onClick={handleSmoothScroll}
              className='text-black text-sm md:text-base font-normal leading-5 hover:text-muted-gold transition-colors'
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {t('services')}
            </a>
            <a
              href='#industries'
              onClick={handleSmoothScroll}
              className='text-black text-sm md:text-base font-normal leading-5 hover:text-muted-gold transition-colors'
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {t('industries')}
            </a>
            <a
              href='#how-we-work'
              onClick={handleSmoothScroll}
              className='text-black text-sm md:text-base font-normal leading-5 hover:text-muted-gold transition-colors'
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {t('howWeWork')}
            </a>
            <a
              href='#experience'
              onClick={handleSmoothScroll}
              className='text-black text-sm md:text-base font-normal leading-5 hover:text-muted-gold transition-colors'
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {t('experience')}
            </a>
            <a
              href='#contact'
              onClick={handleSmoothScroll}
              className='text-black text-sm md:text-base font-normal leading-5 hover:text-muted-gold transition-colors'
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {t('contact')}
            </a>
          </div>

          {/* Right Side: CTA Button + Language Dropdown */}
          <div className='hidden lg:flex items-center gap-3'>
            {/* CTA Button */}
            <a href='#contact' onClick={handleSmoothScroll}>
              <button className='w-auto min-w-[140px] md:min-w-[160px] h-9 md:h-10 px-3 md:px-4 py-2.5 bg-muted-gold rounded-lg inline-flex justify-center items-center gap-2.5 hover:bg-muted-gold/90 transition-colors whitespace-nowrap'>
                <span
                  className='text-white text-xs md:text-sm font-semibold leading-5'
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {tCTA('button1')}
                </span>
              </button>
            </a>

            {/* Language Dropdown */}
            <div className='relative'>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className='flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-[var(--navy)]'
              >
                <Globe className='w-4 h-4' />
                <span className='font-semibold text-sm'>
                  {currentLang.code.toUpperCase()}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isLangOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50'>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLocale(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${locale === lang.code ? 'bg-orange-50' : ''
                        }`}
                    >
                      <span className='text-2xl'>{lang.flag}</span>
                      <span
                        className={`font-medium ${locale === lang.code
                          ? 'text-[var(--navy)]'
                          : 'text-gray-700'
                          }`}
                      >
                        {lang.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='lg:hidden text-[var(--navy)] p-2'
          >
            {isMobileMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='lg:hidden bg-[var(--navy)] border-t border-white/10'>
          <div className='px-6 py-4 space-y-3'>
            <a
              href='#home'
              onClick={handleSmoothScroll}
              className='block text-white font-medium py-2 hover:text-muted-gold transition-colors'
            >
              {t('home')}
            </a>
            <a
              href='#services'
              onClick={handleSmoothScroll}
              className='block text-white font-medium py-2 hover:text-muted-gold transition-colors'
            >
              {t('services')}
            </a>
            <a
              href='#industries'
              onClick={handleSmoothScroll}
              className='block text-white font-medium py-2 hover:text-muted-gold transition-colors'
            >
              {t('industries')}
            </a>
            <a
              href='#how-we-work'
              onClick={handleSmoothScroll}
              className='block text-white font-medium py-2 hover:text-muted-gold transition-colors'
            >
              {t('howWeWork')}
            </a>
            <a
              href='#experience'
              onClick={handleSmoothScroll}
              className='block text-white font-medium py-2 hover:text-muted-gold transition-colors'
            >
              {t('experience')}
            </a>
            <a
              href='#contact'
              onClick={handleSmoothScroll}
              className='block text-white font-medium py-2 hover:text-muted-gold transition-colors'
            >
              {t('contact')}
            </a>

            <div className='pt-3 border-t border-white/10'>
              <a href='#contact' onClick={handleSmoothScroll}>
                <Button className='w-full bg-muted-gold text-white hover:bg-muted-gold/90 font-semibold'>
                  {tCTA('button1')}
                </Button>
              </a>
            </div>

            <div className='flex gap-2 pt-2'>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    switchLocale(lang.code);
                    closeMenu();
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${locale === lang.code
                    ? 'bg-muted-gold text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                >
                  {lang.flag} {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
