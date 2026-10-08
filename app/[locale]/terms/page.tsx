"use client"

import { useTranslations } from 'next-intl'
import { LegalShell } from "@/components/legal-shell"

export default function TermsPage() {
  const t = useTranslations('legal.terms')
  const sections = t.raw('sections') as Array<{ title: string, content: string }>

  return (
    <LegalShell>
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-semibold mb-12 text-center text-white">{t('title')}</h1>
          
          <div className="bg-white/5 rounded-lg p-8 md:p-12 space-y-12 border border-white/10">
            {sections.map((section, index) => (
              <div key={index} className="scroll-mt-32" id={`section-${index}`}>
                <h2 className="text-xl font-semibold text-[var(--accent)] mb-4">
                  {section.title}
                </h2>
                <div className="text-gray-200 leading-loose whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
    </LegalShell>
  )
}
