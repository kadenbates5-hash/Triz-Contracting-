import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { company } from "../data/content";
import "leaflet/dist/leaflet.css";

const pinIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:34px;height:34px;border-radius:50% 50% 50% 0;
    background:#f2590c;transform:rotate(-45deg);
    box-shadow:0 4px 10px rgba(0,0,0,0.35);
    display:flex;align-items:center;justify-content:center;
  "><div style="transform:rotate(45deg);width:12px;height:12px;background:white;border-radius:50%;"></div></div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -30],
});

export default function ServiceAreaMap() {
  const center: [number, number] = [company.coords.lat, company.coords.lng];

  return (
    <div className="h-full w-full overflow-hidden rounded-2xl">
      <MapContainer center={center} zoom={10} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle
          center={center}
          radius={32000}
          pathOptions={{ color: "#f2590c", fillColor: "#f2590c", fillOpacity: 0.08, weight: 1.5 }}
        />
        <Marker position={center} icon={pinIcon}>
          <Popup>
            <strong>{company.name}</strong>
            <br />
            {company.serviceArea}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
