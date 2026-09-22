'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { DocumentationReviewModal } from './documentation-review-modal';
import { useState } from 'react';

export function HeroSection() {
  const t = useTranslations('hero');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section
        className='relative w-full min-h-0 flex flex-col justify-center overflow-hidden'
        id='home'
      >
        {/* Dark Background */}
        <div className='absolute inset-0 z-0 bg-neutral-950' />

        {/* Simplified Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-black/40 to-black/0 z-10' />

        {/* Content Container with Dynamic Padding */}
        {/* Content Container */}
        <div className='relative z-20 w-full flex justify-center'>
          <div className='w-full max-w-[1352px] px-4 md:px-12 lg:px-20 py-16 md:py-32 lg:py-40 flex flex-col'>
            <div className='space-y-3 md:space-y-4 max-w-full md:max-w-[600px] lg:max-w-[750px]'>
              {/* Tagline */}





              {/* Main Headline */}
              <h1
                className='text-white mt-10 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal leading-tight md:leading-[1.15] flex flex-col gap-1'
                style={{ fontFamily: 'Orelega One, serif' }}
              >
                <span className="block">{t('titleLine1')}</span>
                <span className='text-muted-gold block'>
                  {t('titleLine2')}
                </span>
                <span className="block">{t('titleLine3')}</span>
              </h1>

              {/* Subtitle */}
              <div
                className='opacity-75 text-white text-sm md:text-base lg:text-lg font-normal leading-relaxed mt-3'
                style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
              >
                {t('subtitle')}
              </div>

              {/* CTA Buttons */}
              <div className='flex flex-col sm:flex-row gap-3 mt-6'>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className='w-full sm:w-auto px-6 h-11 bg-muted-gold rounded-lg inline-flex justify-center items-center gap-2 hover:bg-muted-gold/90 transition-all duration-200'
                >
                  <span
                    className='text-white text-sm font-semibold'
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {t('cta1')}
                  </span>
                </button>
                <a href='#contact' className='w-full sm:w-auto'>
                  <button className='w-full px-6 h-11 bg-muted-gold rounded-lg inline-flex justify-center items-center gap-2 hover:bg-muted-gold/90 transition-all duration-200'>
                    <span
                      className='text-white text-sm font-semibold'
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {t('cta2')}
                    </span>
                  </button>
                </a>
              </div>

              {/* Trust Badge */}
              <div className='flex items-center gap-2.5 mt-6'>
                <div className='w-4 h-4 md:w-5 md:h-5 rounded-full bg-muted-gold/10 flex items-center justify-center flex-shrink-0'>
                  <Check className='w-2.5 h-2.5 md:w-3 md:h-3 text-muted-gold' strokeWidth={3} />
                </div>
                <div
                  className='opacity-70 text-white text-xs md:text-sm font-normal leading-relaxed'
                  style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
                >
                  {t('trustBadge')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Image Overlay */}
        <div className='absolute inset-0 z-0 pointer-events-none'>
          <img
            src='/heavy_steel.png'
            alt='Pipeline construction'
            className='w-full h-full object-cover opacity-20 transition-opacity duration-700'
          />
        </div>
      </section >

      {/* Documentation Review Modal */}
      <DocumentationReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}