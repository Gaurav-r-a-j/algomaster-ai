import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={ROUTES.HOME} className="text-xl font-bold">
          DSA Platform
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href={ROUTES.FEATURES} className="text-sm hover:underline">
            Features
          </Link>
          <Link href={ROUTES.DESIGN_SYSTEM} className="text-sm hover:underline">
            Design System
          </Link>
          <Link href={ROUTES.PRICING} className="text-sm hover:underline">
            Pricing
          </Link>
          <Link href={ROUTES.ABOUT} className="text-sm hover:underline">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href={ROUTES.LOGIN}>
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
          <Link href={ROUTES.REGISTER}>
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
