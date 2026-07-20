import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import BusCard from '../components/BusCard';

// Replace with data from GET /availability?from=&to=&date=
const mockBuses = [
  { id: 1, name: 'Luxury Coach', seatLayout: '2+1 Seater', from: 'Lagos', to: 'Abuja', departure: '08:00 AM', arrival: '02:00 PM', price: 24000, availableSeats: 18 },
  { id: 2, name: 'Executive Bus', seatLayout: '2+2 Seater', from: 'Lagos', to: 'Abuja', departure: '09:30 AM', arrival: '03:30 PM', price: 20000, availableSeats: 24 },
  { id: 3, name: 'Standard Bus', seatLayout: '2+2 Seater', from: 'Lagos', to: 'Abuja', departure: '11:00 AM', arrival: '05:00 PM', price: 16000, availableSeats: 30 },
];

const AvailableBuses = ({ route, date, onBack, onSelectBus }) => {
  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-orange-600 mb-4">
          <ArrowLeft size={18} />
        </button>

        <h1 className="text-2xl font-bold text-slate-900">Available Buses</h1>
        <p className="text-slate-500 text-sm mt-1">
          {route?.from} &rarr; {route?.to} &nbsp;&bull;&nbsp; {date}
        </p>

        <div className="flex flex-col gap-4 mt-6">
          {mockBuses.map((bus) => (
            <BusCard key={bus.id} bus={bus} onSelect={onSelectBus} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AvailableBuses;