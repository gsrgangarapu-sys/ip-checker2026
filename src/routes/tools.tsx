import { createFileRoute, Link } from "@tanstack/react-router";
import { Seo } from "@/components/Seo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { 
  Globe, Network, FileText, Server, ShieldCheck, 
  Shield, Ban, Mail, MapPin, Database, ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Network Tools — WHOIS, DNS, Ports, SSL | NetScope" },
      { name: "description", content: "Ten production-grade lookups in one console — IP, DNS, WHOIS, SSL, security headers, blacklist, email, ports & geolocation." },
    ],
    links: [{ rel: "canonical", href: "/tools" }],
  }),
  component: ToolsPage,
});

const tools = [
  { icon: Globe, title: "IP Checker", desc: "Inspect any IPv4 / IPv6 address: ISP, ASN, location, timezone.", href: "/my-ip" },
  { icon: Network, title: "DNS Lookup", desc: "Resolve A, AAAA, MX, NS, TXT, CNAME, SOA and CAA records.", href: "/dns" },
  { icon: FileText, title: "Domain WHOIS", desc: "Registrar, age, expiry, status flags, nameservers and DNSSEC.", href: "/whois" },
  { icon: Server, title: "Hosting Check", desc: "Discover hosting provider, ASN, datacenter location, and server environment.", href: "/hosting" },
  { icon: ShieldCheck, title: "SSL Checker", desc: "Live TLS reachability plus certificate transparency history.", href: "/ssl" },
  { icon: Shield, title: "Security Scan", desc: "Grades HSTS, CSP, frame, content-type and referrer headers.", href: "/headers" },
  { icon: Ban, title: "Blacklist", desc: "Test an IP or domain across major DNSBL spam lists.", href: "/blacklist" },
  { icon: Mail, title: "Email Check", desc: "Syntax, MX, SPF, DMARC and disposable-domain detection.", href: "/email" },
  { icon: Server, title: "Port Scanner", desc: "Probe common HTTP/HTTPS service ports and latency.", href: "/ports" },
  { icon: MapPin, title: "Geolocation", desc: "Map any IP or domain to country, region, city and coordinates.", href: "/geo" },
];

function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-[#00E5FF]/30 relative bg-muted">
      <Seo 
        title="All Network Tools — WHOIS, DNS, Ports, SSL | IP Guardian" 
        description="Explore all available network intelligence and security tools. IP lookup, DNS resolver, Domain WHOIS, SSL checker, Port Scanner, and more."
        keywords="network tools directory, all ip tools, free network tools, dns tools, web security tools, domain tools list, online network utilities"
        url="https://ip-guardian.com/tools"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Network Tools Directory",
          "url": "https://ip-guardian.com/tools",
          "description": "Explore all available network intelligence and security tools.",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "All"
        }}
      />
      <div className="absolute inset-0 z-[-1] netscope-grid opacity-[0.15]" />
      <SiteHeader />
      
      <section className="relative pt-16 pb-12 overflow-hidden flex flex-col items-center">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/5 mb-6 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
              <Database className="h-3 w-3 text-[#00E5FF]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#00E5FF] uppercase">Integrated Arsenal</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-6 tracking-tight leading-[0.95]">
              Network <br />
              <span className="bg-gradient-to-r from-[#00E5FF] to-[#00FF87] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,229,255,0.3)]">intelligence toolkit</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#94A3B8] leading-relaxed">
              Ten production-grade lookups in one console. Powered by live public registries.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-12 flex-1">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((t, i) => {
            return (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  to={t.href}
                  className="group relative flex flex-col h-full bg-card border border-[rgba(0,255,255,0.03)] hover:border-[rgba(0,255,255,0.2)] rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_-15px_rgba(0,229,255,0.2)]"
                >
                  <div className="flex items-start justify-between mb-5 relative">
                    <div className="h-10 w-10 rounded-xl bg-[#00E5FF]/5 border border-[#00E5FF]/20 flex items-center justify-center group-hover:bg-[#00E5FF]/10 transition-colors">
                      <t.icon className="h-5 w-5 text-[#00E5FF]" strokeWidth={2} />
                    </div>
                  </div>
                  
                  <h3 className="text-[20px] sm:text-[22px] font-[600] text-[#F5F7FA] mb-2 group-hover:text-[#00E5FF] transition-colors tracking-tight">{t.title}</h3>
                  <p className="text-[#94A3B8] text-[15px] leading-[1.6] flex-grow">
                    {t.desc}
                  </p>
                  
                  <div className="mt-4 relative flex items-center gap-2 text-xs font-bold text-foreground group-hover:text-[#00E5FF] transition-colors">
                    Launch Tool <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
      
      <SiteFooter />
    </div>
  );
}

