import { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { getCities } from '../../api/routes';

const LocationAutocomplete = ({ label, value, onChange, placeholder }) => {
  const [cities, setCities] = useState([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await getCities();
        setCities(response);
      } catch (error) {
        console.log(error)
      }
    }
    fetchCities();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = cities.filter((city) =>
    city.toLowerCase().includes(value.toLowerCase())
  );

  const handleSelect = (city) => {
    onChange(city);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-1.5 relative" ref={wrapperRef}>
      {label && <label className="text-sm font-medium text-slate-800">{label}</label>}
      <div className="flex items-center gap-2 px-3 h-11 rounded-lg border border-slate-200 bg-slate-50 focus-within:border-orange-600">
        <MapPin size={16} className="text-slate-400 shrink-0" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
        />
      </div>

      {open && filtered.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-20">
          {filtered.map((city) => (
            <li key={city}>
              <button
                type="button"
                onClick={() => handleSelect(city)}
                className="w-full text-left px-3 py-2 text-base text-slate-700 hover:bg-orange-50 hover:text-orange-600"
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;