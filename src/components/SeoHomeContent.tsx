export function SeoHomeContent() {
  return (
    <div className="mt-20 max-w-5xl mx-auto bg-white border border-slate-200 rounded-[40px] p-8 sm:p-12 mb-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4 tracking-tight">Free IP Address Lookup Checker</h2>
        <p className="text-lg text-secondary-foreground leading-relaxed max-w-3xl mx-auto">
          Discover any suspicious IP address activities by using our free IP address checker. Our IP address lookup is very efficient in providing comprehensive information on an IP address within a short time. If you need to find your or any other IP address and collect more information for it – our tool provides accurate results safely from anywhere.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6">Key Features</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-emerald-500 mr-3">✓</span>
              <div>
                <strong className="text-foreground block">IP Geolocation</strong>
                <span className="text-sm text-secondary-foreground">Determine the exact physical location corresponding to an IP address, including country, city, and area code.</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-3">✓</span>
              <div>
                <strong className="text-foreground block">ISP & Hostname Details</strong>
                <span className="text-sm text-secondary-foreground">Discover the ISP that has issued the IP and figure out the hostname details.</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-3">✓</span>
              <div>
                <strong className="text-foreground block">Proxy/VPN Detection</strong>
                <span className="text-sm text-secondary-foreground">Detect whether the incoming IP address is genuine or if it is hidden behind VPNs or proxies.</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-3">✓</span>
              <div>
                <strong className="text-foreground block">Dynamic Reputation & Blocklists</strong>
                <span className="text-sm text-secondary-foreground">Determine which IPs may be compromised to send spam or part of a botnet.</span>
              </div>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6">Common Uses</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-blue-500 mr-3">•</span>
              <div>
                <strong className="text-foreground block">Network & Security Analysis</strong>
                <span className="text-sm text-secondary-foreground">Monitor network security and firewall protection by alerting on suspicious IP addresses.</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-3">•</span>
              <div>
                <strong className="text-foreground block">ISP & Troubleshooting</strong>
                <span className="text-sm text-secondary-foreground">Filter out real traffic and fix routing issues for server or network problems.</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-3">•</span>
              <div>
                <strong className="text-foreground block">Business Analytics</strong>
                <span className="text-sm text-secondary-foreground">Gather statistics of visitors' demographics to protect online transactions from false IPs.</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-3">•</span>
              <div>
                <strong className="text-foreground block">Cyber Investigations</strong>
                <span className="text-sm text-secondary-foreground">Monitor IP addresses that are implicated in criminal activities to reduce cybercrime.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mb-12">
        <h3 className="text-2xl font-bold text-foreground mb-4">What is an IP Address?</h3>
        <p className="text-secondary-foreground leading-relaxed mb-6">
          An IP address refers to a specific combination of characters assigned to a certain device in order to identify it on the internet. It uniquely marks the device and promotes effective communication between the device and other online resources.
        </p>
        
        <div className="grid sm:grid-cols-3 gap-6 mt-6">
          <div>
            <h4 className="font-bold text-foreground mb-2">IPv4 vs. IPv6</h4>
            <p className="text-sm text-secondary-foreground">IPv4 uses 32-bit addresses. IPv6 with an address size of 128 bits connects a far greater number of devices to mitigate IPv4 exhaustion.</p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Public vs. Private IPs</h4>
            <p className="text-sm text-secondary-foreground">Public IPs are traced and seen by all. A private IP is assigned by your router in your local network and is more secure.</p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Dynamic vs. Static IPs</h4>
            <p className="text-sm text-secondary-foreground">Static IPs do not change. Dynamic IPs update whenever a device is connected to the internet.</p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h3>
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <h4 className="font-bold text-foreground">What are IP lookup tools?</h4>
          <p className="text-sm text-secondary-foreground mt-1">An IP Lookup Tool is an online application that retrieves information about a particular IP address for network diagnostics, cybersecurity, geolocation tracking, and digital marketing insights.</p>
        </div>
        <div>
          <h4 className="font-bold text-foreground">What information can I get?</h4>
          <p className="text-sm text-secondary-foreground mt-1">From an IP address, you can get information about the country, city, area code, ISP, and hostname details without revealing personal information.</p>
        </div>
        <div>
          <h4 className="font-bold text-foreground">Can someone track me?</h4>
          <p className="text-sm text-secondary-foreground mt-1">An IP address can trace only your physical location and network information. It is not able to reveal your personal name or exact street address.</p>
        </div>
        <div>
          <h4 className="font-bold text-foreground">Is using a VPN detectable?</h4>
          <p className="text-sm text-secondary-foreground mt-1">Yes, an advanced IP lookup can detect if you are masking your IP address by using a VPN or proxy server.</p>
        </div>
        <div>
          <h4 className="font-bold text-foreground">Is IP lookup legal?</h4>
          <p className="text-sm text-secondary-foreground mt-1">Yes, IP lookup is completely legal to use. IP addresses are public information necessary for internet communication.</p>
        </div>
        <div>
          <h4 className="font-bold text-foreground">Do I need to sign up?</h4>
          <p className="text-sm text-secondary-foreground mt-1">No. You don't need to register for an account or pay fees to benefit from our IP checker tool. It is 100% free.</p>
        </div>
      </div>
    </div>
  );
}
