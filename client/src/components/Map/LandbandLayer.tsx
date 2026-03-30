import { useState } from 'react';
import { Polyline, CircleMarker, Popup } from 'react-leaflet';
import {
  LandbandCorridor,
  LandbandHub,
  HUB_TYPE_LABELS,
  HUB_TYPE_COLORS,
  CORRIDOR_STATUS_COLORS,
} from '../../data/mpLandband';

interface LandbandLayerProps {
  corridors: LandbandCorridor[];
  hubs: LandbandHub[];
  visible: boolean;
}

export default function LandbandLayer({ corridors, hubs, visible }: LandbandLayerProps) {
  if (!visible) return null;

  return (
    <>
      {/* Corridors as polylines */}
      {corridors.map(corridor => (
        <Polyline
          key={corridor.id}
          positions={corridor.path}
          pathOptions={{
            color: corridor.color,
            weight: corridor.width,
            opacity: 0.85,
            dashArray: corridor.status === 'Planned' ? '10 6' : corridor.status === 'Approved' ? '6 3' : undefined,
          }}
        >
          <Popup maxWidth={300}>
            <CorridorPopup corridor={corridor} />
          </Popup>
        </Polyline>
      ))}

      {/* Hub markers */}
      {hubs.map(hub => (
        <HubMarker key={hub.id} hub={hub} />
      ))}
    </>
  );
}

function HubMarker({ hub }: { hub: LandbandHub }) {
  const color = HUB_TYPE_COLORS[hub.type];
  const isOperational = hub.status === 'Operational';

  return (
    <CircleMarker
      center={[hub.lat, hub.lng]}
      radius={isOperational ? 7 : 6}
      pathOptions={{
        fillColor: color,
        color: '#ffffff',
        fillOpacity: isOperational ? 0.95 : 0.7,
        weight: 1.5,
      }}
    >
      <Popup maxWidth={320} className="toll-popup">
        <HubPopup hub={hub} color={color} />
      </Popup>
    </CircleMarker>
  );
}

function CorridorPopup({ corridor }: { corridor: LandbandCorridor }) {
  const statusColor = CORRIDOR_STATUS_COLORS[corridor.status];
  return (
    <div className="p-1 min-w-[240px]">
      <div className="font-semibold text-slate-100 text-sm mb-1">{corridor.name}</div>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span
          className="px-2 py-0.5 rounded text-xs font-medium"
          style={{ background: `${statusColor}30`, color: statusColor }}
        >
          {corridor.status}
        </span>
        <span className="text-xs text-slate-400">{corridor.lengthKm} km</span>
        <span className="text-xs font-mono text-green-400">{corridor.investment}</span>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed">{corridor.description}</p>
    </div>
  );
}

function HubPopup({ hub, color }: { hub: LandbandHub; color: string }) {
  return (
    <div className="p-1 min-w-[240px]">
      <div className="font-semibold text-slate-100 text-sm mb-1">{hub.name}</div>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span
          className="px-2 py-0.5 rounded text-xs font-medium"
          style={{ background: `${color}30`, color }}
        >
          {HUB_TYPE_LABELS[hub.type]}
        </span>
        <span className="text-xs text-slate-400">{hub.city}, {hub.district}</span>
      </div>
      <div className="border-t border-slate-600 pt-2 mt-1 grid grid-cols-2 gap-1 text-xs mb-2">
        <div className="text-slate-500">Status</div>
        <div className="text-slate-300">{hub.status}</div>
        {hub.areaAcres && (
          <>
            <div className="text-slate-500">Area</div>
            <div className="text-slate-300">{hub.areaAcres.toLocaleString()} acres</div>
          </>
        )}
        {hub.investment && (
          <>
            <div className="text-slate-500">Investment</div>
            <div className="text-green-400 font-mono">{hub.investment}</div>
          </>
        )}
        {hub.developer && (
          <>
            <div className="text-slate-500">Developer</div>
            <div className="text-slate-300">{hub.developer}</div>
          </>
        )}
      </div>
      <p className="text-xs text-slate-300 leading-relaxed mb-2">{hub.description}</p>
      {hub.highlights && hub.highlights.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {hub.highlights.map(h => (
            <span key={h} className="px-1.5 py-0.5 bg-slate-700 text-slate-400 rounded text-xs">{h}</span>
          ))}
        </div>
      )}
    </div>
  );
}
