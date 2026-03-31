import { CircleMarker, Popup, Polyline } from 'react-leaflet';
import {
  WarehouseHotspot,
  IndustrialCorridor,
  MMLP,
  CLUSTER_COLORS,
  CLUSTER_SIZES,
} from '../../data/colliersWarehousing';

interface ColliersLayerProps {
  hotspots: WarehouseHotspot[];
  corridors: IndustrialCorridor[];
  mmlps: MMLP[];
  visible: boolean;
}

export default function ColliersLayer({ hotspots, corridors, mmlps, visible }: ColliersLayerProps) {
  if (!visible) return null;

  return (
    <>
      {/* National industrial corridors */}
      {corridors.map(corridor => (
        <Polyline
          key={corridor.id}
          positions={corridor.path}
          pathOptions={{
            color: corridor.color,
            weight: 3,
            opacity: 0.7,
            dashArray: corridor.status === 'Planning' ? '8 5' : corridor.status === 'Under Development' ? '4 3' : undefined,
          }}
        >
          <Popup maxWidth={260}>
            <div className="p-1">
              <div className="font-semibold text-slate-100 text-sm">{corridor.name}</div>
              <div className="text-xs text-slate-400 mt-1">{corridor.shortName} · {corridor.status}</div>
              <div className="text-xs text-slate-300 mt-1">{corridor.states.join(' → ')}</div>
            </div>
          </Popup>
        </Polyline>
      ))}

      {/* MMLP markers — diamond-ish purple */}
      {mmlps.map(mmlp => (
        <CircleMarker
          key={mmlp.name}
          center={[mmlp.lat, mmlp.lng]}
          radius={8}
          pathOptions={{ fillColor: '#a855f7', color: '#ffffff', fillOpacity: 0.95, weight: 1.5 }}
        >
          <Popup maxWidth={240}>
            <div className="p-1">
              <div className="font-semibold text-slate-100 text-sm">{mmlp.name}</div>
              <div className="text-xs text-purple-400 mt-1">₹{mmlp.budget_cr} Cr · {mmlp.status}</div>
              <div className="text-xs text-slate-400">PM GatiShakti MMLP</div>
            </div>
          </Popup>
        </CircleMarker>
      ))}

      {/* Warehousing hotspot markers */}
      {hotspots.map(hs => {
        const color = CLUSTER_COLORS[hs.cluster];
        const radius = CLUSTER_SIZES[hs.cluster];
        return (
          <CircleMarker
            key={hs.id}
            center={[hs.lat, hs.lng]}
            radius={radius}
            pathOptions={{ fillColor: color, color: '#1e293b', fillOpacity: 0.88, weight: 1 }}
          >
            <Popup maxWidth={300} className="toll-popup">
              <HotspotPopup hs={hs} color={color} />
            </Popup>
          </CircleMarker>
        );
      })}
    </>
  );
}

function HotspotPopup({ hs, color }: { hs: WarehouseHotspot; color: string }) {
  return (
    <div className="p-1 min-w-[220px]">
      <div className="font-semibold text-slate-100 text-sm mb-1">{hs.name}</div>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: `${color}30`, color }}>
          {hs.cluster}
        </span>
        <span className="text-xs text-slate-400">{hs.region} India</span>
      </div>

      {/* Market metrics (top 8 only) */}
      {hs.rental_min && (
        <div className="border-t border-slate-600 pt-2 mb-2 grid grid-cols-2 gap-1 text-xs">
          <div className="text-slate-500">Rent (₹/sqft/mo)</div>
          <div className="text-slate-200 font-mono">{hs.rental_min}–{hs.rental_max}</div>
          {hs.vacancy_pct != null && <>
            <div className="text-slate-500">Vacancy</div>
            <div className="text-slate-200">{hs.vacancy_pct}%</div>
          </>}
          {hs.absorption_2025_msf != null && <>
            <div className="text-slate-500">Absorbed 2025</div>
            <div className="text-green-400 font-mono">{hs.absorption_2025_msf} msf</div>
          </>}
          {hs.supply_2025_msf != null && <>
            <div className="text-slate-500">New Supply 2025</div>
            <div className="text-blue-400 font-mono">{hs.supply_2025_msf} msf</div>
          </>}
        </div>
      )}

      <div className="text-xs text-slate-400 mb-1">Demand Drivers</div>
      <div className="flex flex-wrap gap-1 mb-2">
        {hs.demand_drivers.map(d => (
          <span key={d} className="px-1.5 py-0.5 bg-slate-700 text-slate-300 rounded text-xs">{d}</span>
        ))}
      </div>

      <div className="text-xs text-slate-400 mb-1">Key Infrastructure</div>
      <div className="flex flex-wrap gap-1">
        {hs.key_infra.map(k => (
          <span key={k} className="px-1.5 py-0.5 bg-blue-900/50 text-blue-300 rounded text-xs">{k}</span>
        ))}
      </div>
    </div>
  );
}
