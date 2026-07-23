import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import SeatMap from '../components/SeatMap';
import { useBooking } from '../context/BookingContext';
import { createBooking } from '../../api/bookings';

const Legend = ({ colorClass, label, filled }) => (
  <div className="flex items-center gap-1.5">
    <div className={`w-3 h-3 rounded-sm ${filled ? 'bg-orange-600' : `border ${colorClass.replace('text-', 'border-')}`}`} />
    {label}
  </div>
);

const Input = ({ label, ...props }) => {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-slate-800">{label}</span>
      <input
        {...props}
        className="h-11 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:border-orange-500 placeholder:text-slate-400"
      />
    </label>
  );
}

const SeatSelection = () => {
  const { booking, updateBooking } = useBooking();
  const navigate = useNavigate();

  const bus = booking.bus;

  const [selected, setSelected] = useState([]);
  const [passenger, setPassenger] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!bus) {
    navigate('/buses');
    return null;
  }

  const toggleSeat = (seatNumber) => {
    setSelected((prev) =>
      prev.includes(seatNumber) ? prev.filter((s) => s !== seatNumber) : prev.length < 1 ? [...prev, seatNumber] : prev
    );
  };

  const total = selected.length * bus.route.price;
  const canContinue = selected.length > 0 && passenger.name && passenger.email && passenger.phone && !submitting;

  const handleChange = (field) => (e) =>
    setPassenger((prev) => ({ ...prev, [field]: e.target.value }));

  const handleContinue = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const result = await createBooking({
        tripType: booking.tripType,
        busId: bus._id,
        travelDate: booking.date,
        returnDate: booking.returnDate || null,
        seatNumbers: selected,
        passenger,
      });
      updateBooking({ seatNumber: selected[0], passenger, booking: result });
      navigate('/summary');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not reserve that seat. Try another.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10 pb-32">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-orange-600 mb-4">
          <ArrowLeft size={18} />
        </button>

        <h1 className="text-2xl font-bold text-slate-900">Select Your Seat</h1>
        <p className="text-slate-500 text-sm mt-1">
          {booking.from} &rarr; {booking.to} &nbsp;&bull;&nbsp; {bus.busType} &nbsp;&bull;&nbsp; {booking.date}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 mt-6">
          <div className="rounded-xl border border-slate-200 p-6">
            <div className="w-full text-center text-xs text-slate-400 mb-2">Front of bus</div>
            <SeatMap seats={bus.seats} layout="2+2" selected={selected} onToggle={toggleSeat} />

            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
              <Legend colorClass="text-slate-400" label="Available" />
              <Legend colorClass="text-orange-600" label="Selected" filled />
              <Legend colorClass="text-slate-300" label="Booked" />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 p-5 h-fit">
            <h3 className="font-semibold text-slate-900 mb-4">Passenger Details</h3>
            <div className="flex flex-col gap-3">
              <Input label="Full Name" value={passenger.name} onChange={handleChange('name')} placeholder="John Doe" />
              <Input label="Email" type="email" value={passenger.email} onChange={handleChange('email')} placeholder="john.doe@email.com" />
              <Input label="Phone" value={passenger.phone} onChange={handleChange('phone')} placeholder="0801 234 5678" />
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 text-sm">
              <div className="flex items-center justify-between text-slate-500">
                <span>Selected Seat</span>
                <span className="font-mono text-slate-900">{selected[0] || '—'}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="font-bold text-orange-600">₦{total.toLocaleString()}</span>
              </div>
            </div>

            {error && <p className="text-red-500 text-xs mt-3">{error}</p>}

            <button
              disabled={!canContinue}
              onClick={handleContinue}
              className="w-full mt-5 py-3 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
              {submitting ? 'Reserving seat...' : 'Continue to Summary'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
