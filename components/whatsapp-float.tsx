"use client"

import { useTranslations } from 'next-intl'
import { MessageCircle } from "lucide-react"

export function WhatsAppFloat() {
  const t = useTranslations('whatsappFloat')

  return (
    <a
      href="https://wa.me/923088923063"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 group"
      aria-label={t('tooltip')}
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-navy text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {t('tooltip')}
      </span>
    </a>
  )
}
