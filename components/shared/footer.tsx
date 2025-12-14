import Link from "next/link"
import { ROUTES } from "@/constants/routes"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-semibold">Platform</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link href={ROUTES.FEATURES} className="hover:underline">
                  Features
                </Link>
              </li>
              <li>
                <Link href={ROUTES.PRICING} className="hover:underline">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href={ROUTES.ABOUT} className="hover:underline">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Resources</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link href={ROUTES.BLOG} className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href={ROUTES.DOCS} className="hover:underline">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Legal</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link href={ROUTES.CONTACT} className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Connect</h3>
            <p className="text-muted-foreground text-sm">
              © 2024 DSA Learning Platform. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
