"use client"

import { useTranslations } from 'next-intl'
import { LegalDocument } from "@/components/legal-shell"

export default function PrivacyPage() {
  const t = useTranslations('legal.privacy')
  const sections = t.raw('sections') as Array<{ title: string, content: string }>

  return <LegalDocument title={t('title')} sections={sections} />
}
