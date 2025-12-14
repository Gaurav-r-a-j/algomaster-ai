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
    <footer className="border-t border-neutral-800 bg-black pt-20 pb-10 text-neutral-400 sm:px-6 px-4">
      <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-12">
        {/* Brand Column */}
        <div className="space-y-6 md:col-span-4">
          <div className="flex items-center gap-3 text-white">
            <span className="text-lg font-bold tracking-tight">
              DSA Platform
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-neutral-400">
            Professional, AI-powered DSA learning platform for the modern
            developer. Master data structures and algorithms with interactive
            visualizations and practice problems.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="#"
              className="rounded-full bg-neutral-900 p-2 text-neutral-400 transition-colors hover:bg-white hover:text-black"
            >
              <IconWrapper icon={TwitterIcon} size={16} />
            </a>
            <a
              href="#"
              className="rounded-full bg-neutral-900 p-2 text-neutral-400 transition-colors hover:bg-white hover:text-black"
            >
              <IconWrapper icon={LinkedInIcon} size={16} />
            </a>
            <a
              href="#"
              className="rounded-full bg-neutral-900 p-2 text-neutral-400 transition-colors hover:bg-white hover:text-black"
            >
              <IconWrapper icon={GithubIcon} size={16} />
            </a>
          </div>
        </div>

        {/* Links Columns */}
        <div className="space-y-4 md:col-span-2">
          <h4 className="text-sm font-bold uppercase tracking-widest text-white">
            Product
          </h4>
          <ul className="space-y-3 text-sm text-neutral-400">
            {footerLinks.product.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 md:col-span-2">
          <h4 className="text-sm font-bold uppercase tracking-widest text-white">
            Company
          </h4>
          <ul className="space-y-3 text-sm text-neutral-400">
            {footerLinks.company.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 md:col-span-2">
          <h4 className="text-sm font-bold uppercase tracking-widest text-white">
            Legal
          </h4>
          <ul className="space-y-3 text-sm text-neutral-400">
            {footerLinks.legal.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 md:col-span-2">
          <h4 className="text-sm font-bold uppercase tracking-widest text-white">
            Resources
          </h4>
          <ul className="space-y-3 text-sm text-neutral-400">
            {footerLinks.resources.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 text-xs font-medium text-neutral-500 md:flex-row">
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
