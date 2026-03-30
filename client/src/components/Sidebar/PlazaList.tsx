import { TollPlaza, VehicleType } from '../../types';
import { getFeeColor } from '../../hooks/useTollData';
import clsx from 'clsx';

interface PlazaListProps {
  plazas: TollPlaza[];
  selectedPlaza: TollPlaza | null;
  onSelectPlaza: (plaza: TollPlaza) => void;
  vehicleType: VehicleType;
}

const PAGE_SIZE = 50;

export default function PlazaList({ plazas, selectedPlaza, onSelectPlaza, vehicleType }: PlazaListProps) {
  const displayed = plazas.slice(0, PAGE_SIZE);

  if (plazas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center px-4">
        <div className="text-slate-500 text-sm">No plazas match your filters</div>
        <div className="text-slate-600 text-xs mt-1">Try adjusting the filter criteria</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden h-full">
      <div className="px-4 py-2 flex items-center justify-between border-b border-slate-700/40">
        <span className="text-xs text-slate-500">
          {plazas.length} plaza{plazas.length !== 1 ? 's' : ''}
          {plazas.length > PAGE_SIZE && ` (showing ${PAGE_SIZE})`}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {displayed.map(plaza => {
          const fee = plaza.fees[vehicleType];
          const color = getFeeColor(fee);
          const isSelected = selectedPlaza?.id === plaza.id;

          return (
            <button
              key={plaza.id}
              onClick={() => onSelectPlaza(plaza)}
              className={clsx(
                'w-full text-left px-4 py-3 border-b border-slate-700/30 transition-colors hover:bg-surface-600 flex items-center justify-between gap-2',
                isSelected && 'bg-blue-950/40 border-l-2 border-l-blue-500'
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-slate-200 truncate">{plaza.name}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-mono text-blue-400">{plaza.highway}</span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-xs text-slate-500 truncate">{plaza.state}</span>
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-sm font-bold font-mono" style={{ color }}>
                  ₹{fee}
                </div>
                <div className="w-2 h-2 rounded-full ml-auto mt-1" style={{ background: color }} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
