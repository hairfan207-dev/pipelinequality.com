"use client"

import { useTranslations } from 'next-intl'
import { LegalDocument } from "@/components/legal-shell"

export default function TermsPage() {
  const t = useTranslations('legal.terms')
  const sections = t.raw('sections') as Array<{ title: string, content: string }>

  return <LegalDocument title={t('title')} sections={sections} />
}
