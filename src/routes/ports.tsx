import { createFileRoute } from "@tanstack/react-router";
import { Seo } from "@/components/Seo";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useServerFn } from "@tanstack/react-start";
import { portScan } from "@/lib/network.functions";
import { Server, Loader2, ArrowRight, ShieldAlert, CheckCircle2, AlertTriangle, ShieldCheck, DoorOpen, DoorClosed } from "lucide-react";

export const Route = createFileRoute("/ports")({
  component: PortsPage,
});

function PortsPage() {
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any[] | null>(null);
  const lookup = useServerFn(portScan);

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (results && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [results]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    let q = target.trim();
    if (!q) return;
    try {
      if (q.startsWith("http://") || q.startsWith("https://")) {
        q = new URL(q).hostname;
      } else if (q.includes("/")) {
        q = q.split("/")[0];
      }
    } catch {
      q = q.replace(/^https?:\/\//, "").split("/")[0];
    }

    setLoading(true); setError(null); setResults(null);
    try {
      const data = await lookup({ data: { target: q } });
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Port scan failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Seo 
        title="Open Port Scanner — Test TCP/UDP Network Security" 
        description="Scan common network ports (21, 22, 80, 443, etc.) to check network security, firewalls, and exposed infrastructure. Fast and accurate TCP port scanner." 
        keywords="port scanner, open port check, test open ports, network port scanner, tcp port check, firewall test, exposed ports, nmap alternative online"
        url="https://ip-guardian.com/ports"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Open Port Scanner",
          "url": "https://ip-guardian.com/ports",
          "description": "Scan common ports to check network security and firewalls.",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "All"
        }}
      />
      <SiteHeader />
      
      <section className="relative pt-16 pb-12 overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 z-[-1] grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_top,black_50%,transparent_90%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50 mb-6 shadow-sm">
              <Server className="h-3 w-3 text-amber-500" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-amber-600 uppercase">TCP Port Scanner</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-6 tracking-tight">
              Port <span className="text-amber-500">Scanner</span>
            </h1>
            <p className="text-lg text-secondary-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              Probe common HTTP/HTTPS and service ports (21, 22, 25, 80, 443, 3306, etc) to identify exposed infrastructure.
            </p>

            <form onSubmit={submit} className="relative w-full max-w-2xl group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-red-400 rounded-[24px] blur opacity-20 group-hover:opacity-30 transition duration-1000" />
              <div className="relative flex items-center bg-white border border-slate-200 rounded-[20px] p-2 pl-6 shadow-md">
                <Server className="h-5 w-5 text-secondary-foreground/40 mr-4" />
                <input
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="Enter IP or Domain..."
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-secondary-foreground/40 font-mono text-lg py-4"
                />
                <button
                  type="submit" disabled={loading}
                  className="bg-gradient-to-r from-amber-500 to-red-500 text-white px-10 py-4 rounded-[16px] font-black text-base transition-all shadow-sm hover:shadow-md flex items-center gap-2 disabled:opacity-50 hover:opacity-90"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : "Scan"}
                  {!loading && <ArrowRight className="h-5 w-5" />}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 py-12 flex-1">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white shadow-sm rounded-2xl p-6 border border-danger/20 text-danger font-mono text-sm flex items-center gap-3 max-w-3xl mx-auto">
              <AlertTriangle className="h-5 w-5" />
              {error}
            </motion.div>
          )}
          
          {results && (
            <motion.div 
              ref={resultRef}
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="space-y-6 max-w-5xl mx-auto scroll-mt-8 pt-8"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {results.map((r, i) => (
                  <div key={i} className={`bg-white shadow-sm border rounded-3xl flex flex-col items-center justify-center p-8 text-center transition-all hover:shadow-md ${r.status === 'open' ? 'border-red-200 bg-red-50/30' : 'border-slate-200'}`}>
                    <div className={`h-14 w-14 rounded-full flex items-center justify-center mb-6 shadow-sm ${r.status === 'open' ? 'bg-red-50 text-red-600' : r.status === 'filtered' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'}`}>
                      {r.status === 'open' ? <DoorOpen className="h-7 w-7" /> : <DoorClosed className="h-7 w-7" />}
                    </div>
                    <div className="text-foreground font-black text-3xl font-mono mb-2">{r.port}</div>
                    <div className={`text-xs font-bold uppercase tracking-widest ${r.status === 'open' ? 'text-red-600' : r.status === 'filtered' ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {r.status}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      
      <SiteFooter />
    </div>
  );
}
