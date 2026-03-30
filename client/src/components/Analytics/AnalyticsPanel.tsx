import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { TollPlaza, RouteState, VehicleType, VEHICLE_LABELS } from '../../types';
import { getFeeColor } from '../../hooks/useTollData';

interface AnalyticsPanelProps {
  filteredPlazas: TollPlaza[];
  stateDistribution: { state: string; count: number }[];
  highwayDistribution: { highway: string; count: number }[];
  feeDistribution: { range: string; count: number }[];
  routeState: RouteState;
  vehicleType: VehicleType;
}

const PIE_COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1',
];

const TOOLTIP_STYLE = {
  backgroundColor: '#1e293b',
  border: '1px solid #334155',
  borderRadius: '6px',
  color: '#f1f5f9',
  fontSize: 11,
};

export default function AnalyticsPanel({
  filteredPlazas,
  stateDistribution,
  highwayDistribution,
  feeDistribution,
  routeState,
  vehicleType,
}: AnalyticsPanelProps) {
  const avgFee = filteredPlazas.length > 0
    ? Math.round(filteredPlazas.reduce((s, p) => s + p.fees[vehicleType], 0) / filteredPlazas.length)
    : 0;
  const maxFee = filteredPlazas.length > 0 ? Math.max(...filteredPlazas.map(p => p.fees[vehicleType])) : 0;
  const minFee = filteredPlazas.length > 0 ? Math.min(...filteredPlazas.map(p => p.fees[vehicleType])) : 0;

  return (
    <aside className="w-80 flex-shrink-0 bg-surface-800 border-l border-slate-700/60 flex flex-col overflow-y-auto">
      <div className="p-4 border-b border-slate-700/60">
        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Analytics</h2>
        <p className="text-xs text-slate-500 mt-0.5">{VEHICLE_LABELS[vehicleType]}</p>
      </div>

      <div className="p-4 space-y-5">
        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard label="Plazas" value={filteredPlazas.length.toString()} color="text-blue-400" />
          <StatCard label="Avg Fee" value={`₹${avgFee}`} color="text-amber-400" />
          <StatCard label="Max Fee" value={`₹${maxFee}`} color="text-red-400" />
        </div>

        {/* Route summary (when active) */}
        {routeState.step === 'complete' && (
          <div className="p-3 bg-blue-950/50 border border-blue-700/40 rounded-lg space-y-3">
            <div className="text-xs font-semibold text-blue-300">Route Analysis</div>

            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-surface-700 rounded">
                <div className="text-lg font-bold font-mono text-white">{routeState.distanceKm}</div>
                <div className="text-xs text-slate-500">km (direct)</div>
              </div>
              <div className="text-center p-2 bg-surface-700 rounded">
                <div className="text-lg font-bold font-mono text-green-400">
                  {routeState.plazasOnRoute.length}
                </div>
                <div className="text-xs text-slate-500">toll plazas</div>
              </div>
            </div>

            <div className="text-center p-3 bg-amber-950/40 border border-amber-700/30 rounded">
              <div className="text-2xl font-bold font-mono text-amber-300">
                ₹{routeState.totalCost.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Estimated toll ({VEHICLE_LABELS[vehicleType]})
              </div>
            </div>

            {routeState.plazasOnRoute.length > 0 && (
              <div className="space-y-1">
                <div className="text-xs text-slate-500">Plazas on route:</div>
                {routeState.plazasOnRoute.slice(0, 6).map(p => (
                  <div key={p.id} className="flex justify-between text-xs">
                    <span className="text-slate-400 truncate flex-1 mr-2">{p.name}</span>
                    <span className="font-mono text-slate-300 flex-shrink-0">
                      ₹{p.fees[vehicleType]}
                    </span>
                  </div>
                ))}
                {routeState.plazasOnRoute.length > 6 && (
                  <div className="text-xs text-slate-600">
                    +{routeState.plazasOnRoute.length - 6} more
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Fee distribution */}
        <div>
          <h3 className="text-xs font-medium text-slate-400 mb-3">Fee Distribution</h3>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={feeDistribution} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="range" tick={{ fontSize: 9, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 9, fill: '#64748b' }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="count" name="Plazas" radius={[2, 2, 0, 0]}>
                {feeDistribution.map((entry, i) => (
                  <Cell key={i} fill={['#10b981', '#84cc16', '#f59e0b', '#f97316', '#ef4444'][i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* State distribution */}
        <div>
          <h3 className="text-xs font-medium text-slate-400 mb-3">
            Plazas by State <span className="text-slate-600">(top {stateDistribution.length})</span>
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={stateDistribution}
              layout="vertical"
              margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
            >
              <XAxis type="number" tick={{ fontSize: 9, fill: '#64748b' }} />
              <YAxis
                type="category"
                dataKey="state"
                tick={{ fontSize: 9, fill: '#94a3b8' }}
                width={90}
                tickFormatter={v => v.length > 12 ? v.slice(0, 12) + '…' : v}
              />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="count" name="Plazas" fill="#3b82f6" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Highway distribution */}
        <div>
          <h3 className="text-xs font-medium text-slate-400 mb-3">Plazas by Highway</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={highwayDistribution}
                dataKey="count"
                nameKey="highway"
                cx="50%"
                cy="50%"
                outerRadius={55}
                innerRadius={25}
              >
                {highwayDistribution.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                formatter={(v: number, name: string) => [v, name]}
              />
              <Legend
                wrapperStyle={{ fontSize: 9, color: '#94a3b8' }}
                iconSize={8}
                formatter={v => v}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Min/max breakdown */}
        <div className="p-3 bg-surface-700 rounded-lg space-y-2">
          <div className="text-xs font-medium text-slate-400">Fee Extremes</div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Lowest toll (car)</span>
            <span className="font-mono text-green-400">₹{minFee}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Highest toll (car)</span>
            <span className="font-mono text-red-400">₹{maxFee}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Average toll (car)</span>
            <span className="font-mono text-amber-400">₹{avgFee}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-surface-700 rounded-lg p-2.5 text-center">
      <div className={`text-base font-bold font-mono ${color}`}>{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}
