import type { Metadata } from "next"

import { APP_CONFIG } from "@/config/app"

export interface MetadataConfig {
  title: string
  description: string
  keywords?: string[]
  author?: string
  openGraph?: {
    title?: string
    description?: string
    images?: Array<{
      url: string
      width?: number
      height?: number
      alt?: string
    }>
    type?: "website" | "article" | "profile"
    siteName?: string
  }
  twitter?: {
    card?: "summary" | "summary_large_image" | "app" | "player"
    title?: string
    description?: string
    images?: string[]
    creator?: string
    site?: string
  }
  robots?: {
    index?: boolean
    follow?: boolean
    googleBot?: {
      index?: boolean
      follow?: boolean
      "max-video-preview"?: number
      "max-image-preview"?: "none" | "standard" | "large"
      "max-snippet"?: number
    }
  }
  alternates?: {
    canonical?: string
    languages?: Record<string, string>
  }
}

// Generate metadata for pages
export function generateMetadata(config: MetadataConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    author = APP_CONFIG.author,
    openGraph,
    twitter,
    robots,
    alternates,
  } = config

  const fullTitle = title.includes(APP_CONFIG.name)
    ? title
    : `${title} | ${APP_CONFIG.name}`

  const ogTitle = openGraph?.title || fullTitle
  const ogDescription = openGraph?.description || description

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(", ") : undefined,
    authors: author ? [{ name: author }] : undefined,
    creator: author,
    publisher: APP_CONFIG.name,
    metadataBase: new URL(APP_CONFIG.url),
    alternates: {
      canonical: alternates?.canonical || APP_CONFIG.url,
      languages: alternates?.languages,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: APP_CONFIG.url,
      siteName: openGraph?.siteName || APP_CONFIG.name,
      images: openGraph?.images || [
        {
          url: `${APP_CONFIG.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: APP_CONFIG.name,
        },
      ],
      locale: "en_US",
      type: openGraph?.type || "website",
    },
    twitter: {
      card: twitter?.card || "summary_large_image",
      title: twitter?.title || ogTitle,
      description: twitter?.description || ogDescription,
      images: twitter?.images || [`${APP_CONFIG.url}/og-image.png`],
      creator: twitter?.creator || APP_CONFIG.twitter,
      site: twitter?.site || APP_CONFIG.twitter,
    },
    robots: {
      index: robots?.index ?? true,
      follow: robots?.follow ?? true,
      googleBot: {
        index: robots?.googleBot?.index ?? true,
        follow: robots?.googleBot?.follow ?? true,
        "max-video-preview": robots?.googleBot?.["max-video-preview"],
        "max-image-preview":
          robots?.googleBot?.["max-image-preview"] || "large",
        "max-snippet": robots?.googleBot?.["max-snippet"],
      },
    },
    verification: APP_CONFIG.verification,
  }

  return metadata
}

// Default metadata for the application
export const defaultMetadata = generateMetadata({
  title: APP_CONFIG.name,
  description: APP_CONFIG.description,
  keywords: [...APP_CONFIG.keywords],
  openGraph: {
    type: "website",
  },
})
