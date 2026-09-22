"use client"

import { useTranslations } from 'next-intl'
import { Check } from "lucide-react"

export function ServicesOverview() {
  const t = useTranslations('services')
  const serviceAreas = t.raw('serviceAreas') as string[]

  return (
    <section className="bg-white py-8 md:py-20 lg:py-28" id="services">

      {/* ✅ CONTAINER FIX */}
      <div className="max-w-[1352px] mx-auto px-4 md:px-12 lg:px-20">
              <div className="mb-12 md:mb-16">
          <p className="text-xs md:text-sm font-semibold text-[var(--steel)] uppercase tracking-wider mb-3">
            {t('title')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6">
            {t('scopeTitle')}
          </h2>
          <div className="space-y-3 text-charcoal leading-relaxed text-sm md:text-base max-w-3xl">
            <p>{t('description')}</p>
          </div>
        </div>
        <div className="space-y-16 mb-16">

          {/* 🔹 Field Inspection */}
          <div className="space-y-6">
            
            {/* TEXT */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                {t('sections.fieldInspection.title')}
              </h3>
              <p className="text-charcoal mb-4">
                {t('sections.fieldInspection.description')}
              </p>
              <ul className="space-y-3">
                {(t.raw('sections.fieldInspection.items') as string[]).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-muted-gold mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* IMAGE */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/ndt_close.png"
                alt="Field Inspection"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>

          </div>

          {/* 🔹 Remote MDR */}
          <div className="space-y-6">
            
            {/* TEXT */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                {t('sections.remoteMDR.title')}
              </h3>
              <p className="text-charcoal mb-4">
                {t('sections.remoteMDR.description')}
              </p>
              <ul className="space-y-3">
                {(t.raw('sections.remoteMDR.items') as string[]).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-muted-gold mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* IMAGE */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/weld_tracking.png"
                alt="Remote MDR"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>

          </div>

        </div>

        {/* Key Areas */}
        <div className="bg-gray-50 rounded-lg p-8 md:p-12">
          <h3 className="text-xl md:text-2xl font-bold text-navy mb-6">
            {t('keyAreasTitle')}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceAreas.map((area, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-muted-gold mt-1 flex-shrink-0" />
                <span className="text-sm md:text-base font-medium">{area}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}