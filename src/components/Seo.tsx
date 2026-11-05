import { Helmet } from "react-helmet-async";

interface FaqItem {
  question: string;
  answer: string;
}

interface SeoProps {
  title?: string;
  description?: string;
  // Kept for backwards compatibility with existing route files.
  // The keywords meta tag is not emitted: Google ignores it.
  keywords?: string;
  url?: string;
  faqs?: FaqItem[];
  schema?: Record<string, any> | Array<Record<string, any>>;
}

// Schema-only SEO helper.
//
// Title, meta description, canonical, Open Graph and Twitter tags are owned by
// each route's TanStack `head()` (SSR) — do NOT emit them here as well, or the
// page will contain duplicate/conflicting tags. This component only injects
// JSON-LD structured data (WebApplication + FAQPage).
export function Seo({
  title = "DNSChecker — Free IP Checker & Network Intelligence Tools",
  description = "Instantly check your public IPv4/IPv6, PC local network IP, geolocation, ISP, DNS, SSL, and security reputation with our free IP checker toolkit.",
  url = "https://dnschecker.space",
  faqs,
  schema
}: SeoProps) {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "DNSChecker",
    "alternateName": ["DNS Checker", "IP Checker Tool", "DNSChecker Space"],
    "headline": title,
    "description": description,
    "url": url,
    "applicationCategory": "NetworkingApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
    // No AggregateRating: ratings must come from real, verifiable user
    // reviews. A fabricated rating violates Google's structured data policy.
  };

  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  const schemasToRender = schema
    ? (Array.isArray(schema) ? schema : [schema])
    : (faqSchema ? [webAppSchema, faqSchema] : [webAppSchema]);

  return (
    <Helmet>
      {schemasToRender.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
