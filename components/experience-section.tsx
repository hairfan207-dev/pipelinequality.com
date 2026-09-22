"use client"

import { useTranslations } from 'next-intl'

export function ExperienceSection() {
  const t = useTranslations('experience')

  return (
    <section className="bg-white py-8 md:py-16 lg:py-20" id="experience">
      <div className="max-w-[1352px] mx-auto px-4 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-5 md:space-y-6">
            <div>
              {/* <p className="text-xs md:text-sm font-semibold text-[var(--steel)] uppercase tracking-wider mb-3">
                {t('title')}
              </p> */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy leading-tight text-balance">
                {t('title')}
              </h2>
            </div>

            <div className="space-y-3 text-charcoal leading-relaxed text-sm md:text-base">
              <p>{t('paragraph1')}</p>
              <p>{t('paragraph2')}</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs md:text-sm text-[var(--steel)]">
                {t('paragraph3')}
              </p>
              <p className="text-charcoal font-medium leading-relaxed text-sm md:text-base">
                {t('companies')}
              </p>
            </div>

            <p className="text-xs md:text-sm text-[var(--steel)] italic">
              Experience across European and international project environments.
            </p>
          </div>

          {/* Right Image */}
          <div className="flex h-full lg:min-h-[350px]">
            <img
              src="/project-experience.jpg"
              alt="Industrial Project Experience"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
