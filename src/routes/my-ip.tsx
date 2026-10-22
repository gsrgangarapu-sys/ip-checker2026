import { createFileRoute } from "@tanstack/react-router";
import { Seo } from "@/components/Seo";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { IpDashboard } from "@/components/IpDashboard";
import { SeoMyIpContent } from "@/components/SeoMyIpContent";
import { motion } from "framer-motion";
import { ShieldCheck, Info } from "lucide-react";

const myIpFaqs = [
  {
    question: "What is my public IP address vs local IP address?",
    answer: "Your public IP is the unique address your ISP assigns you that websites see on the internet. Your local IP (e.g., 192.168.1.X) is used internally by your router to route traffic between your home devices."
  },
  {
    question: "How do I check my local IP on Windows or Mac?",
    answer: "On Windows, open CMD and type 'ipconfig'. On Mac or Linux, open Terminal and run 'ifconfig' or 'ip addr'."
  },
  {
    question: "What does a WebRTC leak test show?",
    answer: "A WebRTC leak occurs when your web browser exposes your real local or public IP address via STUN requests, even when you have an active VPN connection."
  }
];

export const Route = createFileRoute("/my-ip")({
  head: () => ({
    meta: [
      { title: "What Is My IP Address? - Check Your IP & Location | DNSChecker" },
      { name: "description", content: "Find out what your public and local IP address is. Instantly check PC LAN IP, geolocation, ISP, WebRTC leak status, and browser fingerprint with our free IP tracker." },
      { name: "keywords", content: "what is my ip address, my ip checker, check ip, public ip address, pc local ip, webrtc leak test, ip location, ip tracker, my isp, free ip scanner, reverse ip lookup" },
      { property: "og:title", content: "What Is My IP Address? - Check Your IP & Location" },
      { property: "og:description", content: "Find out what your public and local IP address is. Instantly check PC LAN IP, geolocation, ISP, and WebRTC leak status." },
      { property: "og:url", content: "https://dnschecker.space/my-ip" },
    ],
    links: [{ rel: "canonical", href: "/my-ip" }],
  }),
  component: MyIpPage,
});

function MyIpPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTarget, setSearchTarget] = useState<string | undefined>(undefined);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchTarget(searchInput.trim());
    } else {
      setSearchTarget(undefined);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Seo 
        title="What Is My IP Address? - Check Your IP &amp; Location" 
        description="Find out what your public and local IP address is. Instantly check PC LAN IP, geolocation, ISP, WebRTC leak status, and browser fingerprint with our free IP tracker." 
        keywords="what is my ip address, my ip checker, check ip, public ip address, pc local ip, webrtc leak test, ip location, ip tracker, my isp, free ip scanner, reverse ip lookup"
        url="https://dnschecker.space/my-ip"
        faqs={myIpFaqs}
      />
      <SiteHeader />
      
      <section className="relative pt-12 pb-6 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_top,black_50%,transparent_90%)]" />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 mb-6">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Connection Secure</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-6 tracking-tight">
              IP <span className="text-gradient">&amp; Network Footprint</span>
            </h1>
            <p className="text-lg text-secondary-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              Instantly identify your public network footprint, including geolocation, ISP, and browser fingerprinting data.
            </p>

            <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto flex items-center bg-white border border-slate-200 shadow-sm rounded-2xl p-2 mb-8">
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search any IP address or domain..."
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-secondary-foreground/40 font-mono px-4 py-2"
              />
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors">
                Lookup
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 py-12 flex-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <IpDashboard initialIp={searchTarget} />
        </motion.div>
        
        {/* HELP SECTION */}
        <div className="mt-20 grid md:grid-cols-2 gap-12 bg-white border border-slate-200 rounded-[40px] p-8 sm:p-12">
          <div>
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
              <Info className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">What is a Public IP?</h3>
            <p className="text-secondary-foreground leading-relaxed">
              Your public IP address is a unique numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication. It identifies your location and network to the websites you visit.
            </p>
          </div>
          <div>
            <div className="h-12 w-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-6">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Why check your IP?</h3>
            <p className="text-secondary-foreground leading-relaxed">
              Checking your IP is essential for verifying VPN or proxy connections, troubleshooting network issues, and understanding how much information you're sharing with the internet about your physical location.
            </p>
          </div>
        </div>

        <SeoMyIpContent />
      </section>

      <SiteFooter />
    </div>
  );
}
