import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 mt-auto relative bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="text-center">
          <p className="text-[14px] text-slate-500 font-medium tracking-wide">
            DNSChecker • Free web inspection toolkit • Built for developers, sysadmins, and the curious.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <Link to="/blog" className="text-[14px] text-slate-400 hover:text-emerald-600 transition-colors">Blog &amp; Tutorials</Link>
            <Link to="/sitemap" className="text-[14px] text-slate-400 hover:text-emerald-600 transition-colors">HTML Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


