import { useEffect, useRef, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Polyline,
  Marker,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TollPlaza, RouteState, VehicleType, VEHICLE_LABELS } from '../../types';
import { getFeeColor } from '../../hooks/useTollData';
import clsx from 'clsx';

// Fix default Leaflet icon URLs (webpack/vite asset path issue)
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const ORIGIN_ICON = L.divIcon({
  className: '',
  html: `<div style="width:14px;height:14px;background:#10b981;border:2px solid white;border-radius:50%;box-shadow:0 0 6px rgba(16,185,129,0.8)"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const DEST_ICON = L.divIcon({
  className: '',
  html: `<div style="width:14px;height:14px;background:#ef4444;border:2px solid white;border-radius:50%;box-shadow:0 0 6px rgba(239,68,68,0.8)"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

interface MapViewProps {
  plazas: TollPlaza[];
  selectedPlaza: TollPlaza | null;
  onSelectPlaza: (plaza: TollPlaza | null) => void;
  routeState: RouteState;
  onMapClick: (lat: number, lng: number) => void;
  vehicleType: VehicleType;
}

function MapClickHandler({ onClick, active }: { onClick: (lat: number, lng: number) => void; active: boolean }) {
  useMapEvents({
    click(e) {
      if (active) {
        onClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}

export default function MapView({
  plazas,
  selectedPlaza,
  onSelectPlaza,
  routeState,
  onMapClick,
  vehicleType,
}: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);

  // Fly to selected plaza
  useEffect(() => {
    if (selectedPlaza && mapRef.current) {
      mapRef.current.flyTo([selectedPlaza.lat, selectedPlaza.lng], 12, { duration: 1 });
    }
  }, [selectedPlaza]);

  const handleMarkerClick = useCallback((plaza: TollPlaza) => {
    onSelectPlaza(plaza);
  }, [onSelectPlaza]);

  const routeActive = routeState.isActive && routeState.step !== 'idle';

  return (
    <div className={clsx('flex-1 relative', routeActive ? 'route-mode-cursor' : '')}>
      {/* Route mode overlay hint */}
      {routeActive && routeState.step !== 'complete' && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] px-4 py-2 bg-blue-900/90 border border-blue-500/50 rounded-full text-xs text-blue-200 pointer-events-none backdrop-blur-sm">
          {routeState.step === 'picking-origin'
            ? '📍 Click to place ORIGIN point'
            : '🏁 Click to place DESTINATION point'}
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-6 left-3 z-[1000] bg-surface-700/95 border border-slate-600/60 rounded-lg p-3 text-xs backdrop-blur-sm">
        <div className="text-slate-400 mb-2 font-medium">Car Fee (₹)</div>
        {[
          { color: '#10b981', label: '< 70' },
          { color: '#84cc16', label: '70–80' },
          { color: '#f59e0b', label: '80–90' },
          { color: '#f97316', label: '90–100' },
          { color: '#ef4444', label: '> 100' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ background: color }} />
            <span className="text-slate-300">{label}</span>
          </div>
        ))}
      </div>

      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        zoomControl={true}
      >
        {/* Base tile layer — CartoDB Positron (clean, minimal) */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={19}
        />

        {/* Map click handler for route planning */}
        <MapClickHandler onClick={onMapClick} active={routeActive} />

        {/* Toll plaza markers */}
        {plazas.map(plaza => {
          const fee = plaza.fees.car_jeep_van;
          const color = getFeeColor(fee);
          const isSelected = selectedPlaza?.id === plaza.id;

          return (
            <CircleMarker
              key={plaza.id}
              center={[plaza.lat, plaza.lng]}
              radius={isSelected ? 9 : 6}
              pathOptions={{
                fillColor: color,
                color: isSelected ? '#ffffff' : color,
                fillOpacity: isSelected ? 1 : 0.85,
                weight: isSelected ? 2.5 : 1,
              }}
              eventHandlers={{
                click: () => handleMarkerClick(plaza),
              }}
            >
              <Popup maxWidth={280} className="toll-popup">
                <PlazaPopup plaza={plaza} vehicleType={vehicleType} />
              </Popup>
            </CircleMarker>
          );
        })}

        {/* Route polyline */}
        {routeState.origin && routeState.destination && (
          <Polyline
            positions={[
              [routeState.origin.lat, routeState.origin.lng],
              [routeState.destination.lat, routeState.destination.lng],
            ]}
            pathOptions={{ color: '#3b82f6', weight: 3, dashArray: '8 4', opacity: 0.9 }}
          />
        )}

        {/* Route origin/destination markers */}
        {routeState.origin && (
          <Marker position={[routeState.origin.lat, routeState.origin.lng]} icon={ORIGIN_ICON} />
        )}
        {routeState.destination && (
          <Marker position={[routeState.destination.lat, routeState.destination.lng]} icon={DEST_ICON} />
        )}

        {/* Route plaza highlight markers */}
        {routeState.plazasOnRoute.map(plaza => (
          <CircleMarker
            key={`route-${plaza.id}`}
            center={[plaza.lat, plaza.lng]}
            radius={8}
            pathOptions={{
              fillColor: '#3b82f6',
              color: '#ffffff',
              fillOpacity: 0.9,
              weight: 2,
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}

function PlazaPopup({ plaza, vehicleType }: { plaza: TollPlaza; vehicleType: VehicleType }) {
  const fee = plaza.fees[vehicleType];

  return (
    <div className="p-1 min-w-[220px]">
      <div className="font-semibold text-slate-100 text-sm mb-1">{plaza.name}</div>
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-0.5 bg-blue-900/60 text-blue-300 rounded text-xs font-mono">{plaza.highway}</span>
        <span className="text-xs text-slate-400">{plaza.state}</span>
      </div>
      <div className="border-t border-slate-600 pt-2 mt-1">
        <div className="text-xs text-slate-400 mb-1">{VEHICLE_LABELS[vehicleType]}</div>
        <div className="text-lg font-bold text-green-400 font-mono">₹{fee}</div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
        <div className="text-slate-500">District</div>
        <div className="text-slate-300">{plaza.district}</div>
        {plaza.operator && (
          <>
            <div className="text-slate-500">Operator</div>
            <div className="text-slate-300">{plaza.operator}</div>
          </>
        )}
        {plaza.daily_traffic && (
          <>
            <div className="text-slate-500">Daily Traffic</div>
            <div className="text-slate-300">{plaza.daily_traffic.toLocaleString()} PCU</div>
          </>
        )}
      </div>
    </div>
  );
}
