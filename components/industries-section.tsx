"use client"

import { useTranslations } from 'next-intl'
import { Check } from 'lucide-react'

export function IndustriesSection() {
  const t = useTranslations('industries')
  const industriesList = t.raw('list') as string[]
  const intro = t.has('intro') ? t('intro') : null

  return (
    <section className="bg-white py-10 md:py-16 lg:py-20" id="industries">
      <div className="max-w-[1352px] mx-auto px-4 md:px-12 lg:px-20">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <p className="text-muted-gold uppercase tracking-wider text-sm font-medium mb-4">{t('label')}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-6 whitespace-pre-line leading-tight">
            {t('title')}
          </h2>
          {intro && (
            <p className="text-lg text-charcoal leading-relaxed mb-4">
              {intro}
            </p>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <ul className="grid md:grid-cols-2 gap-4 mb-8">
            {industriesList.map((industry, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="text-muted-gold mt-1.5 w-4 h-4 flex-shrink-0" strokeWidth={3} />
                <span className="text-charcoal text-base leading-relaxed">{industry}</span>
              </li>
            ))}
          </ul>

          <p className="text-charcoal text-base leading-relaxed text-center max-w-3xl mx-auto">
            {t('experienceNote')}
          </p>
        </div>
      </div>
    </section>
  )
}
