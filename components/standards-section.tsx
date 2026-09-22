"use client"

import { useTranslations } from 'next-intl'
import { Shield, FileCheck, Award, Settings } from "lucide-react"

export function StandardsSection() {
  const t = useTranslations('standards')
  const standardsList = t.raw('standardsList') as string[]

  const standards = [
    {
      icon: Award,
      title: t('items.iso9001.title'),
      description: t('items.iso9001.description'),
    },
    {
      icon: Shield,
      title: t('items.iso45001.title'),
      description: t('items.iso45001.description'),
    },
    {
      icon: FileCheck,
      title: t('items.enDin.title'),
      description: t('items.enDin.description'),
    },
    {
      icon: Settings,
      title: t('items.asme.title'),
      description: t('items.asme.description'),
    },
  ]

  return (
    <section className="bg-[#0a0f1a] py-10 md:py-16 lg:py-20">
      <div className="max-w-[1352px] mx-auto px-4 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <span className="text-muted-gold uppercase tracking-[0.2em] text-xs font-semibold px-6 py-2 border border-muted-gold rounded-full bg-muted-gold/10">
              {t('label')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 max-w-4xl mx-auto leading-tight">
            {t('title')}
          </h2>
          <p className="text-white/80 text-base max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Standards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {standards.map((standard, index) => (
            <div
              key={index}
              className="bg-[#1a2332] rounded-lg p-6 border border-[#2a3545] hover:border-muted-gold transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="bg-muted-gold p-3 rounded-lg">
                  <standard.icon className="w-8 h-8 text-[#0a0f1a]" strokeWidth={2} />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-white mb-2 text-center">{standard.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed text-center">{standard.description}</p>
            </div>
          ))}
        </div>

        {/* Standards & Normative Framework */}
        <div className="bg-[#1a2332] rounded-lg p-8 border border-[#2a3545] mb-8">
          <h3 className="text-xl font-bold text-white mb-4">{t('frameworkTitle')}</h3>
          <p className="text-white/80 text-sm mb-6 leading-relaxed">
            {t('frameworkDescription')}
          </p>

          <ul className="space-y-2 mb-6">
            {standardsList.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-white/80 text-sm">
                <span className="text-muted-gold mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-3 text-white/70 text-sm leading-relaxed">
            <p className='text-white'>{t('auditNote')}</p>
            <p className='text-white'>{t('qualifications')}</p>
            <p className="text-xs text-white/60 italic">{t('scopeNote')}</p>
          </div>
        </div>

        {/* Bottom badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-[#1a2332] border border-[#2a3545]">
            <div className="w-2 h-2 rounded-full bg-muted-gold" />
            <p className="text-white text-sm font-semibold">
              {t('footer')}
            </p>
            <div className="w-2 h-2 rounded-full bg-muted-gold" />
          </div>
        </div>
      </div>
    </section>
  )
}
