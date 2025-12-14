import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { ROUTES } from "@/constants/routes";
import {
  ArrowRightIcon,
  BookmarkIcon,
  Home01Icon,
  SearchIcon,
  SettingsIcon,
  StarIcon,
} from "@/lib/icons";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <Section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <StarIcon size={16} />
              <span>Production Ready Template</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Build Amazing Products
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              A modern, scalable template built with Next.js 16, TypeScript, and
              best practices. Ready to customize for your next project.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href={ROUTES.REGISTER}>
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRightIcon size={20} className="ml-2" />
                </Button>
              </Link>
              <Link href={ROUTES.DESIGN_SYSTEM}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  View Design System
                </Button>
              </Link>
              <Link href={ROUTES.FEATURES}>
                <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with modern tools and best practices for production-ready
              applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 border rounded-xl hover:shadow-lg transition-shadow bg-card">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Home01Icon size={24} className="text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Modern Stack</h3>
              <p className="text-muted-foreground leading-relaxed">
                Built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui
                for a robust foundation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 border rounded-xl hover:shadow-lg transition-shadow bg-card">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <SearchIcon size={24} className="text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Type-Safe</h3>
              <p className="text-muted-foreground leading-relaxed">
                Full TypeScript support with strict mode enabled for better code
                quality and developer experience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 border rounded-xl hover:shadow-lg transition-shadow bg-card">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <SettingsIcon size={24} className="text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Customizable</h3>
              <p className="text-muted-foreground leading-relaxed">
                Well-organized codebase with reusable components and clear
                architecture for easy customization.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 border rounded-xl hover:shadow-lg transition-shadow bg-card">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <StarIcon size={24} className="text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Best Practices</h3>
              <p className="text-muted-foreground leading-relaxed">
                Includes ESLint, Prettier, and comprehensive documentation
                following industry standards.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 border rounded-xl hover:shadow-lg transition-shadow bg-card">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <BookmarkIcon size={24} className="text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Production Ready</h3>
              <p className="text-muted-foreground leading-relaxed">
                Optimized for performance, SEO, and scalability right out of the
                box.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 border rounded-xl hover:shadow-lg transition-shadow bg-card">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <SettingsIcon size={24} className="text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Design System</h3>
              <p className="text-muted-foreground leading-relaxed">
                Complete design system with reusable components, icons, and
                patterns.{" "}
                <Link
                  href={ROUTES.DESIGN_SYSTEM}
                  className="text-primary hover:underline font-medium"
                >
                  Explore →
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-20 bg-muted/50">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Start building your next project with this production-ready
              template. Customize it to fit your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={ROUTES.REGISTER}>
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRightIcon size={20} className="ml-2" />
                </Button>
              </Link>
              <Link href={ROUTES.DESIGN_SYSTEM}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  View Design System
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
