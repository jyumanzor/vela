"use client";

import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon issue in Next.js/webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;

interface Location {
  id: string;
  label: string;
  count: number;
  lat: number;
  lng: number;
  description: string;
}

const locations: Location[] = [
  { id: "france", label: "France", count: 31, lat: 46.6, lng: 2.2, description: "Paris, Biarritz, Provence" },
  { id: "united-kingdom", label: "United Kingdom", count: 30, lat: 53.5, lng: -1.5, description: "London, Yorkshire, Scotland" },
  { id: "united-states", label: "United States", count: 12, lat: 39.8, lng: -98.5, description: "New York, Utah, California" },
  { id: "italy", label: "Italy", count: 2, lat: 42.5, lng: 12.5, description: "Florence, Rome" },
  { id: "selected", label: "Selected Work", count: 15, lat: -2.5, lng: 118.0, description: "Indonesia & other locations" },
];

function createMarkerIcon(count: number) {
  return L.divIcon({
    html: `<div style="
      width: 36px; height: 36px;
      border-radius: 50%;
      background: #7A3344;
      border: 2px solid rgba(122,51,68,0.3);
      display: flex; align-items: center; justify-content: center;
      font-family: var(--font-outfit), sans-serif;
      font-size: 11px; color: #F5F0E8; font-weight: 500;
      box-shadow: 0 2px 8px rgba(122,51,68,0.25);
      cursor: pointer;
      transition: transform 0.2s ease;
    ">${count}</div>`,
    className: "cinque-marker",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });
}

/* Disable scroll-wheel zoom globally on mount */
function DisableScrollZoom() {
  const map = useMap();
  useEffect(() => {
    map.scrollWheelZoom.disable();
  }, [map]);
  return null;
}

interface MapViewProps {
  onCountryClick?: (id: string) => void;
}

export default function MapView({ onCountryClick }: MapViewProps) {
  return (
    <>
      {/* Leaflet overrides scoped to this section */}
      <style jsx global>{`
        .cinque-map .leaflet-container {
          background: var(--cream) !important;
          font-family: var(--font-outfit), sans-serif;
        }
        .cinque-map .leaflet-control-zoom a {
          background: var(--warm-white) !important;
          color: var(--text-dark) !important;
          border-color: var(--border-light) !important;
          font-family: var(--font-outfit), sans-serif !important;
          width: 30px !important;
          height: 30px !important;
          line-height: 30px !important;
          font-size: 14px !important;
        }
        .cinque-map .leaflet-control-zoom a:hover {
          background: var(--parchment) !important;
        }
        .cinque-map .leaflet-control-zoom {
          border: 1px solid var(--border-light) !important;
          border-radius: 4px !important;
          box-shadow: 0 2px 8px rgba(43,18,21,0.06) !important;
        }
        .cinque-map .leaflet-popup-content-wrapper {
          background: var(--warm-white) !important;
          border-radius: 4px !important;
          box-shadow: 0 4px 20px rgba(43,18,21,0.12) !important;
          font-family: var(--font-outfit), sans-serif !important;
          padding: 0 !important;
        }
        .cinque-map .leaflet-popup-content {
          margin: 0 !important;
        }
        .cinque-map .leaflet-popup-tip {
          background: var(--warm-white) !important;
        }
        .cinque-map .leaflet-popup-close-button {
          display: none !important;
        }
        .cinque-marker {
          background: transparent !important;
          border: none !important;
        }
        .cinque-marker div:hover {
          transform: scale(1.12);
        }
        .cinque-map .leaflet-control-attribution {
          font-size: 9px !important;
          background: rgba(250,247,242,0.7) !important;
          color: var(--text-mid) !important;
        }
        .cinque-map .leaflet-control-attribution a {
          color: var(--text-mid) !important;
        }
      `}</style>

      <div className="cinque-map w-full h-[300px] sm:h-[400px]">
        <MapContainer
          center={[46, 10]}
          zoom={3}
          minZoom={2}
          maxZoom={7}
          zoomControl={false}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%" }}
          attributionControl={true}
        >
          <DisableScrollZoom />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          />

          {/* Zoom control — bottom right */}
          <ZoomControlBottomRight />

          {locations.map((loc) => (
            <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={createMarkerIcon(loc.count)}
              eventHandlers={{
                click: () => onCountryClick?.(loc.id),
              }}
            >
              <Popup>
                <div style={{ padding: "14px 16px", minWidth: 160 }}>
                  <p style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: 18,
                    fontWeight: 500,
                    fontStyle: "italic",
                    color: "var(--text-dark)",
                    margin: 0,
                    lineHeight: 1.2,
                  }}>
                    {loc.label}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: 12,
                    color: "var(--text-mid)",
                    margin: "4px 0 0",
                  }}>
                    {loc.count} photographs &middot; {loc.description}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: 11,
                    color: "var(--maroon)",
                    margin: "8px 0 0",
                    letterSpacing: "0.04em",
                    cursor: "pointer",
                  }}
                    onClick={() => onCountryClick?.(loc.id)}
                  >
                    View gallery &rarr;
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}

/* Place zoom controls at bottom-right */
function ZoomControlBottomRight() {
  const map = useMap();
  useEffect(() => {
    const ctrl = L.control.zoom({ position: "bottomright" });
    ctrl.addTo(map);
    return () => { ctrl.remove(); };
  }, [map]);
  return null;
}
