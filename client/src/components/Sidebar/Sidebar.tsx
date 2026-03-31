import { useState } from 'react';
import { Search, X, Layers, Map, Navigation } from 'lucide-react';
import { FilterState, TollPlaza, RouteState } from '../../types';
import FilterPanel from './FilterPanel';
import PlazaList from './PlazaList';
import PlazaDetails from './PlazaDetails';
import LayersPanel, { LayerFilters } from './LayersPanel';
import clsx from 'clsx';

type Tab = 'plazas' | 'layers' | 'route';

interface SidebarProps {
  filteredPlazas: TollPlaza[];
  selectedPlaza: TollPlaza | null;
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  activeFilterCount: number;
  availableStates: string[];
  availableHighways: string[];
  onSelectPlaza: (plaza: TollPlaza | null) => void;
  routeState: RouteState;
  layerFilters: LayerFilters;
  onUpdateLayer: (patch: Partial<LayerFilters>) => void;
}

export default function Sidebar({
  filteredPlazas, selectedPlaza, filters, updateFilter, resetFilters,
  activeFilterCount, availableStates, availableHighways,
  onSelectPlaza, routeState, layerFilters, onUpdateLayer,
}: SidebarProps) {
  const [tab, setTab] = useState<Tab>('plazas');

  if (selectedPlaza) {
    return (
      <aside className="w-72 flex-shrink-0 bg-surface-800 border-r border-slate-700/60 flex flex-col overflow-hidden">
        <PlazaDetails plaza={selectedPlaza} onBack={() => onSelectPlaza(null)} />
      </aside>
    );
  }

  return (
    <aside className="w-72 flex-shrink-0 bg-surface-800 border-r border-slate-700/60 flex flex-col overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-slate-700/60 flex-shrink-0">
        <TabBtn icon={<Map size={12} />} label="Plazas" active={tab === 'plazas'} onClick={() => setTab('plazas')}
          badge={activeFilterCount > 0 ? activeFilterCount : undefined} />
        <TabBtn icon={<Layers size={12} />} label="Layers" active={tab === 'layers'} onClick={() => setTab('layers')} />
        <TabBtn icon={<Navigation size={12} />} label="Route" active={tab === 'route'} onClick={() => setTab('route')}
          badge={routeState.step === 'complete' ? routeState.plazasOnRoute.length : undefined} />
      </div>

      {/* Plazas tab */}
      {tab === 'plazas' && (
        <>
          <div className="p-3 border-b border-slate-700/60 flex-shrink-0">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search plazas, states, highways…"
                value={filters.searchQuery}
                onChange={e => updateFilter('searchQuery', e.target.value)}
                className="w-full bg-surface-700 border border-slate-600 rounded pl-8 pr-8 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              {filters.searchQuery && (
                <button onClick={() => updateFilter('searchQuery', '')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
          <FilterPanel filters={filters} updateFilter={updateFilter} resetFilters={resetFilters}
            activeFilterCount={activeFilterCount} availableStates={availableStates} availableHighways={availableHighways} />
          <div className="flex-1 overflow-hidden mt-1">
            <PlazaList
              plazas={routeState.step === 'complete' && routeState.plazasOnRoute.length > 0
                ? routeState.plazasOnRoute : filteredPlazas}
              selectedPlaza={selectedPlaza}
              onSelectPlaza={onSelectPlaza}
              vehicleType={filters.vehicleType}
            />
          </div>
        </>
      )}

      {/* Layers tab */}
      {tab === 'layers' && (
        <LayersPanel layerFilters={layerFilters} onUpdate={onUpdateLayer} />
      )}

      {/* Route tab */}
      {tab === 'route' && (
        <div className="p-4 flex-1 overflow-y-auto">
          {routeState.step === 'idle' && (
            <div className="text-center mt-8">
              <Navigation size={28} className="text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">Use <strong className="text-slate-400">Plan Route</strong> in the header, then click two points on the map.</p>
            </div>
          )}
          {(routeState.step === 'picking-origin' || routeState.step === 'picking-destination') && (
            <div className="mt-8 text-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse mx-auto mb-3" />
              <p className="text-slate-400 text-sm">
                {routeState.step === 'picking-origin' ? 'Click map to set ORIGIN' : 'Click map to set DESTINATION'}
              </p>
            </div>
          )}
          {routeState.step === 'complete' && (
            <>
              <div className="p-3 bg-blue-950/50 border border-blue-700/40 rounded-lg mb-4">
                <div className="text-xs font-semibold text-blue-300 mb-3">Route Summary</div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-bold font-mono text-white">{routeState.distanceKm}</div>
                    <div className="text-xs text-slate-500">km direct</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold font-mono text-green-400">{routeState.plazasOnRoute.length}</div>
                    <div className="text-xs text-slate-500">toll plazas</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold font-mono text-amber-400">₹{routeState.totalCost}</div>
                    <div className="text-xs text-slate-500">est. toll</div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-500 mb-2">Plazas on route ({routeState.plazasOnRoute.length})</div>
              <div className="space-y-1">
                {routeState.plazasOnRoute.map(p => (
                  <button key={p.id} onClick={() => onSelectPlaza(p)}
                    className="w-full text-left px-3 py-2 bg-surface-700 hover:bg-surface-600 rounded text-xs border border-slate-700/40 transition-colors">
                    <div className="text-slate-200 font-medium truncate">{p.name}</div>
                    <div className="flex gap-2 text-slate-500 mt-0.5">
                      <span className="font-mono">{p.highway}</span>
                      <span>₹{p.fees[filters.vehicleType]}</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </aside>
  );
}

function TabBtn({ icon, label, active, onClick, badge }: {
  icon: React.ReactNode; label: string; active: boolean;
  onClick: () => void; badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors border-b-2',
        active
          ? 'text-blue-400 border-blue-500 bg-blue-950/20'
          : 'text-slate-500 border-transparent hover:text-slate-300'
      )}
    >
      {icon}
      <span>{label}</span>
      {badge !== undefined && (
        <span className="px-1.5 py-0.5 bg-blue-600/80 text-white rounded-full text-xs font-mono leading-none">
          {badge}
        </span>
      )}
    </button>
  );
}
