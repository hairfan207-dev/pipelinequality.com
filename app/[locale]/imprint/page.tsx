"use client"

import { useTranslations } from 'next-intl'
import { LegalShell } from "@/components/legal-shell"

export default function ImprintPage() {
  const t = useTranslations('legal.imprint')

  return (
    <LegalShell>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold mb-12 text-center text-white">{t('title')}</h1>
          
          <div className="bg-white/5 rounded-lg p-8 md:p-12 space-y-8 border border-white/10">
            {/* Company Address */}
            <div>
              <h2 className="text-xl font-semibold text-[var(--accent)] mb-2">{t('companyName')}</h2>
              <p className="whitespace-pre-line text-lg leading-relaxed text-gray-200">
                {t('address')}
              </p>
            </div>

            <div className="h-px bg-white/10" />

            {/* Representations */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-white/80 mb-1">{t('managingDirectorLabel')}</p>
                <p className="text-lg font-semibold">{t('managingDirector')}</p>
              </div>
              
              <div>
                <p className="text-sm text-white/80 mb-1">{t('contactLabel')}</p>
                <p className="text-lg font-semibold hover:text-[var(--accent)] transition-colors">
                  <a href={`mailto:${t('contact')}`}>{t('contact')}</a>
                </p>
              </div>
            </div>

            <div className="h-px bg-white/10" />

            {/* Registration */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-white/80 mb-1">{t('registerLabel')}</p>
                <p className="whitespace-pre-line text-lg font-semibold">{t('register')}</p>
              </div>

              <div>
                <p className="text-sm text-white/80 mb-1">{t('vatLabel')}</p>
                <p className="text-lg font-semibold">{t('vat')}</p>
              </div>
            </div>

            <div className="h-px bg-white/10" />

            {/* Brand Note */}
            <div>
              <p className="text-white/80 italic">
                {t('brandNote')}
              </p>
            </div>
          </div>
        </div>
    </LegalShell>
  )
}
