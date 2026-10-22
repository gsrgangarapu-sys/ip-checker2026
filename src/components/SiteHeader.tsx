import { Link } from "@tanstack/react-router";
import { Globe, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/my-ip", label: "IP" },
  { to: "/dns", label: "DNS" },
  { to: "/whois", label: "WHOIS" },
  { to: "/ssl", label: "SSL" },
  { to: "/blacklist", label: "Security Scan" },
  { to: "/email", label: "Email" },
  { to: "/ports", label: "Ports" },
  { to: "/geo", label: "Geo" },
  { to: "/blog", label: "Blog" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${scrolled ? 'bg-background/80 border-emerald-500/10 backdrop-blur-xl' : 'bg-transparent border-transparent'} py-4`}>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 shadow-sm">
            <Globe className="h-5 w-5 text-white" strokeWidth={3} />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-emerald-600 transition-colors">
            DNSChecker
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-[14px] uppercase tracking-wide font-bold text-secondary-foreground hover:text-emerald-600 transition-all duration-300"
              activeProps={{ className: "text-emerald-600" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center lg:hidden">
          <button 
            onClick={() => setOpen(!open)} 
            className="p-2 text-secondary-foreground hover:text-foreground transition-all" 
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-3xl overflow-hidden fixed top-[64px] left-0 w-full shadow-2xl z-40"
          >
            <nav className="flex flex-col p-4">
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 text-[14px] uppercase tracking-wide font-bold text-secondary-foreground hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all flex items-center justify-between"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


