import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
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
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
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
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={ROUTES.CONTACT} className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <p className="text-sm text-muted-foreground">
              © 2024 DSA Learning Platform. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

