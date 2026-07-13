import { MapContainer, TileLayer, Marker, CircleMarker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Props {
  lat: number;
  lng: number;
  label?: string;
  height?: number;
}

export default function LeafletMap({ lat, lng, label, height = 360 }: Props) {
  return (
    <div style={{ height }} className="overflow-hidden rounded-xl border border-border">
      <MapContainer
        key={`${lat}-${lng}`}
        center={[lat, lng]}
        zoom={9}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleMarker center={[lat, lng]} radius={28} pathOptions={{ color: "#22d3ee", fillColor: "#22d3ee", fillOpacity: 0.15, weight: 1 }} />
        <CircleMarker center={[lat, lng]} radius={14} pathOptions={{ color: "#22d3ee", fillColor: "#a855f7", fillOpacity: 0.6, weight: 2 }} />
        <Marker position={[lat, lng]} title={label} />
      </MapContainer>
    </div>
  );
}
