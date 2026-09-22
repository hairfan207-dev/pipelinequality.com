import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { IntroSection } from '@/components/intro-section';
import { ExperienceSection } from '@/components/experience-section';
import { ServicesOverview } from '@/components/services-overview';
import { DetailedServices } from '@/components/detailed-services';
import { SmartQAQCSection } from '@/components/smart-qaqa-section';
import { ProcessSection } from '@/components/process-section';
import { StandardsSection } from '@/components/standards-section';
import { IndustriesSection } from '@/components/industries-section';
import { WhySection } from '@/components/why-section';
import { CTASection } from '@/components/cta-section';
import { FAQSection } from '@/components/faq-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
// import { WhatsAppFloat } from "@/components/whatsapp-float"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}


export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <main>
      <Navigation />
      <HeroSection />
      <IntroSection />
      <ExperienceSection />
      <ServicesOverview />
      <DetailedServices />
      <SmartQAQCSection />
      <ProcessSection />
      <StandardsSection />
      <IndustriesSection />
      <WhySection />
      <CTASection />
      <FAQSection />
      <ContactSection />
      <Footer />
      {/* <WhatsAppFloat /> */}
    </main>
  );
}
