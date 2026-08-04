import { createFileRoute, Link } from "@tanstack/react-router";
import { Seo } from "@/components/Seo";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SeoHomeContent } from "@/components/SeoHomeContent";
import { 
  Globe, 
  Network, 
  FileText, 
  ShieldCheck, 
  Shield, 
  Ban, 
  Mail, 
  Server, 
  MapPin,
  ArrowRight
} from "lucide-react";
import { useRef } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IP Checker & IP Address Lookup - Check Your Public IP Location" },
      { name: "description", content: "Instantly check your IP address details. Our free IP lookup tool provides accurate geolocation, ISP, proxy detection, blacklist status, and network tracking." },
      { name: "keywords", content: "ip checker, ip address lookup, what is my ip, ip location, check public ip, ip tracker, reverse ip, blacklist checker, network intelligence" },
      { name: "author", content: "DNSChecker Team" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "IP Checker & IP Address Lookup" },
      { property: "og:description", content: "Instantly check your IP address details with accurate geolocation, proxy, and blacklist tracking." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://dnschecker.space/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "IP Checker & IP Address Lookup" },
      { name: "twitter:description", content: "Instantly check your IP address details with accurate geolocation, proxy, and blacklist tracking." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const tools = [
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
];

function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col selection:bg-emerald-500/30 relative">
      <Seo 
        title="IP Checker & IP Address Lookup - Check Your Public IP Location" 
        description="Instantly check your IP address details. Our free IP lookup tool provides accurate geolocation, ISP, proxy detection, blacklist status, and network tracking." 
        keywords="ip checker, ip address lookup, what is my ip, ip location, check public ip, ip tracker, reverse ip, blacklist checker, network intelligence"
        url="https://dnschecker.space"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "IP-Guardian Network Toolkit",
          "url": "https://dnschecker.space",
          "description": "Inspect any website, domain or IP with a single keystroke.",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "All"
        }}
      />
      <div className="absolute inset-0 z-[-1] netscope-grid opacity-[0.15]" />
      <SiteHeader />

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden flex flex-col items-center justify-center">
        
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 z-10 text-center flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 mb-10 shadow-sm"
          >
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-emerald-600 uppercase">
              $ ./probe --all
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[38px] sm:text-[52px] lg:text-[72px] font-[800] text-foreground leading-[1.1] mb-8 tracking-tight"
          >
            Network &amp; security <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent drop-shadow-sm">intelligence toolkit</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[16px] sm:text-[18px] text-secondary-foreground max-w-2xl mx-auto mb-12 leading-[1.7]"
          >
            Ten production-grade lookups in one console — IP, DNS, WHOIS, SSL, security headers, blacklist, email, ports &amp; geolocation. Powered by live public registries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              to="/dns" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-[15px] bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:scale-105 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
            >
              Run a DNS lookup <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="/tools" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-[15px] text-foreground border border-slate-300 hover:bg-slate-100 transition-all active:scale-95 text-center flex items-center justify-center"
            >
              Scan a site
            </a>
          </motion.div>
        </div>
      </section>

      {/* TOOLKIT SECTION */}
      <section className="py-20 relative z-10 border-t border-slate-200 bg-muted">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12">
            <h2 className="text-[32px] sm:text-[42px] font-[700] text-foreground mb-2 tracking-tight">The toolkit</h2>
            <p className="text-[16px] text-secondary-foreground">Pick a tool. Drop in a domain or IP. Get answers.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={t.to}
                  className="group relative flex flex-col h-full bg-card border border-slate-200 hover:border-emerald-300 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="relative mb-5 inline-block">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                      <t.icon className="h-5 w-5 text-emerald-600" strokeWidth={2} />
                    </div>
                  </div>
                  
                  <h3 className="text-[20px] sm:text-[22px] font-[600] text-foreground mb-2 group-hover:text-emerald-600 transition-colors tracking-tight">{t.title}</h3>
                  <p className="text-secondary-foreground text-[15px] leading-[1.6]">
                    {t.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted pb-20 px-4 sm:px-6">
        <SeoHomeContent />
      </section>

      <SiteFooter />
    </div>
  );
}
