import { createFileRoute } from "@tanstack/react-router";
import { Seo } from "@/components/Seo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { IpDashboard } from "@/components/IpDashboard";
import { Search, Globe, Shield, Terminal, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/lookup")({
  head: () => ({
    meta: [
      { title: "IP Lookup — Geolocation, ASN & ISP | IP Guardian" },
      { name: "description", content: "Look up any IPv4 or IPv6 address. Get geolocation, ASN, ISP, hostname and threat intelligence in real time." },
      { property: "og:title", content: "IP Lookup — IP Guardian" },
      { property: "og:description", content: "Real-time IP intelligence for any address." },
      { property: "og:url", content: "/lookup" },
    ],
    links: [{ rel: "canonical", href: "/lookup" }],
  }),
  component: LookupPage,
});

function LookupPage() {
  const [input, setInput] = useState("");
  const [target, setTarget] = useState<string | undefined>(undefined);
  const [isSearching, setIsSearching] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    let v = input.trim();
    if (!v) return;
    
    // Clean URL input
    try {
      if (v.startsWith("http://") || v.startsWith("https://")) {
        v = new URL(v).hostname;
      } else if (v.includes("/")) {
        v = v.split("/")[0];
      }
    } catch {
      v = v.replace(/^https?:\/\//, "").split("/")[0];
    }
    
    setIsSearching(true);
    setTarget(v);
    setTimeout(() => setIsSearching(false), 800);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Seo 
        title="IP Lookup & Network Resolver — Advanced Intelligence" 
        description="Advanced IP address lookup and intelligence. Resolve any IPv4 or IPv6 address to its geographic location, autonomous system, and network provider." 
        keywords="ip lookup, network resolver, ipv4 lookup, ipv6 lookup, asn lookup, isp lookup, ip intelligence, ip details, ip lookup tool"
        url="https://dnschecker.space/lookup"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "IP Lookup Resolver",
          "url": "https://dnschecker.space/lookup",
          "description": "Advanced IP address lookup and intelligence information.",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "All"
        }}
      />
      <SiteHeader />
      
      <section className="relative pt-16 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_top,black_50%,transparent_90%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Globe className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Network Resolver v4.0</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-7xl font-black text-foreground mb-8 tracking-tight leading-[0.95]"
            >
              Global IP <br />
              <span className="text-gradient">Intelligence Resolver</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-secondary-foreground max-w-2xl mb-12 leading-relaxed"
            >
              Resolve any IPv4 or IPv6 address to its geographic location, autonomous system, and network provider with sub-millisecond precision.
            </motion.p>

            <motion.form
              onSubmit={submit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-2xl group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[24px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              <div className="relative flex items-center bg-card border border-white/10 rounded-[20px] p-2 pl-6 shadow-2xl">
                <Search className="h-5 w-5 text-secondary-foreground/40 mr-4" />
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter IPv4 or IPv6 (e.g. 8.8.8.8)"
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-secondary-foreground/30 font-mono text-base py-3"
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="bg-primary hover:bg-primary/90 text-background px-8 py-3.5 rounded-[16px] font-black text-sm transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
                >
                  {isSearching ? "Resolving..." : "Lookup"}
                  {!isSearching && <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
            </motion.form>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 flex flex-wrap gap-3 items-center"
            >
              <span className="text-[10px] font-bold text-secondary-foreground/40 uppercase tracking-widest">Recent Lookups:</span>
              {["8.8.8.8", "1.1.1.1", "208.67.222.222"].map((ip) => (
                <button
                  key={ip}
                  onClick={() => { setInput(ip); setTarget(ip); }}
                  className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-secondary-foreground/60 hover:text-primary hover:bg-white/10 hover:border-primary/20 transition-all"
                >
                  {ip}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={target || "default"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <IpDashboard initialIp={target} />
          </motion.div>
        </AnimatePresence>
      </section>

      <SiteFooter />
    </div>
  );
}

