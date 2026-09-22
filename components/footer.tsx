"use client"

import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import Link from "next/link"
import { Linkedin } from "lucide-react"

export function Footer() {
    const t = useTranslations('footer')
    const tNav = useTranslations('nav')
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const switchLocale = (newLocale: string) => {
        if (newLocale === locale) return

        // Store current scroll position
        const scrollY = window.scrollY

        const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
        const newPath = `/${newLocale}${pathWithoutLocale}`

        // Navigate to new locale
        router.push(newPath)

        // Restore scroll position after navigation
        setTimeout(() => {
            window.scrollTo(0, scrollY)
        }, 50)
    }

    return (
        <footer className="bg-navy text-white">
            <div className="max-w-[1352px] mx-auto px-4 md:px-12 lg:px-20 pt-16 pb-4">
                {/* Desktop: 4 columns, Mobile: Single centered column */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Column 1 - Brand (Hidden on mobile) */}
                    <div className="hidden md:block">
                        <h3 className="text-2xl font-bold mb-4 text-white">{t('brand')}</h3>
                        <p className="text-sm leading-relaxed text-white">
                            {t('description')}
                        </p>
                    </div>

                    {/* Column 2 - Services (Hidden on mobile) */}
                    <div className="hidden lg:block">
                        <h4 className="font-semibold text-lg mb-4 text-white">{t('services')}</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href={`/${locale}#services`} className="text-white text-sm hover:text-muted-gold transition-colors">
                                    {t('services')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}#standards`} className="text-white text-sm hover:text-muted-gold transition-colors">
                                    Standards & Compliance
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}#how-we-work`} className="text-white text-sm hover:text-muted-gold transition-colors">
                                    {tNav('howWeWork')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}#industries`} className="text-white text-sm hover:text-muted-gold transition-colors">
                                    {tNav('industries')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3 - Company (Hidden on mobile) */}
                    <div className="hidden lg:block">
                        <h4 className="font-semibold text-lg mb-4 text-white">{t('company')}</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href={`/${locale}#experience`} className="text-white text-sm hover:text-muted-gold transition-colors">
                                    {tNav('experience')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}#why`} className="text-white text-sm hover:text-muted-gold transition-colors">
                                    Why Us
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}#contact`} className="text-white text-sm hover:text-muted-gold transition-colors">
                                    {tNav('contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4 - Contact & Legal (Centered on mobile, spans full width) */}
                    <div className="col-span-full lg:col-span-1 text-center md:text-left">
                        {/* Mobile: Show brand name */}
                        <h3 className="text-2xl font-bold mb-6 md:hidden text-white">{t('brand')}</h3>

                        <h4 className="font-semibold text-lg mb-4 text-white">{t('contact')}</h4>
                        <div className="space-y-3 mb-6">
                            <a href="mailto:info@pipelinequality.com" className="text-gray-200 text-sm hover:text-muted-gold transition-colors inline-block">{t('email')}</a>
                            <p className="text-gray-200 text-sm">{t('location')}</p>
                        </div>

                        {/* Social Links */}
                        <div className="mb-6 space-y-3 flex flex-col items-center md:items-start">
                            <Link href="https://www.linkedin.com/company/pipelinequality/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white hover:text-muted-gold transition-colors">
                                <Linkedin className="w-5 h-5" />
                                <span className="text-sm">{t('linkedIn')}</span>
                            </Link>

                            <a href="https://wa.me/491728137111" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white hover:text-muted-gold transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                <span className="text-sm">WhatsApp</span>
                            </a>
                        </div>

                        {/* Legal Links */}
                        <div className="space-y-2 flex flex-col items-center md:items-start">
                            <Link href={`/${locale}/privacy`} className="text-gray-200 text-sm hover:text-muted-gold transition-colors">
                                {t('privacyPolicy')}
                            </Link>
                            {locale === 'de' ? (
                                <Link href={`/${locale}/agb`} className="text-gray-200 text-sm hover:text-muted-gold transition-colors">
                                    {t('terms')}
                                </Link>
                            ) : (
                                <Link href={`/${locale}/terms`} className="text-gray-200 text-sm hover:text-muted-gold transition-colors">
                                    {t('terms')}
                                </Link>
                            )}
                            {locale === 'de' ? (
                                <Link href={`/${locale}/impressum`} className="text-gray-200 text-sm hover:text-muted-gold transition-colors">
                                    {t('imprint')}
                                </Link>
                            ) : (
                                <Link href={`/${locale}/legal-notice`} className="text-gray-200 text-sm hover:text-muted-gold transition-colors">
                                    {t('imprint')}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Language Switch */}
                <button
                    onClick={() => switchLocale('en')}
                    className={`text-sm font-semibold transition-colors ${locale === 'en' ? 'text-muted-gold' : 'text-white hover:text-muted-gold'
                        }`}
                >
                    EN
                </button>
                <span className="text-gray-300">|</span>
                <button
                    onClick={() => switchLocale('de')}
                    className={`text-sm font-semibold transition-colors ${locale === 'de' ? 'text-muted-gold' : 'text-white hover:text-muted-gold'
                        }`}
                >
                    DE
                </button>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-muted-gold/20">
                    <p className="text-center text-gray-200 text-sm">
                        {t('copyright')}
                    </p>
                    <p className="text-center text-gray-300 text-xs mt-2">
                        {locale === 'de' ? (
                            <>
                                Pipeline Quality ist eine Marke der Backpack Wander GmbH. Technischer Partner:{' '}
                                <a
                                    href="https://www.bw-digit.de"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-gold hover:underline"
                                >
                                    BW Digit
                                </a>
                                . Unabhängige QA/QC-Dienstleistungen.
                            </>
                        ) : (
                            <>
                                Pipeline Quality is a brand of Backpack Wander GmbH. Technical partner:{' '}
                                <a
                                    href="https://www.bw-digit.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-gold hover:underline"
                                >
                                    BW Digit
                                </a>
                                . Independent QA/QC Contractor Services.
                            </>
                        )}
                    </p>
                </div>
            </div>
        </footer>
    )
}
