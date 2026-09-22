"use client"

import { useTranslations } from 'next-intl'

export function SmartQAQCSection() {
  const t = useTranslations('smartQAQC')
  const features = t.raw('features') as string[]

  return (
    <section className="bg-gradient-to-br from-navy/5 to-transparent py-8 md:py-20 lg:py-28">
      <div className="max-w-[1352px] mx-auto px-4 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          {/* Label */}
          <p className="text-xs md:text-sm font-semibold text-muted-gold uppercase tracking-wider mb-3">
            {t('label')}
          </p>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6">
            {t('title')}
          </h2>

          {/* Description */}
          <p className="text-charcoal leading-relaxed text-base md:text-lg mb-8">
            {t('description')}
          </p>

          {/* Features List */}
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-muted-gold flex-shrink-0 mt-1 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-charcoal text-base font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
