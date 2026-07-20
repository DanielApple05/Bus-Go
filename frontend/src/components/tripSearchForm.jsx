import { useState } from 'react';
import { ArrowLeftRight, RefreshCw, Bus, MapPin, Calendar } from 'lucide-react';

const tripTypes = [
  { id: 'one-way', label: 'One-way Trip', icon: ArrowLeftRight },
  { id: 'round-trip', label: 'Round Trip', icon: RefreshCw },
  { id: 'hire', label: 'Hire a Bus', icon: Bus },
];

const Field = ({ label, icon: Icon, optional, ...inputProps }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-800">
        {label} {optional && <span className="text-slate-400 font-normal">(Optional)</span>}
      </label>
      <div className="flex items-center gap-2 px-3 h-11 rounded-lg border border-slate-200 bg-slate-50 focus-within:border-orange-600">
        <Icon size={16} className="text-slate-400 shrink-0" />
        <input
          {...inputProps}
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}

const TripSearchForm = ({ onSearch }) => {
  const [tripType, setTripType] = useState('one-way');
  const [form, setForm] = useState({ from: '', to: '', date: '', returnDate: '' });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const swapLocations = () =>
    setForm((prev) => ({ ...prev, from: prev.to, to: prev.from }));

  const handleSubmit = () => onSearch?.({ tripType, ...form });

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      {/* Trip type tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-5">
        {tripTypes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTripType(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tripType === id
                ? 'bg-orange-600 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr_1fr_auto] gap-4 items-end">
        <Field
          label="From"
          icon={MapPin}
          placeholder="Departure location"
          value={form.from}
          onChange={handleChange('from')}
        />

        <button
          onClick={swapLocations}
          className="hidden md:flex items-center justify-center w-9 h-9 mb-2.5 rounded-full border border-slate-200 text-slate-500 hover:text-orange-600 hover:border-orange-600"
          aria-label="Swap locations"
        >
          <ArrowLeftRight size={16} />
        </button>

        <Field
          label="To"
          icon={MapPin}
          placeholder="Destination"
          value={form.to}
          onChange={handleChange('to')}
        />

        <Field
          label="Departure Date"
          icon={Calendar}
          type="date"
          value={form.date}
          onChange={handleChange('date')}
        />

        {tripType === 'round-trip' && (
          <Field
            label="Return Date"
            optional
            icon={Calendar}
            type="date"
            value={form.returnDate}
            onChange={handleChange('returnDate')}
          />
        )}

        <button
          onClick={handleSubmit}
          className="h-11 px-6 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 whitespace-nowrap"
        >
          Search Buses
        </button>
      </div>
    </div>
  );
}

export default TripSearchForm;