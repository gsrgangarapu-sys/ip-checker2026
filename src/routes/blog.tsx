import { createFileRoute, Link } from "@tanstack/react-router";
import { Seo } from "@/components/Seo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useState, useMemo } from "react";
import { 
  Terminal, ShieldAlert, Gamepad2, Search, Globe, ShieldCheck, 
  ArrowRight, Copy, Check, BookOpen, Clock, Tag, ExternalLink,
  Cpu, Zap, ChevronRight, Hash, Network, Layers, Mail, Server,
  Lock, AlertTriangle, CheckCircle2, Info, Share2, Compass
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "DNS, IP & SSL Intelligence Knowledge Base | DNSChecker Guides" },
      { name: "description", content: "Comprehensive engineering tutorials on global DNS propagation, website to IP lookups, SSL certificate validation, malicious IP detection, and email security." },
      { name: "keywords", content: "dns check, website ip checker, ssl check, dns propagation check, email security check, port scanner, ip checker cmd, ip checker malicious, reverse ip lookup, what is my ip" },
      { property: "og:title", content: "DNS, IP & SSL Intelligence Knowledge Base | DNSChecker" },
      { property: "og:description", content: "In-depth network engineering guides, cybersecurity tutorials, and lookup diagnostics." },
      { property: "og:url", content: "https://dnschecker.space/blog" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" }
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

type ArticleCategory = 
  | "All" 
  | "DNS & Domain" 
  | "Website & Hosting" 
  | "SSL & TLS" 
  | "Email & Deliverability" 
  | "Security & Blacklist" 
  | "CMD & Terminal" 
  | "Minecraft & Gaming" 
  | "VPN & Privacy" 
  | "Fundamentals";

interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: ArticleCategory;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
  excerpt: string;
  toolLink: string;
  toolName: string;
  content: React.ReactNode;
}

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticleId, setActiveArticleId] = useState<string>("dns-check-propagation-guide");
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const articles: Article[] = [
    {
      id: "dns-check-propagation-guide",
      title: "DNS Check & Global Propagation: How to Verify Domain DNS Records in Real Time",
      subtitle: "A deep dive into A, AAAA, MX, CNAME, TXT records, nameserver hierarchies, and resolving TTL propagation delays.",
      category: "DNS & Domain",
      readTime: "7 min read",
      date: "October 2026",
      author: "DNSChecker Network Engineering Team",
      tags: ["dns check", "dns checker", "dns propagation check", "a record lookup", "mx record test", "flush dns cache", "txt verification"],
      toolLink: "/dns",
      toolName: "Perform Live Global DNS Lookup",
      excerpt: "Learn how the Domain Name System resolves human domains into IP addresses, why propagation takes up to 48 hours, and how to verify global DNS records instantly.",
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            When you enter a web address such as <code>dnschecker.space</code> into your browser, an intricate multi-tier lookup sequence executes in under 20 milliseconds. Understanding how to perform a <strong>DNS check</strong> and track global propagation is essential for web developers, DevOps engineers, and system administrators.
          </p>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Compass className="h-5 w-5 text-emerald-600" />
              <span>The 4 Stages of DNS Resolution</span>
            </h4>
            <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono mt-3">
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="font-bold text-emerald-700 block">1. DNS Recursive Resolver</span>
                Queries local ISP cache or public DNS (8.8.8.8, 1.1.1.1).
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="font-bold text-emerald-700 block">2. Root Nameserver (.)</span>
                Directs the resolver to the appropriate TLD (.com, .space, .org).
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="font-bold text-emerald-700 block">3. TLD Nameserver</span>
                Directs query to the domain's authoritative nameserver.
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="font-bold text-emerald-700 block">4. Authoritative Nameserver</span>
                Returns the final IP address (A / AAAA record) to load the site.
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mt-8">Primary DNS Record Types You Must Check</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>A Record (Address):</strong> Maps domain names directly to 32-bit IPv4 addresses (e.g., <code>104.21.45.10</code>).</li>
            <li><strong>AAAA Record (IPv6):</strong> Maps domains to 128-bit modern IPv6 addresses.</li>
            <li><strong>CNAME (Canonical Name):</strong> Aliases one domain name to another (e.g., <code>www.site.com</code> &rarr; <code>site.com</code>).</li>
            <li><strong>MX (Mail Exchange):</strong> Dictates which mail servers receive inbound emails for the domain with defined priority levels.</li>
            <li><strong>TXT Record:</strong> Carries machine-readable text used for Google site verification, SPF, and DKIM security policies.</li>
            <li><strong>SOA (Start of Authority):</strong> Contains critical administrative metadata, serial numbers, and refresh intervals.</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 mt-8">Why Does DNS Propagation Take So Long?</h3>
          <p>
            When you update your domain's nameservers or IP addresses, the changes are not immediately visible everywhere in the world. This lag is called <strong>DNS propagation</strong>. It is governed by your record's <strong>TTL (Time To Live)</strong> value.
          </p>
          <p>
            If your TTL is configured for <code>86400 seconds</code> (24 hours), recursive resolvers around the globe will cache and serve the old IP address for a full day before querying your authoritative nameservers for updates.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8">How to Force Flush Local DNS Cache</h3>
          <p>
            If your website has been updated but your computer continues loading the old version, flush your operating system's local DNS resolver cache:
          </p>
          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Windows (Command Prompt):</span>
              <div className="relative p-3.5 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-sm shadow-sm">
                <button 
                  onClick={() => copyCode("ipconfig /flushdns", "dns-cmd1")}
                  className="absolute top-2.5 right-2.5 p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  {copiedSnippet === "dns-cmd1" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
                <code>ipconfig /flushdns</code>
              </div>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">macOS Terminal:</span>
              <div className="relative p-3.5 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-sm shadow-sm">
                <button 
                  onClick={() => copyCode("sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder", "dns-cmd2")}
                  className="absolute top-2.5 right-2.5 p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  {copiedSnippet === "dns-cmd2" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
                <code>sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder</code>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "website-to-ip-lookup-guide",
      title: "Website to IP Checker: How to Find the True Hosting IP & Server Location of Any Site",
      subtitle: "Unmasking reverse proxies, discovering origin servers, ASN routing, and datacenter provider identification.",
      category: "Website & Hosting",
      readTime: "6 min read",
      date: "October 2026",
      author: "DNSChecker Security Research Team",
      tags: ["website to ip", "website ip checker", "find website ip address", "hosting ip lookup", "who is hosting this site", "nslookup website"],
      toolLink: "/hosting",
      toolName: "Check Website Hosting & Server Provider",
      excerpt: "Learn how to convert any domain or website URL into its physical server IP address, determine its web hosting provider, and trace network geolocation.",
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            Every website on the internet is hosted on a physical server or cloud computing cluster identified by a numeric IP address. A <strong>Website to IP Checker</strong> resolves domain names to their underlying web host, autonomous system, and geographic coordinates.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6">Origin Server IP vs. CDN / Proxy IP</h3>
          <p>
            When analyzing a website's IP address, you will typically encounter one of two network topologies:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-3">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-500" />
                <span>Reverse Proxy / CDN IP</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Platforms like Cloudflare, Fastly, or Akamai intercept visitor traffic. The resolved IP belongs to their global edge network rather than the host server.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Server className="h-4 w-4 text-emerald-600" />
                <span>Origin Server IP</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The actual machine running Apache, Nginx, or LiteSpeed (e.g. AWS EC2, DigitalOcean droplet, or dedicated rack) where the source files and database reside.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mt-6">How to Check Website IP via Command Line (Terminal)</h3>
          <p>You can instantly resolve any website to its IP address using <code>nslookup</code>, <code>dig</code>, or <code>ping</code>:</p>
          <div className="relative p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-sm shadow-md">
            <button 
              onClick={() => copyCode("nslookup dnschecker.space", "web-ip-cmd")}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {copiedSnippet === "web-ip-cmd" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
            <code>nslookup dnschecker.space</code>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mt-6">Why Website to IP Intelligence Matters</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Competitor Hosting Analysis:</strong> Discover whether a competitor is using AWS, Google Cloud, Hetzner, or OVH.</li>
            <li><strong>Investigating Malicious Sites:</strong> Identify phishing domains that share the same bulletproof hosting subnet.</li>
            <li><strong>Server Migration Testing:</strong> Test a new server IP locally before pointing live domain nameservers.</li>
          </ul>
        </div>
      )
    },
    {
      id: "ssl-certificate-checker-guide",
      title: "SSL Certificate Checker: How to Verify TLS Security, Certificate Chains & Expiry",
      subtitle: "Diagnose TLS 1.3 handshakes, intermediate CA trust paths, wildcard certificates, and common HTTPS installation errors.",
      category: "SSL & TLS",
      readTime: "6 min read",
      date: "October 2026",
      author: "DNSChecker Cryptography Lab",
      tags: ["ssl check", "ssl certificate checker", "check ssl certificate", "verify ssl installation", "tls handshake test", "ssl expiry check"],
      toolLink: "/ssl",
      toolName: "Verify SSL Certificate Chain & TLS Health",
      excerpt: "Comprehensive guide to auditing SSL/TLS certificates, intermediate CA trust chains, Subject Alternative Names (SANs), and solving browser certificate warnings.",
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            Modern web browsers such as Chrome, Firefox, and Safari strictly mandate HTTPS for all online communication. A single broken intermediate certificate or misconfigured expiration date will trigger full-screen security warnings (such as <code>NET::ERR_CERT_DATE_INVALID</code>), driving away 95% of visitors.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6">Anatomy of an SSL/TLS Certificate Chain</h3>
          <p>
            An SSL installation is never just a single file. It represents a cryptographic hierarchy of trust:
          </p>
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-start gap-3">
              <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">1</span>
              <div>
                <strong className="text-slate-900 block text-sm">Root Certificate Authority (CA)</strong>
                <span className="text-xs text-slate-500">Embedded directly in operating systems and browsers (e.g. DigiCert, IdenTrust, Sectigo).</span>
              </div>
            </div>
            <div className="h-4 w-0.5 bg-slate-300 ml-5" />
            <div className="flex items-start gap-3">
              <span className="px-2.5 py-1 rounded-md bg-teal-100 text-teal-800 text-xs font-mono font-bold">2</span>
              <div>
                <strong className="text-slate-900 block text-sm">Intermediate Certificate</strong>
                <span className="text-xs text-slate-500">Isolates the root key from everyday signing. Must be bundled on your web server (e.g., Let's Encrypt R3).</span>
              </div>
            </div>
            <div className="h-4 w-0.5 bg-slate-300 ml-5" />
            <div className="flex items-start gap-3">
              <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-mono font-bold">3</span>
              <div>
                <strong className="text-slate-900 block text-sm">Server / Leaf Certificate</strong>
                <span className="text-xs text-slate-500">Issued specifically for your domain name (e.g., <code>dnschecker.space</code> and <code>*.dnschecker.space</code>).</span>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mt-6">Testing SSL Handshake via OpenSSL Command Line</h3>
          <p>System engineers can audit live TLS handshakes and print server certificate chains directly in terminal:</p>
          <div className="relative p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-sm shadow-md">
            <button 
              onClick={() => copyCode("openssl s_client -connect dnschecker.space:443 -servername dnschecker.space", "openssl-cmd")}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {copiedSnippet === "openssl-cmd" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
            <code>openssl s_client -connect dnschecker.space:443 -servername dnschecker.space</code>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mt-6">Top 3 Common SSL Installation Errors</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Incomplete Certificate Chain:</strong> Forgetting to install the intermediate bundle file. Works on desktop browsers that cache intermediates, but fails completely on Android and mobile devices.</li>
            <li><strong>Subject Alternative Name (SAN) Mismatch:</strong> Buying a cert for <code>example.com</code> but forgetting to include <code>www.example.com</code>.</li>
            <li><strong>Mixed Content Warnings:</strong> Serving your HTML over HTTPS while loading images, fonts, or scripts via unencrypted <code>http://</code> URLs.</li>
          </ul>
        </div>
      )
    },
    {
      id: "email-security-spf-dkim-dmarc-guide",
      title: "Email Security Audit: How to Check SPF, DKIM & DMARC to Prevent Spam Blacklisting",
      subtitle: "The essential guide to email authentication protocols that ensure corporate deliverability and block domain spoofing.",
      category: "Email & Deliverability",
      readTime: "7 min read",
      date: "October 2026",
      author: "DNSChecker Deliverability Lab",
      tags: ["email security check", "spf record checker", "dkim checker", "dmarc lookup", "email blacklist check", "avoid spam folder"],
      toolLink: "/email",
      toolName: "Run Email Security & SPF/DMARC Audit",
      excerpt: "Learn how SPF, DKIM, and DMARC work together to verify legitimate email senders, prevent spoofing attacks, and keep your emails out of Gmail and Outlook spam folders.",
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            In 2026, Google, Yahoo, and Microsoft enforce strict email authentication rules. If your domain sends marketing newsletters, transactional receipts, or employee emails without proper <strong>SPF, DKIM, and DMARC</strong> records, your messages will be rejected or diverted to spam folders.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6">The Three Pillars of Email Authentication</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block text-base mb-1">1. SPF (Sender Policy Framework)</strong>
              <p className="text-xs text-slate-600 mb-2">A TXT record that lists every server IP authorized to send email on behalf of your domain name.</p>
              <div className="p-2.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs">
                <code>v=spf1 include:_spf.google.com ip4:198.51.100.25 -all</code>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block text-base mb-1">2. DKIM (DomainKeys Identified Mail)</strong>
              <p className="text-xs text-slate-600 mb-2">Cryptographically signs outbound emails with a private key. The recipient validates the signature against the public key published in your DNS.</p>
              <div className="p-2.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs truncate">
                <code>v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQ...</code>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block text-base mb-1">3. DMARC (Domain-based Message Authentication)</strong>
              <p className="text-xs text-slate-600 mb-2">Tells receiving mail servers what to do if an incoming email fails SPF or DKIM (none, quarantine, or reject).</p>
              <div className="p-2.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs">
                <code>v=DMARC1; p=reject; rua=mailto:dmarc-reports@yourdomain.com</code>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mt-6">Why Reverse DNS (PTR) Matters for Mail Delivery</h3>
          <p>
            When a server transmits email, the receiving server executes a reverse DNS lookup on the sender's IP address. If the PTR record does not resolve to the sending hostname configured in your SMTP HELO handshake, major providers will reject the mail connection immediately.
          </p>
        </div>
      )
    },
    {
      id: "port-scanner-open-ports-guide",
      title: "Port Scanner Guide: How to Check Open Ports & Audit Server Firewall Exposure",
      subtitle: "Probe standard web, database, and administrative ports (80, 443, 22, 21, 3306, 8080) to secure network perimeters.",
      category: "Security & Blacklist",
      readTime: "5 min read",
      date: "October 2026",
      author: "DNSChecker Cyber Defence Unit",
      tags: ["port scanner", "check open ports", "test open port", "port 80 443 22", "firewall port check", "network security"],
      toolLink: "/ports",
      toolName: "Probe Common Ports with Port Scanner",
      excerpt: "Step-by-step guide on how port scanning works, understanding open vs filtered port states, and auditing server exposures before malicious hackers find them.",
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            Every computer and server connected to the internet has 65,535 TCP ports and 65,535 UDP ports. Operating systems use these ports to route network traffic to specific software applications. A <strong>port scanner</strong> probes target IP addresses to determine which service entry points are exposed to the public.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6">Essential Service Ports &amp; Their Functions</h3>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden">
              <thead className="bg-slate-50 border-b border-slate-200 font-mono uppercase text-slate-600">
                <tr>
                  <th className="p-3">Port</th>
                  <th className="p-3">Protocol</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Security Recommended Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr>
                  <td className="p-3 font-bold text-emerald-600">80 &amp; 443</td>
                  <td className="p-3">TCP</td>
                  <td className="p-3">HTTP / HTTPS Web Traffic</td>
                  <td className="p-3 text-emerald-600">Publicly Open (Required)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-emerald-600">22</td>
                  <td className="p-3">TCP</td>
                  <td className="p-3">SSH Remote Management</td>
                  <td className="p-3 text-amber-600">Restricted to VPN / Whitelisted IPs</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-emerald-600">21</td>
                  <td className="p-3">TCP</td>
                  <td className="p-3">FTP File Transfer</td>
                  <td className="p-3 text-rose-600">Closed (Insecure plaintext, use SFTP)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-emerald-600">3306</td>
                  <td className="p-3">TCP</td>
                  <td className="p-3">MySQL / MariaDB Database</td>
                  <td className="p-3 text-rose-600">Closed to Public (Bind to localhost)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-emerald-600">25565</td>
                  <td className="p-3">TCP</td>
                  <td className="p-3">Minecraft Server</td>
                  <td className="p-3 text-emerald-600">Open for Gaming Servers</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mt-6">Understanding Port States</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Open:</strong> An active application is listening on the port and accepted the TCP SYN handshake.</li>
            <li><strong>Closed:</strong> The host received the probe packet and replied with a TCP RST (reset), indicating no application is running on that port.</li>
            <li><strong>Filtered:</strong> A firewall or router dropped the probe packet without responding, effectively cloaking the service from reconnaissance scans.</li>
          </ul>
        </div>
      )
    },
    {
      id: "ip-checker-cmd",
      title: "How to Check Your IP Address Using CMD (Command Prompt & PowerShell)",
      subtitle: "A complete step-by-step terminal guide for Windows, Mac, and Linux users.",
      category: "CMD & Terminal",
      readTime: "4 min read",
      date: "October 2026",
      author: "DNSChecker Sysadmin Team",
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
      author: "DNSChecker Threat Intelligence Team",
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
            <li><strong>Malware Command &amp; Control (C2):</strong> Infected IoT devices participating in DDoS botnet swarms.</li>
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
        </div>
      )
    },
    {
      id: "ip-checker-minecraft",
      title: "Minecraft Server IP Checker: How to Find, Test & Protect Server IPs",
      subtitle: "Troubleshoot port 25565, verify SRV records, check ping latency, and prevent DDoS attacks.",
      category: "Minecraft & Gaming",
      readTime: "5 min read",
      date: "October 2026",
      author: "DNSChecker Gaming Network Division",
      tags: ["ip checker minecraft", "minecraft server ip", "port 25565", "srv dns record", "ddos protection minecraft"],
      toolLink: "/ports",
      toolName: "Scan Minecraft Port 25565",
      excerpt: "Step-by-step guide on resolving Minecraft server IPs, configuring DNS SRV records, verifying port forwarding, and measuring server ping latency.",
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            Hosting a Minecraft multiplayer world or managing a gaming community requires a solid grasp of IP addressing, DNS resolution, and port reachability.
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
        </div>
      )
    },
    {
      id: "reverse-ip-lookup",
      title: "Reverse IP Address Lookup: Find All Domains Hosted on a Single IP",
      subtitle: "Uncover virtual hosts, shared hosting neighbors, and hidden cyber attack surfaces.",
      category: "Website & Hosting",
      readTime: "5 min read",
      date: "October 2026",
      author: "DNSChecker OSINT Research Lab",
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
            <li><strong>Shared Hosting Audit:</strong> When you buy shared web hosting, hundreds of websites share your server IP. If one sends spam, your IP reputation suffers.</li>
            <li><strong>Attacker Infrastructure Mapping:</strong> In threat hunting, identifying other sites on an attacker’s C2 server uncovers related malware distribution hubs.</li>
          </ul>
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
      author: "DNSChecker Privacy Lab",
      tags: ["ip checker nord", "vpn leak test", "webrtc leak test", "browser fingerprinting", "hide my ip"],
      toolLink: "/my-ip",
      toolName: "Run Live WebRTC Leak Test",
      excerpt: "Learn how WebRTC protocols can leak your actual residential IP address even when connected to an encrypted VPN tunnel, and how to verify your security.",
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            VPNs encrypt your internet traffic and route it through a remote server. However, <strong>WebRTC leaks</strong> and <strong>DNS leaks</strong> can silently reveal your true physical location.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6">What is a WebRTC Leak?</h3>
          <p>
            WebRTC uses STUN servers to negotiate peer-to-peer audio and video calls. If your VPN software does not block these STUN calls, client-side JavaScript can retrieve your real private and public IP directly from the browser!
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
      author: "DNSChecker Editorial Board",
      tags: ["what is my ip", "my ip address", "public vs private ip", "ipv4 vs ipv6", "ip tracker"],
      toolLink: "/lookup",
      toolName: "Look Up Any IP Geolocation",
      excerpt: "Comprehensive explanation of how IP addresses work, the difference between 32-bit IPv4 and 128-bit IPv6, and what an IP reveals about your location.",
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            Every single device connected to the internet requires an Internet Protocol (IP) address to route data packets across the web.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6">Public IP vs. Private (Local) IP</h3>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">Public IP Address</h4>
              <p className="text-sm text-slate-600">Assigned by your ISP. Globally unique and routable across the entire world wide web.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">Private (Local) IP</h4>
              <p className="text-sm text-slate-600">Assigned by your router (e.g. 192.168.1.X). Used only inside your home or office network.</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const categories: ArticleCategory[] = [
    "All", 
    "DNS & Domain", 
    "Website & Hosting", 
    "SSL & TLS", 
    "Email & Deliverability",
    "Security & Blacklist", 
    "CMD & Terminal", 
    "Minecraft & Gaming", 
    "VPN & Privacy", 
    "Fundamentals"
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter(a => {
      const matchesCat = selectedCategory === "All" || a.category === selectedCategory;
      const matchesQuery = !searchQuery.trim() || 
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const activeArticle = articles.find(a => a.id === activeArticleId) || articles[0];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": activeArticle.title,
    "description": activeArticle.subtitle,
    "author": {
      "@type": "Organization",
      "name": activeArticle.author,
      "url": "https://dnschecker.space"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DNSChecker",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dnschecker.space/favicon.ico"
      }
    },
    "datePublished": "2026-10-22",
    "dateModified": "2026-10-23",
    "mainEntityOfPage": `https://dnschecker.space/blog#${activeArticle.id}`,
    "keywords": activeArticle.tags.join(", ")
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-emerald-500/20">
      <Seo 
        title="DNS, IP & SSL Intelligence Knowledge Base | DNSChecker Guides" 
        description="Comprehensive engineering tutorials on global DNS propagation, website to IP lookups, SSL certificate validation, malicious IP detection, and email security." 
        keywords="dns check, website ip checker, ssl check, dns propagation check, email security check, port scanner, ip checker cmd, ip checker malicious, reverse ip lookup, what is my ip"
        url="https://dnschecker.space/blog"
        schema={articleJsonLd}
      />
      <SiteHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-12">
        {/* HERO BANNER */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Technical Tutorials &amp; Network Knowledge Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Network Intelligence &amp; <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Engineering Guides</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Master global DNS propagation, website hosting resolution, SSL handshake security, and perimeter firewall auditing.
          </p>

          {/* SEARCH BAR */}
          <div className="relative max-w-xl mx-auto mt-6">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides (e.g., DNS propagation, SSL handshake, CMD, Minecraft, Port 80)..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-xs text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-3 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
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
          <div className="lg:col-span-5 space-y-4 max-h-[850px] overflow-y-auto pr-1 custom-scrollbar">
            <div className="flex items-center justify-between px-1 mb-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Tutorial Library ({filteredArticles.length})
              </h2>
              {selectedCategory !== "All" && (
                <button 
                  onClick={() => setSelectedCategory("All")}
                  className="text-xs text-emerald-600 hover:underline font-bold"
                >
                  Show All
                </button>
              )}
            </div>

            {filteredArticles.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">
                No guides match your search query. Try searching for "DNS", "IP", or "SSL".
              </div>
            ) : (
              filteredArticles.map((article) => {
                const isSelected = activeArticle.id === article.id;
                return (
                  <div
                    key={article.id}
                    onClick={() => setActiveArticleId(article.id)}
                    className={`cursor-pointer p-5 sm:p-6 rounded-3xl border transition-all text-left group ${
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
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {article.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
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
                  Verified: {activeArticle.date}
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
