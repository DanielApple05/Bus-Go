import { Users, Snowflake } from 'lucide-react';

const BusCard = ({ bus, onSelect }) => {
  const availableSeats = bus.seats?.filter((s) => s.status === 'available').length ?? 0;

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200">
      <div className="w-28 h-20 rounded-lg bg-slate-100 shrink-0" />
      <div className="flex-1">
        <h3 className="font-semibold text-slate-900 capitalize">{bus.busType}</h3>
        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
          <span className="flex items-center gap-1"><Users size={12} /> {bus.totalSeats} Seats</span>
          <span className="flex items-center gap-1"><Snowflake size={12} /> AC</span>
        </div>
        <div className="flex items-center gap-2 text-sm mt-2">
          <span className="font-medium text-slate-900">{bus.departureTime}</span>
        </div>
        <div className="text-xs text-slate-500">{bus.route?.from} &rarr; {bus.route?.to}</div>
      </div>

      <div className="text-right shrink-0">
        <div className="font-semibold text-slate-900">₦{bus.price.toLocaleString()}</div>
        <div className="text-xs text-slate-500 mb-1">Per Seat</div>
        <div className="text-xs text-slate-500">Available Seats</div>
        <div className="text-green-600 font-semibold text-sm mb-2">{availableSeats}</div>
        <button
          onClick={() => onSelect(bus)}
          className="px-4 py-2 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700"
        >
          Select Seats
        </button>
      </div>
    </div>
  );
};

export default BusCard;