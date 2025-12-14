"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is the platform free to use?",
    a: "Yes! All core features including learning materials, interactive visualizations, and practice problems are completely free. We may introduce premium features for advanced analytics and personalized learning paths in the future.",
  },
  {
    q: "Do I need prior programming experience?",
    a: "Basic programming knowledge in any language (Python, Java, C++, JavaScript) is recommended. However, we provide beginner-friendly explanations and start with fundamentals, making it accessible even for those new to DSA.",
  },
  {
    q: "Can I track my progress?",
    a: "Absolutely! Create a free account to track your learning progress, save your solutions, monitor your improvement over time, and get personalized recommendations based on your performance.",
  },
  {
    q: "Are the problems similar to interview questions?",
    a: "Yes! Our problem set includes 500+ questions commonly asked in technical interviews at top tech companies like Google, Amazon, Microsoft, and Meta. Problems are categorized by difficulty and topic.",
  },
  {
    q: "How do the interactive visualizations work?",
    a: "Our visualizations show step-by-step execution of algorithms with animated diagrams. You can pause, rewind, and step through each operation to understand exactly how data structures and algorithms work.",
  },
  {
    q: "Can I practice coding problems directly on the platform?",
    a: "Yes! We have an integrated code editor where you can write, test, and submit solutions. Get instant feedback, see test cases, and compare your solution with optimal approaches.",
  },
];

export function FAQSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about our DSA learning platform.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-bold text-foreground">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

