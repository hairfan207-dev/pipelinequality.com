'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ContactForm } from '@/components/contact-form';
import { SiteFooter } from '@/components/footer';
import { SiteHeader } from '@/components/navigation';

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
  '/media/industry-offshore-wind.webp',
  '/media/industry-pipelines.webp',
  '/media/industry-oil-gas.webp',
  '/media/industry-refineries.webp',
  '/media/industry-energy.webp',
  '/media/industry-manufacturing.webp',
  '/media/industry-epc.webp',
  '/media/industry-maintenance.webp',
];
const expertisePhotos = [
  '/media/service-qaqc.webp',
  '/media/service-inspection.webp',
  '/media/service-ndt.webp',
  '/media/service-welding.webp',
  '/media/service-documentation.webp',
  '/media/service-hse.webp',
];

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

function WhyIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg {...iconProps}>
        <circle cx='12' cy='12' r='3' />
        <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.6.77 1.05 1.51 1.2H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg {...iconProps}>
        <rect x='8' y='2' width='8' height='4' rx='1' />
        <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' />
        <path d='m9 14 2 2 4-4' />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg {...iconProps}>
        <path d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z' />
        <path d='M14 2v4a2 2 0 0 0 2 2h4' />
        <path d='M8 13h8' />
        <path d='M8 17h8' />
      </svg>
    );
  }
  if (index === 3) {
    return (
      <svg {...iconProps}>
        <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
        <circle cx='9' cy='7' r='4' />
        <path d='m16 11 2 2 4-4' />
      </svg>
    );
  }
  return (
    <svg {...iconProps}>
      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
      <path d='M16 3.13a4 4 0 0 1 0 7.75' />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg {...iconProps} strokeWidth={1.75}>
      {direction === 'prev' ? <path d='M15 18l-6-6 6-6' /> : <path d='M9 18l6-6-6-6' />}
    </svg>
  );
}

function IndustryCarousel({ cards, labels }: { cards: IndustryCard[]; labels: { region: string; prev: string; next: string } }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    const item = track?.querySelector('li');
    if (!track || !item) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: direction * (item.getBoundingClientRect().width + gap), behavior: reduce ? 'auto' : 'smooth' });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    }
  };

  return (
    <div className='industry-carousel' role='region' aria-roledescription='carousel' aria-label={labels.region}>
      <div className='industry-controls'>
        <button type='button' className='industry-arrow' aria-label={labels.prev} aria-controls='industry-track' disabled={atStart} onClick={() => step(-1)}>
          <ArrowIcon direction='prev' />
        </button>
        <button type='button' className='industry-arrow' aria-label={labels.next} aria-controls='industry-track' disabled={atEnd} onClick={() => step(1)}>
          <ArrowIcon direction='next' />
        </button>
      </div>
      <ul id='industry-track' className='industry-track' ref={trackRef} tabIndex={0} aria-label={labels.region} onKeyDown={onKeyDown}>
        {cards.map((card, index) => (
          <li key={card.title} className='industry-item' aria-roledescription='slide' aria-label={`${index + 1} / ${cards.length}`}>
            <div className='industry-media'>
              <img src={industryPhotos[index]} alt={card.imageAlt} loading='lazy' decoding='async' width={800} height={600} />
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DesignHome() {
  const tHero = useTranslations('hero');
  const tExpertise = useTranslations('expertiseSection');
  const tIndustries = useTranslations('industriesSection');
  const tExperience = useTranslations('experienceSection');
  const tQual = useTranslations('qualificationsSection');
  const tWork = useTranslations('howSection');
  const tDigital = useTranslations('digitalSection');
  const tWhy = useTranslations('whySection');
  const tContact = useTranslations('contact');
  const locale = useLocale();

  const expertiseCards = tExpertise.raw('cards') as ExpertiseCard[];
  const industryCards = tIndustries.raw('cards') as IndustryCard[];
  const qualCategories = tQual.raw('categories') as QualCategory[];
  const steps = tWork.raw('steps') as Step[];
  const reasons = tWhy.raw('reasons') as Reason[];

  const [expertiseOpen, setExpertiseOpen] = useState<Record<number, boolean>>({});
  const [qualOpen, setQualOpen] = useState<Record<number, boolean>>({});

  return (
    <div className='pq-site' lang={locale} id='top'>
      <SiteHeader />
      <main>
        <section className='hero'>
          <div className='site-container hero-grid'>
            <div className='hero-copy'>
              <h1>{tHero('headline').replace(/ \|/g, '\u00a0|')}</h1>
              <p className='hero-subtitle'>{tHero('subheading')}</p>
              <p className='hero-body'>{tHero('body')}</p>
              <div className='hero-meta'>
                <p>{tHero('serviceLine')}</p>
                <p>{tHero('industryLine')}</p>
              </div>
              <div className='hero-actions'>
                <a className='site-btn site-btn-primary' href='#contact'>{tHero('cta1')}</a>
                <a className='site-btn site-btn-secondary' href='#contact'>{tHero('cta2')}</a>
              </div>
            </div>
            <div className='hero-media'>
              <img src='/media/hero-monopile.webp' alt={tHero('imageAlt')} width={737} height={696} fetchPriority='high' decoding='async' />
            </div>
          </div>
        </section>

        <section className='section section-tint' id='services' aria-labelledby='services-heading'>
          <span id='expertise' className='section-anchor' aria-hidden='true' />
          <div className='site-container'>
            <header className='section-head'>
              <h2 id='services-heading'>{tExpertise('heading')}</h2>
              <p>{tExpertise('intro')}</p>
            </header>
            <div className='service-grid'>
              {expertiseCards.map((card, index) => {
                const visible = card.capabilities.slice(0, 4);
                const hidden = card.capabilities.slice(4);
                const open = Boolean(expertiseOpen[index]);
                const panelId = `service-more-${index}`;
                return (
                  <article key={card.title} className='service-card'>
                    <div className='service-media'>
                      <img src={expertisePhotos[index]} alt={card.imageAlt} loading='lazy' decoding='async' width={800} height={400} />
                    </div>
                    <div className='service-body'>
                      <h3>{card.title}</h3>
                      <p className='service-desc'>{card.description}</p>
                      {card.note ? <p className='service-note'>{card.note}</p> : null}
                      <p className='service-label'>{card.capabilitiesLabel}</p>
                      <ul className='service-list'>
                        {visible.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      {hidden.length > 0 ? (
                        <>
                          <ul id={panelId} className='service-list service-list-more' hidden={!open}>
                            {hidden.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                          <button
                            type='button'
                            className='service-toggle'
                            aria-expanded={open}
                            aria-controls={panelId}
                            onClick={() => setExpertiseOpen((current) => ({ ...current, [index]: !current[index] }))}
                          >
                            {open ? tExpertise('showFewer') : tExpertise('showAll')}
                            <span className='toggle-mark' aria-hidden='true' />
                          </button>
                        </>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className='section' id='industries' aria-labelledby='industries-heading'>
          <div className='site-container'>
            <header className='section-head'>
              <h2 id='industries-heading'>{tIndustries('heading')}</h2>
              <p>{tIndustries('intro')}</p>
            </header>
            <IndustryCarousel
              cards={industryCards}
              labels={{ region: tIndustries('heading'), prev: tIndustries('prev'), next: tIndustries('next') }}
            />
          </div>
        </section>

        <section className='section section-rule' id='why' aria-labelledby='why-heading'>
          <div className='site-container'>
            <header className='section-head'>
              <h2 id='why-heading'>{tWhy('heading')}</h2>
              <p className='section-lead'>{tWhy('subheading')}</p>
            </header>
            <ul className='why-grid'>
              {reasons.map((reason, index) => (
                <li key={reason.title}>
                  <WhyIcon index={index} />
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className='section section-tint' id='capabilities' aria-labelledby='capabilities-heading'>
          <div className='site-container qual-layout'>
            <div className='qual-intro'>
              <h2 id='capabilities-heading'>{tQual('heading')}</h2>
              <p>{tQual('intro')}</p>
              <p className='qual-disclaimer'>{tQual('disclaimer')}</p>
            </div>
            <div className='qual-list'>
              {qualCategories.map((category, index) => {
                const open = Boolean(qualOpen[index]);
                const panelId = `qual-panel-${category.code}`;
                const buttonId = `qual-button-${category.code}`;
                return (
                  <div key={category.code} className={`qual-item${open ? ' is-open' : ''}`}>
                    <h3>
                      <button
                        id={buttonId}
                        type='button'
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setQualOpen((current) => ({ ...current, [index]: !current[index] }))}
                      >
                        <span className='qual-code'>{category.code}</span>
                        <span className='qual-title'>{category.title}</span>
                        <span className='toggle-mark' aria-hidden='true' />
                      </button>
                    </h3>
                    <div id={panelId} role='region' aria-labelledby={buttonId} className='qual-panel' hidden={!open}>
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
                );
              })}
            </div>
          </div>
        </section>

        <section className='section' id='experience' aria-labelledby='experience-heading'>
          <div className='site-container split split-media-first'>
            <div className='split-media experience-media'>
              <img src='/media/experience-fabrication.webp' alt={tExperience('imageAlt')} loading='lazy' decoding='async' width={1024} height={565} />
            </div>
            <div className='split-copy'>
              <h2 id='experience-heading'>{tExperience('heading')}</h2>
              <p>{tExperience('body1')}</p>
              <p>{tExperience('body2')}</p>
              <div className='experience-assignment'>
                <p className='eyebrow'>{tExperience('assignmentLabel')}</p>
                <h3>{tExperience('assignmentTitle')}</h3>
                <p>{tExperience('assignmentBody')}</p>
                <p className='fine-print'>{tExperience('assignmentHistory')}</p>
              </div>
              <p className='fine-print fine-print-ruled'>{tExperience('disclaimer')}</p>
            </div>
          </div>
        </section>

        <section className='section section-rule' id='how-we-work' aria-labelledby='how-heading'>
          <div className='site-container'>
            <header className='section-head'>
              <h2 id='how-heading'>{tWork('heading')}</h2>
            </header>
            <ol className='steps'>
              {steps.map((step) => (
                <li key={step.id}>
                  <span className='step-num'>{step.id}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className='section section-tint' id='digital-quality' aria-labelledby='digital-heading'>
          <div className='site-container split'>
            <div className='split-copy'>
              <h2 id='digital-heading'>{tDigital('heading')}</h2>
              <p>{tDigital('body1')}</p>
              <p>{tDigital('body2')}</p>
            </div>
            <div className='split-media digital-media'>
              <img src='/media/digital-inspection-records.webp' alt={tDigital('imageAlt')} loading='lazy' decoding='async' width={1280} height={720} />
            </div>
          </div>
        </section>

        <section className='section contact-section' id='contact' aria-labelledby='contact-heading'>
          <div className='site-container contact-layout'>
            <div className='contact-intro'>
              <h2 id='contact-heading'>{tContact('enquiryHeading')}</h2>
              <p>{tContact('enquiryIntro')}</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
