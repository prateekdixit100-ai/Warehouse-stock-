import { ArrowLeft, MapPin, Road, Building2, CalendarDays, Truck, Car, Bus } from 'lucide-react';
import { TollPlaza, VEHICLE_LABELS } from '../../types';
import { getFeeColor } from '../../hooks/useTollData';

interface PlazaDetailsProps {
  plaza: TollPlaza;
  onBack: () => void;
}

export default function PlazaDetails({ plaza, onBack }: PlazaDetailsProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start gap-3 p-4 border-b border-slate-700/60">
        <button
          onClick={onBack}
          className="mt-0.5 p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors flex-shrink-0"
        >
          <ArrowLeft size={14} />
        </button>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-slate-100 leading-tight">{plaza.name}</h2>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="px-2 py-0.5 bg-blue-900/60 text-blue-300 rounded text-xs font-mono">
              {plaza.highway}
            </span>
            {plaza.plaza_type && (
              <span className="px-2 py-0.5 bg-slate-700 text-slate-400 rounded text-xs">
                {plaza.plaza_type}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="p-4 space-y-3 overflow-y-auto flex-1">
        <InfoRow icon={<MapPin size={13} />} label="Location" value={`${plaza.district}, ${plaza.state}`} />
        <InfoRow icon={<MapPin size={13} />} label="Coordinates" value={`${plaza.lat.toFixed(4)}°N, ${plaza.lng.toFixed(4)}°E`} mono />
        {plaza.operator && (
          <InfoRow icon={<Building2 size={13} />} label="Operator" value={plaza.operator} />
        )}
        {plaza.commissioned_year && (
          <InfoRow icon={<CalendarDays size={13} />} label="Commissioned" value={plaza.commissioned_year.toString()} />
        )}
        {plaza.daily_traffic && (
          <InfoRow icon={<Truck size={13} />} label="Daily Traffic" value={`${plaza.daily_traffic.toLocaleString()} PCU/day`} />
        )}
        <InfoRow icon={<Road size={13} />} label="Direction" value={plaza.direction === 'both' ? 'Bi-directional' : 'One-way'} />

        {/* Fee table */}
        <div className="mt-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Fee Structure (Single Journey, ₹)
          </h3>
          <div className="rounded-lg border border-slate-700/60 overflow-hidden">
            {(Object.entries(plaza.fees) as [keyof typeof plaza.fees, number][]).map(([key, fee], i) => {
              const color = getFeeColor(fee);
              const isFirst = i === 0;
              return (
                <div
                  key={key}
                  className={`flex items-center justify-between px-3 py-2 ${
                    i % 2 === 0 ? 'bg-surface-700' : 'bg-surface-600'
                  } ${isFirst ? 'font-medium' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    {isFirst ? <Car size={12} className="text-slate-400" /> : <Bus size={12} className="text-slate-500" />}
                    <span className="text-xs text-slate-300">{VEHICLE_LABELS[key]}</span>
                  </div>
                  <span className="text-sm font-mono font-semibold" style={{ color }}>
                    ₹{fee}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Return journey estimate */}
        <div className="mt-3 p-3 bg-blue-950/40 border border-blue-800/30 rounded-lg">
          <div className="text-xs text-blue-400 mb-1">Round Trip Estimate (Car)</div>
          <div className="text-xl font-bold font-mono text-blue-300">
            ₹{plaza.fees.car_jeep_van * 2}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Both directions combined</div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  mono,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="text-slate-500 mt-0.5 flex-shrink-0">{icon}</div>
      <div className="min-w-0">
        <div className="text-xs text-slate-500">{label}</div>
        <div className={`text-xs text-slate-200 ${mono ? 'font-mono' : ''}`}>{value}</div>
      </div>
    </div>
  );
}
