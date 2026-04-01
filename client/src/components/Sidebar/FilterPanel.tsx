import { useState } from 'react';
import { ChevronDown, ChevronUp, X, RotateCcw } from 'lucide-react';
import { FilterState, VehicleType, VEHICLE_LABELS, IndiaRegion } from '../../types';
import clsx from 'clsx';

interface FilterPanelProps {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  activeFilterCount: number;
  availableStates: string[];
  availableHighways: string[];
}

const REGIONS: IndiaRegion[] = ['North', 'South', 'East', 'West', 'Central', 'Northeast'];
const REGION_COLORS: Record<IndiaRegion, string> = {
  North: '#3b82f6', South: '#10b981', East: '#f59e0b',
  West: '#f97316', Central: '#a855f7', Northeast: '#ec4899',
};

export default function FilterPanel({
  filters, updateFilter, resetFilters, activeFilterCount,
  availableStates, availableHighways,
}: FilterPanelProps) {
  const [expanded, setExpanded] = useState(true);

  const toggleState = (state: string) => {
    const cur = filters.states;
    updateFilter('states', cur.includes(state) ? cur.filter(s => s !== state) : [...cur, state]);
  };
  const toggleHighway = (hw: string) => {
    const cur = filters.highways;
    updateFilter('highways', cur.includes(hw) ? cur.filter(h => h !== hw) : [...cur, hw]);
  };
  const toggleRegion = (r: IndiaRegion) => {
    const cur = filters.regions;
    updateFilter('regions', cur.includes(r) ? cur.filter(x => x !== r) : [...cur, r]);
  };

  return (
    <div className="border-b border-slate-700/60">
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-300 hover:text-slate-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-1.5 py-0.5 bg-blue-600 text-white rounded-full text-xs font-mono">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={e => { e.stopPropagation(); resetFilters(); }}
              className="p-1 hover:text-red-400 transition-colors"
              title="Reset filters"
            >
              <RotateCcw size={12} />
            </button>
          )}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Vehicle type */}
          <div>
            <label className="text-xs text-slate-500 mb-1.5 block">Vehicle Type</label>
            <select
              value={filters.vehicleType}
              onChange={e => updateFilter('vehicleType', e.target.value as VehicleType)}
              className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              {(Object.keys(VEHICLE_LABELS) as VehicleType[]).map(key => (
                <option key={key} value={key}>{VEHICLE_LABELS[key]}</option>
              ))}
            </select>
          </div>

          {/* Quick Top-N filters */}
          <div>
            <label className="text-xs text-slate-500 mb-1.5 block">Quick Filter</label>
            <div className="flex flex-wrap gap-1.5">
              {([null, 10, 25, 50, 100] as (number | null)[]).map(n => (
                <button
                  key={n ?? 'all'}
                  onClick={() => updateFilter('topN', filters.topN === n ? null : n)}
                  className={clsx(
                    'px-2 py-1 rounded text-xs border transition-colors',
                    filters.topN === n
                      ? 'bg-amber-700/60 border-amber-500/60 text-amber-200'
                      : 'border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                  )}
                >
                  {n === null ? 'All' : `Top ${n}`}
                </button>
              ))}
            </div>
          </div>

          {/* Sort by */}
          <div>
            <label className="text-xs text-slate-500 mb-1.5 block">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={e => updateFilter('sortBy', e.target.value as FilterState['sortBy'])}
              className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="fee_desc">Highest Fee First</option>
              <option value="fee_asc">Lowest Fee First</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>

          {/* Region filter */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-slate-500">Region</label>
              {filters.regions.length > 0 && (
                <button onClick={() => updateFilter('regions', [])} className="text-xs text-slate-500 hover:text-red-400">Clear</button>
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              {REGIONS.map(r => (
                <button
                  key={r}
                  onClick={() => toggleRegion(r)}
                  className={clsx(
                    'px-2 py-1 rounded text-xs border transition-colors',
                    filters.regions.includes(r)
                      ? 'text-white border-transparent'
                      : 'border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                  )}
                  style={filters.regions.includes(r) ? { background: REGION_COLORS[r], borderColor: REGION_COLORS[r] } : {}}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* State filter */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-slate-500">State / UT</label>
              {filters.states.length > 0 && (
                <button onClick={() => updateFilter('states', [])} className="text-xs text-slate-500 hover:text-red-400">Clear</button>
              )}
            </div>
            <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto">
              {availableStates.map(state => (
                <button
                  key={state}
                  onClick={() => toggleState(state)}
                  className={clsx(
                    'px-2 py-1 rounded text-xs border transition-colors',
                    filters.states.includes(state)
                      ? 'bg-blue-700/60 border-blue-500/60 text-blue-200'
                      : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                  )}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>

          {/* Highway filter */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-slate-500">Highway</label>
              {filters.highways.length > 0 && (
                <button onClick={() => updateFilter('highways', [])} className="text-xs text-slate-500 hover:text-red-400">Clear</button>
              )}
            </div>
            <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
              {availableHighways.map(hw => (
                <button
                  key={hw}
                  onClick={() => toggleHighway(hw)}
                  className={clsx(
                    'px-2 py-1 rounded text-xs border font-mono transition-colors',
                    filters.highways.includes(hw)
                      ? 'bg-blue-700/60 border-blue-500/60 text-blue-200'
                      : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                  )}
                >
                  {hw}
                </button>
              ))}
            </div>
          </div>

          {/* Fee range */}
          <div>
            <label className="text-xs text-slate-500 mb-1.5 block">
              {VEHICLE_LABELS[filters.vehicleType]} Fee:{' '}
              <span className="text-slate-300 font-mono">₹{filters.minFee} – ₹{filters.maxFee}</span>
            </label>
            <div className="flex gap-2">
              <input type="range" min={0} max={200} step={5} value={filters.minFee}
                onChange={e => updateFilter('minFee', Number(e.target.value))}
                className="flex-1 accent-blue-500" />
              <input type="range" min={50} max={2000} step={10} value={filters.maxFee}
                onChange={e => updateFilter('maxFee', Number(e.target.value))}
                className="flex-1 accent-blue-500" />
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {filters.topN !== null && <Chip label={`Top ${filters.topN}`} onRemove={() => updateFilter('topN', null)} />}
              {filters.regions.map(r => <Chip key={r} label={r} onRemove={() => toggleRegion(r)} />)}
              {filters.states.map(s => <Chip key={s} label={s} onRemove={() => toggleState(s)} />)}
              {filters.highways.map(h => <Chip key={h} label={h} onRemove={() => toggleHighway(h)} />)}
              {(filters.minFee > 0 || filters.maxFee < 2000) && (
                <Chip label={`₹${filters.minFee}–₹${filters.maxFee}`}
                  onRemove={() => { updateFilter('minFee', 0); updateFilter('maxFee', 2000); }} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-900/50 border border-blue-700/50 text-blue-300 rounded text-xs">
      {label}
      <button onClick={onRemove} className="hover:text-white"><X size={10} /></button>
    </span>
  );
}
