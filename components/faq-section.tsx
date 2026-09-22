"use client"

import { useState } from "react"
import { useTranslations } from 'next-intl'
import { Plus, Minus } from "lucide-react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const t = useTranslations('faq')
  const items = t.raw('items') as Array<{ question: string, answer: string }>

  return (
    <section className="bg-white py-10 md:py-16 lg:py-20">
      <div className="max-w-[1352px] mx-auto px-4 md:px-12 lg:px-20">
        <div className="text-center mb-10">
          <p className="text-steel uppercase tracking-wider text-sm font-medium mb-4">FAQ</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-6">{t('title')}</h2>
        </div>

        <div className="space-y-4">
          {items.map((faq, index) => (
            <div key={index} className="border-b border-steel/20">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 flex items-center justify-between text-left hover:opacity-80 transition-opacity"
              >
                <span className="text-lg font-semibold text-navy pr-8">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-muted-gold flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-muted-gold flex-shrink-0" />
                )}
              </button>
              {openIndex === index && <div className="pb-6 text-charcoal leading-relaxed">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
