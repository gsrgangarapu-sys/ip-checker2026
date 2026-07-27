import { createFileRoute } from "@tanstack/react-router";
import { Seo } from "@/components/Seo";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { IpDashboard } from "@/components/IpDashboard";
import { MapPin, Search, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/geo")({
  component: GeoPage,
});

function GeoPage() {
  const [input, setInput] = useState("");
  const [target, setTarget] = useState<string | undefined>(undefined);
  const [isSearching, setIsSearching] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (target && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 800); // delay to let dashboard load
    }
  }, [target]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    let v = input.trim();
    if (!v) return;
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
        title="IP Geolocation & Tracker — Map Any IP Address" 
        description="Track and map the exact geographical location of any IP or domain. Discover country, region, city, and GPS coordinates instantly." 
        keywords="ip geolocation, ip tracker, map ip address, locate ip, find ip location, track ip address, domain location, ip to country, ip to city"
        url="https://dnschecker.space/geo"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "IP Geolocation Tracker",
          "url": "https://dnschecker.space/geo",
          "description": "Track and map the geographical location of any IP or domain.",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "All"
        }}
      />
      <SiteHeader />
      
      <section className="relative pt-16 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_top,black_50%,transparent_90%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-6 shadow-sm">
              <MapPin className="h-3 w-3 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">GPS Geolocation</span>
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-7xl font-black text-foreground mb-8 tracking-tight leading-[0.95]">
              Network <br />
              <span className="text-gradient">Geolocation Tracking</span>
            </motion.h1>
            
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg sm:text-xl text-secondary-foreground max-w-2xl mb-12 leading-relaxed">
              Map any IP or domain to its country, region, city, and approximate GPS coordinates using global registry data.
            </motion.p>

            <motion.form onSubmit={submit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative max-w-2xl group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-[24px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              <div className="relative flex items-center bg-white border border-slate-200 rounded-[20px] p-2 pl-6 shadow-md">
                <Search className="h-5 w-5 text-secondary-foreground/40 mr-4" />
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter IP or Domain to locate..."
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-secondary-foreground/40 font-mono text-lg py-4"
                />
                <button
                  type="submit" disabled={isSearching}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-[16px] font-black text-base transition-all shadow-sm hover:shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  {isSearching ? "Locating..." : "Track"}
                  {!isSearching && <ArrowRight className="h-5 w-5" />}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 py-12 flex-1">
        <AnimatePresence mode="wait">
          <motion.div 
            ref={resultRef}
            key={target || "default"} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.98 }} 
            transition={{ duration: 0.4 }}
            className="scroll-mt-8 pt-8"
          >
            <IpDashboard initialIp={target} />
          </motion.div>
        </AnimatePresence>
      </section>

      <SiteFooter />
    </div>
  );
}
