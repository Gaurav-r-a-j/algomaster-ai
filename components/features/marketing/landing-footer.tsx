"use client"

import Link from "next/link"
import { ROUTES } from "@/constants/routes"

import { CodeIcon, MessageIcon, ShareIcon } from "@/lib/icons"
import { IconWrapper } from "@/components/common/icon-wrapper"

// Social icons - using available icons as placeholders
const TwitterIcon = ShareIcon
const LinkedInIcon = MessageIcon
const GithubIcon = CodeIcon

const footerLinks = {
  product: [
    { label: "Topics", href: ROUTES.FEATURES },
    { label: "Practice", href: ROUTES.FEATURES },
    { label: "Visualizations", href: ROUTES.FEATURES },
    { label: "Pricing", href: ROUTES.PRICING },
  ],
  company: [
    { label: "About Us", href: ROUTES.ABOUT },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
  resources: [
    { label: "Help Center", href: "#" },
    { label: "Documentation", href: ROUTES.DESIGN_SYSTEM },
    { label: "Community", href: "#" },
  ],
}

export function LandingFooter() {
  return (
    <footer className="bg-foreground text-muted-foreground border-border border-t px-4 pt-20 pb-10 sm:px-6">
      <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-12">
        {/* Brand Column */}
        <div className="space-y-6 md:col-span-4">
          <div className="text-background flex items-center gap-3">
            <span className="text-lg font-bold tracking-tight">
              DSA Platform
            </span>
          </div>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            Professional, AI-powered DSA learning platform for the modern
            developer. Master data structures and algorithms with interactive
            visualizations and practice problems.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="#"
              className="bg-muted/20 hover:bg-primary hover:text-primary-foreground rounded-full p-2 transition-colors"
            >
              <IconWrapper icon={TwitterIcon} size={16} />
            </a>
            <a
              href="#"
              className="bg-muted/20 hover:bg-primary hover:text-primary-foreground rounded-full p-2 transition-colors"
            >
              <IconWrapper icon={LinkedInIcon} size={16} />
            </a>
            <a
              href="#"
              className="bg-muted/20 hover:bg-primary hover:text-primary-foreground rounded-full p-2 transition-colors"
            >
              <IconWrapper icon={GithubIcon} size={16} />
            </a>
          </div>
        </div>

        {/* Links Columns */}
        <div className="space-y-4 md:col-span-2">
          <h4 className="text-background text-sm font-bold tracking-widest uppercase">
            Product
          </h4>
          <ul className="text-muted-foreground space-y-3 text-sm">
            {footerLinks.product.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 md:col-span-2">
          <h4 className="text-background text-sm font-bold tracking-widest uppercase">
            Company
          </h4>
          <ul className="text-muted-foreground space-y-3 text-sm">
            {footerLinks.company.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 md:col-span-2">
          <h4 className="text-background text-sm font-bold tracking-widest uppercase">
            Legal
          </h4>
          <ul className="text-muted-foreground space-y-3 text-sm">
            {footerLinks.legal.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 md:col-span-2">
          <h4 className="text-background text-sm font-bold tracking-widest uppercase">
            Resources
          </h4>
          <ul className="text-muted-foreground space-y-3 text-sm">
            {footerLinks.resources.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-border text-muted-foreground mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t pt-8 text-xs font-medium md:flex-row">
        <div>
          &copy; {new Date().getFullYear()} DSA Platform. All rights reserved.
        </div>
        <div className="flex gap-6">
          <span>Made with Next.js & TypeScript</span>
        </div>
      </div>
    </footer>
  )
}
