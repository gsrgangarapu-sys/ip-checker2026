import { createFileRoute, Link } from "@tanstack/react-router";
import { Seo } from "@/components/Seo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { 
  Globe, 
  Network, 
  FileText, 
  ShieldCheck, 
  Shield, 
  Ban, 
  Mail, 
  Server, 
  MapPin
} from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "HTML Sitemap - DNSChecker" },
      { name: "description", content: "Navigate through all the tools and features available on DNSChecker." },
    ],
    links: [{ rel: "canonical", href: "/sitemap" }],
  }),
  component: SitemapPage,
});

const sitemapLinks = [
  { icon: Globe, title: "IP Checker", desc: "Inspect any IPv4 / IPv6 address: ISP, ASN, location, timezone.", to: "/my-ip" },
  { icon: Network, title: "DNS Lookup", desc: "Resolve A, AAAA, MX, NS, TXT, CNAME, SOA and CAA records.", to: "/dns" },
  { icon: FileText, title: "Domain WHOIS", desc: "Registrar, age, expiry, status flags, nameservers and DNSSEC.", to: "/whois" },
  { icon: Server, title: "Hosting Check", desc: "Discover hosting provider, ASN, datacenter location, and server environment.", to: "/hosting" },
  { icon: ShieldCheck, title: "SSL Checker", desc: "Live TLS reachability plus certificate transparency history.", to: "/ssl" },
  { icon: Shield, title: "Security Scan", desc: "Grades HSTS, CSP, frame, content-type and referrer headers.", to: "/headers" },
  { icon: Ban, title: "Blacklist", desc: "Test an IP or domain across major DNSBL spam lists.", to: "/blacklist" },
  { icon: Mail, title: "Email Check", desc: "Syntax, MX, SPF, DMARC and disposable-domain detection.", to: "/email" },
  { icon: Server, title: "Port Scanner", desc: "Probe common HTTP/HTTPS service ports and latency.", to: "/ports" },
  { icon: MapPin, title: "Geolocation", desc: "Map any IP or domain to country, region, city and coordinates.", to: "/geo" },
  { icon: Globe, title: "IP Lookup", desc: "Resolve any IP to its geographic location, autonomous system, and network provider.", to: "/lookup" },
];

function SitemapPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Seo 
        title="HTML Sitemap - DNSChecker" 
        description="Navigate through all the tools and features available on DNSChecker. Discover our comprehensive network intelligence and security toolkit." 
        keywords="sitemap, html sitemap, dnschecker sitemap, site index"
        url="https://dnschecker.space/sitemap"
      />
      <SiteHeader />
      
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-foreground mb-4">HTML Sitemap</h1>
          <p className="text-secondary-foreground text-lg">Navigate through all the tools and features available on our platform.</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4 border-b border-slate-100 pb-4">Main Pages</h2>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  All Tools Catalog
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Blog &amp; Knowledge Hub
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4 border-b border-slate-100 pb-4">Network Intelligence Tools</h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {sitemapLinks.map((link) => (
                <div key={link.to} className="group">
                  <Link to={link.to} className="flex items-start gap-3 py-2">
                    <link.icon className="h-5 w-5 text-secondary-foreground/40 group-hover:text-emerald-500 transition-colors mt-0.5 shrink-0" />
                    <div>
                      <div className="font-bold text-foreground group-hover:text-emerald-600 transition-colors">{link.title}</div>
                      <div className="text-sm text-secondary-foreground mt-0.5">{link.desc}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
