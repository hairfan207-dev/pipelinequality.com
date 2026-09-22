"use client"

import { useTranslations } from 'next-intl'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ImprintPage() {
  const t = useTranslations('legal.imprint')

  return (
    <main className="min-h-screen bg-[var(--navy)] text-white">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-12 text-center text-white">{t('title')}</h1>
          
          <div className="bg-white/5 rounded-lg p-8 md:p-12 space-y-8 border border-white/10">
            {/* Company Address */}
            <div>
              <h2 className="text-xl font-bold text-[var(--muted-gold)] mb-2">{t('companyName')}</h2>
              <p className="whitespace-pre-line text-lg leading-relaxed text-gray-200">
                {t('address')}
              </p>
            </div>

            <div className="h-px bg-white/10" />

            {/* Representations */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-gray-300 mb-1">{t('managingDirectorLabel')}</p>
                <p className="text-lg font-medium">{t('managingDirector')}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-300 mb-1">{t('contactLabel')}</p>
                <p className="text-lg font-medium hover:text-[var(--muted-gold)] transition-colors">
                  <a href={`mailto:${t('contact')}`}>{t('contact')}</a>
                </p>
              </div>
            </div>

            <div className="h-px bg-white/10" />

            {/* Registration */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-gray-300 mb-1">{t('registerLabel')}</p>
                <p className="whitespace-pre-line text-lg font-medium">{t('register')}</p>
              </div>

              <div>
                <p className="text-sm text-gray-300 mb-1">{t('vatLabel')}</p>
                <p className="text-lg font-medium">{t('vat')}</p>
              </div>
            </div>

            <div className="h-px bg-white/10" />

            {/* Brand Note */}
            <div>
              <p className="text-gray-300 italic">
                {t('brandNote')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
