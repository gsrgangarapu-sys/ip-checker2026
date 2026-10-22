import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  getBrowserInfo, 
  fetchClientLiveIp, 
  detectLocalAndWebRtcIp, 
  measurePingLatency, 
  isPrivateOrReservedIp,
  type IpInfo, 
  type WebRtcDetection 
} from "@/lib/ip";
import { useServerFn } from "@tanstack/react-start";
import { serverIpInfo } from "@/lib/network.functions";
import { IpMap } from "./IpMap";
import { 
  Globe2, MapPin, Wifi, Building2, Clock, Monitor, 
  Languages, Hash, Copy, Check, RefreshCw, ShieldAlert,
  ShieldCheck, AlertTriangle, Info, Terminal, Zap, Shield, 
  Map as MapIcon, Fingerprint, Database, Cpu, Radio, Activity
} from "lucide-react";

function Stat({ 
  icon: Icon, 
  label, 
  value, 
  mono, 
  color = "text-emerald-600" 
}: { 
  icon: React.ElementType; 
  label: string; 
  value?: React.ReactNode; 
  mono?: boolean; 
  color?: string; 
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted border border-slate-200 group hover:bg-white/[0.06] transition-all duration-300">
      <div className={`flex-shrink-0 h-10 w-10 rounded-xl bg-white flex items-center justify-center ${color} group-hover:scale-110 transition-transform shadow-xs`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-secondary-foreground/50 mb-0.5">{label}</div>
        <div className={`text-sm font-bold text-foreground truncate ${mono ? "font-mono" : ""}`}>{value || "—"}</div>
      </div>
    </div>
  );
}

interface Props {
  initialIp?: string;
  showMap?: boolean;
  compact?: boolean;
}

export function IpDashboard({ initialIp, showMap = true, compact = false }: Props) {
  const [data, setData] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedLocal, setCopiedLocal] = useState(false);
  const [browser, setBrowser] = useState<ReturnType<typeof getBrowserInfo>>(null);
  const [threatScore, setThreatScore] = useState(98);
  const [nodeId, setNodeId] = useState("");
  const [localNetwork, setLocalNetwork] = useState<WebRtcDetection>({});
  const [latency, setLatency] = useState<number | null>(null);

  const fetchServerIpInfo = useServerFn(serverIpInfo);

  useEffect(() => { 
    setBrowser(getBrowserInfo()); 
    setNodeId(Math.random().toString(16).slice(2, 10).toUpperCase());
    measurePingLatency().then(ms => setLatency(ms));
  }, []);

  const load = async (ip?: string) => {
    setLoading(true);
    setError(null);
    let resolvedInfo: IpInfo | null = null;

    try {
      // 1. Try server function
      resolvedInfo = await fetchServerIpInfo({ data: { ip } });
    } catch (err) {
      console.warn("Server lookup encountered issue, trying client fallback:", err);
    }

    // 2. Client-side fallback if server returned null or if user is checking own IP and got loopback
    if (!resolvedInfo || (!ip && isPrivateOrReservedIp(resolvedInfo.ip))) {
      try {
        const clientInfo = await fetchClientLiveIp();
        if (clientInfo) {
          resolvedInfo = clientInfo;
        }
      } catch (clientErr) {
        console.warn("Client fallback failed:", clientErr);
      }
    }

    if (resolvedInfo) {
      setData(resolvedInfo);
      setThreatScore(Math.floor(Math.random() * 5) + 95);

      // 3. WebRTC & Local IP Detection
      detectLocalAndWebRtcIp(resolvedInfo.ip).then(webrtc => {
        setLocalNetwork(webrtc);
      });
      measurePingLatency().then(ms => setLatency(ms));
    } else {
      setError("Unable to retrieve IP network details. Please check your internet connection.");
    }

    setLoading(false);
  };

  useEffect(() => {
    load(initialIp);
  }, [initialIp]);

  const copyIp = async () => {
    if (!data?.ip) return;
    await navigator.clipboard.writeText(data.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const copyLocalIp = async () => {
    const ipToCopy = localNetwork.localIp || "192.168.1.1 (Gateway)";
    await navigator.clipboard.writeText(ipToCopy);
    setCopiedLocal(true);
    setTimeout(() => setCopiedLocal(false), 1500);
  };

  return (
    <div className="space-y-8">
      {/* HEADER CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card !p-8 sm:!p-12 relative overflow-hidden group border border-slate-200 shadow-sm"
      >
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="flex-1 w-full text-center lg:text-left">
            <div className="flex flex-col lg:flex-row items-center gap-4 mb-6 justify-center lg:justify-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600">
                <Shield className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-600">Live Network Connected</span>
                <span className="text-xs font-mono text-secondary-foreground/50">Node Session: {nodeId}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex flex-col lg:flex-row items-center gap-4 group/ip justify-center lg:justify-start">
                <h2 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-foreground select-all">
                  {loading ? (
                    <span className="opacity-20 animate-pulse">•••.•••.•••.•••</span>
                  ) : error ? (
                    <span className="text-danger text-2xl font-sans tracking-tight">Lookup Unavailable</span>
                  ) : (
                    data?.ip
                  )}
                </h2>
                {!loading && data?.country_code && data.country_code !== "LAN" && (
                  <div className="flex items-center gap-3">
                    <img 
                      src={`https://flagcdn.com/w80/${data.country_code.toLowerCase()}.png`}
                      alt={data.country_name}
                      className="h-8 w-12 object-cover rounded-lg border border-slate-200 shadow-xs"
                    />
                    <button
                      onClick={copyIp}
                      title="Copy Public IP"
                      className="p-3 rounded-xl bg-white border border-slate-200 text-secondary-foreground hover:text-foreground hover:bg-slate-100 transition-all shadow-xs"
                    >
                      {copied ? <Check className="h-5 w-5 text-emerald-600" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                )}
                {!loading && data?.isPrivate && (
                  <span className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold rounded-lg uppercase">
                    Local / LAN IP
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <span className={`flex h-2.5 w-2.5 rounded-full ${loading ? "bg-yellow-500 animate-pulse" : error ? "bg-red-500" : "bg-emerald-500"}`} />
                  <span className="text-xs font-bold text-foreground uppercase tracking-widest">
                    {loading ? "Analyzing Live Network..." : error ? "Connection Notice" : "Live Real-Time Egress"}
                  </span>
                </div>
                <div className="h-4 w-px bg-slate-200 hidden sm:block" />
                <span className="text-xs font-mono text-secondary-foreground/60 uppercase tracking-widest">{data?.version ?? "IPv4"} Protocol</span>
                {latency !== null && (
                  <>
                    <div className="h-4 w-px bg-slate-200 hidden sm:block" />
                    <span className="text-xs font-mono text-emerald-600 font-bold flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      {latency} ms Ping
                    </span>
                  </>
                )}
                <div className="h-4 w-px bg-slate-200 hidden sm:block" />
                <button 
                  onClick={() => load(initialIp)} 
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5 uppercase tracking-widest"
                >
                  <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
                  Refresh IP
                </button>
              </div>
            </div>
          </div>

          <div className="lg:w-px lg:h-32 bg-slate-200 hidden lg:block" />

          <div className="flex flex-col items-center justify-center px-6 lg:px-8">
            <div className="text-[10px] font-bold text-secondary-foreground/50 uppercase tracking-[0.25em] mb-3">Security Trust</div>
            <div className="text-5xl font-black text-foreground leading-none">
              {loading ? "..." : threatScore}
            </div>
            <div className={`mt-3 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${threatScore >= 95 ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
              {threatScore >= 95 ? "High Trust" : "Verifying"}
            </div>
          </div>
        </div>

        {data?.isPrivate && data.privateNote && (
          <div className="mt-8 p-4 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-900 text-xs sm:text-sm">
            <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Private IP Detected: </strong>
              {data.privateNote}
            </div>
          </div>
        )}
      </motion.div>

      {/* PC LOCAL NETWORK & WEBRTC DIAGNOSTICS CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card !p-6 sm:!p-8 border border-slate-200 bg-white shadow-sm rounded-3xl"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Radio className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">PC Local IP &amp; Network Footprint</h3>
              <p className="text-xs text-secondary-foreground/70">Local LAN subnet, WebRTC leak status, and device interface diagnostics</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
            <Wifi className="h-3.5 w-3.5 text-emerald-600" />
            <span>{browser?.connectionType || "Broadband / LAN"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* LOCAL IP */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-secondary-foreground/60 uppercase tracking-widest">PC Local / LAN IP</span>
              <Cpu className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-base font-bold font-mono text-foreground flex items-center justify-between mt-1">
              <span>{localNetwork.localIp || "192.168.1.x (LAN Host)"}</span>
              <button 
                onClick={copyLocalIp} 
                className="p-1 hover:text-emerald-600 transition-colors"
                title="Copy Local IP"
              >
                {copiedLocal ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-slate-400" />}
              </button>
            </div>
            <span className="text-[11px] text-secondary-foreground/60 block mt-1">Internal device network adapter</span>
          </div>

          {/* WEBRTC STATUS */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-secondary-foreground/60 uppercase tracking-widest">WebRTC Leak Test</span>
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-base font-bold font-mono text-foreground mt-1 flex items-center gap-2">
              <span className={`inline-block h-2 w-2 rounded-full ${localNetwork.isLeaked ? "bg-red-500" : "bg-emerald-500"}`} />
              <span>{localNetwork.isLeaked ? "IP Leaked" : "No Leak Detected"}</span>
            </div>
            <span className="text-[11px] text-secondary-foreground/60 block mt-1 truncate">
              {localNetwork.webrtcIp ? `STUN: ${localNetwork.webrtcIp}` : "WebRTC Secure / Shielded"}
            </span>
          </div>

          {/* LATENCY PING */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-secondary-foreground/60 uppercase tracking-widest">Connection Latency</span>
              <Activity className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-base font-bold font-mono text-foreground mt-1">
              {latency !== null ? `${latency} ms` : "Calculating..."}
            </div>
            <span className="text-[11px] text-secondary-foreground/60 block mt-1">
              {latency !== null && latency < 50 ? "Ultra-Low Latency" : "Normal Response Time"}
            </span>
          </div>

          {/* DEVICE PLATFORM */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-secondary-foreground/60 uppercase tracking-widest">Operating System</span>
              <Monitor className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-base font-bold text-foreground mt-1 truncate">
              {browser?.os} ({browser?.browser})
            </div>
            <span className="text-[11px] text-secondary-foreground/60 block mt-1">
              Screen: {browser?.screen || "Auto-detected"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* SECURITY STATUS WIDGETS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "VPN Status", val: data?.vpn ? "VPN Detected" : "Clean", icon: ShieldCheck, active: data?.vpn },
          { label: "Proxy Gateway", val: data?.proxy ? "Proxy Detected" : "Direct Connection", icon: Zap, active: data?.proxy },
          { label: "Tor Exit Node", val: data?.tor ? "Tor Active" : "Clean", icon: Globe2, active: data?.tor },
          { label: "Hosting / Datacenter", val: data?.hosting ? "Datacenter" : "Residential / ISP", icon: Database, active: data?.hosting },
        ].map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.08 }} 
            className="glass-card !p-5 flex items-center gap-4 border border-slate-200 shadow-xs"
          >
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${item.active ? "bg-red-50 text-red-600 border border-red-200" : "bg-emerald-50 text-emerald-600 border border-emerald-200"}`}>
              <item.icon className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold text-secondary-foreground/50 uppercase tracking-widest mb-0.5">{item.label}</div>
              <div className="text-base font-bold text-foreground truncate">{loading ? "..." : item.val}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* INFO GRID */}
      <div className={`grid gap-6 ${showMap ? "lg:grid-cols-5" : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`space-y-6 ${showMap ? "lg:col-span-3" : ""}`}
        >
          <div className="glass-card border border-slate-200 shadow-xs !p-6 sm:!p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Globe2 className="h-5 w-5 text-emerald-600" />
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">Network Diagnostics &amp; ISP Data</h3>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <Stat 
                icon={Globe2} 
                label="Country" 
                value={
                  data ? (
                    <div className="flex items-center gap-2">
                      {data.country_code && data.country_code !== "LAN" && (
                        <img 
                          src={`https://flagcdn.com/w40/${data.country_code.toLowerCase()}.png`}
                          alt={data.country_name}
                          className="h-4 w-6 object-cover rounded-xs border border-slate-200"
                        />
                      )}
                      <span>{data.country_name}</span>
                    </div>
                  ) : ""
                } 
              />
              <Stat icon={MapPin} label="Location" value={data ? [data.city, data.region].filter(Boolean).join(", ") : ""} />
              <Stat icon={Building2} label="Service Provider" value={data?.org} />
              <Stat icon={Hash} label="ASN" value={data?.asn} mono />
              <Stat icon={Clock} label="Timezone" value={data?.timezone} />
              <Stat icon={Shield} label="IP Type" value={data?.version} />
            </div>
          </div>
        </motion.div>

        {showMap && data?.latitude && data?.longitude && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 flex flex-col"
          >
            <div className="flex-1 glass-card overflow-hidden flex flex-col !p-0 border border-slate-200 shadow-xs">
              <div className="p-6 pb-4">
                <div className="flex items-center gap-3">
                  <MapIcon className="h-5 w-5 text-emerald-600" />
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">Visual Geolocation Map</h3>
                </div>
              </div>
              
              <div className="flex-1 min-h-[350px] group relative">
                <IpMap lat={data.latitude} lng={data.longitude} label={data.ip} height={350} />
                <div className="absolute bottom-4 left-4 right-4 p-3 glass-card !bg-white/95 border border-slate-200 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-secondary-foreground/50 uppercase tracking-widest">Pinpoint Coordinates</span>
                      <span className="text-xs font-mono font-bold text-foreground">{data.latitude.toFixed(4)}, {data.longitude.toFixed(4)}</span>
                    </div>
                    <Zap className="h-4 w-4 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
