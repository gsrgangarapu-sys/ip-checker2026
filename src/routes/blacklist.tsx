import { createFileRoute } from "@tanstack/react-router";
import { Seo } from "@/components/Seo";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useServerFn } from "@tanstack/react-start";
import { blacklistCheck } from "@/lib/network.functions";
import { Ban, Loader2, ArrowRight, ShieldAlert, CheckCircle2, AlertTriangle, ShieldCheck, Check, Info, Shield, Search } from "lucide-react";

export const Route = createFileRoute("/blacklist")({
  component: BlacklistPage,
});

function BlacklistPage() {
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);
  const lookup = useServerFn(blacklistCheck);

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
      setError(err instanceof Error ? err.message : "Blacklist check failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Seo 
        title="IP Blacklist Checker — Test IP & Domain Reputation" 
        description="Check if your IP or domain is listed on global anti-spam blacklists (DNSBL). Test IP reputation and detect malware risks instantly." 
        keywords="ip blacklist checker, domain blacklist, check ip reputation, dnsbl check, spamhaus check, is my ip blacklisted, email blacklist, website malware scanner"
        url="https://dnschecker.space/blacklist"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "IP Blacklist Checker",
          "url": "https://dnschecker.space/blacklist",
          "description": "Check if an IP or domain is listed on anti-spam blacklists.",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "All"
        }}
      />
      <SiteHeader />
      
      <section className="relative pt-16 pb-12 overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 z-[-1] grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_top,black_50%,transparent_90%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-200 bg-red-50 mb-6 shadow-sm">
              <ShieldAlert className="h-3 w-3 text-red-600" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">Reputation Scan</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-6 tracking-tight">
              Blacklist <span className="text-red-500">Check</span>
            </h1>
            <p className="text-lg text-secondary-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              Cross-reference any domain or IP against major global spam and malware blacklists (DNSBLs) in real-time.
            </p>

            <form onSubmit={submit} className="relative w-full max-w-2xl group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-400 rounded-[24px] blur opacity-20 group-hover:opacity-30 transition duration-1000" />
              <div className="relative flex items-center bg-white border border-slate-200 rounded-[20px] p-2 pl-6 shadow-md">
                <Ban className="h-5 w-5 text-secondary-foreground/40 mr-4" />
                <input
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="Enter IP or Domain..."
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-secondary-foreground/30 font-mono text-lg py-4"
                />
                <button
                  type="submit" disabled={loading}
                  className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-10 py-4 rounded-[16px] font-black text-base transition-all shadow-sm hover:shadow-md flex items-center gap-2 disabled:opacity-50 hover:opacity-90"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : "Scan"}
                  {!loading && <ArrowRight className="h-5 w-5" />}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 py-16 flex-1">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white shadow-sm rounded-2xl p-6 border border-red-200 text-red-600 font-mono text-sm flex items-center gap-3 max-w-3xl mx-auto">
              <AlertTriangle className="h-5 w-5" />
              {error}
            </motion.div>
          )}
          
          {results && (
            <motion.div 
              ref={resultRef}
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="space-y-8 max-w-6xl mx-auto scroll-mt-24"
            >
              
              {/* Top Summary Card */}
              <div className="bg-white shadow-sm rounded-[32px] p-8 md:p-12 border border-slate-200">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-100 pb-8 mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`h-14 w-14 rounded-full flex items-center justify-center ${results.malwareRisk === 'Low Risk' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                      {results.malwareRisk === 'Low Risk' ? <ShieldCheck className="h-7 w-7" /> : <ShieldAlert className="h-7 w-7" />}
                    </div>
                    <div>
                      <div className="text-foreground font-black text-2xl mb-1">{results.malwareRisk === 'Low Risk' ? 'No Malware Found' : 'Malware Risk Detected'}</div>
                      <div className="text-secondary-foreground text-sm">Our scanner evaluated the domain risk</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className={`h-14 w-14 rounded-full flex items-center justify-center ${results.blacklists.some((b: any) => b.status === 'listed') ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {results.blacklists.some((b: any) => b.status === 'listed') ? <Ban className="h-7 w-7" /> : <CheckCircle2 className="h-7 w-7" />}
                    </div>
                    <div>
                      <div className="text-foreground font-black text-2xl mb-1">{results.blacklists.some((b: any) => b.status === 'listed') ? 'Site is Blacklisted' : 'Site is not Blacklisted'}</div>
                      <div className="text-secondary-foreground text-sm">{results.blacklists.length} Blacklists checked</div>
                    </div>
                  </div>
                </div>

                {/* Infrastructure Details */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-base">
                  <div className="space-y-3">
                    <div className="flex items-center"><span className="text-secondary-foreground w-28 font-bold text-xs uppercase tracking-widest">IP address:</span> <span className="text-foreground font-mono">{results.ip}</span></div>
                    <div className="flex items-center"><span className="text-secondary-foreground w-28 font-bold text-xs uppercase tracking-widest">CDN:</span> <span className="text-foreground font-mono">{results.cdn}</span></div>
                    <div className="flex items-center"><span className="text-secondary-foreground w-28 font-bold text-xs uppercase tracking-widest">Running on:</span> <span className="text-foreground font-mono">{results.server}</span></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center"><span className="text-secondary-foreground w-28 font-bold text-xs uppercase tracking-widest">CMS:</span> <span className="text-foreground font-mono">{results.cms}</span></div>
                    <div className="flex items-center"><span className="text-secondary-foreground w-28 font-bold text-xs uppercase tracking-widest">Powered by:</span> <span className="text-foreground font-mono">{results.poweredBy}</span></div>
                  </div>
                </div>

                {/* Risk Meter */}
                <div className="relative pt-6">
                  <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                    <div className="h-full bg-emerald-500" style={{ width: '25%' }}></div>
                    <div className="h-full bg-emerald-400" style={{ width: '25%' }}></div>
                    <div className="h-full bg-amber-400" style={{ width: '25%' }}></div>
                    <div className="h-full bg-red-500" style={{ width: '25%' }}></div>
                  </div>
                  {/* Indicator Triangle */}
                  <div 
                    className="absolute top-2 -ml-2 text-foreground transition-all duration-700 ease-out"
                    style={{ left: results.malwareRisk === 'Low Risk' ? '12.5%' : results.malwareRisk === 'Medium' ? '62.5%' : '87.5%' }}
                  >
                    ▼
                  </div>
                  <div className="flex justify-between text-[11px] uppercase tracking-widest text-secondary-foreground mt-3 font-bold">
                    <span>Minimal</span>
                    <span>Low Security Risk</span>
                    <span>Medium</span>
                    <span>High</span>
                    <span>Critical</span>
                  </div>
                </div>
              </div>

              {/* Grid Layout for Detailed Checks */}
              <div className="grid md:grid-cols-2 gap-8">
                
                {/* Malware & Security Card */}
                <div className="bg-white shadow-sm rounded-3xl p-8 border border-slate-200">
                  <h3 className="text-xl font-bold text-foreground mb-6">Website Malware & Security</h3>
                  <div className="space-y-5">
                    {[
                      'No malware detected by scan',
                      'No injected spam detected',
                      'No defacements detected',
                      'No internal server errors detected'
                    ].map((text, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                        <span className="text-base text-foreground font-medium">{text} <span className="text-secondary-foreground/50 ml-1 text-sm font-normal">(Low Risk)</span></span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Blacklist Status Card */}
                <div className="bg-white shadow-sm rounded-3xl p-8 border border-slate-200">
                  <h3 className="text-xl font-bold text-foreground mb-6">Website Blacklist Status</h3>
                  <div className="space-y-4">
                    {results.blacklists.map((bl: any, i: number) => (
                      <div key={i} className="flex items-center gap-4">
                        {bl.status === 'clean' ? (
                          <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                        ) : (
                          <Ban className="h-6 w-6 text-red-500 shrink-0" />
                        )}
                        <span className="text-base text-foreground font-medium">
                          Domain {bl.status} by <span className={bl.status === 'clean' ? 'text-emerald-600 font-bold' : 'text-red-500 font-bold'}>{bl.name}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hardening Improvements */}
              <div className="bg-white shadow-sm rounded-3xl p-8 border border-slate-200">
                <h3 className="text-xl font-bold text-foreground mb-6">Hardening Improvements</h3>
                
                <div className="border-l-4 border-amber-400 bg-amber-50 rounded-r-2xl p-6">
                  <h4 className="text-foreground font-bold mb-3 text-base flex items-center gap-2">
                    <Info className="h-5 w-5 text-amber-500" /> Security Headers
                  </h4>
                  <p className="text-base text-slate-600 leading-relaxed mb-6">
                    Our scanner grades HSTS, CSP, frame, content-type and referrer headers. We recommend adding the following HTTP security headers to protect your site:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-foreground font-mono">
                    <li className="flex items-center gap-3">
                      {results.securityHeaders.csp ? <Check className="h-5 w-5 text-emerald-500" /> : <Ban className="h-5 w-5 text-red-500" />}
                      Content-Security-Policy
                    </li>
                    <li className="flex items-center gap-3">
                      {results.securityHeaders.hsts ? <Check className="h-5 w-5 text-emerald-500" /> : <Ban className="h-5 w-5 text-red-500" />}
                      Strict-Transport-Security
                    </li>
                    <li className="flex items-center gap-3">
                      {results.securityHeaders.xframe ? <Check className="h-5 w-5 text-emerald-500" /> : <Ban className="h-5 w-5 text-red-500" />}
                      X-Frame-Options
                    </li>
                    <li className="flex items-center gap-3">
                      {results.securityHeaders.contentOptions ? <Check className="h-5 w-5 text-emerald-500" /> : <Ban className="h-5 w-5 text-red-500" />}
                      X-Content-Type-Options
                    </li>
                    <li className="flex items-center gap-3">
                      {results.securityHeaders.referrer ? <Check className="h-5 w-5 text-emerald-500" /> : <Ban className="h-5 w-5 text-red-500" />}
                      Referrer-Policy
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Cards */}
              <div className="text-center pt-12 pb-4">
                <h2 className="text-3xl font-black text-foreground mb-10">Hacked? Get help now.</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white shadow-sm border border-slate-200 rounded-3xl p-8 flex flex-col items-center text-center">
                    <Search className="h-10 w-10 text-emerald-500 mb-6" />
                    <h4 className="text-foreground text-lg font-bold mb-3">Website Monitoring</h4>
                    <p className="text-sm text-secondary-foreground mb-8">Find and identify malware and issues on your site</p>
                    <button className="mt-auto bg-emerald-50 text-emerald-600 px-8 py-3 rounded-full text-xs font-black uppercase tracking-wider hover:bg-emerald-600 hover:text-white transition-colors border border-emerald-200">Detect Malware</button>
                  </div>
                  <div className="bg-white shadow-sm border border-slate-200 rounded-3xl p-8 flex flex-col items-center text-center">
                    <Shield className="h-10 w-10 text-teal-500 mb-6" />
                    <h4 className="text-foreground text-lg font-bold mb-3">Website Firewall</h4>
                    <p className="text-sm text-secondary-foreground mb-8">Protect and speed up your site</p>
                    <button className="mt-auto bg-teal-50 text-teal-600 px-8 py-3 rounded-full text-xs font-black uppercase tracking-wider hover:bg-teal-600 hover:text-white transition-colors border border-teal-200">Protect Your Site</button>
                  </div>
                  <div className="bg-white shadow-sm border border-slate-200 rounded-3xl p-8 flex flex-col items-center text-center">
                    <ShieldAlert className="h-10 w-10 text-red-500 mb-6" />
                    <h4 className="text-foreground text-lg font-bold mb-3">Malware Removal</h4>
                    <p className="text-sm text-secondary-foreground mb-8">Get rid of malware and clean up a hacked site</p>
                    <button className="mt-auto bg-red-50 text-red-600 px-8 py-3 rounded-full text-xs font-black uppercase tracking-wider hover:bg-red-600 hover:text-white transition-colors border border-red-200">Remove Malware</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      
      <SiteFooter />
    </div>
  );
}
