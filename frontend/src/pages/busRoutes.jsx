import { useState } from 'react';
import { MapPin, ArrowLeftRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import RouteCard from '../components/RouteCard';

const SearchField = ({ icon: Icon, placeholder, value, onChange }) => {
  return (
    <div className="flex items-center gap-2 px-3 h-11 flex-1 rounded-lg border border-slate-200">
      <Icon size={16} className="text-slate-400 shrink-0" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
      />
    </div>
  );
}

// Replace with data from GET /routes
const mockRoutes = [
  { from: 'Lagos', to: 'Abuja', price: 24000 },
  { from: 'Abuja', to: 'Port Harcourt', price: 22000 },
  { from: 'Port Harcourt', to: 'Lagos', price: 28000 },
  { from: 'Enugu', to: 'Lagos', price: 20000 },
  { from: 'Benin', to: 'Lagos', price: 22000 },
  { from: 'Lagos', to: 'Benin', price: 18000 },
];

const BusRoutes = ({ onSelectRoute }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  return (
    <div>
      <Navbar />

      <section className="text-center py-14 px-6 bg-slate-50">
        <h1 className="text-4xl font-bold text-slate-900">Our Routes</h1>
        <p className="text-slate-500 mt-2">Travel to your favorite destinations with ease</p>

        <div className="max-w-2xl mx-auto mt-8 bg-white rounded-xl shadow-md p-3 flex items-center gap-3">
          <SearchField icon={MapPin} placeholder="From" value={from} onChange={setFrom} />
          <ArrowLeftRight size={16} className="text-slate-400 shrink-0" />
          <SearchField icon={MapPin} placeholder="To" value={to} onChange={setTo} />
          <button className="px-6 h-11 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 whitespace-nowrap">
            Search
          </button>
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-12 px-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Popular Routes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockRoutes.map((route) => (
            <RouteCard key={`${route.from}-${route.to}`} {...route} onSelect={() => onSelectRoute?.(route)} />
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto mb-12 px-6">
        <div className="bg-orange-50 rounded-2xl p-8 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Hire a Bus</h3>
            <p className="text-slate-600 text-sm mt-1">Planning a group trip, event or tour? Hire a bus that fits your needs.</p>
            <button className="mt-4 px-5 py-2.5 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700">
              Hire a Bus
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BusRoutes;