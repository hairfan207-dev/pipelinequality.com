"use client"

import { useTranslations } from 'next-intl'
import { Check } from "lucide-react"

export function IntroSection() {
  const t = useTranslations('intro')

  const keyPoints = [
    t('point1'),
    t('point2'),
    t('point3'),
    t('point4'),
  ]

  return (
    <>
      {/* First Section: Main Introduction */}
      <section className="bg-white py-8 md:py-16 lg:py-20">
        <div className="max-w-[1352px] mx-auto px-4 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
            {/* Left: Headline & Text */}
            <div className="space-y-4 md:space-y-5">
              <div>
                <p className="text-xs md:text-sm font-semibold text-[var(--steel)] uppercase tracking-wider mb-3">
                  Introduction
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy leading-tight text-balance">
                  {t('headline')}
                </h2>
              </div>

              <div className="space-y-3 text-charcoal leading-relaxed text-sm md:text-base">
                <p>{t('paragraph1')}</p>
                <p>{t('paragraph2')}</p>
                <p>{t('paragraph3')}</p>
              </div>
            </div>

            {/* Right: Image */}
            <div className="flex h-full lg:min-h-[350px]">
              <img
                src="/introduction.jpg"
                alt="QA/QC Documentation Review"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Second Section: Key Points & Description */}
      <section className="bg-gray-50 py-8 md:py-16 lg:py-20">
        <div className="max-w-[1352px] mx-auto px-4 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            {/* Left: Key Points */}
            <div className="space-y-6">
              <div>
                <p className="text-xs md:text-sm font-semibold text-navy uppercase tracking-wide mb-4">
                  {t('whatSetsUsApart')}
                </p>
                <div className="space-y-3">
                  {keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-muted-gold flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-charcoal text-sm md:text-base">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Tagline & Description */}
            <div className="space-y-4">
              <p className="text-lg md:text-xl font-bold text-navy leading-tight">
                {t('tagline')}
              </p>
              <p className="text-sm md:text-base text-charcoal leading-relaxed">
                {t('description')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
