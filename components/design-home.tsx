'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { ContactForm } from '@/components/contact-form';

type IndustryCard = { title: string; description: string; imageAlt: string };
type ExpertiseCard = {
  title: string;
  description: string;
  capabilitiesLabel: string;
  capabilities: string[];
  note?: string;
  imageAlt: string;
};
type Step = { id: string; title: string; text: string };
type Reason = { title: string; description: string };
type QualGroup = { label?: string; items: string[] };
type QualCategory = {
  code: string;
  title: string;
  lead?: string;
  groups: QualGroup[];
  note?: string;
};

const industryPhotos = [
  '/design/figma/industry-wind.png',
  '/client/industry-pipeline.jpg',
  '/client/industry-oilgas.jpg',
  '/client/industry-chemical.jpg',
  '/client/industry-energy.jpg',
  '/client/industry-construction.jpg',
  '/client/intro-inspection.jpg',
  '/client/industry-maintenance.jpg',
];
const expertisePhotos = [
  '/client/service-project.jpg',
  '/client/service-engineering.jpg',
  '/design/figma/team-inspectors.webp',
  '/client/service-welding.jpg',
  '/client/service-docs-yard.jpg',
  '/client/bw-field.jpg',
];
const workPhotos = [
  '/design/figma/work-understand.webp',
  '/design/figma/work-match.webp',
  '/design/figma/work-execute.webp',
  '/design/figma/work-control.webp',
  '/design/figma/work-handover.webp',
];

export function DesignHome() {
  const tHero = useTranslations('hero');
  const tExpertise = useTranslations('expertiseSection');
  const tIndustries = useTranslations('industriesSection');
  const tExp = useTranslations('experience');
  const tQual = useTranslations('qualificationsSection');
  const tWork = useTranslations('workProcess');
  const tDigital = useTranslations('digitalQuality');
  const tWhy = useTranslations('why');
  const tContact = useTranslations('contact');
  const tFooter = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const expertiseCards = tExpertise.raw('cards') as ExpertiseCard[];
  const industryCards = tIndustries.raw('cards') as IndustryCard[];
  const qualCategories = tQual.raw('categories') as QualCategory[];
  const steps = tWork.raw('steps') as Step[];
  const digitalBlocks = tDigital.raw('blocks') as Array<{ title: string; items: string[]; summary?: string }>;
  const workflows = digitalBlocks.map((block, index) => ({
    number: String(index + 1).padStart(2, '0'),
    title: block.title,
    description: block.summary ?? block.items.join(', '),
  }));
  const reasons = tWhy.raw('reasons') as Reason[];

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const [expertiseOpen, setExpertiseOpen] = useState<Record<number, boolean>>({});
  const [qualOpen, setQualOpen] = useState<Record<number, boolean>>({});
  const [supportOpen, setSupportOpen] = useState(0);

  const switchLocale = (nextLocale: 'en' | 'de') => {
    setLangOpen(false);
    if (nextLocale === locale) return;
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=lax`;
    router.replace(pathname || '/', { locale: nextLocale });
    router.refresh();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const close = (event: MouseEvent) => {
      if (!langMenuRef.current?.contains(event.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [langOpen]);

  return (
    <div className={`pq-design${menuOpen ? ' menu-open' : ''}`} lang={locale}>
      <header className='hero' id='top'>
        <nav className={`nav shell${scrolled && !menuOpen ? ' is-scrolled' : ''}`}>
          <a href='#top' className='brand' aria-label='Pipeline Quality home'>
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
            <a className='nav-contact' href='#contact' onClick={() => setMenuOpen(false)}>{tNav('contact')}</a>
            <button
              type='button'
              className='menu-btn'
              aria-expanded={menuOpen}
              aria-controls='pq-nav-menu'
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className='menu-label'>{tNav('menu')}</span>
            </button>
          </div>
          <div id='pq-nav-menu' className={`nav-links${menuOpen ? ' is-open' : ''}`}>
            <a href='#services' onClick={() => setMenuOpen(false)}>{tNav('services')}</a>
            <a href='#industries' onClick={() => setMenuOpen(false)}>{tNav('industries')}</a>
            <a href='#expertise' onClick={() => setMenuOpen(false)}>{tNav('expertise')}</a>
            <a href='#experience' onClick={() => setMenuOpen(false)}>{tNav('experience')}</a>
            <a href='#contact' onClick={() => setMenuOpen(false)}>{tNav('contact')}</a>
            <div className='lang-menu' ref={langMenuRef}>
              <button
                type='button'
                className='lang-btn'
                aria-expanded={langOpen}
                aria-haspopup='menu'
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
        <div className='hero-stage'>
          <div className='hero-visual'>
            <img className='hero-bg' src='/design/figma/industry-wind.webp' alt={tHero('imageAlt')} />
          </div>
          <div className='hero-copy'>
            <h1>{tHero('headline')}</h1>
            <p className='hero-subtitle'>{tHero('subheading')}</p>
            <p className='hero-body'>{tHero('body')}</p>
            <p className='hero-meta'>{tHero('serviceLine')}</p>
            <p className='hero-meta'>{tHero('industryLine')}</p>
            <div className='hero-actions'>
              <a className='btn btn-orange' href='#contact'>{tHero('cta1')}</a>
              <a className='btn btn-navy' href='#contact'>{tHero('cta2')}</a>
            </div>
          </div>
        </div>
      </header>

      <section className='services section expertise-section' id='services'>
        <span id='expertise' className='section-anchor' />
        <div className='shell expertise-head'>
          <h2>{tExpertise('heading')}</h2>
          <p>{tExpertise('intro')}</p>
        </div>
        <div className='shell expertise-grid'>
          {expertiseCards.map((card, index) => {
            const visible = card.capabilities.slice(0, 4);
            const hidden = card.capabilities.slice(4);
            const open = Boolean(expertiseOpen[index]);
            const panelId = `expertise-more-${index}`;
            return (
              <article key={card.title} className='expertise-card'>
                <div className={`expertise-photo${index === 2 ? ' is-cropped' : ''}`}>
                  <img src={expertisePhotos[index]} alt={card.imageAlt} />
                </div>
                <div className='expertise-body'>
                  <h3>{card.title}</h3>
                  <p className='expertise-desc'>{card.description}</p>
                  {card.note ? <p className='expertise-note'>{card.note}</p> : null}
                  <p className='expertise-label'>{card.capabilitiesLabel}</p>
                  <ul className='expertise-list'>
                    {visible.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {hidden.length > 0 ? (
                    <div id={panelId} className={`expertise-more${open ? ' is-open' : ''}`} aria-hidden={!open}>
                      <div>
                        <ul className='expertise-list'>
                          {hidden.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null}
                  {hidden.length > 0 ? (
                    <button
                      type='button'
                      className='expertise-toggle'
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setExpertiseOpen((current) => ({ ...current, [index]: !current[index] }))}
                    >
                      {open ? tExpertise('showFewer') : tExpertise('showAll')}
                    </button>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className='industry-section' id='industries'>
        <div className='shell industry-head'>
          <h2>{tIndustries('heading')}</h2>
          <p>{tIndustries('intro')}</p>
        </div>
        <div className='shell industry-grid'>
          {industryCards.map((card, index) => (
            <article key={card.title} className='industry-tile'>
              <div className={`industry-visual${index === 6 ? ' is-portrait' : ''}`}>
                <img src={industryPhotos[index]} alt={card.imageAlt} />
              </div>
              <div className='industry-body'>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className='why section' id='why'>
        <div className='why-layout'>
          <svg className='why-shape' viewBox='0 0 1650.1 625.42' preserveAspectRatio='none' aria-hidden='true'>
            <path fill='#F4F7F9' d='M824.85 20V252.14C824.85 257.444 822.743 262.531 818.992 266.281C815.241 270.032 810.154 272.14 804.85 272.14H20C14.6957 272.14 9.60859 274.246 5.85786 277.997C2.10714 281.748 0 286.835 0 292.14V605.42C0 610.724 2.10714 615.811 5.85786 619.562C9.60859 623.312 14.6957 625.42 20 625.42H1630.1C1635.4 625.42 1640.49 623.312 1644.24 619.562C1647.99 615.811 1650.1 610.724 1650.1 605.42V20C1650.1 14.6957 1647.99 9.60815 1644.24 5.85742C1640.49 2.10669 1635.4 0 1630.1 0H844.85C839.546 0 834.459 2.10669 830.708 5.85742C826.957 9.60815 824.85 14.6957 824.85 20Z' />
          </svg>
          <h2>
            <span className='line'>{tWhy('designLine1')}</span>
            <span className='line'>{tWhy('designLine2')}<span>{tWhy('designMark')}</span></span>
          </h2>
          <div className='why-col why-col-right'>
            {reasons.slice(0, 4).map((reason) => (
              <article key={reason.title}>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </article>
            ))}
          </div>
          <div className='why-col why-col-left'>
            {reasons.slice(4).map((reason) => (
              <article key={reason.title}>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='qual-section section' id='capabilities'>
        <div className='shell qual-head'>
          <h2>{tQual('heading')}</h2>
          <p>{tQual('intro')}</p>
          <p className='qual-disclaimer'>{tQual('disclaimer')}</p>
        </div>
        <div className='shell qual-grid'>
          {qualCategories.map((category, index) => {
            const open = Boolean(qualOpen[index]);
            const panelId = `qual-panel-${category.code}`;
            return (
              <article key={category.code} className={`qual-card${category.code === 'C' ? ' is-wide' : ''}${open ? ' is-open' : ''}`}>
                <h3>
                  <button
                    type='button'
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setQualOpen((current) => ({ ...current, [index]: !current[index] }))}
                  >
                    <span className='qual-code'>{category.code}</span>
                    {' '}
                    <span className='qual-title'>{category.title}</span>
                  </button>
                </h3>
                <div id={panelId} className={`qual-panel${open ? ' is-open' : ''}`} aria-hidden={!open}>
                  <div>
                    {category.lead ? <p className='qual-lead'>{category.lead}</p> : null}
                    <div className={`qual-groups${category.groups.length > 1 ? ' is-split' : ''}`}>
                      {category.groups.map((group) => (
                        <div key={group.label ?? category.code}>
                          {group.label ? <p className='qual-label'>{group.label}</p> : null}
                          <ul>
                            {group.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {category.note ? <p className='qual-note'>{category.note}</p> : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className='experience section' id='experience'>
        <div className='experience-box'>
          <div className='experience-intro'>
            <div className='experience-heading'>
              <h2>
            <span className='line'>{tExp('designBefore1')}<span className='accent'>{tExp('designAccent1')}</span><span className='amp'>{tExp('designAmp')}</span></span>
            <span className='line'>{tExp('designBefore2')}<span className='accent'>{tExp('designAccent2')}</span></span>
              </h2>
              <p>{tExp('intro')}</p>
            </div>
            <div className='experience-copy'>
              <p className='eyebrow'>{tExp('label')}</p>
              <p>{tExp('paragraph1')}</p>
              {tExp('paragraph2') ? <p>{tExp('paragraph2')}</p> : null}
            </div>
          </div>
          <div className='experience-photos'>
            <img className='exp-wind' src='/design/figma/exp-wind.webp' alt={tExp('imageAlt')} />
            <div className='exp-pipes'>
              <img src='/design/figma/exp-pipes.webp' alt={tExp('industrialTitle')} />
            </div>
          </div>
          <div className='experience-ref'>
            <p className='eyebrow'>{tExp('referenceLabel')}</p>
            <h3>{tExp('referenceTitle')}</h3>
            {tExp('referenceText').split('\n\n').map((part) => (
              <p className='ref-body' key={part}>{part}</p>
            ))}
            <h4>{tExp('scopeTitle')}</h4>
            <p className='ref-detail'>{tExp('scopeText')}</p>
            <h4 className='track'>{tExp('trackTitle')}</h4>
            <p className='ref-detail track'>{tExp('trackText')}</p>
          </div>
        </div>
      </section>

      <section className='workflow section' id='how-we-work'>
        <p className='eyebrow'>{tWork('label')}</p>
        <h2>{tWork('title')}</h2>
        <div className='workflow-grid'>
          {steps.map((step, index) => (
            <article key={step.id} className={index % 2 ? 'up' : 'down'}>
              <div className='wf-card'>
                <img className={index === 3 ? 'wf-mobile-only' : undefined} src={index === 3 ? '/design/figma/work-control-desktop.png' : workPhotos[index]} alt='' />
                {index === 3 ? <img className='wf-desktop-only' src='/design/figma/work-control-desktop.png' alt='' /> : null}
                <strong>{step.title}</strong>
              </div>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='digital-support section' id='digital-quality'>
        <div className='dq-panel'>
          <div className='dq-panel-copy'>
            <p className='dq-kicker'>
              <span className='dq-dash' aria-hidden='true' />
              {tDigital('label')}
            </p>
            <h2>
              <span className='line'>{tDigital('designLine1')}</span>
              <span className='line'>{tDigital('designLine2')}</span>
            </h2>
            <p className='dq-copy'>{tDigital('description')}</p>
          </div>
          <img className='dq-blueprint' src='/design/figma/dq-blueprint.png' alt='' />
        </div>
        <div className='dq-workflows'>
          <p className='dq-kicker'>
            <span className='dq-dash' aria-hidden='true' />
            {tDigital('workflowsLabel')}
          </p>
          <ul className='dq-list'>
            {workflows.map((item, index) => {
              const open = supportOpen === index;
              const panelId = `digital-quality-${item.number}`;
              return (
                <li key={item.title} className={open ? 'dq-row is-open' : 'dq-row'}>
                  <button
                    type='button'
                    aria-expanded={open}
                    aria-controls={panelId}
                    onMouseEnter={() => setSupportOpen(index)}
                    onFocus={() => setSupportOpen(index)}
                    onClick={() => setSupportOpen(index)}
                  >
                    <span className='dq-num'>{item.number}</span>
                    <span className='dq-main'>
                      <span className='dq-title'>{item.title}</span>
                      <span className='dq-desc' id={panelId} aria-hidden={!open}>
                        <span>{item.description}</span>
                      </span>
                    </span>
                    <span className='dq-chevron' aria-hidden='true' />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className='contact section' id='contact'>
          <h2>{tContact('designBefore')}<span>{tContact('designAccent')}</span>{tContact('designAfter')}</h2>
        <ContactForm />
      </section>

      <footer className='footer'>
        <p className='footer-brand'>Pipeline Quality</p>
        <p className='footer-desc'>{tFooter('description')}</p>
        <nav className='footer-links'>
          <a href='#services'>{tNav('services')}</a>
          <a href='#industries'>{tNav('industries')}</a>
          <a href='#expertise'>{tNav('expertise')}</a>
          <a href='#experience'>{tNav('experience')}</a>
          <a href='#contact'>{tNav('contact')}</a>
        </nav>
        <p className='footer-copy'>{tFooter('copyright')}</p>
        <div className='footer-locale'>
          <span>{tFooter('location')}</span>
          <button type='button' className={locale === 'en' ? 'footer-lang on' : 'footer-lang'} onClick={() => switchLocale('en')}>EN</button>
          <button type='button' className={locale === 'de' ? 'footer-lang on' : 'footer-lang'} onClick={() => switchLocale('de')}>DE</button>
        </div>
          <p className='footer-note'><span>Pipeline Quality</span> {tFooter('brandRest')}</p>
        <div className='footer-legal'>
          <a href='/privacy'>{tFooter('privacyPolicy')}</a>
          <a href={locale === 'de' ? '/agb' : '/terms'}>{tFooter('terms')}</a>
          <a href={locale === 'de' ? '/impressum' : '/legal-notice'}>{tFooter('imprint')}</a>
        </div>
      </footer>
    </div>
  );
}
