import { createFileRoute, Link } from "@tanstack/react-router";
import { Seo } from "@/components/Seo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useState } from "react";
import { 
  Terminal, ShieldAlert, Gamepad2, Search, Globe, ShieldCheck, 
  ArrowRight, Copy, Check, BookOpen, Clock, Tag, ExternalLink,
  Cpu, Zap, ChevronRight, Hash, Network, Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Network & IP Intelligence Blog - DNSChecker Guides" },
      { name: "description", content: "Expert guides on IP address lookups, checking IP via CMD, malicious IP blacklist detection, Minecraft server IP testing, and reverse IP lookup." },
      { name: "keywords", content: "ip checker, my ip checker, ip checker cmd, ip checker malicious, ip checker minecraft, ip checker blacklist, reverse ip address lookup, vpn leak test" },
      { property: "og:title", content: "Network & IP Intelligence Blog - DNSChecker" },
      { property: "og:description", content: "Expert technical tutorials and network intelligence guides." },
      { property: "og:url", content: "https://dnschecker.space/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: "CMD & Terminal" | "Security & Blacklist" | "Minecraft" | "Reverse IP" | "VPN & Privacy" | "Fundamentals";
  readTime: string;
  date: string;
  tags: string[];
  excerpt: string;
  toolLink: string;
  toolName: string;
  content: React.ReactNode;
}

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeArticleId, setActiveArticleId] = useState<string>("ip-checker-cmd");
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const articles: Article[] = [
    {
      id: "ip-checker-cmd",
      title: "How to Check Your IP Address Using CMD (Command Prompt & PowerShell)",
      subtitle: "A complete step-by-step terminal guide for Windows, Mac, and Linux users.",
      category: "CMD & Terminal",
      readTime: "4 min read",
      date: "October 2026",
      tags: ["ip checker cmd", "ipconfig", "curl ifconfig.me", "powershell ip", "terminal ip lookup"],
      toolLink: "/my-ip",
      toolName: "Check Live Public IP Online",
      excerpt: "Learn how to find your local LAN IP and external public IPv4/IPv6 directly from Windows Command Prompt, PowerShell, and Unix bash terminals.",
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            Whether you are troubleshooting a home router, configuring remote desktop access, or diagnosing a network connectivity issue, checking your IP address via the command line is one of the fastest and most reliable methods available.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6">1. Finding Your Local Network (LAN) IP in Windows CMD</h3>
          <p>
            To find the private IP address assigned to your PC by your Wi-Fi router (usually in the <code>192.168.x.x</code> or <code>10.x.x.x</code> range):
          </p>
          <div className="relative p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-sm shadow-md">
            <button 
              onClick={() => copyCode("ipconfig", "cmd1")}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {copiedSnippet === "cmd1" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
            <code>ipconfig</code>
          </div>
          <p className="text-sm text-slate-500">
            Look for <strong>IPv4 Address</strong> (e.g. <code>192.168.1.15</code>) and <strong>Default Gateway</strong> (e.g. <code>192.168.1.1</code>).
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6">2. Finding Your Public IP Address Using CMD &amp; cURL</h3>
          <p>
            Your local router masks your device behind a single public IP. To see the actual IP address that websites and internet servers see:
          </p>
          <div className="relative p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-sm shadow-md">
            <button 
              onClick={() => copyCode("curl -4 ifconfig.me", "cmd2")}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {copiedSnippet === "cmd2" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
            <code>curl -4 ifconfig.me</code>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mt-6">3. Checking IP in PowerShell</h3>
          <div className="relative p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-sm shadow-md">
            <button 
              onClick={() => copyCode("(Invoke-WebRequest -Uri 'https://api.ipify.org').Content", "cmd3")}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {copiedSnippet === "cmd3" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
            <code>(Invoke-WebRequest -Uri 'https://api.ipify.org').Content</code>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mt-6">4. Mac and Linux Terminal Commands</h3>
          <p>On macOS or Linux, run:</p>
          <div className="relative p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-sm shadow-md">
            <button 
              onClick={() => copyCode("ip addr show || ifconfig", "cmd4")}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {copiedSnippet === "cmd4" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
            <code>ip addr show || ifconfig</code>
          </div>
        </div>
      )
    },
    {
      id: "ip-checker-malicious",
      title: "IP Checker Malicious: How to Check if an IP is Blacklisted or Dangerous",
      subtitle: "Detect compromised IPs, brute-force bots, spam sources, and malware hosts.",
      category: "Security & Blacklist",
      readTime: "6 min read",
      date: "October 2026",
      tags: ["ip checker malicious", "ip checker blacklist", "abuseipdb", "spamhaus", "dnsbl checker", "cybersecurity"],
      toolLink: "/blacklist",
      toolName: "Run 50+ DNSBL Blacklist Check",
      excerpt: "Understand how Real-time Blacklists (RBLs), Spamhaus, AbuseIPDB, and threat feeds evaluate whether an IP address is malicious or safe.",
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            Cybersecurity engineers and system administrators frequently receive alerts regarding incoming connection requests or failed login attempts. An <strong>IP Checker Malicious lookup</strong> queries real-time threat intelligence feeds to verify whether an IP has been flagged for criminal or automated spam activities.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6">What Flags an IP Address as Malicious?</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>SSH &amp; RDP Brute-Force Probes:</strong> Automated bots attempting thousands of default credential combinations across ports 22 and 3389.</li>
            <li><strong>Email Spam Traps:</strong> Sending unauthorized bulk marketing or phishing emails that trigger Spamhaus and Barracuda honeypots.</li>
            <li><strong>Malware Command &amp; Control (C2):</strong> Infected IoT cameras, servers, or home routers participating in DDoS botnet swarms.</li>
            <li><strong>Open Proxy &amp; Tor Exit Nodes:</strong> Relays frequently leveraged by bad actors to hide their physical identity during web exploits.</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 mt-6">How Real-time Blacklists (DNSBL / RBL) Work</h3>
          <p>
            Blacklist providers allow network firewalls to verify an IP in sub-milliseconds by reversing its octets and resolving an A record. For example, testing <code>1.2.3.4</code> against Spamhaus queries:
          </p>
          <div className="p-4 rounded-2xl bg-slate-100 font-mono text-sm text-slate-800 border border-slate-200">
            <code>4.3.2.1.zen.spamhaus.org</code>
          </div>
          <p>
            If the DNS resolver answers with a code in the <code>127.0.0.X</code> range (e.g. <code>127.0.0.2</code> for spam), the connection is rejected at the perimeter.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6">What to Do If Your IP is Blacklisted</h3>
          <p>
            If your mail server or public IP address is blacklisted, run an audit on your network for compromised user credentials or open mail relays, resolve the issue, and submit a delisting request to the respective blacklist maintainer.
          </p>
        </div>
      )
    },
    {
      id: "ip-checker-minecraft",
      title: "Minecraft Server IP Checker: How to Find, Test & Protect Server IPs",
      subtitle: "Troubleshoot port 25565, verify SRV records, check ping latency, and prevent DDoS attacks.",
      category: "Minecraft",
      readTime: "5 min read",
      date: "October 2026",
      tags: ["ip checker minecraft", "minecraft server ip", "port 25565", "srv dns record", "ddos protection minecraft"],
      toolLink: "/ports",
      toolName: "Scan Minecraft Port 25565",
      excerpt: "Step-by-step guide on resolving Minecraft server IPs, configuring DNS SRV records, verifying port forwarding, and measuring server ping latency.",
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            Hosting a Minecraft multiplayer world or managing a dedicated gaming community requires a solid grasp of IP addressing, DNS resolution, and port reachability.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6">Default Minecraft Server Port</h3>
          <p>
            Minecraft Java Edition communicates over <strong>TCP port 25565</strong> by default. If you host a server from your home PC, your friends cannot connect until you forward TCP port 25565 inside your router settings to your computer’s local IP (e.g. <code>192.168.1.100</code>).
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6">Connecting via Custom Domain with DNS SRV Records</h3>
          <p>
            Instead of forcing players to remember an IP and port like <code>203.0.113.50:25565</code>, professional server admins create a DNS <strong>SRV record</strong>:
          </p>
          <div className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-sm shadow-md">
            <code>_minecraft._tcp.play.yourdomain.com. 3600 IN SRV 0 5 25565 mc.yourdomain.com.</code>
          </div>
          <p>
            The Minecraft client automatically queries this SRV record to discover the target server and port seamlessly.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6">Protecting Your Home IP from DDoS Attacks</h3>
          <p>
            Never give out your personal home public IP to strangers in public gaming forums. Attackers can execute simple UDP flood attacks to knock your home network offline. Always use reverse-proxy tunnels (like TCPShield, Cloudflare Spectrum, or a cheap VPS proxy) to shield your origin server.
          </p>
        </div>
      )
    },
    {
      id: "reverse-ip-lookup",
      title: "Reverse IP Address Lookup: Find All Domains Hosted on a Single IP",
      subtitle: "Uncover virtual hosts, shared hosting neighbors, and hidden cyber attack surfaces.",
      category: "Reverse IP",
      readTime: "5 min read",
      date: "October 2026",
      tags: ["reverse ip address lookup", "reverse ip lookup", "shared hosting", "osint", "domain discovery"],
      toolLink: "/whois",
      toolName: "Run WHOIS & RDAP Lookup",
      excerpt: "Discover how reverse IP lookups reveal all domain names sharing the same web server infrastructure, ideal for competitor research and OSINT investigation.",
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            A <strong>Reverse IP Lookup</strong> takes an IP address and queries passive DNS records to determine all domain names and hostnames that resolve to that specific machine.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6">Why Reverse IP Lookups Matter</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Shared Hosting Audit:</strong> When you buy cheap shared web hosting, dozens (or thousands) of other websites share your same server IP. If one neighbor sends spam or hosts phishing campaigns, your own site’s reputation can suffer.</li>
            <li><strong>Attacker Infrastructure Mapping:</strong> In threat hunting and OSINT investigations, identifying other sites on an attacker’s C2 server uncovers related malware distribution campaigns.</li>
            <li><strong>Competitor Analysis:</strong> Discover development staging subdomains, testing platforms, or affiliated network properties owned by a competitor.</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 mt-6">Forward DNS vs. Reverse DNS (PTR)</h3>
          <p>
            Standard DNS maps names to numbers (<code>example.com</code> &rarr; <code>93.184.216.34</code>). Reverse DNS uses special <strong>PTR records</strong> hosted in the <code>in-addr.arpa</code> zone to map the IP back to its official canonical server hostname.
          </p>
        </div>
      )
    },
    {
      id: "webrtc-vpn-leak-test",
      title: "WebRTC & VPN Leak Test: How to Check if Your Real IP is Exposed",
      subtitle: "Understand WebRTC STUN vulnerabilities, DNS leaks, and browser fingerprinting.",
      category: "VPN & Privacy",
      readTime: "6 min read",
      date: "October 2026",
      tags: ["ip checker nord", "vpn leak test", "webrtc leak test", "browser fingerprinting", "hide my ip"],
      toolLink: "/my-ip",
      toolName: "Run Live WebRTC Leak Test",
      excerpt: "Learn how WebRTC protocols can leak your actual residential IP address even when connected to an encrypted VPN tunnel, and how to verify your security.",
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            Virtual Private Networks (VPNs) encrypt your internet traffic and route it through a remote server, replacing your ISP-issued IP address with the VPN’s IP. However, many users assume they are 100% anonymous without realizing that <strong>WebRTC leaks</strong> and <strong>DNS leaks</strong> can silently reveal their true location.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6">What is a WebRTC Leak?</h3>
          <p>
            WebRTC (Web Real-Time Communication) is built into modern browsers (Chrome, Firefox, Safari, Edge) to enable real-time voice and video calls without browser plugins. To establish direct peer connections between users behind NAT routers, WebRTC uses <strong>STUN (Session Traversal Utilities for NAT)</strong> servers.
          </p>
          <p>
            During this STUN query, your browser automatically requests its public and local IP addresses. If your VPN does not block or route these STUN requests, JavaScript on any website can read your true IP directly from the browser!
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6">How Our Tool Tests for WebRTC Leaks</h3>
          <p>
            Our IP Checker runs a live WebRTC test right inside your browser. We initiate a localized RTCPeerConnection and compare the returned candidate IP with your external public IP. If the two match or your residential IP is visible, our system highlights the leak in real time.
          </p>
        </div>
      )
    },
    {
      id: "what-is-my-ip-guide",
      title: "What Is My IP Address? Complete Guide to Public, Private & Local IPs",
      subtitle: "The definitive guide to IPv4, IPv6, NAT routing, and how websites trace your digital footprint.",
      category: "Fundamentals",
      readTime: "7 min read",
      date: "October 2026",
      tags: ["what is my ip", "my ip address", "public vs private ip", "ipv4 vs ipv6", "ip tracker"],
      toolLink: "/lookup",
      toolName: "Look Up Any IP Geolocation",
      excerpt: "Comprehensive explanation of how IP addresses work, the mathematical difference between 32-bit IPv4 and 128-bit IPv6, and what an IP reveals about you.",
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            Every single device connected to the internet—your smartphone, laptop, smart TV, or home Wi-Fi router—requires an Internet Protocol (IP) address to send and receive data packets across the global web.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6">Public IP vs. Private (Local) IP</h3>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">Public IP Address</h4>
              <p className="text-sm text-slate-600">Assigned by your Internet Service Provider (ISP). Globally unique and routable across the entire world wide web.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">Private (Local) IP</h4>
              <p className="text-sm text-slate-600">Assigned by your local home router via DHCP (e.g. 192.168.1.X). Used only within your internal home or office network.</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mt-6">IPv4 vs. IPv6</h3>
          <p>
            IPv4 addresses consist of 32 bits divided into four decimal numbers separated by dots (e.g. <code>172.217.16.142</code>). Because IPv4 is limited to roughly 4.3 billion unique combinations, the internet transition to IPv6 (128-bit hexadecimal strings like <code>2001:4860:4860::8888</code>) ensures there will never be a shortage of addresses.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6">What Information Can Be Extracted from an IP?</h3>
          <p>
            An IP lookup provides the country, state/province, approximate city, postal code, ISP name, and Autonomous System Number (ASN). It <strong>cannot</strong> reveal your personal name, physical street address, or phone number.
          </p>
        </div>
      )
    }
  ];

  const categories = ["All", "CMD & Terminal", "Security & Blacklist", "Minecraft", "Reverse IP", "VPN & Privacy", "Fundamentals"];

  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  const activeArticle = articles.find(a => a.id === activeArticleId) || articles[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-emerald-500/20">
      <Seo 
        title="Network & IP Intelligence Blog - DNSChecker Guides" 
        description="Expert technical tutorials on checking IP via CMD, malicious IP blacklist detection, Minecraft server IP checks, reverse IP lookups, and WebRTC privacy." 
        keywords="ip checker, my ip checker, ip checker cmd, ip checker malicious, ip checker minecraft, ip checker blacklist, reverse ip address lookup, vpn leak test, what is my ip"
        url="https://dnschecker.space/blog"
      />
      <SiteHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-12">
        {/* HERO BANNER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Network Knowledge Base &amp; Technical Guides</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Network Intelligence &amp; <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">IP Analysis Hub</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            In-depth guides on Command Prompt networking, cyber threat intelligence, server management, and privacy auditing.
          </p>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
                selectedCategory === cat 
                  ? "bg-slate-900 text-white shadow-md scale-105" 
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID LAYOUT: ARTICLE LIST & ACTIVE ARTICLE VIEWER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ARTICLE SELECTOR (LEFT COLUMN) */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 px-1">
              Popular Tutorials ({filteredArticles.length})
            </h2>
            {filteredArticles.map((article) => {
              const isSelected = activeArticle.id === article.id;
              return (
                <div
                  key={article.id}
                  onClick={() => setActiveArticleId(article.id)}
                  className={`cursor-pointer p-6 rounded-3xl border transition-all text-left group ${
                    isSelected 
                      ? "bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/10" 
                      : "bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className={`text-base font-bold transition-colors mb-2 leading-snug ${
                    isSelected ? "text-emerald-700" : "text-slate-900 group-hover:text-emerald-600"
                  }`}>
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {article.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ACTIVE ARTICLE READER (RIGHT COLUMN) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm sticky top-24">
            <div className="border-b border-slate-100 pb-6 mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="h-3.5 w-3.5" />
                  {activeArticle.readTime}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Updated: {activeArticle.date}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight mb-3">
                {activeArticle.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                {activeArticle.subtitle}
              </p>

              {/* ACTION TOOL CALLOUT */}
              <div className="mt-6 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">Try this tool now:</span>
                  <span className="text-sm text-emerald-950 font-medium">{activeArticle.toolName}</span>
                </div>
                <Link
                  to={activeArticle.toolLink}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs shrink-0"
                >
                  <span>Launch Tool</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* ARTICLE BODY */}
            <div className="prose prose-slate max-w-none">
              {activeArticle.content}
            </div>

            {/* ARTICLE FOOTER KEYWORDS */}
            <div className="mt-10 pt-6 border-t border-slate-100">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-3">Related Search Queries &amp; Tags</span>
              <div className="flex flex-wrap gap-2">
                {activeArticle.tags.map(t => (
                  <span key={t} className="text-xs px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
