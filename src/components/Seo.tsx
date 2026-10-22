import { Helmet } from "react-helmet-async";

interface FaqItem {
  question: string;
  answer: string;
}

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  faqs?: FaqItem[];
  schema?: Record<string, any> | Array<Record<string, any>>;
}

export function Seo({ 
  title = "DNSChecker — Free IP Checker & Network Intelligence Tools", 
  description = "Instantly check your public IPv4/IPv6, PC local network IP, geolocation, ISP, DNS, SSL, and security reputation with our free IP checker toolkit.", 
  keywords = "ip checker, my ip checker, ip address lookup, what is my ip, ip checker cmd, ip checker malicious, ip checker minecraft, ip checker blacklist, reverse ip lookup, dns checker",
  url = "https://dnschecker.space",
  faqs,
  schema
}: SeoProps) {
  const fullTitle = title.includes("DNSChecker") ? title : `${title} | DNSChecker`;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "DNSChecker",
    "alternateName": ["DNS Checker", "IP Checker Tool", "DNSChecker Space"],
    "headline": fullTitle,
    "description": description,
    "url": url,
    "applicationCategory": "NetworkingApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "12840",
      "bestRating": "5",
      "worstRating": "1"
    }
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
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content="DNSChecker Team" />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="DNSChecker" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      
      {/* JSON-LD Schemas for Rich Google SERP Features */}
      {schemasToRender.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
