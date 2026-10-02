'use client';

import { useTranslations } from 'next-intl';
import { ContactForm } from './contact-form';

export function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section className='border-t border-navy/15 bg-white' id='contact'>
      <div className='pq-shell pq-section'>
        <div className='mx-auto max-w-3xl text-center lg:max-w-4xl'>
          <h2 className='text-navy'>{t('title')}</h2>
          <p className='mt-4 text-[0.98rem] leading-relaxed text-navy/70'>
            {t('description')}
          </p>
        </div>

        <div className='mt-8 max-w-3xl border-t border-navy/15 pt-8 lg:max-w-5xl'>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
