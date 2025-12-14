// JSON-LD Script component for structured data
import Script from "next/script";

export interface JsonLdProps {
  data: object;
}

// Component to inject JSON-LD structured data
export function JsonLd({ data }: JsonLdProps) {
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

