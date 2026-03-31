import { BarChart2, Map, Navigation, X, ChevronRight } from 'lucide-react';
import { AppStats, RouteState } from '../types';
import clsx from 'clsx';

interface HeaderProps {
  stats: AppStats;
  filteredCount: number;
  routeState: RouteState;
  onToggleRoute: () => void;
  analyticsOpen: boolean;
  onToggleAnalytics: () => void;
  loading: boolean;
}

export default function Header({
  stats, filteredCount, routeState, onToggleRoute,
  analyticsOpen, onToggleAnalytics, loading,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 h-14 bg-surface-800 border-b border-slate-700/60 flex-shrink-0 z-10">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded bg-blue-600">
          <Map size={16} className="text-white" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-slate-100 leading-tight">NHAI GIS Logistics Intelligence</h1>
          <p className="text-xs text-slate-400 leading-tight">Pan-India Toll · Warehousing · Corridors</p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6">
        {loading ? (
          <div className="flex items-center gap-2 text-xs text-slate-400 animate-pulse">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce" />
            Loading 1,563 plazas…
          </div>
        ) : (
          <>
            <StatBadge label="Total Plazas" value={stats.totalPlazas.toLocaleString()} />
            <StatBadge label="Visible" value={filteredCount.toLocaleString()} accent />
            <StatBadge label="States" value={stats.uniqueStates.toString()} />
            <StatBadge label="Highways" value={stats.uniqueHighways.toString()} />
            <StatBadge label="Avg Car Fee" value={`₹${stats.avgCarFee}`} />
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        {routeState.isActive && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-900/50 border border-blue-500/40 rounded text-xs text-blue-300">
            <Navigation size={12} className="animate-pulse" />
            {routeState.step === 'picking-origin' && 'Click map — set origin'}
            {routeState.step === 'picking-destination' && 'Click map — set destination'}
            {routeState.step === 'complete' && (
              <span>{routeState.plazasOnRoute.length} plazas · ₹{routeState.totalCost} · {routeState.distanceKm} km</span>
            )}
          </div>
        )}
        <button
          onClick={onToggleRoute}
          className={clsx(
            'flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors',
            routeState.isActive
              ? 'bg-red-900/60 border border-red-500/40 text-red-300 hover:bg-red-900'
              : 'bg-blue-700 hover:bg-blue-600 text-white'
          )}
        >
          {routeState.isActive ? <><X size={12} /> Cancel Route</> : <><Navigation size={12} /> Plan Route</>}
        </button>
        <button
          onClick={onToggleAnalytics}
          className={clsx(
            'flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors border',
            analyticsOpen
              ? 'bg-slate-700 border-slate-600 text-slate-200'
              : 'bg-transparent border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
          )}
        >
          <BarChart2 size={12} />
          <span className="hidden sm:inline">Analytics</span>
          <ChevronRight size={12} className={clsx('transition-transform', analyticsOpen ? 'rotate-180' : '')} />
        </button>
      </div>
    </header>
  );
}

function StatBadge({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="text-center">
      <div className={clsx('text-sm font-semibold font-mono', accent ? 'text-blue-400' : 'text-slate-100')}>{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}
