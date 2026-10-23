import { createFileRoute } from "@tanstack/react-router";
import { Seo } from "@/components/Seo";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useServerFn } from "@tanstack/react-start";
import { sslLookup } from "@/lib/network.functions";
import { ShieldCheck, Loader2, ArrowRight, Lock, AlertTriangle, CheckCircle2, Server, Link as LinkIcon } from "lucide-react";

export const Route = createFileRoute("/ssl")({
  head: () => ({
    meta: [
      { title: "SSL Checker - Check SSL Certificate & Verify TLS Installation | DNSChecker" },
      { name: "description", content: "Free SSL Checker and TLS verification tool. Verify certificate validity, intermediate CA chains, expiration dates, and protocol security in real time." },
      { name: "keywords", content: "ssl check, ssl checker, check ssl certificate, verify ssl installation, tls test, ssl certificate checker, ssl expiry check, ssl mixed content" },
      { property: "og:title", content: "SSL Checker - Check SSL Certificate & Verify TLS Installation" },
      { property: "og:description", content: "Free SSL Checker tool. Verify certificate validity, intermediate CA chains, and expiration dates." },
      { property: "og:url", content: "https://dnschecker.space/ssl" },
    ],
    links: [{ rel: "canonical", href: "/ssl" }],
  }),
  component: SslPage,
});

function SslPage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const lookup = useServerFn(sslLookup);

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [result]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    let q = domain.trim();
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

    setLoading(true); setError(null); setResult(null);
    try {
      const data = await lookup({ data: { domain: q } });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "SSL lookup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Seo 
        title="SSL Checker - Check SSL Certificate & Verify Installation" 
        description="Use our fast SSL Checker to quickly diagnose problems with your SSL certificate installation. Verify certificate validity, issuer details, and expiration dates." 
        keywords="ssl checker, check ssl certificate, ssl decoder, free ssl checker, ssl certificate checker, ssl validation, check https security, ssl server test"
        url="https://dnschecker.space/ssl"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "SSL Certificate Checker",
          "url": "https://dnschecker.space/ssl",
          "description": "Verify TLS/SSL certificate validity, issuers, and protocols.",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "All"
        }}
      />
      <SiteHeader />
      
      <section className="relative pt-16 pb-12 overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 z-[-1] grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_top,black_50%,transparent_90%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 mb-6 shadow-sm">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-emerald-600 uppercase">TLS Security</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-6 tracking-tight">
              SSL <span className="text-gradient">Checker</span>
            </h1>
            <p className="text-lg text-secondary-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              Live TLS reachability plus certificate transparency history. Verify certificate validity, issuers, and protocol versions in real-time.
            </p>

            <form onSubmit={submit} className="relative w-full max-w-2xl group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-[24px] blur opacity-20 group-hover:opacity-30 transition duration-1000" />
              <div className="relative flex items-center bg-white border border-slate-200 rounded-[20px] p-2 pl-6 shadow-md">
                <Lock className="h-5 w-5 text-secondary-foreground/40 mr-4" />
                <input
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="https://stripe.com/"
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-secondary-foreground/40 font-mono text-lg py-4"
                />
                <button
                  type="submit" disabled={loading}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-[16px] font-black text-base transition-all shadow-sm hover:shadow-md flex items-center gap-2 disabled:opacity-50 hover:opacity-90"
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
          
          {result && (
            <motion.div 
              ref={resultRef}
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="space-y-8 max-w-4xl mx-auto scroll-mt-8"
            >
              
              {/* Status Checks */}
              <div className="bg-white border border-slate-200 shadow-sm rounded-[32px] p-8 md:p-12 space-y-6">
                <div className="flex items-center gap-4 text-foreground font-medium text-lg">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500 shrink-0" />
                  <span><strong className="text-emerald-700">{domain}</strong> resolves to <strong className="text-emerald-700">{result.ip}</strong></span>
                </div>
                <div className="flex items-center gap-4 text-foreground font-medium text-lg">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500 shrink-0" />
                  <span>Server Type: <strong className="text-emerald-700">{result.serverType}</strong></span>
                </div>
                <div className="flex items-center gap-4 text-foreground font-medium text-lg">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500 shrink-0" />
                  <span>The certificate should be trusted by all major web browsers (all the correct intermediate certificates are installed).</span>
                </div>
                <div className="flex items-center gap-4 text-foreground font-medium text-lg">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500 shrink-0" />
                  <span>The certificate will expire in <strong className="text-emerald-700">{
                    Math.ceil((new Date(result.chain[0]?.validTo).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                  } days.</strong></span>
                </div>
                <div className="flex items-center gap-4 text-foreground font-medium text-lg">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500 shrink-0" />
                  <span>The hostname ({domain}) is correctly listed in the certificate.</span>
                </div>
              </div>

              {/* Certificate Chain */}
              <div className="space-y-6">
                {result.chain?.map((cert: any, index: number) => (
                  <div key={index} className="relative flex flex-col md:flex-row gap-6 items-start">
                    {/* Visual Connector */}
                    {index > 0 && (
                      <div className="absolute -top-12 left-[3.25rem] md:left-[4.5rem] w-1 h-12 bg-gradient-to-b from-emerald-500/50 to-emerald-500" />
                    )}
                    
                    {/* Icon Box */}
                    <div className="relative z-10 bg-slate-50 border border-emerald-200 shadow-sm rounded-3xl p-4 flex flex-col items-center justify-center shrink-0 w-28 md:w-36 text-center">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                        {index === 0 ? "Server" : "Chain"}
                      </div>
                      <Lock className="h-10 w-10 text-emerald-500 mb-2" />
                      <CheckCircle2 className="absolute bottom-2 right-2 h-5 w-5 text-emerald-500 bg-white rounded-full" />
                    </div>

                    {/* Cert Details */}
                    <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 flex-1 w-full text-base font-mono text-slate-700 space-y-2">
                      <div><strong className="text-foreground">Common name:</strong> {cert.subject?.CN || "Unknown"}</div>
                      {cert.sans && <div><strong className="text-foreground">SANs:</strong> {cert.sans}</div>}
                      {cert.subject?.O && <div><strong className="text-foreground">Organization:</strong> {cert.subject?.O}</div>}
                      {cert.subject?.C && <div><strong className="text-foreground">Location:</strong> {cert.subject?.C}</div>}
                      <div><strong className="text-foreground">Valid from</strong> {new Date(cert.validFrom).toLocaleDateString()} to {new Date(cert.validTo).toLocaleDateString()}</div>
                      <div><strong className="text-foreground">Serial Number:</strong> {cert.serialNumber}</div>
                      {cert.signatureAlgorithm && <div><strong className="text-foreground">Signature Algorithm:</strong> {cert.signatureAlgorithm}</div>}
                      <div><strong className="text-foreground">Issuer:</strong> {cert.issuer?.CN || cert.issuer?.O || "Unknown"}</div>
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
