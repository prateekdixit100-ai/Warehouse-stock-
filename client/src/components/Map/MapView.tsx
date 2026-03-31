import { useEffect, useRef, useCallback, useState } from 'react';
import {
  MapContainer, TileLayer, CircleMarker, Popup,
  Polyline, Marker, useMapEvents, GeoJSON,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TollPlaza, RouteState, VehicleType, VEHICLE_LABELS } from '../../types';
import { getFeeColor } from '../../hooks/useTollData';
import { LANDBAND_CORRIDORS, LANDBAND_HUBS, HUB_TYPE_LABELS, HUB_TYPE_COLORS } from '../../data/mpLandband';
import {
  WAREHOUSE_HOTSPOTS, INDUSTRIAL_CORRIDORS, COLLIERS_MMLPS,
  CLUSTER_COLORS, WarehouseHotspot,
} from '../../data/colliersWarehousing';
import LandbandLayer from './LandbandLayer';
import ColliersLayer from './ColliersLayer';
import { LayerFilters } from '../Sidebar/LayersPanel';
import clsx from 'clsx';

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const ORIGIN_ICON = L.divIcon({
  className: '',
  html: `<div style="width:14px;height:14px;background:#10b981;border:2px solid white;border-radius:50%;box-shadow:0 0 6px rgba(16,185,129,0.8)"></div>`,
  iconSize: [14, 14], iconAnchor: [7, 7],
});
const DEST_ICON = L.divIcon({
  className: '',
  html: `<div style="width:14px;height:14px;background:#ef4444;border:2px solid white;border-radius:50%;box-shadow:0 0 6px rgba(239,68,68,0.8)"></div>`,
  iconSize: [14, 14], iconAnchor: [7, 7],
});

interface MapViewProps {
  plazas: TollPlaza[];
  selectedPlaza: TollPlaza | null;
  onSelectPlaza: (plaza: TollPlaza | null) => void;
  routeState: RouteState;
  onMapClick: (lat: number, lng: number) => void;
  vehicleType: VehicleType;
  layerFilters: LayerFilters;
}

function MapClickHandler({ onClick, active }: { onClick: (lat: number, lng: number) => void; active: boolean }) {
  useMapEvents({ click(e) { if (active) onClick(e.latlng.lat, e.latlng.lng); } });
  return null;
}

// Filter Colliers data based on layerFilters
function filterColliers(lf: LayerFilters) {
  let hotspots = WAREHOUSE_HOTSPOTS;
  if (lf.colliersClusters.length > 0)
    hotspots = hotspots.filter(h => lf.colliersClusters.includes(h.cluster));
  if (lf.colliersRegions.length > 0)
    hotspots = hotspots.filter(h => lf.colliersRegions.includes(h.region));
  return {
    hotspots,
    corridors: lf.colliersCorridors ? INDUSTRIAL_CORRIDORS : [],
    mmlps: COLLIERS_MMLPS,
  };
}

// Filter Landband data based on layerFilters
function filterLandband(lf: LayerFilters) {
  const hubs = lf.landbandTypes.length > 0
    ? LANDBAND_HUBS.filter(h => lf.landbandTypes.includes(h.type))
    : LANDBAND_HUBS;
  return { corridors: LANDBAND_CORRIDORS, hubs };
}

export default function MapView({
  plazas, selectedPlaza, onSelectPlaza,
  routeState, onMapClick, vehicleType, layerFilters,
}: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const [boundaryGeo, setBoundaryGeo] = useState<object | null>(null);

  useEffect(() => {
    if (selectedPlaza && mapRef.current) {
      mapRef.current.flyTo([selectedPlaza.lat, selectedPlaza.lng], 12, { duration: 1 });
    }
  }, [selectedPlaza]);

  // Load state boundaries GeoJSON
  useEffect(() => {
    if (layerFilters.boundariesVisible && !boundaryGeo) {
      fetch('/data/india-states.geojson')
        .then(r => r.ok ? r.json() : null)
        .then(data => { if (data) setBoundaryGeo(data); })
        .catch(() => {});
    }
  }, [layerFilters.boundariesVisible, boundaryGeo]);

  const handleMarkerClick = useCallback((plaza: TollPlaza) => onSelectPlaza(plaza), [onSelectPlaza]);
  const routeActive = routeState.isActive && routeState.step !== 'idle';
  const landbandData = filterLandband(layerFilters);
  const colliersData = filterColliers(layerFilters);

  return (
    <div className={clsx('flex-1 relative', routeActive ? 'route-mode-cursor' : '')}>
      {routeActive && routeState.step !== 'complete' && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] px-4 py-2 bg-blue-900/90 border border-blue-500/50 rounded-full text-xs text-blue-200 pointer-events-none backdrop-blur-sm">
          {routeState.step === 'picking-origin' ? '📍 Click to place ORIGIN' : '🏁 Click to place DESTINATION'}
        </div>
      )}

      {/* Compact legend */}
      <div className="absolute bottom-6 left-3 z-[1000] bg-slate-900/95 border border-slate-700/60 rounded-lg p-2.5 text-xs backdrop-blur-sm max-w-[130px]">
        <div className="text-slate-500 mb-1.5 font-medium">Car Fee (₹)</div>
        {[['#475569','No data'],['#10b981','< 70'],['#84cc16','70–100'],['#f59e0b','100–150'],['#f97316','150–200'],['#ef4444','> 200']].map(([color, label]) => (
          <div key={label} className="flex items-center gap-1.5 mb-1">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
            <span className="text-slate-400">{label}</span>
          </div>
        ))}
        {layerFilters.colliersVisible && (
          <>
            <div className="border-t border-slate-700 mt-1.5 pt-1.5 text-slate-500 font-medium mb-1">Warehousing</div>
            {(['PRIME','EMERGING','NASCENT'] as const).map(c => (
              <div key={c} className="flex items-center gap-1.5 mb-1">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: CLUSTER_COLORS[c] }} />
                <span className="text-slate-400">{c}</span>
              </div>
            ))}
          </>
        )}
      </div>

      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={19}
        />

        <MapClickHandler onClick={onMapClick} active={routeActive} />

        {/* State boundaries */}
        {layerFilters.boundariesVisible && boundaryGeo && (
          <GeoJSON
            key="boundaries"
            data={boundaryGeo as GeoJSON.GeoJsonObject}
            style={{ color: '#475569', weight: 1, fillOpacity: 0, opacity: 0.6 }}
          />
        )}

        {/* Toll plaza marker clusters */}
        {plazas.length > 0 && (
          <MarkerClusterGroup
            chunkedLoading
            maxClusterRadius={40}
            showCoverageOnHover={false}
          >
            {plazas.map(plaza => {
              const fee = plaza.fees.car_jeep_van;
              const color = getFeeColor(fee);
              const isSelected = selectedPlaza?.id === plaza.id;
              return (
                <CircleMarker
                  key={plaza.id}
                  center={[plaza.lat, plaza.lng]}
                  radius={isSelected ? 9 : 5}
                  pathOptions={{ fillColor: color, color: isSelected ? '#fff' : color, fillOpacity: isSelected ? 1 : 0.85, weight: isSelected ? 2 : 1 }}
                  eventHandlers={{ click: () => handleMarkerClick(plaza) }}
                >
                  <Popup maxWidth={280} className="toll-popup">
                    <PlazaPopup plaza={plaza} vehicleType={vehicleType} />
                  </Popup>
                </CircleMarker>
              );
            })}
          </MarkerClusterGroup>
        )}

        {/* Route polyline */}
        {routeState.origin && routeState.destination && (
          <Polyline
            positions={[[routeState.origin.lat, routeState.origin.lng],[routeState.destination.lat, routeState.destination.lng]]}
            pathOptions={{ color: '#3b82f6', weight: 3, dashArray: '8 4', opacity: 0.9 }}
          />
        )}
        {routeState.origin && <Marker position={[routeState.origin.lat, routeState.origin.lng]} icon={ORIGIN_ICON} />}
        {routeState.destination && <Marker position={[routeState.destination.lat, routeState.destination.lng]} icon={DEST_ICON} />}
        {routeState.plazasOnRoute.map(plaza => (
          <CircleMarker key={`route-${plaza.id}`} center={[plaza.lat, plaza.lng]} radius={8}
            pathOptions={{ fillColor: '#3b82f6', color: '#ffffff', fillOpacity: 0.9, weight: 2 }} />
        ))}

        {/* MP Landband overlay */}
        <LandbandLayer corridors={landbandData.corridors} hubs={landbandData.hubs} visible={layerFilters.landbandVisible} />

        {/* Colliers warehousing overlay */}
        <ColliersLayer hotspots={colliersData.hotspots} corridors={colliersData.corridors} mmlps={colliersData.mmlps} visible={layerFilters.colliersVisible} />
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
      <div className="border-t border-slate-600 pt-2">
        <div className="text-xs text-slate-400 mb-1">{VEHICLE_LABELS[vehicleType]}</div>
        <div className="text-lg font-bold text-green-400 font-mono">₹{fee}</div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
        <div className="text-slate-500">District</div><div className="text-slate-300">{plaza.district}</div>
        {plaza.operator && <><div className="text-slate-500">Operator</div><div className="text-slate-300 truncate">{plaza.operator}</div></>}
        {plaza.location_km && <><div className="text-slate-500">KM Marker</div><div className="text-slate-300">{plaza.location_km}</div></>}
      </div>
    </div>
  );
}
