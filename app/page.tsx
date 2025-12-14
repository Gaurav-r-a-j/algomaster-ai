import type { Metadata } from "next"

import { APP_CONFIG } from "@/config/app"
import { generateBreadcrumbJsonLd } from "@/lib/seo/json-ld"
import { generateMetadata as genMetadata } from "@/lib/seo/metadata"
import {
  BentoGrid,
  CTASection,
  FAQSection,
  HowItWorks,
  LandingFooter,
  LandingHero,
  LandingNav,
  Testimonials,
  TopicsGrid,
} from "@/components/features/marketing"
import { JsonLd } from "@/components/seo/json-ld"

// Generate metadata for this page
export const metadata: Metadata = genMetadata({
  title: "Home",
  description: APP_CONFIG.description,
  keywords: [...APP_CONFIG.keywords],
  openGraph: {
    type: "website",
    images: [
      {
        url: `${APP_CONFIG.url}/og-home.png`,
        width: 1200,
        height: 630,
        alt: "DSA Learning Platform",
      },
    ],
  },
})

export default function HomePage() {
  // Generate breadcrumb structured data
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: APP_CONFIG.url },
  ])

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <div className="flex min-h-screen flex-col">
        <LandingNav />
        <LandingHero />
        <BentoGrid />
        <HowItWorks />
        <TopicsGrid />
        <Testimonials />
        <FAQSection />
        <CTASection />
        <LandingFooter />
      </div>
    </>
  )
}
