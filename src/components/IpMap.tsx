import { useEffect, useState } from "react";
import type { ComponentType } from "react";

interface Props {
  lat: number;
  lng: number;
  label?: string;
  height?: number;
}

export function IpMap({ lat, lng, label, height = 360 }: Props) {
  const [LeafletMapComponent, setLeafletMapComponent] = useState<ComponentType<Props> | null>(null);

  useEffect(() => {
    let isMounted = true;
    import("./LeafletMap").then((mod) => {
      if (isMounted) {
        setLeafletMapComponent(() => mod.default);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!LeafletMapComponent) {
    return <div style={{ height }} className="rounded-xl bg-muted/30 animate-pulse" />;
  }

  return <LeafletMapComponent lat={lat} lng={lng} label={label} height={height} />;
}
