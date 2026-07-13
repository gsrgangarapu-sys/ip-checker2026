// Client-side DNS via Cloudflare DNS-over-HTTPS
export type DnsType = "A" | "AAAA" | "MX" | "NS" | "TXT" | "SOA" | "CNAME" | "PTR" | "CAA";

export interface DnsAnswer {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

export async function dohQuery(name: string, type: DnsType): Promise<DnsAnswer[]> {
  const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`;
  const res = await fetch(url, { headers: { Accept: "application/dns-json" } });
  if (!res.ok) throw new Error(`DoH error ${res.status}`);
  const data = await res.json();
  if (data.Status !== 0 && data.Status !== 3) throw new Error(`DNS error ${data.Status}`);
  return (data.Answer ?? []) as DnsAnswer[];
}

// Build PTR name from IPv4
export function ipv4ToPtr(ip: string): string {
  return ip.split(".").reverse().join(".") + ".in-addr.arpa";
}
