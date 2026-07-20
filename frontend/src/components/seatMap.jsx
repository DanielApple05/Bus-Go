import { Armchair } from 'lucide-react';

const Seat = ({ seat, selected, onToggle }) => {
  const isBooked = seat.status === 'booked' || seat.status === 'held';

  const colorClass = isBooked
    ? 'text-slate-300 cursor-not-allowed'
    : selected
    ? 'text-orange-600'
    : 'text-slate-400 hover:text-orange-400 cursor-pointer';

  return (
    <button
      disabled={isBooked}
      onClick={() => onToggle(seat.seatNumber)}
      className="flex flex-col items-center gap-0.5"
    >
      <Armchair size={30} className={colorClass} fill={selected ? 'currentColor' : 'none'} strokeWidth={1.5} />
      <span className={`text-[10px] font-mono ${isBooked ? 'text-slate-300' : 'text-slate-500'}`}>
        {seat.seatNumber}
      </span>
    </button>
  );
}

// layout: '2+1' or '2+2' — determines aisle gap per row
const SeatMap = ({ seats, layout, selected, onToggle }) => {
  const leftCount = layout === '2+1' ? 2 : 2;
  const rowSize = layout === '2+1' ? 3 : 4;

  const rows = [];
  for (let i = 0; i < seats.length; i += rowSize) {
    rows.push(seats.slice(i, i + rowSize));
  }

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      {rows.map((row, i) => (
        <div key={i} className="flex items-center gap-3">
          {row.slice(0, leftCount).map((seat) => (
            <Seat key={seat.seatNumber} seat={seat} selected={selected.includes(seat.seatNumber)} onToggle={onToggle} />
          ))}
          <div className="w-6" />
          {row.slice(leftCount).map((seat) => (
            <Seat key={seat.seatNumber} seat={seat} selected={selected.includes(seat.seatNumber)} onToggle={onToggle} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default SeatMap;