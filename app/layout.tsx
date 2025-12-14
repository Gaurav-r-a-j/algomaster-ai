import type { Metadata } from "next"
import { Figtree, Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

import { APP_CONFIG } from "@/config/app"
import {
  generateOrganizationJsonLd,
  generateWebSiteJsonLd,
} from "@/lib/seo/json-ld"
import { defaultMetadata } from "@/lib/seo/metadata"
import { JsonLd } from "@/components/seo/json-ld"

import { Providers } from "./providers"

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Generate structured data for SEO
  const organizationJsonLd = generateOrganizationJsonLd({
    name: APP_CONFIG.name,
    url: APP_CONFIG.url,
    description: APP_CONFIG.description,
    logo: `${APP_CONFIG.url}/logo.png`,
  })

  const websiteJsonLd = generateWebSiteJsonLd({
    name: APP_CONFIG.name,
    url: APP_CONFIG.url,
    description: APP_CONFIG.description,
  })

  return (
    <html lang="en" className={figtree.variable} suppressHydrationWarning>
      <head>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
