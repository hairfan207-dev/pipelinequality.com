"use client"

import { useTranslations } from 'next-intl'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ImpressumPage() {
  const t = useTranslations('legal.imprint')
  const sections = t.raw('sections') as Array<{ title: string, content: string }>

  return (
    <main className="min-h-screen bg-[var(--navy)] text-white">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-12 text-center text-white">{t('title')}</h1>
          
          <div className="bg-white/5 rounded-lg p-8 md:p-12 space-y-12 border border-white/10">
            {sections.map((section, index) => (
              <div key={index} className="scroll-mt-32" id={`section-${index}`}>
                <h2 className="text-xl font-bold text-[var(--muted-gold)] mb-4">
                  {section.title}
                </h2>
                <div className="text-gray-200 leading-loose whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
