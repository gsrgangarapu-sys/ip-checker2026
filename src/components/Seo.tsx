import { Helmet } from "react-helmet-async";

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  schema?: Record<string, any>;
}

export function Seo({ 
  title = "IP-Guardian | Advanced Network Intelligence", 
  description = "Advanced IP lookup, network intelligence, DNS tools, and security tracking platform.", 
  keywords = "IP lookup, network tools, DNS checker, SSL checker, blacklist checker, security tracking",
  url = "https://ip-guardian.com",
  schema
}: SeoProps) {
  const fullTitle = title.includes("IP-Guardian") ? title : `${title} | IP-Guardian`;

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": fullTitle,
    "description": description,
    "url": url,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All"
  };

  const finalSchema = schema || defaultSchema;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="IP-Guardian" />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      
      {/* JSON-LD Schema for rich Google Results */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
}
