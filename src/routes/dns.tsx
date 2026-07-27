import { createFileRoute } from "@tanstack/react-router";
import { Seo } from "@/components/Seo";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { dohQuery, ipv4ToPtr, type DnsAnswer, type DnsType } from "@/lib/dns";
import { Server, Loader2, ArrowRight, Shield, Globe, Terminal, Activity } from "lucide-react";

export const Route = createFileRoute("/dns")({
  head: () => ({
    meta: [
      { title: "DNS Lookup — A, AAAA, MX, NS, TXT, SOA | IP Guardian" },
      { name: "description", content: "Query DNS records over HTTPS via Cloudflare. Supports A, AAAA, MX, NS, TXT, SOA, CNAME, CAA and PTR (reverse DNS)." },
      { property: "og:title", content: "DNS Lookup — IP Guardian" },
      { property: "og:description", content: "DNS-over-HTTPS record lookups." },
      { property: "og:url", content: "/dns" },
    ],
    links: [{ rel: "canonical", href: "/dns" }],
  }),
  component: DnsPage,
});

const TYPES: DnsType[] = ["A", "AAAA", "MX", "NS", "TXT", "SOA", "CNAME", "CAA"];

function DnsPage() {
  const [name, setName] = useState("");
  const [type, setType] = useState<DnsType>("A");
  const [reverse, setReverse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<DnsAnswer[] | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (answers && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [answers]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    let v = name.trim();
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
    
    setLoading(true); setError(null); setAnswers(null);
    try {
      const target = reverse ? ipv4ToPtr(v) : v;
      const t: DnsType = reverse ? "PTR" : type;
      const data = await dohQuery(target, t);
      setAnswers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lookup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Seo 
        title="DNS Lookup & Resolver — Check A, MX, NS, TXT Records" 
        description="Free global DNS lookup tool. Query DNS records over HTTPS via Cloudflare. Supports A, AAAA, MX, NS, TXT, SOA, CNAME, CAA and PTR (reverse DNS)." 
        keywords="dns lookup, dns records, check dns, find dns records, txt record lookup, mx record lookup, reverse dns, ns lookup, ip-guardian dns tool"
        url="https://dnschecker.space/dns"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "DNS Lookup Tool",
          "url": "https://dnschecker.space/dns",
          "description": "Perform a comprehensive DNS lookup for any domain.",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "All"
        }}
      />
      <SiteHeader />
      
      <section className="relative pt-16 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_top,black_50%,transparent_90%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 mb-6">
              <Activity className="h-3 w-3 text-emerald-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">DNS Resolver v2.1</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-6 tracking-tight">
              DNS <span className="text-gradient">Records</span>
            </h1>
            <p className="text-lg text-secondary-foreground max-w-2xl leading-relaxed mb-12">
              Query global DNS records over HTTPS using Cloudflare's secure resolver. Support for all major record types including A, MX, TXT, and PTR.
            </p>

            <form
              onSubmit={submit}
              className="relative max-w-3xl group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-[24px] blur opacity-25 group-hover:opacity-40 transition duration-1000" />
              <div className="relative flex flex-col sm:flex-row items-center bg-white border border-slate-200 shadow-sm rounded-[20px] p-2 overflow-hidden">
                <div className="flex flex-1 items-center pl-4 w-full">
                  <Server className="h-5 w-5 text-secondary-foreground/40 mr-4" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={reverse ? "e.g. 8.8.8.8" : "e.g. google.com"}
                    className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-secondary-foreground/30 font-mono text-base py-3"
                  />
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto p-2 sm:p-0">
                  {!reverse && (
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as DnsType)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-foreground outline-none focus:border-emerald-500/50 transition-all cursor-pointer"
                    >
                      {TYPES.map((t) => <option key={t} value={t} className="bg-card">{t}</option>)}
                    </select>
                  )}
                  
                  <label className="flex items-center gap-2 text-[10px] font-bold text-secondary-foreground/60 uppercase tracking-widest px-2 cursor-pointer hover:text-foreground transition-colors">
                    <input 
                      type="checkbox" 
                      checked={reverse} 
                      onChange={(e) => setReverse(e.target.checked)} 
                      className="accent-emerald-600 h-4 w-4 rounded-md border-slate-300" 
                    />
                    Reverse
                  </label>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 sm:flex-none bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-105 active:scale-95 text-white px-8 py-3.5 rounded-[16px] font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Resolve"}
                    {!loading && <ArrowRight className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 flex-1">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-6 border-danger/20 bg-danger/5 text-danger font-mono text-sm flex items-center gap-3"
            >
              <Terminal className="h-5 w-5" />
              {error}
            </motion.div>
          )}
          
          {answers && (
            <motion.div 
              ref={resultRef}
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="bg-white shadow-lg rounded-[32px] p-10 border border-slate-200 overflow-hidden scroll-mt-24"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-emerald-600" />
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                    {answers.length} DNS Record{answers.length === 1 ? "" : "s"} Found
                  </h3>
                </div>
                <div className="px-2 py-1 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-mono text-secondary-foreground/40">CLOUD_FLARE_DOH</div>
              </div>
              
              {answers.length === 0 ? (
                <div className="text-center py-12 text-secondary-foreground/40 font-mono text-sm">
                  NO_RECORDS_AVAILABLE_FOR_TARGET
                </div>
              ) : (
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-foreground/40 border-b border-slate-200">
                        <th className="pb-4 pr-6">Hostname</th>
                        <th className="pb-4 pr-6">Type</th>
                        <th className="pb-4 pr-6">TTL</th>
                        <th className="pb-4">Record Data</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono text-sm">
                      {answers.map((a, i) => (
                        <tr key={i} className="border-b border-slate-200 hover:bg-slate-50 transition-colors group">
                          <td className="py-4 pr-6 text-foreground/70 truncate max-w-[200px]">{a.name}</td>
                          <td className="py-4 pr-6">
                            <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-600 text-[10px] font-bold">
                              {a.type}
                            </span>
                          </td>
                          <td className="py-4 pr-6 text-secondary-foreground/40">{a.TTL}s</td>
                          <td className="py-4 text-foreground font-bold break-all group-hover:text-emerald-600 transition-colors">{a.data}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      
      <SiteFooter />
    </div>
  );
}
