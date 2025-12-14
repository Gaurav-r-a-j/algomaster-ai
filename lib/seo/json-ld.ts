// JSON-LD Structured Data utilities for SEO

export interface Organization {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  contactPoint?: {
    contactType: string;
    telephone?: string;
    email?: string;
  };
}

export interface WebSite {
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface Article {
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    name: string;
    url?: string;
  };
  publisher?: {
    name: string;
    logo?: {
      url: string;
    };
  };
}

// Generate Organization JSON-LD
export function generateOrganizationJsonLd(
  organization: Organization
): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organization.name,
    url: organization.url,
    ...(organization.logo && {
      logo: organization.logo,
    }),
    ...(organization.description && {
      description: organization.description,
    }),
    ...(organization.sameAs && {
      sameAs: organization.sameAs,
    }),
    ...(organization.contactPoint && {
      contactPoint: {
        "@type": "ContactPoint",
        contactType: organization.contactPoint.contactType,
        ...(organization.contactPoint.telephone && {
          telephone: organization.contactPoint.telephone,
        }),
        ...(organization.contactPoint.email && {
          email: organization.contactPoint.email,
        }),
      },
    }),
  };
}

// Generate WebSite JSON-LD
export function generateWebSiteJsonLd(website: WebSite): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: website.name,
    url: website.url,
    ...(website.description && {
      description: website.description,
    }),
    ...(website.potentialAction && {
      potentialAction: website.potentialAction,
    }),
  };
}

// Generate BreadcrumbList JSON-LD
export function generateBreadcrumbJsonLd(
  items: BreadcrumbItem[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Generate Article JSON-LD
export function generateArticleJsonLd(article: Article): object {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    ...(article.description && {
      description: article.description,
    }),
    ...(article.image && {
      image: article.image,
    }),
    ...(article.datePublished && {
      datePublished: article.datePublished,
    }),
    ...(article.dateModified && {
      dateModified: article.dateModified,
    }),
    ...(article.author && {
      author: {
        "@type": "Person",
        name: article.author.name,
        ...(article.author.url && {
          url: article.author.url,
        }),
      },
    }),
    ...(article.publisher && {
      publisher: {
        "@type": "Organization",
        name: article.publisher.name,
        ...(article.publisher.logo && {
          logo: {
            "@type": "ImageObject",
            url: article.publisher.logo.url,
          },
        }),
      },
    }),
  };
}

