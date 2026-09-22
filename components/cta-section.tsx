"use client"

import { useTranslations } from 'next-intl'
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function CTASection() {
    const t = useTranslations('cta')

    return (
        <section className="bg-[#0a0f1a] py-10 md:py-16 lg:py-20">
            <div className="max-w-[1352px] mx-auto px-4 md:px-12 lg:px-20 text-center">
                {/* Main heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
                    {t('title')}
                </h2>

                {/* Description */}
                <p className="text-white/80 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
                    {t('description')}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <a href="#contact" className="w-full sm:w-auto">
                        <Button
                            size="lg"
                            className="bg-muted-gold text-navy hover:bg-muted-gold/90 font-semibold px-8 h-12 text-base transition-all hover:scale-105 active:scale-95 w-full"
                        >
                            {t('button1')}
                        </Button>
                    </a>
                    <a href="#contact" className="w-full sm:w-auto">
                        <Button
                            size="lg"
                            className="bg-muted-gold text-white hover:bg-muted-gold/90 font-semibold px-8 h-12 text-base transition-all hover:scale-105 active:scale-95 w-full"
                        >
                            {t('button2')}
                        </Button>
                    </a>
                </div>

                {/* Bottom tagline */}
                <div className="flex justify-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#1a2332] border border-[#2a3545]">
                        <Check className="w-4 h-4 text-muted-gold" strokeWidth={3} />
                        <p className="text-white text-sm font-semibold">
                            {t('tagline')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
