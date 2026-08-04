export function SeoMyIpContent() {
  return (
    <div className="mt-20 max-w-4xl mx-auto bg-white border border-slate-200 rounded-[40px] p-8 sm:p-12 mb-12">
      <h2 className="text-3xl font-black text-foreground mb-6 tracking-tight">What Is My IP Address?</h2>
      <p className="text-secondary-foreground leading-relaxed mb-6">
        As you're reading this, you probably first came here to check your IP address. You wanted to know your IP address at home, because perhaps an IT person needed to know it to do some troubleshooting or to help you connect to the internet. Or you wanted to see your IP address because you're using a VPN (Virtual Private Network), which masks your "actual" IP address with another, and you wanted to make sure your VPN is working as it should.
      </p>

      <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">If you're connected, you have an IP Address</h3>
      <p className="text-secondary-foreground leading-relaxed mb-6">
        Your IP address is at the heart of being online. If you don't have an IP address, you're not connected to a network that's connected to the Internet. It's rather brilliant that an IP address connects you to the world via a worldwide network, in much the same way your home's physical address connects you to a mail and package delivery system.
      </p>

      <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">"IP" is part of the TCP/IP Protocol</h3>
      <p className="text-secondary-foreground leading-relaxed mb-6">
        The IP in TCP/IP stands for Internet Protocol. The TCP part stands for Transmission Control Protocol. A protocol means rules or agreed upon processes. The string of numbers and dots you see with your IP address are at the heart of those protocols and what they mean and do.
      </p>

      <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">The arrival of IPv6</h3>
      <p className="text-secondary-foreground leading-relaxed mb-6">
        For the most part, a majority of the IP addresses in use today are IPv4, which stands for "Version 4." The IP address numbers we get assigned, derived from the TCP/IP protocols, is a unique code for the Internet. In the 1980s, people thought that 4.3 billion IPv4 addresses would be enough. However, at the rate the internet exploded, IPv6 was introduced to provide an almost innumerable number of IP addresses. IPv6 addresses are 128-bit, meaning there are 340 undecillion possible addresses. You'll see both IPv4 and IPv6 detected on our site if they are active.
      </p>

      <div className="grid sm:grid-cols-2 gap-8 mt-12 bg-slate-50 p-6 rounded-3xl border border-slate-100">
        <div>
          <h4 className="text-xl font-bold text-foreground mb-3">VPN check & Proxy checker</h4>
          <p className="text-secondary-foreground text-sm leading-relaxed">
            A VPN leak test detects VPNs and TOR. By comparing your IP country with DNS, time zone/locale, you'll know whether your IP address might look suspicious to websites. The proxy checker validates HTTP/HTTPS/SOCKS5 to catch fingerprintable patterns and inspects headers.
          </p>
        </div>
        <div>
          <h4 className="text-xl font-bold text-foreground mb-3">Browser fingerprint checker</h4>
          <p className="text-secondary-foreground text-sm leading-relaxed">
            The browser fingerprint checker shows details like your User-Agent, HTTP headers, screen info, language and time zone, device and browser data, WebRTC/JavaScript status, and plugins. Websites identify users not only by IP, but also by a unique browser fingerprint.
          </p>
        </div>
      </div>
    </div>
  );
}
