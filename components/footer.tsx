'use client';

import { useLocale, useMessages, useTranslations } from 'next-intl';
import { ArrowRightIcon } from '@/components/icons';
import { usePathname } from '@/navigation';

export function SiteFooter() {
  const tFooter = useTranslations('footerFinal');
  const tNav = useTranslations('nav');
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
    <footer className='site-footer' aria-label={tNav('footerAria')}>
      <div className='site-container'>
        <div className='site-footer-grid'>
          <div className='site-footer-brand'>
            <p className='site-footer-name'>Pipeline Quality</p>
            <p>{tFooter('statement')}</p>
            <a className='site-btn site-btn-primary' href={sectionHref('#contact')}>
              <span>{tFooter('cta')}</span>
              <ArrowRightIcon className='site-btn-icon' />
            </a>
          </div>
          <nav className='site-footer-col' aria-labelledby='footer-nav-label'>
            <p id='footer-nav-label' className='site-footer-label'>{tFooter('navLabel')}</p>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.href}><a href={sectionHref(link.href)}>{link.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className='site-footer-col'>
            <p id='footer-legal-label' className='site-footer-label'>{tFooter('legalLabel')}</p>
            <ul aria-labelledby='footer-legal-label'>
              <li><a href='https://www.linkedin.com/company/pipeline-quality' target='_blank' rel='noopener noreferrer'>LinkedIn</a></li>
              <li><a href='mailto:info@pipelinequality.com'>info@pipelinequality.com</a></li>
              <li><a href='/privacy'>{tFooter('privacy')}</a></li>
              <li><a href={locale === 'de' ? '/impressum' : '/legal-notice'}>{tFooter('imprint')}</a></li>
            </ul>
          </div>
        </div>
        <div className='site-footer-bottom'>
          <p>{tFooter('brandLine')}</p>
          <p>{tFooter('copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}

export const Footer = SiteFooter;
