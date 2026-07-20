import { Landmark, Clock } from 'lucide-react';

const RouteCard = ({ from, to, price, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50/40 text-left transition-colors"
    >
      <div className="w-14 h-14 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
        <Landmark size={24} className="text-orange-400" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-slate-900">
          {from} <span className="text-orange-500">&rarr;</span> {to}
        </h3>
        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
          <Clock size={12} />
          Daily
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-xs text-slate-500">From</div>
        <div className="font-semibold text-orange-600">₦{price.toLocaleString()}</div>
      </div>
    </button>
  );
}

export default RouteCard;