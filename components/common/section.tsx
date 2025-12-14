import { ReactNode } from "react";
import { cn } from "@/utils/common/class-names";
import { Container } from "./container";

export interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
}

const spacingClasses = {
  none: "",
  sm: "py-8",
  md: "py-12",
  lg: "py-16",
  xl: "py-20",
};

// Section - Page section with consistent spacing and container
// Example: <Section spacing="lg" containerSize="lg"><Content /></Section>
export function Section({
  children,
  className,
  containerClassName,
  containerSize = "xl",
  spacing = "md",
}: SectionProps) {
  return (
    <section className={cn(spacingClasses[spacing], className)}>
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}

