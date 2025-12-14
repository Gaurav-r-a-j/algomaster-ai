import { ReactNode } from "react";
import { cn } from "@/utils/common/class-names";
import { Container } from "./container";

export interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  id?: string;
}

const spacingClasses = {
  none: "",
  sm: "py-8",
  md: "py-12",
  lg: "py-24",
  xl: "py-32",
};

// Section - Page section with consistent spacing and container
// Example: <Section spacing="lg" containerSize="lg" id="features"><Content /></Section>
export function Section({
  children,
  className,
  containerClassName,
  containerSize = "xl",
  spacing = "md",
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn(spacingClasses[spacing], className)}>
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
