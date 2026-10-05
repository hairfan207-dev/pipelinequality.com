'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
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
  '/design/figma/industry-wind.png',
  '/design/figma/industry-pipeline.webp',
  '/client/industry-oilgas.jpg',
  '/client/industry-chemical.jpg',
  '/design/figma/industry-energy.webp',
  '/client/industry-epc.jpg',
  '/design/figma/industry-construction.webp',
  '/client/industry-maintenance.jpg',
];
const serviceOrder = [0, 2, 1, 3];
const processPhotos = [
  '/design/figma/handover-field.png',
  '/design/figma/handover-quality.png',
  '/design/figma/handover-project.png',
];
const networkPhotos = [
  { src: '/design/figma/team-inspectors.webp', role: 7, variant: 'bottom-fade', icon: '/design/figma/team-icon-inspectors.svg', shade: '/design/figma/team-caption-bottom.svg' },
  { src: '/design/figma/team-docs.webp', role: 9, variant: 'top-solid', icon: '/design/figma/team-icon-docs.svg', shade: '/design/figma/team-caption-top.svg' },
  { src: '/design/figma/team-dimensional.webp', role: 8, variant: 'bottom-solid', icon: '/design/figma/team-icon-dimensional.svg', shade: '/design/figma/team-caption-top.svg' },
  { src: '/design/figma/team-welding.webp', role: 5, variant: 'top-fade', icon: '/design/figma/team-icon-weld.svg', shade: '/design/figma/team-caption-weld.svg' },
];
const roleIcons = [
  '/design/figma/net-qm.svg',
  '/design/figma/net-auditors.svg',
  '/design/figma/net-third.svg',
  '/design/figma/net-leaders.svg',
  '/design/figma/net-qaqc.svg',
  '/design/figma/net-weld.svg',
  '/design/figma/net-ndt.svg',
  '/design/figma/net-inspectors.svg',
  '/design/figma/net-dimensional.svg',
  '/design/figma/net-docs.svg',
  '/design/figma/net-support.svg',
  '/design/figma/net-hse.svg',
];
const networkColumns = [
  [0, 1, 4, 5, 3, 2],
  [6, 7, 8, 9, 10, 11],
];
const pillarIcons = [
  '/design/figma/icon-experienced.svg',
  '/design/figma/icon-project.svg',
  '/design/figma/icon-quality.svg',
  '/design/figma/icon-coordinated.svg',
];
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
  '/design/figma/photo-welding.png',
  '/design/figma/photo-engineers.png',
  '/design/figma/photo-team.png',
];
const fieldIcons = [
  '/design/figma/handover-field-inspection.png',
  '/design/figma/handover-field-welding.png',
  '/design/figma/handover-field-ndt.png',
  '/design/figma/handover-field-dimensional.png',
  '/design/figma/handover-field-mtr.png',
];
const workPhotos = [
  '/design/figma/work-understand.webp',
  '/design/figma/work-match.webp',
  '/design/figma/work-execute.webp',
  '/design/figma/work-control.webp',
  '/design/figma/work-handover.webp',
];
const qualityIcons = [
  '/design/figma/handover-qc-inspection.png',
  '/design/figma/handover-qc-ncr.png',
  '/design/figma/handover-qc-traceability.png',
  '/design/figma/handover-qc-status.png',
  '/design/figma/handover-qc-approvals.png',
];
const projectIcons = [
  '/design/figma/handover-project-reports.png',
  '/design/figma/handover-project-mdr.png',
  '/design/figma/handover-project-handover.png',
  '/design/figma/handover-project-compliance.png',
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
  const tDigital = useTranslations('digitalQuality');
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
  const digitalBlocks = tDigital.raw('blocks') as Array<{ title: string; items: string[] }>;
  const digitalCopy = tSmart('description').split(/(?=Together,|Gemeinsam )/).filter(Boolean).map((part) => part.trim());
  const reasons = tWhy.raw('reasons') as Reason[];
  const faqs = tFaq.raw('items') as Faq[];

  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const [serviceOpen, setServiceOpen] = useState(0);
  const [industry, setIndustry] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [supportOpen, setSupportOpen] = useState(0);

  const switchLocale = (nextLocale: 'en' | 'de') => {
    setLangOpen(false);
    if (nextLocale === locale) return;
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=lax`;
    router.replace(pathname || '/', { locale: nextLocale });
    router.refresh();
  };

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
    <div className='pq-design' lang={locale}>
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
            {tNav('menu')}
          </button>
          <div className={`nav-links${menuOpen ? ' is-open' : ''}`}>
            <a href='#services' onClick={() => setMenuOpen(false)}>{tNav('services')}</a>
            <a href='#process' onClick={() => setMenuOpen(false)}>{tNav('process')}</a>
            <a href='#industries' onClick={() => setMenuOpen(false)}>{tNav('industries')}</a>
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
              <h3>
                {pillar.title.split(/(?= & )/).map((line, index) => (
                  <span key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='intro section'>
        <div className='intro-bg' aria-hidden='true'>
          <img src='/design/figma/qc-bg.png' alt='' />
        </div>
        <div className='shell center'>
          <p className='eyebrow'>{tIntro('label')}</p>
          <h2>
            {tIntro('headlineLine1')}
            <br />
            <span>{tIntro('headlineLine2')}</span>
          </h2>
          <p className='intro-copy'>{tIntro('paragraph1')}</p>
          <p className='intro-copy intro-copy-b'>{tIntro('paragraph2')}</p>
        </div>
      </section>

      <section className='services section' id='services'>
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
                          {block.items.slice(Math.ceil(block.items.length / 2)).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <ul>
                          {block.items.slice(0, Math.ceil(block.items.length / 2)).map((item) => (
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
              <img src={serviceCaptionIcons[Math.max(serviceOpen, 0)]} alt='' />
              {blocks[Math.max(serviceOpen, 0)]?.title}
            </div>
          </div>
        </div>
      </section>

      <section className='process section' id='process'>
        <div className='shell center'>
          <h2>
            {tField('designLine1')}
            <span>{tField('designLine2')}</span>
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
                  <div className='process-panel'>
                    {(index === 0 ? fieldIcons : index === 1 ? qualityIcons : projectIcons).map((src) => (
                      <img key={src} className='process-icon' src={src} alt='' />
                    ))}
                    <div className='process-labels'>
                      {stage.items.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                </article>
                {index < stages.length - 1 ? <div className='connector'><img src='/design/figma/handover-connector.svg' alt='' /></div> : null}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className='network section' id='network'>
        <div className='shell network-grid'>
          <div className='network-images'>
            {networkPhotos.map((photo) => {
              const label = roles[photo.role] ?? '';
                  const lines = locale === 'de'
                    ? [label]
                    : label.startsWith('Quality ')
                      ? ['Quality', label.slice('Quality '.length)]
                      : label.startsWith('Dimensional / ')
                        ? ['Dimensional', label.slice('Dimensional / '.length)]
                        : [label];
              return (
                <figure key={photo.src} className={photo.variant}>
                  <img className='shot' src={photo.src} alt={label} />
                  <img className='shade' src={photo.shade} alt='' />
                  <figcaption>
                    <img src={photo.icon} alt='' />
                    <span>
                      {lines.map((line, index) => (
                        <span key={line}>
                          {index > 0 ? <br /> : null}
                          {line}
                        </span>
                      ))}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
          <div className='network-copy'>
            <p className='eyebrow left'>{tServices('keyAreasTitle')}</p>
            <h2>
              <span className='net-line'>{tTeam('titleBefore')}</span>
              <span className='net-line'>
                <span className='complete'>{tTeam('titleAfter')}</span>
                <span>{tTeam('titleAccent')}</span>
              </span>
            </h2>
            <p className='lead'>{tTeam('paragraph1')}</p>
            <div className='network-list'>
              <h3>{tTeam('networkLabel')}</h3>
              <div className='cols'>
                {networkColumns.map((column) => (
                  <ul key={column.join('-')}>
                    {column.map((index) => (
                      <li key={roles[index]} className={index === 11 ? 'wrap' : undefined}>
                        <img src={roleIcons[index]} alt='' />
                        <span>{roles[index]}</span>
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
        <img src='/design/figma/competence-bg.png' className='competence-bg' alt='' />
        <div className='shell competence-inner'>
          <div className='competence-card'>
            <h2>
              <span className='line'>{tPhil('designLine1')}</span>
              <span className='line'>{tPhil('designLine2')}</span>
              <span className='line'>{tPhil('designLine3')}</span>
            </h2>
            <p>{tPhil('paragraph1')}</p>
            <p>{tPhil('paragraph2')}</p>
            <p className='note'>{tPhil('paragraph3')}</p>
          </div>
          <div className='quality-badge'>
            <span>{tPhil('badge1')}</span>
            <span>{tPhil('badge2')}</span>
            <span>{tPhil('badge3')}</span>
          </div>
        </div>
      </section>

      <section className='industries' id='industries'>
        <div className='industries-head'>
          <h2>
            {tInd('designLine1')}
            <br />
            <span>{tInd('designLine2')}</span>
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
                {sectors[index].title}
                <img src='/design/figma/industry-mark.svg' alt='' />
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
            <img className='exp-wind' src='/design/figma/exp-wind.png' alt={tExp('imageAlt')} />
            <div className='exp-pipes'>
              <img src='/design/figma/exp-pipes.jpg' alt={tExp('industrialTitle')} />
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

      <section className='standards section'>
        <h2>
            <span className='line'>{tStd('designLine1')}</span>
            <span className='line'>{tStd('designLine2')}</span>
        </h2>
        <div className='standard-grid'>
          {standardOrder.map((groupIndex, iconIndex) => {
            const group = groups[groupIndex];
            const [first, ...rest] = group.title.split(' ');
            const titleLines = group.title.includes(' & ')
              ? group.title.split(' & ').map((part, line) => (line === 0 ? part : `& ${part}`))
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

      <section className='workflow section' id='how-we-work'>
        <p className='eyebrow'>{tWork('label')}</p>
        <h2>{tWork('title')}</h2>
        <div className='workflow-grid'>
          {steps.map((step, index) => (
            <article key={step.id} className={index % 2 ? 'up' : 'down'}>
              <div className='wf-card'>
                <img src={workPhotos[index]} alt='' />
                <strong>{step.title}</strong>
              </div>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='digital section' id='bw-digit'>
        <div className='digital-grid'>
          <div>
            <h2>
            <span className='line'>{tSmart('designLine1')}</span>
            <span className='line'>{tSmart('designLine2')}</span>
            </h2>
            <a className='btn btn-orange' href='#contact'>{tSmart('cta')}</a>
            <div className='dig-photo dig-engineer'>
              <img src='/design/figma/dig-engineer.jpg' alt={tSmart('docsAlt')} />
            </div>
          </div>
          <div>
            <div className='dig-photo dig-quality'>
              <img src='/design/figma/dig-quality.png' alt={tSmart('fieldAlt')} />
            </div>
            {digitalCopy.map((part) => (
              <p key={part}>{part}</p>
            ))}
          </div>
        </div>
      </section>

      <section className='digital-support section'>
        <div className='support-panel'>
          <h2>
            <span className='line'>{tDigital('designLine1')}</span>
            <span className='line'>{tDigital('designLine2')}</span>
          </h2>
          <p>{tDigital('description')}</p>
        </div>
        <div className='support-list'>
          <p className='eyebrow'>{tDigital('label')}</p>
          {digitalBlocks.map((block, index) => (
            <div
              key={block.title}
              className={supportOpen === index ? 'support-row active' : 'support-row'}
              onMouseEnter={() => setSupportOpen(index)}
            >
              <h3>{block.title}</h3>
              <p>{`${block.items.slice(0, -1).join(' ')}, ${block.items[block.items.length - 1]}`}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='partners section' id='partners'>
        <p className='eyebrow'>{tPartners('label')}</p>
        <h2>
            <span className='line'>{tPartners('designLine1')}</span>
            <span className='line'>{tPartners('designLine2')}</span>
        </h2>
        <p className='partners-lead'>{tPartners('paragraph1')}</p>
        <p className='partners-note'>{tPartners('paragraph2')}</p>
        <a className='btn btn-orange' href='#contact'>{tPartners('cta')}</a>
      </section>

      <section className='why section'>
        <div className='why-layout'>
          <svg className='why-shape' viewBox='0 0 1650.1 625.42' preserveAspectRatio='none' aria-hidden='true'>
            <path fill='#F4F7F9' d='M824.85 20V252.14C824.85 257.444 822.743 262.531 818.992 266.281C815.241 270.032 810.154 272.14 804.85 272.14H20C14.6957 272.14 9.60859 274.246 5.85786 277.997C2.10714 281.748 0 286.835 0 292.14V605.42C0 610.724 2.10714 615.811 5.85786 619.562C9.60859 623.312 14.6957 625.42 20 625.42H1630.1C1635.4 625.42 1640.49 623.312 1644.24 619.562C1647.99 615.811 1650.1 610.724 1650.1 605.42V20C1650.1 14.6957 1647.99 9.60815 1644.24 5.85742C1640.49 2.10669 1635.4 0 1630.1 0H844.85C839.546 0 834.459 2.10669 830.708 5.85742C826.957 9.60815 824.85 14.6957 824.85 20Z' />
          </svg>
          <h2>
            <span className='line'>{tWhy('designLine1')}</span>
            <span className='line'>{tWhy('designLine2')} <span>{tWhy('designMark')}</span></span>
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

      <section className='faq section'>
          <h2>{tFaq('designBefore')}<span>{tFaq('designAccent')}</span></h2>
        <p className='faq-lead'>{tContact('description')}</p>
        <div className='faq-box'>
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className={`faq-item${faqOpen === index ? ' open' : ''}`}
              onMouseEnter={() => setFaqOpen(index)}
            >
              <button type='button' onClick={() => setFaqOpen(faqOpen === index ? null : index)}>
                {faq.question}
              </button>
              {index < faqs.length - 1 ? <img className='faq-divider' src='/design/figma/faq-divider.svg' alt='' /> : null}
              <p>{faq.answer}</p>
            </div>
          ))}
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
