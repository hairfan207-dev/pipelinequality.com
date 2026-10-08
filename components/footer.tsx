'use client';

import { useLocale, useMessages, useTranslations } from 'next-intl';
import { usePathname } from '@/navigation';

export function SiteFooter() {
  const tFooter = useTranslations('footerFinal');
  const locale = useLocale();
  const pathname = usePathname();
  const onHome = pathname === '/' || pathname === '';
  const rawFooterLinks = (useMessages() as { footerFinal?: { links?: unknown } }).footerFinal?.links;
  const footerLinks = (Array.isArray(rawFooterLinks)
    ? rawFooterLinks
    : rawFooterLinks && typeof rawFooterLinks === 'object'
      ? Object.values(rawFooterLinks)
      : []) as Array<{ label: string; href: string }>;

  const sectionHref = (href: string) => (href.startsWith('#') && !onHome ? `/${href}` : href);

  return (
    <footer className='footer footer-final'>
      <div className='footer-final-grid'>
        <div className='footer-final-brand'>
          <p className='footer-final-name'>Pipeline Quality</p>
          <p>{tFooter('statement')}</p>
          <a className='footer-final-cta' href={sectionHref('#contact')}>{tFooter('cta')}</a>
        </div>
        <nav className='footer-final-col' aria-labelledby='footer-nav-label'>
          <p id='footer-nav-label'>{tFooter('navLabel')}</p>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.href}><a href={sectionHref(link.href)}>{link.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className='footer-final-col'>
          <p id='footer-legal-label'>{tFooter('legalLabel')}</p>
          <ul aria-labelledby='footer-legal-label'>
            <li><a href='https://www.linkedin.com/company/pipeline-quality' target='_blank' rel='noopener noreferrer'>LinkedIn</a></li>
            <li><a href='mailto:info@pipelinequality.com'>info@pipelinequality.com</a></li>
            <li><a href='/privacy'>{tFooter('privacy')}</a></li>
            <li><a href={locale === 'de' ? '/impressum' : '/legal-notice'}>{tFooter('imprint')}</a></li>
          </ul>
        </div>
      </div>
      <div className='footer-final-bottom'>
        <p>{tFooter('brandLine')}</p>
        <p>{tFooter('copyright', { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}

export const Footer = SiteFooter;
