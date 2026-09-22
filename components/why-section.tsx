"use client"

import { useTranslations } from 'next-intl'
import { Check } from 'lucide-react'

export function WhySection() {
  const t = useTranslations('why')
  const points = t.raw('points') as string[]

  return (
    <section className="bg-[#f8f9fa] py-10 md:py-16 lg:py-20" id="why">
      <div className="max-w-[1352px] mx-auto px-4 md:px-12 lg:px-20">
        <div className="text-center mb-10">
          <p className="text-steel uppercase tracking-wider text-sm font-medium mb-4">{t('label')}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-8 text-balance break-words hyphens-auto">
            {t('title')}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Bullet Points */}
          <ul className="space-y-4 mb-8">
            {points.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="text-muted-gold mt-1.5 w-4 h-4 flex-shrink-0" strokeWidth={3} />
                <span className="text-charcoal text-base sm:text-lg leading-relaxed break-words hyphens-auto">{point}</span>
              </li>
            ))}
          </ul>

          {/* Built On Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 px-4 sm:px-6 py-3 rounded-full bg-white border border-steel/20">
              <div className="w-2 h-2 rounded-full bg-muted-gold" />
              <p className="text-navy text-xs sm:text-sm font-semibold break-words">
                {t('builtOn')}
              </p>
            </div>
          </div>

          {/* Company Info */}
          <div className="text-center">
            <p className="text-charcoal text-base sm:text-lg leading-relaxed break-words hyphens-auto">
              {t('companyInfo')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
