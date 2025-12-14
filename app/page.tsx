import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Master Data Structures & Algorithms
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Interactive learning platform with real-time visualizations, AI-powered tutoring, 
          and comprehensive curriculum to help you excel in DSA.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href={ROUTES.REGISTER}>
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href={ROUTES.FEATURES}>
            <Button variant="outline" size="lg">Learn More</Button>
          </Link>
        </div>
      </section>

      {/* Features Preview */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Interactive Visualizations</h3>
            <p className="text-muted-foreground">
              Watch algorithms come to life with real-time visualizations.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">AI-Powered Tutoring</h3>
            <p className="text-muted-foreground">
              Get personalized explanations and guidance from our AI tutor.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Comprehensive Curriculum</h3>
            <p className="text-muted-foreground">
              Learn from basics to advanced topics with structured lessons.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
