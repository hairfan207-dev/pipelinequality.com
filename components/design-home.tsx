'use client';

import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ContactForm } from '@/components/contact-form';
import { SiteFooter } from '@/components/footer';
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '@/components/icons';
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

const DESKTOP_QUERY = '(min-width: 1101px)';

type Photo = { src: string; width: number; height: number; pos?: string; posSmall?: string; crop?: string };

const photoStyle = (photo: Photo) =>
  ({
    '--media-pos': photo.pos,
    '--media-pos-sm': photo.posSmall,
    '--media-crop': photo.crop,
  }) as CSSProperties;

const industryPhotos: Photo[] = [
  { src: '/media/industry-offshore-wind.webp', width: 1024, height: 474, pos: '96% 42%' },
  { src: '/media/industry-pipelines.webp', width: 1152, height: 864, pos: '50% 42%' },
  { src: '/media/industry-oil-gas.webp', width: 1280, height: 720, pos: '38% 48%' },
  { src: '/media/industry-refineries.webp', width: 1152, height: 864, pos: '48% 40%' },
  { src: '/media/industry-energy.webp', width: 1024, height: 682, pos: '42% 45%' },
  { src: '/media/industry-manufacturing.webp', width: 1024, height: 473, pos: '72% 50%' },
  { src: '/media/industry-epc.webp', width: 864, height: 1152, pos: '50% 38%' },
  { src: '/media/industry-maintenance.webp', width: 1024, height: 764, pos: '58% 42%' },
];
const expertisePhotos: Photo[] = [
  { src: '/media/service-qaqc.webp', width: 1024, height: 1024, pos: '50% 48%', posSmall: '50% 42%' },
  { src: '/media/service-inspection.webp', width: 1024, height: 768, pos: '78% 48%', posSmall: '50% 58%' },
  { src: '/media/service-ndt.webp', width: 639, height: 737, pos: '50% 58%', posSmall: '50% 42%', crop: '2%' },
  { src: '/media/service-welding.webp', width: 1024, height: 1024, pos: '48% 52%', posSmall: '50% 52%' },
  { src: '/media/service-documentation.webp', width: 1024, height: 438, pos: '62% 48%', posSmall: '60% 50%' },
  { src: '/media/service-hse.webp', width: 1024, height: 764, pos: '40% 46%', posSmall: '50% 38%' },
];
const experiencePhoto: Photo = {
  src: '/media/experience-fabrication.webp',
  width: 1024,
  height: 565,
  pos: '52% 48%',
  crop: '1.5%',
};
const digitalPhoto: Photo = {
  src: '/media/digital-inspection-records.webp',
  width: 1280,
  height: 720,
  pos: '28% 48%',
};

function EditorialMedia({
  variant,
  className,
  index,
  indexKey,
  label,
  caption,
  parallax = false,
  revealProps,
  children,
}: {
  variant: 'expertise' | 'industry' | 'experience' | 'digital' | 'compact';
  className?: string;
  index?: string;
  indexKey?: string | number;
  label?: string;
  caption?: string;
  parallax?: boolean;
  revealProps?: { 'data-reveal': string; style: CSSProperties };
  children: ReactNode;
}) {
  return (
    <figure
      className={['pq-media', `pq-media--${variant}`, parallax ? 'pq-media--parallax' : '', className].filter(Boolean).join(' ')}
      {...revealProps}
    >
      {index ? (
        <span className='pq-media__index' aria-hidden='true' key={indexKey}>
          <b>{index}</b>
          {label ? <i>{label}</i> : null}
        </span>
      ) : null}
      <div className='pq-media__plane'>
        <span className='pq-media__accent' aria-hidden='true' key={indexKey} />
        <div className='pq-media__clip'>{children}</div>
      </div>
      {caption ? <figcaption className='pq-media__meta'>{caption}</figcaption> : null}
    </figure>
  );
}

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const reveal = (index = 0, variant = 'up') => ({
  'data-reveal': variant,
  style: { '--i': index } as CSSProperties,
});

const pad = (n: number) => String(n).padStart(2, '0');

function useScrollReveal(rootRef: RefObject<HTMLElement | null>, locale: string) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-revealed'));
      return;
    }
    root.classList.add('reveal-ready');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [rootRef, locale]);
}

function useMediaParallax(rootRef: RefObject<HTMLElement | null>, locale: string) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const images = Array.from(root.querySelectorAll<HTMLElement>('.pq-media--parallax .pq-media__image'));
    const heroShift = root.querySelector<HTMLElement>('.hero-backdrop-shift');
    const hero = root.querySelector<HTMLElement>('.hero');
    let frame = 0;
    const clear = () => {
      images.forEach((image) => image.style.removeProperty('--media-shift'));
      heroShift?.style.removeProperty('transform');
    };
    const update = () => {
      if (motion.matches || !desktop.matches) {
        clear();
        return;
      }
      images.forEach((image) => {
        const clip = image.closest('.pq-media__clip');
        if (!clip) return;
        const box = clip.getBoundingClientRect();
        const mid = box.top + box.height / 2 - window.innerHeight / 2;
        const shift = Math.max(-16, Math.min(16, (mid / window.innerHeight) * -18));
        image.style.setProperty('--media-shift', `${shift.toFixed(1)}px`);
      });
      if (hero && heroShift) {
        const distance = Math.min(Math.max(-hero.getBoundingClientRect().top, 0), hero.offsetHeight * 0.3);
        const shift = (distance / (hero.offsetHeight * 0.3)) * 22;
        heroShift.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    motion.addEventListener('change', onScroll);
    desktop.addEventListener('change', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      clear();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      motion.removeEventListener('change', onScroll);
      desktop.removeEventListener('change', onScroll);
    };
  }, [rootRef, locale]);
}

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

function CapabilityList({ items }: { items: string[] }) {
  return (
    <ul className='svc-list'>
      {items.map((item) => (
        <li key={item}>
          <CheckIcon className='svc-check' />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ServiceExplorer({
  cards,
  showAll,
  showFewer,
  sectionLabel,
}: {
  cards: ExpertiseCard[];
  showAll: string;
  showFewer: string;
  sectionLabel: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [moreOpen, setMoreOpen] = useState<Record<number, boolean>>({});
  const [marker, setMarker] = useState<{ y: number; h: number } | null>(null);
  const [stage, setStage] = useState({ current: 0, previous: -1 });
  const rootRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const hoverTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const sync = () => {
      setIsDesktop(query.matches);
      if (query.matches) setActive((current) => current ?? 0);
    };
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        expertisePhotos.forEach((photo) => {
          const image = new Image();
          image.src = photo.src;
        });
        observer.disconnect();
      },
      { rootMargin: '600px 0px' },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const updateMarker = useCallback(() => {
    const tab = active !== null ? tabRefs.current[active] : null;
    const rail = railRef.current;
    if (!isDesktop || !tab || !rail) {
      setMarker(null);
      return;
    }
    const tabRect = tab.getBoundingClientRect();
    const railRect = rail.getBoundingClientRect();
    setMarker({ y: tabRect.top - railRect.top, h: tabRect.height });
  }, [active, isDesktop]);

  useEffect(() => {
    updateMarker();
    const root = rootRef.current;
    if (!root || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(updateMarker);
    observer.observe(root);
    return () => observer.disconnect();
  }, [updateMarker]);

  useEffect(() => {
    if (active === null) return;
    setStage((current) =>
      current.current === active ? current : { current: active, previous: current.current },
    );
  }, [active]);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const select = (index: number) => {
    window.clearTimeout(hoverTimer.current);
    if (isDesktop) {
      setActive(index);
      return;
    }
    setActive((current) => (current === index ? null : index));
    window.setTimeout(() => {
      const tab = tabRefs.current[index];
      if (!tab) return;
      const header = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0;
      if (tab.getBoundingClientRect().top < header) {
        tab.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
    }, 460);
  };

  const preview = (index: number) => {
    if (!isDesktop) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setActive(index), 110);
  };

  const cancelPreview = () => window.clearTimeout(hoverTimer.current);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = cards.length - 1;
    let next: number | null = null;
    if (event.key === 'ArrowDown') next = index === last ? 0 : index + 1;
    if (event.key === 'ArrowUp') next = index === 0 ? last : index - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;
    if (next === null) return;
    event.preventDefault();
    tabRefs.current[next]?.focus();
  };

  return (
    <div ref={rootRef} className={`svc${active !== null ? ' has-active' : ''}`} onMouseLeave={cancelPreview}>
      <div ref={railRef} className='svc-rail' aria-hidden='true'>
        <span
          className={`svc-marker${marker ? ' is-visible' : ''}`}
          style={marker ? { transform: `translateY(${marker.y}px)`, height: marker.h } : undefined}
        />
      </div>
      {cards.map((card, index) => {
        const open = active === index;
        const visible = card.capabilities.slice(0, 4);
        const hidden = card.capabilities.slice(4);
        const more = Boolean(moreOpen[index]);
        const tabId = `svc-tab-${index}`;
        const panelId = `svc-panel-${index}`;
        const moreId = `svc-more-${index}`;
        return (
          <Fragment key={card.title}>
            <h3 className='svc-head' style={{ '--row': index + 1 } as CSSProperties}>
              <button
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={tabId}
                type='button'
                className={`svc-tab${open ? ' is-active' : ''}${index === 0 ? ' is-default' : ''}`}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => select(index)}
                onMouseEnter={() => preview(index)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                <span className='svc-num'>{pad(index + 1)}</span>
                <span className='svc-title'>{card.title}</span>
                <span className='toggle-mark' aria-hidden='true' />
              </button>
            </h3>
            <div
              id={panelId}
              role='region'
              aria-labelledby={tabId}
              className={`svc-panel${open ? ' is-open' : ''}${index === 0 ? ' is-default' : ''}`}
            >
              <div className='svc-panel-clip'>
                <div className='svc-panel-body'>
                  <div className='svc-content'>
                    <p className='svc-panel-num' aria-hidden='true'>{pad(index + 1)}</p>
                    <p className='svc-panel-title' aria-hidden='true'>{card.title}</p>
                    <p className='svc-desc'>{card.description}</p>
                    {card.note ? <p className='svc-note'>{card.note}</p> : null}
                    <p className='svc-label'>{card.capabilitiesLabel}</p>
                    <CapabilityList items={visible} />
                    {hidden.length > 0 ? (
                      <>
                        <div id={moreId} className={`collapse${more ? ' is-open' : ''}`}>
                          <div className='collapse-clip'>
                            <CapabilityList items={hidden} />
                          </div>
                        </div>
                        <button
                          type='button'
                          className='text-action'
                          aria-expanded={more}
                          aria-controls={moreId}
                          onClick={() => setMoreOpen((current) => ({ ...current, [index]: !current[index] }))}
                        >
                          <span>{more ? showFewer : showAll}</span>
                          <ArrowDownIcon className='text-action-icon' />
                        </button>
                      </>
                    ) : null}
                  </div>
                  <EditorialMedia variant='compact' className='svc-media'>
                    <img
                      className='pq-media__image'
                      src={expertisePhotos[index].src}
                      alt={card.imageAlt}
                      loading='lazy'
                      decoding='async'
                      width={expertisePhotos[index].width}
                      height={expertisePhotos[index].height}
                      style={photoStyle(expertisePhotos[index])}
                    />
                  </EditorialMedia>
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
      <EditorialMedia
        variant='expertise'
        className='svc-stage'
        index={pad(stage.current + 1)}
        indexKey={stage.current}
        label={sectionLabel}
        caption={cards[stage.current]?.title}
        revealProps={reveal(0, 'media')}
      >
        {expertisePhotos.map((photo, index) => {
          const current = index === stage.current;
          return (
            <img
              key={photo.src}
              src={photo.src}
              alt={current ? cards[index]?.imageAlt ?? '' : ''}
              aria-hidden={current ? undefined : true}
              className={`pq-media__image${current ? ' is-current' : index === stage.previous ? ' is-leaving' : ''}`}
              loading='lazy'
              decoding='async'
              width={photo.width}
              height={photo.height}
              style={photoStyle(photo)}
            />
          );
        })}
      </EditorialMedia>
    </div>
  );
}

function IndustryCarousel({ cards, labels }: { cards: IndustryCard[]; labels: { region: string; prev: string; next: string } }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({ atStart: true, atEnd: false, size: 0.4, offset: 0 });

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = Math.max(track.scrollWidth - track.clientWidth, 0);
    const size = track.scrollWidth ? Math.min(track.clientWidth / track.scrollWidth, 1) : 1;
    const progress = max ? track.scrollLeft / max : 0;
    setState({
      atStart: track.scrollLeft <= 4,
      atEnd: track.scrollLeft >= max - 4,
      size,
      offset: size < 1 ? (progress * (1 - size)) / size : 0,
    });
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
      <ul id='industry-track' className='industry-track' ref={trackRef} tabIndex={0} aria-label={labels.region} onKeyDown={onKeyDown}>
        {cards.map((card, index) => (
          <li key={card.title} className='industry-item' aria-roledescription='slide' aria-label={`${index + 1} / ${cards.length}`}>
            <EditorialMedia variant='industry' className='industry-media'>
              <img
                className='pq-media__image'
                src={industryPhotos[index].src}
                alt={card.imageAlt}
                loading='lazy'
                decoding='async'
                width={industryPhotos[index].width}
                height={industryPhotos[index].height}
                style={photoStyle(industryPhotos[index])}
              />
            </EditorialMedia>
            <div className='industry-body'>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className='industry-controls'>
        <div className='industry-progress' aria-hidden='true'>
          <span style={{ width: `${state.size * 100}%`, transform: `translateX(${state.offset * 100}%)` }} />
        </div>
        <div className='industry-arrows'>
          <button type='button' className='industry-arrow is-prev' aria-label={labels.prev} aria-controls='industry-track' disabled={state.atStart} onClick={() => step(-1)}>
            <ArrowLeftIcon />
          </button>
          <button type='button' className='industry-arrow is-next' aria-label={labels.next} aria-controls='industry-track' disabled={state.atEnd} onClick={() => step(1)}>
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export function DesignHome() {
  const tHero = useTranslations('hero');
  const tNav = useTranslations('nav');
  const tExpertise = useTranslations('expertiseSection');
  const tIndustries = useTranslations('industriesSection');
  const tExperience = useTranslations('experienceSection');
  const tQual = useTranslations('qualificationsSection');
  const tWork = useTranslations('howSection');
  const tDigital = useTranslations('digitalSection');
  const tWhy = useTranslations('whySection');
  const tContact = useTranslations('contact');
  const locale = useLocale();
  const rootRef = useRef<HTMLDivElement>(null);

  const expertiseCards = tExpertise.raw('cards') as ExpertiseCard[];
  const industryCards = tIndustries.raw('cards') as IndustryCard[];
  const qualCategories = tQual.raw('categories') as QualCategory[];
  const steps = tWork.raw('steps') as Step[];
  const reasons = tWhy.raw('reasons') as Reason[];

  const [qualOpen, setQualOpen] = useState<Record<number, boolean>>({});

  useScrollReveal(rootRef, locale);
  useMediaParallax(rootRef, locale);

  return (
    <div ref={rootRef} className='pq-site' lang={locale} id='top'>
      <SiteHeader />
      <main>
        <section className='hero'>
          <div className='hero-backdrop'>
            <div className='hero-backdrop-shift'>
              <img src='/media/hero-monopile.webp' alt={tHero('imageAlt')} width={737} height={696} fetchPriority='high' decoding='async' />
            </div>
          </div>
          <div className='site-container hero-inner'>
            <div className='hero-copy'>
              <p className='hero-kicker'>{tHero('tagline')}</p>
              <h1>{tHero('headline').replace(/ \|/g, '\u00a0|')}</h1>
              <p className='hero-subtitle'>{tHero('subheading')}</p>
              <p className='hero-body'>{tHero('body')}</p>
              <div className='hero-meta'>
                <p>{tHero('serviceLine')}</p>
                <p>{tHero('industryLine')}</p>
              </div>
              <div className='hero-actions'>
                <a className='site-btn site-btn-primary' href='#contact'>
                  <span>{tHero('cta1')}</span>
                  <ArrowRightIcon className='site-btn-icon' />
                </a>
                <a className='site-btn site-btn-secondary' href='#contact'>
                  <span>{tHero('cta2')}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className='section section-rule' id='services' aria-labelledby='services-heading'>
          <span id='expertise' className='section-anchor' aria-hidden='true' />
          <div className='site-container'>
            <header className='section-head'>
              <h2 id='services-heading' {...reveal(0)}>{tExpertise('heading')}</h2>
              <p {...reveal(1)}>{tExpertise('intro')}</p>
            </header>
            <div {...reveal(2)}>
              <ServiceExplorer
                cards={expertiseCards}
                showAll={tExpertise('showAll')}
                showFewer={tExpertise('showFewer')}
                sectionLabel={tExpertise('heading')}
              />
            </div>
          </div>
        </section>

        <section className='section section-tint' id='industries' aria-labelledby='industries-heading'>
          <div className='site-container'>
            <header className='section-head'>
              <h2 id='industries-heading' {...reveal(0)}>{tIndustries('heading')}</h2>
              <p {...reveal(1)}>{tIndustries('intro')}</p>
            </header>
            <div {...reveal(2)}>
              <IndustryCarousel
                cards={industryCards}
                labels={{ region: tIndustries('heading'), prev: tIndustries('prev'), next: tIndustries('next') }}
              />
            </div>
          </div>
        </section>

        <section className='section' id='why' aria-labelledby='why-heading'>
          <div className='site-container'>
            <header className='section-head'>
              <h2 id='why-heading' {...reveal(0)}>{tWhy('heading')}</h2>
              <p className='section-lead' {...reveal(1)}>{tWhy('subheading')}</p>
            </header>
            <ul className='why-grid'>
              {reasons.map((reason, index) => (
                <li key={index} className='why-item' {...reveal(index)}>
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
              <h2 id='capabilities-heading' {...reveal(0)}>{tQual('heading')}</h2>
              <p {...reveal(1)}>{tQual('intro')}</p>
              <p className='qual-disclaimer' {...reveal(2)}>{tQual('disclaimer')}</p>
            </div>
            <div className='qual-list' {...reveal(1)}>
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
                    <div id={panelId} role='region' aria-labelledby={buttonId} className={`collapse qual-panel${open ? ' is-open' : ''}`}>
                      <div className='collapse-clip'>
                        <div className='qual-panel-body'>
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
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className='section' id='experience' aria-labelledby='experience-heading'>
          <div className='site-container experience-layout'>
            <EditorialMedia
              variant='experience'
              className='experience-media'
              index='02'
              label={tNav('experience')}
              caption={tExperience('assignmentTitle')}
              parallax
              revealProps={reveal(0, 'media')}
            >
              <img
                className='pq-media__image'
                src={experiencePhoto.src}
                alt={tExperience('imageAlt')}
                loading='lazy'
                decoding='async'
                width={experiencePhoto.width}
                height={experiencePhoto.height}
                style={photoStyle(experiencePhoto)}
              />
            </EditorialMedia>
            <div className='split-copy experience-copy'>
              <h2 id='experience-heading' {...reveal(0)}>{tExperience('heading')}</h2>
              <p {...reveal(1)}>{tExperience('body1')}</p>
              <p {...reveal(2)}>{tExperience('body2')}</p>
              <div className='experience-assignment' {...reveal(3)}>
                <p className='eyebrow'>{tExperience('assignmentLabel')}</p>
                <h3>{tExperience('assignmentTitle')}</h3>
                <p>{tExperience('assignmentBody')}</p>
                <p className='fine-print'>{tExperience('assignmentHistory')}</p>
              </div>
              <p className='fine-print fine-print-ruled' {...reveal(4)}>{tExperience('disclaimer')}</p>
            </div>
          </div>
        </section>

        <section className='section section-rule' id='how-we-work' aria-labelledby='how-heading'>
          <div className='site-container'>
            <header className='section-head'>
              <h2 id='how-heading' {...reveal(0)}>{tWork('heading')}</h2>
            </header>
            <ol className='steps' {...reveal(0, 'steps')}>
              {steps.map((step, index) => (
                <li key={step.id} style={{ '--i': index } as CSSProperties}>
                  <span className='step-num'>{step.id}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className='section section-tint' id='digital-quality' aria-labelledby='digital-heading'>
          <div className='site-container digital-layout'>
            <div className='split-copy digital-copy'>
              <h2 id='digital-heading' {...reveal(0)}>{tDigital('heading')}</h2>
              <p {...reveal(1)}>{tDigital('body1')}</p>
              <p {...reveal(2)}>{tDigital('body2')}</p>
            </div>
            <EditorialMedia
              variant='digital'
              className='digital-media'
              index='03'
              caption={tDigital('heading')}
              parallax
              revealProps={reveal(1, 'media')}
            >
              <img
                className='pq-media__image'
                src={digitalPhoto.src}
                alt={tDigital('imageAlt')}
                loading='lazy'
                decoding='async'
                width={digitalPhoto.width}
                height={digitalPhoto.height}
                style={photoStyle(digitalPhoto)}
              />
            </EditorialMedia>
          </div>
        </section>

        <section className='section contact-section' id='contact' aria-labelledby='contact-heading'>
          <div className='site-container contact-layout'>
            <div className='contact-intro'>
              <h2 id='contact-heading' {...reveal(0)}>{tContact('enquiryHeading')}</h2>
              <p {...reveal(1)}>{tContact('enquiryIntro')}</p>
            </div>
            <div {...reveal(1)}>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
