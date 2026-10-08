'use client';

import { useState } from 'react';
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

function WhyIcon({ index }: { index: number }) {
  const props = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  if (index === 0) {
    return (
      <svg {...props}>
        <circle cx='12' cy='12' r='3' />
        <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.6.77 1.05 1.51 1.2H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg {...props}>
        <rect x='8' y='2' width='8' height='4' rx='1' />
        <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' />
        <path d='m9 14 2 2 4-4' />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg {...props}>
        <path d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z' />
        <path d='M14 2v4a2 2 0 0 0 2 2h4' />
        <path d='M8 13h8' />
        <path d='M8 17h8' />
      </svg>
    );
  }
  if (index === 3) {
    return (
      <svg {...props}>
        <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
        <circle cx='9' cy='7' r='4' />
        <path d='m16 11 2 2 4-4' />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
      <path d='M16 3.13a4 4 0 0 1 0 7.75' />
    </svg>
  );
}
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
function WorkIcon({ index }: { index: number }) {
  const props = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  if (index === 0) {
    return (
      <svg {...props}>
        <rect x='8' y='2' width='8' height='4' rx='1' />
        <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' />
        <path d='M8 11h.01' />
        <path d='M12 11h4' />
        <path d='M8 16h.01' />
        <path d='M12 16h4' />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg {...props}>
        <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
        <circle cx='9' cy='7' r='4' />
        <path d='m16 11 2 2 4-4' />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg {...props}>
        <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
        <circle cx='9' cy='7' r='4' />
        <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
        <path d='M16 3.13a4 4 0 0 1 0 7.75' />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d='M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z' />
      <path d='M4 22v-7' />
    </svg>
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
    <div className='pq-design' lang={locale}>
      <header className='hero' id='top'>
        <SiteHeader />
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

      <section className='why-final section' id='why'>
        <div className='shell why-final-head'>
          <h2>{tWhy('heading')}</h2>
          <p>{tWhy('subheading')}</p>
        </div>
        <div className='shell why-final-grid'>
          {reasons.map((reason, index) => (
            <article key={reason.title}>
              <WhyIcon index={index} />
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </article>
          ))}
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

      <section className='exp-final section' id='experience'>
        <div className='shell exp-final-copy'>
          <h2>{tExperience('heading')}</h2>
          <p>{tExperience('body1')}</p>
          <p>{tExperience('body2')}</p>
          <p className='exp-final-note'>{tExperience('disclaimer')}</p>
        </div>
        <div className='shell exp-final-visual'>
          <img src='/design/figma/exp-wind.webp' alt={tExperience('imageAlt')} />
        </div>
        <div className='shell exp-final-assignment'>
          <p className='exp-final-kicker'>{tExperience('assignmentLabel')}</p>
          <h3>{tExperience('assignmentTitle')}</h3>
          <p>{tExperience('assignmentBody')}</p>
          <p className='exp-final-note'>{tExperience('assignmentHistory')}</p>
        </div>
      </section>

      <section className='how-final section' id='how-we-work'>
        <div className='shell how-final-head'>
          <h2>{tWork('heading')}</h2>
        </div>
        <ol className='shell how-final-grid'>
          {steps.map((step, index) => (
            <li key={step.id}>
              <div className='how-final-meta'>
                <span className='how-final-num'>{step.id}</span>
                <WorkIcon index={index} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className='digital-final section' id='digital-quality'>
        <div className='shell digital-final-copy'>
          <h2>{tDigital('heading')}</h2>
          <p>{tDigital('body1')}</p>
          <p>{tDigital('body2')}</p>
        </div>
        <div className='shell digital-final-visual'>
          <img src='/design/figma/digital-tablet.webp' alt={tDigital('imageAlt')} />
        </div>
      </section>

      <section className='contact section' id='contact'>
        <div className='shell contact-final-head'>
          <h2>{tContact('enquiryHeading')}</h2>
          <p>{tContact('enquiryIntro')}</p>
        </div>
        <ContactForm />
      </section>

      <SiteFooter />
    </div>
  );
}
