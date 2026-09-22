'use client';

import { useTranslations } from 'next-intl';
import { ContactForm } from './contact-form';


export function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section className='bg-white py-10 md:py-16 lg:py-20' id='contact'>
      <div className='max-w-[1352px] mx-auto px-4 md:px-12 lg:px-20'>
        {/* Header */}
        <div className='text-center mb-10'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-4'>
            {t('title')}
          </h2>
          <p className='text-lg text-charcoal max-w-2xl mx-auto leading-relaxed'>
            {t('description')}
          </p>
        </div>

        {/* Contact Form - Full Width */}
        <div className='max-w-3xl mx-auto'>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
