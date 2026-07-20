import { useState } from 'react';
import { ArrowLeftRight, RefreshCw, Bus, MapPin, Calendar } from 'lucide-react';

const tripTypes = [
  { id: 'one-way', label: 'One-way Trip', icon: ArrowLeftRight },
  { id: 'round-trip', label: 'Round Trip', icon: RefreshCw },
  { id: 'hire', label: 'Hire a Bus', icon: Bus },
];

const TripSearchForm = ({ onSearch }) => {
  const [tripType, setTripType] = useState('one-way');
  const [form, setForm] = useState(
    {
      from: '',
      to: '',
      date: '',
      returnDate: ''
    });

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const swapLocations = () =>
    setForm((prev) => ({ ...prev, from: prev.to, to: prev.from }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSearch?.({ tripType, ...form })
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      {/* Trip type tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-5">
        {tripTypes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTripType(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tripType === id
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
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr_1fr_auto] gap-4 items-end ">

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-800"> From</label>
          <div className="flex items-center gap-2 px-3 h-11 rounded-lg border border-slate-200 bg-slate-50 focus-within:border-orange-600">
            <MapPin size={16} className="text-slate-400 shrink-0" />
            <input
              icon={MapPin}
              placeholder="Departure location"
              value={form.from}
              onChange={handleChange('from')}
              className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div
          onClick={swapLocations}
          className="hidden md:flex items-center justify-center w-9 h-9 mb-1 rounded-full border border-slate-200 text-slate-500 hover:text-orange-600 hover:border-orange-600"
          aria-label="Swap locations">
          <ArrowLeftRight size={16} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-800"> To</label>
          <div className="flex items-center gap-2 px-3 h-11 rounded-lg border border-slate-200 bg-slate-50 focus-within:border-orange-600">
            <MapPin size={16} className="text-slate-400 shrink-0" />
            <input
              label="To"
              icon={MapPin}
              placeholder="Destination"
              value={form.to}
              onChange={handleChange('to')}
              className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
            />
          </div >
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-800"> Departure Date</label>
          <div className="flex items-center gap-2 px-3 h-11 rounded-lg border border-slate-200 bg-slate-50 focus-within:border-orange-600">
            <input
              type="date"
              value={form.date}
              onChange={handleChange('date')}
              className='w-full'
            />
            {/* <Calendar size={16} className="text-slate-400 shrink-0" /> */}
          </div>
        </div>

        {tripType === 'round-trip' && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-800"> Return Date</label>
            <div className="flex items-center gap-2 px-3 h-11 rounded-lg border border-slate-200 bg-slate-50 focus-within:border-orange-600">
              <input
                optional
                type="date"
                value={form.returnDate}
                onChange={handleChange('returnDate')}
                className='w-full'
              />
            </div >
          </div >
        )}

        <button
          type='submit'
          className="h-11 px-6 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 whitespace-nowrap"
        >
          Search Buses
        </button>
      </form>
    </div>
  );
}

export default TripSearchForm;