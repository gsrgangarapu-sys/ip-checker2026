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
}

export async function fetchIpInfo(ip?: string): Promise<IpInfo | null> {
  const queryIp = ip ? encodeURIComponent(ip) : '';
  
  // Chain of APIs to try
  const APIs = [
    {
      url: queryIp ? `https://ipwho.is/${queryIp}` : `https://ipwho.is/`,
      parse: (data: any) => {
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
      // ip-api works well server-side (http only on free tier)
      url: queryIp ? `http://ip-api.com/json/${queryIp}?fields=status,message,country,countryCode,regionName,city,lat,lon,timezone,isp,org,as,query` : `http://ip-api.com/json/?fields=status,message,country,countryCode,regionName,city,lat,lon,timezone,isp,org,as,query`,
      parse: (data: any) => {
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
  return {
    browser,
    os,
    language: navigator.language,
    platform: navigator.platform,
    cookies: navigator.cookieEnabled,
    online: navigator.onLine,
    screen: typeof window !== "undefined" ? `${window.screen.width}×${window.screen.height}` : "",
    userAgent: ua,
  };
}
