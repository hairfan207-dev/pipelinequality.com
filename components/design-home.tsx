'use client';

import { Fragment, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { ContactForm } from '@/components/contact-form';

type Block = { title: string; items: string[] };
type Stage = { id: string; title: string; items: string[] };
type Industry = { title: string; items: string[] };
type Step = { id: string; title: string; text: string };
type Reason = { title: string; description: string };
type Faq = { question: string; answer: string };

const industryOrder = [2, 0, 4, 1, 5, 3, 7, 6];
const industryPhotos = [
  '/design/figma/photo-climber.png',
  '/design/figma/photo-pipes.jpg',
  '/client/industry-oilgas.jpg',
  '/client/industry-chemical.jpg',
  '/design/figma/photo-sunset.png',
  '/client/industry-epc.jpg',
  '/design/figma/photo-helmet.png',
  '/client/industry-maintenance.jpg',
];
const serviceOrder = [0, 2, 1, 3];
const processPhotos = [
  '/design/figma/photo-welding.png',
  '/design/figma/photo-clipboard.png',
  '/design/figma/photo-team.png',
];
const networkPhotos = [
  { src: '/design/figma/photo-team.png', role: 7 },
  { src: '/design/figma/photo-review.png', role: 9 },
  { src: '/design/figma/photo-engineers.png', role: 8 },
  { src: '/design/figma/photo-weld-close.png', role: 5 },
];
const roleIcons = [
  '/design/figma/role-person.png',
  '/design/figma/role-checklist.png',
  '/design/figma/role-nodes.png',
  '/design/figma/role-group.png',
  '/design/figma/role-gear.png',
  '/design/figma/role-doc.png',
  '/design/figma/role-pulse.png',
  '/design/figma/role-search.png',
  '/design/figma/role-ruler.png',
  '/design/figma/role-doc.png',
  '/design/figma/role-headset.png',
  '/design/figma/role-badge.png',
];
const networkColumns = [
  [0, 1, 4, 5, 3, 2],
  [6, 7, 8, 9, 10, 11],
];
const pillarIcons = [
  '/design/figma/icon-experienced.png',
  '/design/figma/icon-project.png',
  '/design/figma/icon-quality.png',
  '/design/figma/icon-coordinated.png',
];
const serviceIcons = [
  '/design/figma/svc-qaqc.png',
  '/design/figma/svc-inspect.png',
  '/design/figma/svc-docs.png',
  '/design/figma/svc-project.png',
];
const servicePhotos = [
  '/design/figma/photo-qaqc.png',
  '/design/figma/photo-welding.png',
  '/design/figma/photo-engineers.png',
  '/design/figma/photo-team.png',
];
const processStrips = [
  '/design/figma/strip-field.png',
  '/design/figma/strip-quality.png',
  '/design/figma/strip-project.png',
];
const standardIcons = [
  '/design/figma/std-hardhat.png',
  '/design/figma/std-search-orange.png',
  '/design/figma/std-mask.png',
  '/design/figma/std-wind.png',
  '/design/figma/std-gauge.png',
  '/design/figma/std-drop.png',
  '/design/figma/std-page.png',
];
const workflowPhotos = [
  '/design/figma/photo-drawing.png',
  '/design/figma/photo-clipboard.png',
  '/design/figma/photo-engineers.png',
  '/design/figma/photo-review.png',
  '/design/figma/photo-qaqc.png',
];

export function DesignHome() {
  const tHero = useTranslations('hero');
  const tIntro = useTranslations('intro');
  const tServices = useTranslations('services');
  const tField = useTranslations('fieldHandover');
  const tTeam = useTranslations('team');
  const tPhil = useTranslations('philosophy');
  const tInd = useTranslations('industries');
  const tExp = useTranslations('experience');
  const tStd = useTranslations('standards');
  const tWork = useTranslations('workProcess');
  const tSmart = useTranslations('smartQAQC');
  const tPartners = useTranslations('partners');
  const tWhy = useTranslations('why');
  const tFaq = useTranslations('faq');
  const tContact = useTranslations('contact');
  const tFooter = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const pillars = tHero.raw('pillars') as Array<{ title: string; text: string }>;
  const blocks = tServices.raw('blocks') as Block[];
  const stages = tField.raw('stages') as Stage[];
  const roles = tTeam.raw('roles') as string[];
  const sectors = tInd.raw('sectors') as Industry[];
  const groups = tStd.raw('groups') as Array<{ title: string; items: string[] }>;
  const steps = tWork.raw('steps') as Step[];
  const reasons = tWhy.raw('reasons') as Reason[];
  const faqs = tFaq.raw('items') as Faq[];

  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(0);
  const [industry, setIndustry] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const switchLocale = (nextLocale: 'en' | 'de') => {
    if (nextLocale === locale) return;
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=lax`;
    router.replace(pathname || '/', { locale: nextLocale });
    router.refresh();
  };

  const activeIndustry = sectors[industry];

  return (
    <div className='pq-design'>
      <header className='hero' id='top'>
        <img className='hero-bg' src='/design/figma/hero.png' alt={tHero('imageAlt')} />
        <div className='hero-overlay' />
        <nav className='nav shell'>
          <a href='#top' className='brand' aria-label='Pipeline Quality home'>
            <img className='brand-logo' src='/logo-mark-white.png' alt='' />
            <span className='brand-copy'>
              <b>PIPELINE</b>
              <em>QUALITY</em>
            </span>
          </a>
          <button type='button' className='menu-btn' onClick={() => setMenuOpen((v) => !v)}>
            MENU
          </button>
          <div className={`nav-links${menuOpen ? ' is-open' : ''}`}>
            <a href='#services' onClick={() => setMenuOpen(false)}>{tNav('services')}</a>
            <a href='#process' onClick={() => setMenuOpen(false)}>{tNav('process')}</a>
            <a href='#industries' onClick={() => setMenuOpen(false)}>{tNav('industries')}</a>
            <a href='#experience' onClick={() => setMenuOpen(false)}>{tNav('experience')}</a>
            <a href='#contact' onClick={() => setMenuOpen(false)}>{tNav('contact')}</a>
            <button type='button' className='lang-btn' onClick={() => switchLocale(locale === 'en' ? 'de' : 'en')}>
              {locale === 'en' ? 'ENGLISH +' : 'DEUTSCH +'}
            </button>
          </div>
        </nav>
        <div className='hero-copy shell'>
          <h1>{tHero('brand')}</h1>
          <h2>{tHero('heroLine2')}</h2>
          <p className='hero-line'>
            {tHero('subtitle').split('|').map((part, i, arr) => (
              <span key={part}>
                {part.trim()}
                {i < arr.length - 1 ? <i> | </i> : null}
              </span>
            ))}
            <br />
            {tHero('subtitleLine2').split('|').map((part, i, arr) => (
              <span key={part}>
                {part.trim()}
                {i < arr.length - 1 ? <i> | </i> : null}
              </span>
            ))}
          </p>
          <div className='hero-actions'>
            <a className='btn btn-orange' href='#contact'>{tHero('cta1')}</a>
            <a className='btn btn-navy' href='#network'>{tHero('cta2')}</a>
          </div>
        </div>
      </header>

      <section className='promise-strip'>
        <div className='shell promise-grid'>
          {pillars.map((pillar, index) => (
            <article key={pillar.title}>
              <div className='round-icon' aria-hidden='true'><img src={pillarIcons[index]} alt='' /></div>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='intro section'>
        <div className='intro-bg' />
        <div className='shell narrow center'>
          <p className='eyebrow'>{tIntro('label')}</p>
          <h2>
            {tIntro('headlineLine1')}
            <br />
            <span>{tIntro('headlineLine2')}</span>
          </h2>
          <p>{tIntro('paragraph1')}</p>
          <p>{tIntro('paragraph2')}</p>
        </div>
      </section>

      <section className='services section' id='services'>
        <div className='shell two-col services-grid'>
          <div>
            <p className='eyebrow left'>{tServices('keyAreasTitle')}</p>
            <h2>
              {tServices('designTitle')}
              <br />
              <span>{tServices('designTitleAccent')}</span>
            </h2>
            <p className='lead'>{tServices('designLead')}</p>
            <div className='accordion service-accordion'>
              {serviceOrder.map((index) => {
                const block = blocks[index];
                const open = serviceOpen === index;
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
                      onClick={() => {
                        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
                        setServiceOpen(open ? -1 : index);
                      }}
                    >
                      <span className='acc-icon'><img src={serviceIcons[index]} alt='' /></span>
                      {block.title} <b className='acc-chevron' aria-hidden='true'>›</b>
                    </button>
                    <div className='acc-panel'>
                      <div className='acc-panel-inner'>
                        <ul>
                          {block.items.slice(0, Math.ceil(block.items.length / 2)).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <ul>
                          {block.items.slice(Math.ceil(block.items.length / 2)).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='feature-image'>
            <img key={serviceOpen} src={servicePhotos[Math.max(serviceOpen, 0)]} alt={blocks[Math.max(serviceOpen, 0)]?.title ?? ''} />
            <div className='image-caption' key={`cap-${serviceOpen}`}>
              <span><img src={serviceIcons[Math.max(serviceOpen, 0)]} alt='' /></span>
              {blocks[Math.max(serviceOpen, 0)]?.title}
            </div>
          </div>
        </div>
      </section>

      <section className='process section' id='process'>
        <div className='shell center'>
          <p className='eyebrow'>{tField('label')}</p>
          <h2>
            From Field Data to
            <br />
            <span>Final Handover</span>
          </h2>
          <p className='lead centered'>{tField('lead')}</p>
          <div className='process-cards'>
            {stages.map((stage, index) => (
              <Fragment key={stage.id}>
                <article className='process-card'>
                  <div className='pic'>
                    <img src={processPhotos[index]} alt={stage.title} />
                    <strong>{stage.title}</strong>
                  </div>
                  <img className='process-strip' src={processStrips[index]} alt='' />
                </article>
                {index < stages.length - 1 ? <div className='connector'><img src='/design/figma/connector.png' alt='' /></div> : null}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className='network section' id='network'>
        <div className='shell network-grid'>
          <div className='network-images'>
            {networkPhotos.map((photo) => (
              <figure key={photo.src}>
                <img src={photo.src} alt={roles[photo.role]} />
                <figcaption>
                  <img src={roleIcons[photo.role]} alt='' />
                  {roles[photo.role]}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className='network-copy'>
            <p className='eyebrow left'>{tServices('keyAreasTitle')}</p>
            <h2>
              {tTeam('titleBefore')}
              <br />
              {tTeam('titleAfter')}
              <span>{tTeam('titleAccent')}</span>
            </h2>
            <p className='lead'>{tTeam('paragraph1')}</p>
            <div className='network-list'>
              <h3>{tTeam('networkLabel')}</h3>
              <div className='cols'>
                {networkColumns.map((column) => (
                  <ul key={column.join('-')}>
                    {column.map((index) => (
                      <li key={roles[index]}>
                        <img src={roleIcons[index]} alt='' />
                        {roles[index]}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='competence'>
        <img src='/design/figma/photo-yard.png' className='competence-bg' alt='' />
        <div className='competence-shade' />
        <div className='shell competence-inner'>
          <div className='competence-card'>
            <h2>
              We Choose
              <br />
              <span>Competence</span>
              <br />
              Over Headcount
            </h2>
            <p>{tPhil('paragraph1')}</p>
            <p>{tPhil('paragraph2')}</p>
            <p>{tPhil('paragraph3')}</p>
          </div>
          <div className='quality-badge'>
            QUALITY
            <br />
            BEFORE
            <br />
            QUANTITY
          </div>
        </div>
      </section>

      <section className='industries' id='industries'>
        <div className='industries-head'>
          <h2>
            Industries
            <br />
            <span>We Support</span>
          </h2>
        </div>
        <div className='shell industries-panel'>
          <div className='industry-tabs'>
            {industryOrder.map((index) => (
              <button
                key={sectors[index].title}
                type='button'
                className={industry === index ? 'active' : ''}
                onPointerEnter={(event) => {
                  if (event.pointerType === 'mouse') setIndustry(index);
                }}
                onClick={() => setIndustry(index)}
              >
                {sectors[index].title} <span>›</span>
              </button>
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

      <section className='experience section' id='experience'>
        <div className='shell experience-box'>
          <div className='experience-heading'>
            <h2>{tExp('title')}</h2>
          </div>
          <div className='experience-copy'>
            <p className='eyebrow left'>{tExp('label')}</p>
            <p>{tExp('summary1')}</p>
            <p>{tExp('summary2')}</p>
          </div>
          <img className='exp-a' src='/design/figma/photo-monopiles.png' alt={tExp('imageAlt')} />
          <img className='exp-b' src='/design/figma/photo-offshore.png' alt={tExp('offshoreTitle')} />
        </div>
      </section>

      <section className='standards section'>
        <div className='shell center'>
          <p className='eyebrow'>{tServices('keyAreasTitle')}</p>
          <h2>{tStd('title')}</h2>
          <div className='standard-grid'>
            {groups.map((group, index) => (
              <article key={group.title}>
                <div><img src={standardIcons[index]} alt='' /></div>
                <h3>{group.title}</h3>
                <p>
                  {group.items.map((item) => (
                    <span key={item}>
                      {item}
                      <br />
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='workflow section' id='how-we-work'>
        <div className='shell center'>
          <p className='eyebrow'>{tWork('label')}</p>
          <h2>{tWork('title')}</h2>
          <div className='workflow-grid'>
            {steps.map((step, index) => (
              <article key={step.id}>
                <div className='wf-img'>
                  <img src={workflowPhotos[index]} alt={step.title} />
                  <span>{step.title}</span>
                </div>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='digital section' id='bw-digit'>
        <div className='shell digital-grid'>
          <div>
            <h2>{tSmart('title')}</h2>
            <a className='btn btn-orange' href='#contact'>{tPartners('cta')}</a>
            <img src='/design/figma/photo-review.png' alt={tSmart('fieldAlt')} />
          </div>
          <div>
            <img src='/design/figma/photo-tablet.png' alt={tSmart('docsAlt')} />
            <p>{tSmart('description')}</p>
          </div>
        </div>
      </section>

      <section className='why section'>
        <div className='shell why-grid'>
          <h2>
            {tWhy('title').replace('?', '')}
            <span>?</span>
          </h2>
          <div className='why-box'>
            {[[0, 1], [4, 5], [2, 3]].map((group) => (
              <div key={group.join('-')}>
                {group.map((index) => (
                  <div key={reasons[index].title}>
                    <h3>{reasons[index].title}</h3>
                    <p>{reasons[index].description}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='faq section'>
        <div className='shell center'>
          <h2>{tFaq('title')}</h2>
          <div className='faq-box'>
            {faqs.map((faq, index) => (
              <div key={faq.question} className={`faq-item${faqOpen === index ? ' open' : ''}`}>
                <button type='button' onClick={() => setFaqOpen(faqOpen === index ? null : index)}>
                  {faq.question}
                  <b>⌄</b>
                </button>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='contact section' id='contact'>
        <div className='shell center contact-shell'>
          <h2>{tContact('title')}</h2>
          <p>{tContact('description')}</p>
          <ContactForm />
        </div>
      </section>

      <footer className='footer'>
        <div className='shell footer-grid'>
          <div>
            <a className='brand footer-brand' href='#top'>
              <img className='brand-logo' src='/logo-mark-white.png' alt='' />
              <span className='brand-copy'>
                <b>PIPELINE</b>
                <em>QUALITY</em>
              </span>
            </a>
            <p>{tFooter('description')}</p>
            <div className='footer-links'>
              <a href='#services'>{tNav('services')}</a> <i>·</i>{' '}
              <a href='#industries'>{tNav('industries')}</a> <i>·</i>{' '}
              <a href='#experience'>{tNav('experience')}</a> <i>·</i>{' '}
              <a href='#contact'>{tNav('contact')}</a>
            </div>
          </div>
          <div className='footer-right'>
            <p>
              {tFooter('location')} &nbsp; | &nbsp;
              <button type='button' className='lang-btn' onClick={() => switchLocale('en')}>EN</button>
              {' / '}
              <button type='button' className='lang-btn' onClick={() => switchLocale('de')}>DE</button>
            </p>
            <p>{tFooter('brandNote')}</p>
          </div>
        </div>
        <div className='shell footer-bottom'>
          <span>{tFooter('copyright')}</span>
          <div>
            <a href='/privacy'>{tFooter('privacyPolicy')}</a>
            {' · '}
            <a href={locale === 'de' ? '/agb' : '/terms'}>{tFooter('terms')}</a>
            {' · '}
            <a href={locale === 'de' ? '/impressum' : '/legal-notice'}>{tFooter('imprint')}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
