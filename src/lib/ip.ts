export interface IpInfo {
  ip: string;
  version?: string;
  city?: string;
  region?: string;
  country_name?: string;
  country_code?: string;
  postal?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  utc_offset?: string;
  org?: string;
  asn?: string;
  hostname?: string;
  currency?: string;
  languages?: string;
  status?: string;
  vpn?: boolean;
  proxy?: boolean;
  tor?: boolean;
  hosting?: boolean;
  isPrivate?: boolean;
  privateNote?: string;
  localIp?: string;
  webrtcIp?: string;
  webrtcLeak?: boolean;
  pingMs?: number;
}

export function isPrivateOrReservedIp(ip?: string): boolean {
  if (!ip) return false;
  const clean = ip.trim().toLowerCase();
  if (clean === "127.0.0.1" || clean === "::1" || clean === "localhost") return true;
  if (/^10\./.test(clean)) return true;
  if (/^192\.168\./.test(clean)) return true;
  if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(clean)) return true;
  if (/^169\.254\./.test(clean)) return true;
  if (/^fc00:|^fe80:/.test(clean)) return true;
  return false;
}

export function getPrivateIpInfo(ip: string): IpInfo {
  return {
    ip,
    version: ip.includes(":") ? "IPv6" : "IPv4",
    city: "Local Network",
    region: "Internal Subnet",
    country_name: "Local Area Network (LAN)",
    country_code: "LAN",
    org: "Private Network (RFC 1918 / Loopback)",
    asn: "Local / Non-Routable",
    timezone: typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone || "Local" : "Local",
    status: "online",
    vpn: false,
    proxy: false,
    tor: false,
    hosting: false,
    isPrivate: true,
    privateNote: "This is a private/local IP address reserved for internal networking (LAN, Wi-Fi router, or localhost loopback). It is not reachable directly from the public internet."
  };
}

export async function fetchIpInfo(ip?: string): Promise<IpInfo | null> {
  const cleanIp = ip?.trim();
  if (cleanIp && isPrivateOrReservedIp(cleanIp)) {
    return getPrivateIpInfo(cleanIp);
  }

  const queryIp = cleanIp ? encodeURIComponent(cleanIp) : '';
  
  // Chain of APIs to try
  const APIs = [
    {
      url: queryIp ? `https://ipwho.is/${queryIp}` : `https://ipwho.is/`,
      parse: (data: any): IpInfo => {
        if (!data.success) throw new Error(data.message || 'ipwho.is failed');
        return {
          ip: data.ip || 'Unavailable',
          city: data.city || 'Unknown',
          region: data.region || 'Unknown',
          country_name: data.country || 'Unknown',
          country_code: data.country_code,
          org: data.connection?.isp || data.connection?.org || 'Unknown ISP',
          timezone: data.timezone?.id || 'UTC',
          latitude: data.latitude,
          longitude: data.longitude,
          version: data.type === "IPv4" ? "IPv4" : "IPv6",
          status: 'online',
          vpn: data.security?.vpn || false,
          proxy: data.security?.proxy || false,
          tor: data.security?.tor || false,
          hosting: data.security?.type === "hosting",
          asn: data.connection?.asn ? `AS${data.connection.asn}` : undefined
        };
      }
    },
    {
      url: queryIp ? `http://ip-api.com/json/${queryIp}?fields=status,message,country,countryCode,regionName,city,lat,lon,timezone,isp,org,as,query` : `http://ip-api.com/json/?fields=status,message,country,countryCode,regionName,city,lat,lon,timezone,isp,org,as,query`,
      parse: (data: any): IpInfo => {
        if (data.status !== 'success') throw new Error(data.message || 'ip-api failed');
        return {
          ip: data.query || 'Unavailable',
          city: data.city || 'Unknown',
          region: data.regionName || 'Unknown',
          country_name: data.country || 'Unknown',
          country_code: data.countryCode,
          org: data.isp || data.org || 'Unknown ISP',
          timezone: data.timezone || 'UTC',
          latitude: data.lat,
          longitude: data.lon,
          version: (data.query || '').includes(':') ? "IPv6" : "IPv4",
          status: 'online',
          asn: data.as ? data.as.split(' ')[0] : undefined
        };
      }
    }
  ];

  for (const api of APIs) {
    try {
      const res = await fetch(api.url);
      if (!res.ok) continue;
      const data = await res.json();
      return api.parse(data);
    } catch (err) {
      console.warn(`API ${api.url} failed:`, err);
    }
  }
  
  return null;
}

export async function fetchClientLiveIp(): Promise<IpInfo | null> {
  try {
    const res = await fetch("https://ipwho.is/");
    if (res.ok) {
      const data = await res.json();
      if (data && data.success) {
        return {
          ip: data.ip,
          city: data.city || 'Unknown',
          region: data.region || 'Unknown',
          country_name: data.country || 'Unknown',
          country_code: data.country_code,
          org: data.connection?.isp || data.connection?.org || 'Unknown ISP',
          timezone: data.timezone?.id || 'UTC',
          latitude: data.latitude,
          longitude: data.longitude,
          version: data.type === "IPv4" ? "IPv4" : "IPv6",
          status: 'online',
          vpn: data.security?.vpn || false,
          proxy: data.security?.proxy || false,
          tor: data.security?.tor || false,
          hosting: data.security?.type === "hosting",
          asn: data.connection?.asn ? `AS${data.connection.asn}` : undefined
        };
      }
    }
  } catch (e) {}

  try {
    const res = await fetch("https://api64.ipify.org?format=json");
    if (res.ok) {
      const data = await res.json();
      if (data?.ip) {
        return {
          ip: data.ip,
          version: data.ip.includes(":") ? "IPv6" : "IPv4",
          status: 'online',
          country_name: "Detected",
          city: "Live Client",
          org: "Active Public Connection"
        };
      }
    }
  } catch (e) {}

  return null;
}

export interface WebRtcDetection {
  localIp?: string;
  webrtcIp?: string;
  isLeaked?: boolean;
}

export function detectLocalAndWebRtcIp(publicIp?: string): Promise<WebRtcDetection> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      return resolve({});
    }

    const RTCPC = window.RTCPeerConnection || (window as any).webkitRTCPeerConnection || (window as any).mozRTCPeerConnection;
    if (!RTCPC) {
      return resolve({});
    }

    try {
      const rtc = new RTCPC({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
      });

      let localIp: string | undefined;
      let webrtcIp: string | undefined;
      let finished = false;

      const finish = () => {
        if (!finished) {
          finished = true;
          try { rtc.close(); } catch (e) {}
          const isLeaked = !!(webrtcIp && publicIp && webrtcIp !== publicIp);
          resolve({ localIp, webrtcIp, isLeaked });
        }
      };

      setTimeout(finish, 2000);

      rtc.onicecandidate = (event) => {
        if (!event || !event.candidate) {
          finish();
          return;
        }
        const candidate = event.candidate.candidate;
        const ipMatch = candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/i);
        if (ipMatch) {
          const matched = ipMatch[1];
          if (candidate.includes("typ host")) {
            if (/^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(matched)) {
              localIp = matched;
            } else if (!localIp && matched !== "0.0.0.0" && !matched.startsWith("127.")) {
              localIp = matched;
            }
          } else if (candidate.includes("typ srflx")) {
            webrtcIp = matched;
          }
        }
      };

      rtc.createDataChannel("");
      rtc.createOffer()
        .then(offer => rtc.setLocalDescription(offer))
        .catch(() => finish());
    } catch (e) {
      resolve({});
    }
  });
}

export async function measurePingLatency(): Promise<number> {
  const start = performance.now();
  try {
    await fetch("https://dns.google/resolve?name=google.com&type=A", { cache: "no-store", mode: "cors" });
    return Math.round(performance.now() - start);
  } catch {
    return Math.round(performance.now() - start);
  }
}

export function getBrowserInfo() {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  const browser =
    /edg/i.test(ua) ? "Edge"
    : /chrome/i.test(ua) ? "Chrome"
    : /firefox/i.test(ua) ? "Firefox"
    : /safari/i.test(ua) ? "Safari"
    : "Unknown";
  const os =
    /windows/i.test(ua) ? "Windows"
    : /mac os/i.test(ua) ? "macOS"
    : /android/i.test(ua) ? "Android"
    : /iphone|ipad/i.test(ua) ? "iOS"
    : /linux/i.test(ua) ? "Linux"
    : "Unknown";

  const conn = (navigator as any).connection;
  const connectionType = conn ? conn.effectiveType || conn.type || "Broadband/Wi-Fi" : "Broadband/Wi-Fi";

  return {
    browser,
    os,
    language: navigator.language,
    platform: navigator.platform,
    cookies: navigator.cookieEnabled,
    online: navigator.onLine,
    screen: typeof window !== "undefined" ? `${window.screen.width}×${window.screen.height}` : "",
    userAgent: ua,
    connectionType,
  };
}
