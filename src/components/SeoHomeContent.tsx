import { Link } from "@tanstack/react-router";
import { 
  ShieldCheck, Globe2, Terminal, ShieldAlert, Gamepad2, 
  Search, ArrowRight, Activity, Zap, CheckCircle2, Lock, Database
} from "lucide-react";

export function SeoHomeContent() {
  const popularSearches = [
    { title: "My IP checker", link: "/my-ip", desc: "Instantly check your live public IPv4/IPv6, ISP, and location" },
    { title: "IP Checker malicious", link: "/blacklist", desc: "Scan IP address against 50+ DNSBL and RBL threat databases" },
    { title: "IP Checker cmd", link: "/blog", desc: "Tutorial on finding local & public IP using Windows CMD & PowerShell" },
    { title: "IP Checker Minecraft", link: "/blog", desc: "Check Minecraft server port 25565 reachability & SRV records" },
    { title: "IP checker blacklist", link: "/blacklist", desc: "Test server IP against Spamhaus, Barracuda, and SpamCop feeds" },
    { title: "IP checker nord / VPN", link: "/my-ip", desc: "Verify if your VPN is masking your IP or leaking WebRTC data" },
    { title: "Reverse IP address lookup", link: "/whois", desc: "Find all websites and virtual hosts hosted on a single IP address" },
    { title: "IP checker website security", link: "/headers", desc: "Audit HSTS, CSP, X-Frame, and TLS headers for cyber vulnerabilities" },
  ];

  return (
    <div className="mt-16 max-w-5xl mx-auto space-y-12">
      {/* PEOPLE ALSO SEARCH FOR SECTION */}
      <div className="bg-white border border-slate-200 rounded-[36px] p-8 sm:p-12 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-100 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Search className="h-3.5 w-3.5" />
              <span>Trending Queries</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">People Also Search For</h2>
            <p className="text-sm text-secondary-foreground mt-1">Explore our most popular IP checking tools, tutorials, and security diagnostics.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularSearches.map((s, idx) => (
            <Link
              key={idx}
              to={s.link}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all group flex flex-col justify-between shadow-xs"
            >
              <div>
                <span className="text-xs font-mono font-bold text-emerald-600 mb-1.5 block">#{s.title}</span>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                <span>Launch Check</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CORE INTELLIGENCE CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-6">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3">Cyber Security &amp; Vulnerability Check</h3>
          <p className="text-sm text-secondary-foreground leading-relaxed">
            Inspired by enterprise standards from NCSC and Trend Micro. Check your IP address to verify if your server or home router exhibits open ports, weak security headers, or compromised credentials.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
          <div className="h-12 w-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center mb-6">
            <Globe2 className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3">Enriched Geolocation &amp; MaxMind Tracking</h3>
          <p className="text-sm text-secondary-foreground leading-relaxed">
            Cross-reference IPv4 and IPv6 addresses across multi-provider GeoIP databases. Retrieve exact country, state/region, city coordinates, ASN ownership, and ISP routing tables.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
          <div className="h-12 w-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mb-6">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3">50+ Real-Time Blacklists (DNSBL / RBL)</h3>
          <p className="text-sm text-secondary-foreground leading-relaxed">
            Instantly query authoritative anti-spam databases like Spamhaus ZEN, Barracuda Central, SpamCop, and AbuseIPDB to prevent email delivery failure and identify cyber attacks.
          </p>
        </div>
      </div>

      {/* COMPARISON TABLE */}
      <div className="bg-white border border-slate-200 rounded-[36px] p-8 sm:p-12 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-2">Why Choose DNSChecker?</h3>
          <p className="text-sm text-secondary-foreground">Compare our high-performance network diagnostic toolkit with traditional IP lookup services.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-secondary-foreground font-mono">
                <th className="py-4 px-4 font-bold">Feature / Capability</th>
                <th className="py-4 px-4 font-bold text-emerald-600">DNSChecker.space</th>
                <th className="py-4 px-4 font-bold text-slate-400">Traditional IP Checkers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr>
                <td className="py-4 px-4 text-foreground">100% Free &amp; No Registration</td>
                <td className="py-4 px-4 text-emerald-600 font-bold flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> Unlimited Free</td>
                <td className="py-4 px-4 text-slate-500">Requires Signup / Paid API</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-foreground">PC Local IP (LAN) Detection</td>
                <td className="py-4 px-4 text-emerald-600 font-bold flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> Live WebRTC Adapter</td>
                <td className="py-4 px-4 text-slate-500">Not Available</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-foreground">WebRTC &amp; VPN Leak Testing</td>
                <td className="py-4 px-4 text-emerald-600 font-bold flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> Automatic STUN Audit</td>
                <td className="py-4 px-4 text-slate-500">Manual / Separate Tool</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-foreground">50+ DNSBL / RBL Blacklist Query</td>
                <td className="py-4 px-4 text-emerald-600 font-bold flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> Real-time DNS Resolution</td>
                <td className="py-4 px-4 text-slate-500">Cached / Limited Feeds</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-foreground">Command-Line / CMD Guide Center</td>
                <td className="py-4 px-4 text-emerald-600 font-bold flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> Comprehensive Tutorials</td>
                <td className="py-4 px-4 text-slate-500">Ad-cluttered blogs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILED FAQ ACCORDION */}
      <div className="bg-white border border-slate-200 rounded-[36px] p-8 sm:p-12 shadow-sm">
        <h3 className="text-2xl sm:text-3xl font-black text-foreground mb-8 tracking-tight">Frequently Asked Questions (FAQ)</h3>
        
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
          <div>
            <h4 className="font-bold text-foreground text-base mb-1.5">What is an IP checker and what does it show?</h4>
            <p className="text-sm text-secondary-foreground leading-relaxed">
              An IP checker resolves your device’s current public IP address (IPv4 or IPv6), physical location (country, state, city, zip code), Internet Service Provider (ISP), Autonomous System Number (ASN), and active connection status.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground text-base mb-1.5">How do I check my IP address using Command Prompt (CMD)?</h4>
            <p className="text-sm text-secondary-foreground leading-relaxed">
              Open Windows CMD and type <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">ipconfig</code> to see your internal local network IP. To view your public IP from CMD, run <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">curl ifconfig.me</code>.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground text-base mb-1.5">Can an IP address checker detect VPNs or Proxies?</h4>
            <p className="text-sm text-secondary-foreground leading-relaxed">
              Yes. DNSChecker compares your IP against commercial datacenter subnets, VPN endpoints (such as NordVPN, ExpressVPN, Surfshark), and Tor exit nodes. It also tests your browser for WebRTC leaks.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground text-base mb-1.5">How do I check if an IP address is malicious?</h4>
            <p className="text-sm text-secondary-foreground leading-relaxed">
              Use our Blacklist Checker to test any IP or domain against 50+ DNS-based spam and threat feeds (including Spamhaus, AbuseIPDB, and Barracuda) to determine if it has been reported for brute-force attacks or spam.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground text-base mb-1.5">How can I check a Minecraft server IP and port?</h4>
            <p className="text-sm text-secondary-foreground leading-relaxed">
              Enter the Minecraft server IP or domain in our Port Scanner tool to verify if port 25565 (default Minecraft port) is open, and use our DNS Lookup to test its SRV records.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground text-base mb-1.5">What is a Reverse IP address lookup?</h4>
            <p className="text-sm text-secondary-foreground leading-relaxed">
              A reverse IP lookup identifies all domain names hosted on the same server IP address. It is frequently used by security analysts to uncover shared hosting neighbors and investigate phishing campaigns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
