'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { ContactForm } from '@/components/contact-form';

type Block = { title: string; items: string[] };
type Industry = { title: string; items: string[] };
type Step = { id: string; title: string; text: string };
type Reason = { title: string; description: string };

const industryOrder = [2, 0, 4, 1, 5, 3, 7, 6];
const industryPhotos = [
  '/design/figma/industry-wind.webp',
  '/design/figma/industry-pipeline.webp',
  '/client/industry-oilgas.jpg',
  '/client/industry-chemical.jpg',
  '/design/figma/industry-energy.webp',
  '/client/industry-epc.jpg',
  '/design/figma/industry-construction.webp',
  '/client/industry-maintenance.jpg',
];
const serviceOrder = [0, 2, 1, 3];
const serviceIcons = [
  '/design/figma/svc-qaqc.svg',
  '/design/figma/svc-inspect.svg',
  '/design/figma/svc-docs.svg',
  '/design/figma/svc-project.svg',
];
const serviceCaptionIcons = [
  '/design/figma/svc-qaqc-on.svg',
  '/design/figma/svc-inspect-on.png',
  '/design/figma/svc-docs-on.png',
  '/design/figma/svc-project-on.png',
];
const servicePhotos = [
  '/design/figma/photo-measure.png',
  '/design/figma/photo-inspection.webp',
  '/design/figma/photo-documentation.webp',
  '/design/figma/photo-project-quality.webp',
];
const workPhotos = [
  '/design/figma/work-understand.webp',
  '/design/figma/work-match.webp',
  '/design/figma/work-execute.webp',
  '/design/figma/work-control.webp',
  '/design/figma/work-handover.webp',
];
const standardIcons = [
  '/design/figma/std-qm.svg',
  '/design/figma/std-coat.svg',
  '/design/figma/std-press.svg',
  '/design/figma/std-wind-icon.svg',
  '/design/figma/std-weld-icon.svg',
  '/design/figma/std-ndt.svg',
  '/design/figma/std-docs.svg',
];
const standardOrder = [0, 5, 4, 3, 2, 1, 6];

export function DesignHome() {
  const tHero = useTranslations('hero');
  const tServices = useTranslations('services');
  const tInd = useTranslations('industries');
  const tExp = useTranslations('experience');
  const tStd = useTranslations('standards');
  const tWork = useTranslations('workProcess');
  const tDigital = useTranslations('digitalQuality');
  const tWhy = useTranslations('why');
  const tContact = useTranslations('contact');
  const tFooter = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const blocks = tServices.raw('blocks') as Block[];
  const sectors = tInd.raw('sectors') as Industry[];
  const groups = tStd.raw('groups') as Array<{ title: string; items: string[] }>;
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
  const [serviceOpen, setServiceOpen] = useState(0);
  const [industry, setIndustry] = useState(0);
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

  const activeIndustry = sectors[industry];

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

      <section className='services section' id='services'>
        <span id='expertise' className='section-anchor' />
        <div className='shell two-col services-grid'>
          <div>
            <h2>
              <span className='svc-line'>{tServices('designTitle')}</span>
              <span className='svc-line'><span>{tServices('designAccentLead')}</span> {tServices('designAccentTail')}</span>
            </h2>
            <p className='lead'>{tServices('designLead')}</p>
            <div className='accordion service-accordion'>
              {serviceOrder.map((index) => {
                const block = blocks[index];
                const open = serviceOpen === index;
                const splitAt = Math.ceil(block.items.length / 2);
                const longerFirst = block.items.length % 2 === 1;
                const columns = longerFirst
                  ? [block.items.slice(0, splitAt), block.items.slice(splitAt)]
                  : [block.items.slice(splitAt), block.items.slice(0, splitAt)];
                return (
                  <div
                    key={block.title}
                    className={`acc-item${open ? ' open' : ''}`}
                    onPointerEnter={(event) => {
                      if (event.pointerType === 'mouse') setServiceOpen(index);
                    }}
                  >
                    <button
                      type='button'
                      aria-expanded={open}
                      onClick={() => {
                        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
                        setServiceOpen(open ? -1 : index);
                      }}
                    >
                      <span className='acc-icon'><img src={serviceIcons[index]} alt='' /></span>
                      <span className='acc-title'>{block.title}</span>
                      <b className='acc-chevron' aria-hidden='true'>›</b>
                    </button>
                    <div className='acc-panel'>
                      <div className='acc-panel-inner'>
                        {columns.map((column, columnIndex) => (
                          <ul key={columnIndex}>
                            {column.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ))}
                      </div>
                      <figure className='acc-mobile-visual'>
                        <img src={servicePhotos[index]} alt={block.title} />
                        <figcaption className='image-caption'>
                          <img src={serviceCaptionIcons[index]} alt='' />
                          <span>{block.title}</span>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='feature-image'>
            <img key={serviceOpen} src={servicePhotos[Math.max(serviceOpen, 0)]} alt={blocks[Math.max(serviceOpen, 0)]?.title ?? ''} />
            <div className='image-caption' key={`cap-${serviceOpen}`}>
              <img src={serviceCaptionIcons[Math.max(serviceOpen, 0)]} alt='' />
              {blocks[Math.max(serviceOpen, 0)]?.title}
            </div>
          </div>
        </div>
      </section>

      <section className='industries' id='industries'>
        <div className='industries-head'>
          <h2>
            {tInd('designLine1')}{' '}
            <span>{tInd('designLine2')}</span>
          </h2>
        </div>
        <div className='shell industries-panel'>
          <div className='industry-tabs'>
            {industryOrder.map((index) => (
              <div key={sectors[index].title} className={`industry-row${industry === index ? ' active' : ''}`}>
                <button
                  type='button'
                  className={industry === index ? 'active' : ''}
                  aria-expanded={industry === index}
                  onPointerEnter={(event) => {
                    if (event.pointerType === 'mouse') setIndustry(index);
                  }}
                  onClick={() => setIndustry(index)}
                >
                  {sectors[index].title}
                  <img src='/design/figma/industry-mark.svg' alt='' />
                </button>
                {industry === index ? (
                  <div className='industry-mobile-panel'>
                    <div className='industry-photo'>
                      <img src={index === 0 ? '/design/figma/industry-wind.png' : industryPhotos[index]} alt={sectors[index].title} />
                      <strong>{sectors[index].title}</strong>
                    </div>
                    <div className='industry-copy'>
                      <p>
                        {sectors[index].items.map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className='industry-card'>
            <div className='industry-photo'>
              <img key={industry} src={industryPhotos[industry]} alt={activeIndustry.title} />
              <strong key={`label-${industry}`}>{activeIndustry.title}</strong>
            </div>
            <div className='industry-copy' key={`copy-${industry}`}>
              <h3>{activeIndustry.title}</h3>
              <p>
                {activeIndustry.items.map((item) => (
                  <span key={item}>
                    {item}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>
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

      <section className='standards section' id='capabilities'>
        <h2>
            <span className='line'>{tStd('designLine1')}</span>
            <span className='line'>
              <span className='amp'>&</span>{' '}
              {tStd('designLine2').replace(/^&\s*/, '')}
            </span>
        </h2>
        <div className='standard-grid'>
          {standardOrder.map((groupIndex, iconIndex) => {
            const group = groups[groupIndex];
            const [first, ...rest] = group.title.split(' ');
            const titleLines = group.title.includes(' & ')
              ? group.title.split(' & ').map((part, line) => (line === 0 ? part : `& ${part}`))
              : group.title.includes(' / ')
                ? group.title.split(' / ').map((part, line, parts) => (line < parts.length - 1 ? `${part} /` : part))
                : rest.length ? [first, rest.join(' ')] : [group.title];
            return (
              <article key={group.title}>
                <img src={standardIcons[iconIndex]} alt='' />
                <div className='std-card'>
                  <h3>
                    {titleLines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h3>
                  <p>
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </p>
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
