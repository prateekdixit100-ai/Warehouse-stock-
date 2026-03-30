import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { FilterState, TollPlaza, RouteState } from '../../types';
import FilterPanel from './FilterPanel';
import PlazaList from './PlazaList';
import PlazaDetails from './PlazaDetails';
import clsx from 'clsx';

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
}

export default function Sidebar({
  filteredPlazas,
  selectedPlaza,
  filters,
  updateFilter,
  resetFilters,
  activeFilterCount,
  availableStates,
  availableHighways,
  onSelectPlaza,
  routeState,
}: SidebarProps) {
  return (
    <aside className="w-72 flex-shrink-0 bg-surface-800 border-r border-slate-700/60 flex flex-col overflow-hidden">
      {selectedPlaza ? (
        <PlazaDetails
          plaza={selectedPlaza}
          onBack={() => onSelectPlaza(null)}
        />
      ) : (
        <>
          {/* Search */}
          <div className="p-3 border-b border-slate-700/60">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search plazas, states, highways..."
                value={filters.searchQuery}
                onChange={e => updateFilter('searchQuery', e.target.value)}
                className="w-full bg-surface-700 border border-slate-600 rounded pl-8 pr-8 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => updateFilter('searchQuery', '')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <FilterPanel
            filters={filters}
            updateFilter={updateFilter}
            resetFilters={resetFilters}
            activeFilterCount={activeFilterCount}
            availableStates={availableStates}
            availableHighways={availableHighways}
          />

          {/* Route summary (when route is complete) */}
          {routeState.step === 'complete' && (
            <div className="mx-3 mt-3 p-3 bg-blue-950/50 border border-blue-700/40 rounded-lg">
              <div className="text-xs font-semibold text-blue-300 mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                Route Summary
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-sm font-bold font-mono text-white">{routeState.distanceKm}</div>
                  <div className="text-xs text-slate-500">km (direct)</div>
                </div>
                <div>
                  <div className="text-sm font-bold font-mono text-green-400">{routeState.plazasOnRoute.length}</div>
                  <div className="text-xs text-slate-500">plazas</div>
                </div>
                <div>
                  <div className="text-sm font-bold font-mono text-amber-400">₹{routeState.totalCost}</div>
                  <div className="text-xs text-slate-500">est. toll</div>
                </div>
              </div>
            </div>
          )}

          {/* Plaza list */}
          <div className="flex-1 overflow-hidden mt-2">
            <PlazaList
              plazas={routeState.step === 'complete' && routeState.plazasOnRoute.length > 0
                ? routeState.plazasOnRoute
                : filteredPlazas}
              selectedPlaza={selectedPlaza}
              onSelectPlaza={onSelectPlaza}
              vehicleType={filters.vehicleType}
            />
          </div>
        </>
      )}
    </aside>
  );
}
