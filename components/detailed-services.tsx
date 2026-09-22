"use client"

import { useTranslations } from 'next-intl'
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

export function DetailedServices() {
    const t = useTranslations('services')

    // Get all sections from translations
    const sections = t.raw('sections') as Record<string, { title: string, items: string[] }>

    const services = [
        {
            key: 'docControl',
            image: "/documentation-review-and-control.jpeg",
        },
        {
            key: 'welding',
            image: "/welding-fabrication-doument.jpg",
        },
        {
            key: 'quality',
            image: "/qa-qc-services.png",
        },
        {
            key: 'vendor',
            image: "/vendor-and-manufacturer-documentation.jpeg",
        },
        {
            key: 'completion',
            image: "/mechanical-completion-and-handover.webp",
        },
        {
            key: 'audit',
            image: "/audit-and-client-support.webp",
        },
        {
            key: 'remote',
            image: "/remote-qa-qc-support.jpeg",
        },
    ]

    return (
        <section className="py-8 md:py-16 lg:py-20" id="services-detailed">
            <div className="max-w-[1320px] mx-auto px-4 md:px-12 lg:px-20">

                {/* Services Grid */}
                <div className="space-y-16 lg:space-y-24">
                    {services.map((service, index) => {
                        const sectionData = sections[service.key]
                        const isImageLeft = index % 2 === 0 // Start with Image Left (Even index)

                        return (
                            <div
                                key={index}
                                className={`grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center`}
                            >
                                {/* Content */}
                                <div className={`${isImageLeft ? "lg:order-2" : "lg:order-1"}`}>
                                    <div className="space-y-6">
                                        <h3 className="text-2xl md:text-3xl font-bold text-navy break-words hyphens-auto">
                                            {sectionData.title}
                                        </h3>
                                        <ul className="space-y-3">
                                            {sectionData.items.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-charcoal">
                                                    <Check className="text-muted-gold w-5 h-5 mt-1 flex-shrink-0" strokeWidth={2.5} />
                                                    <span className="text-base md:text-lg leading-relaxed break-words hyphens-auto">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Image */}
                                <div className={`w-full ${isImageLeft ? "lg:order-1" : "lg:order-2"}`}>
                                    <div className="relative overflow-hidden rounded-xl shadow-md bg-white">
                                        <img
                                            src={service.image || "/placeholder.svg"}
                                            alt={sectionData.title}
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
