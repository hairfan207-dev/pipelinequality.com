"use client"

import { useTranslations } from 'next-intl'
import { Card } from "@/components/ui/card"
import { FileText, Search, Headphones, BarChart3, CheckCircle2 } from "lucide-react"

export function ProcessSection() {
  const t = useTranslations('workProcess')
  const rawSteps = t.raw('steps')
  const steps = Array.isArray(rawSteps) ? rawSteps as string[] : []

  const icons = [FileText, Search, Headphones, BarChart3, CheckCircle2]

  return (
    <section className="bg-white py-10 md:py-16 lg:pt-16 lg:pb-24" id="how-we-work">
      <div className="max-w-[1352px] mx-auto px-4 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <p className="text-sm font-semibold text-steel uppercase tracking-widest">{t('label')}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy text-balance">
            {t('title')}
          </h2>
          <p className="text-lg text-charcoal leading-relaxed">
            {t('tagline')}
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = icons[index]
            return (
              <Card key={index} className="p-8 bg-white shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-muted-gold/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-muted-gold" strokeWidth={2} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-muted-gold/20">{String(index + 1).padStart(2, '0')}</div>
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{step}</h3>
                <p className="text-charcoal leading-relaxed">{step}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
