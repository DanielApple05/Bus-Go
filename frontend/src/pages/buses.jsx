import { ArrowLeft, SearchX, WifiOff } from 'lucide-react';
import Navbar from '../components/navbar';
import BusCard from '../components/busCard';
import { useBooking } from '../context/bookingContext';
import { getAvailability } from '../../api/buses';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BusCardSkeleton from '../components/busCardSkeleton';

const AvailableBuses = () => {
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buses, setBuses] = useState([]);

  const onSelectBus = (bus) => {
    updateBooking({ bus });
    navigate('/select-seat');
  };

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAvailability(booking.from, booking.to, booking.date);
        setBuses(data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError('no-route');
        } else {
          setError('request-failed');
        }
        setBuses([]);
      } finally {
        setLoading(false);
      }
    };

    if (booking.from && booking.to && booking.date) {
      fetchBuses();
    }
  }, [booking.from, booking.to, booking.date]);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10 mt-20">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-orange-600 mb-4">
          <ArrowLeft size={18} />
        </button>

        <h1 className="text-2xl font-bold text-slate-900">Available Buses</h1>
        <p className="text-slate-500 text-sm mt-1">
          {booking?.from} &rarr; {booking?.to} &nbsp;&bull;&nbsp; {booking?.date}
        </p>

        {loading && <BusCardSkeleton />}

        {!loading && error === 'request-failed' && (
          <EmptyState
            icon={WifiOff}
            title="Something went wrong"
            message="We couldn't load buses right now. Check your connection and try again."
          />
        )}

        {!loading && error === 'no-route' && (
          <EmptyState
            icon={SearchX}
            title="No route found"
            message={`We don't currently run buses between ${booking?.from} and ${booking?.to}.`}
          />
        )}

        {!loading && !error && buses.length === 0 && (
          <EmptyState
            icon={SearchX}
            title="No buses available"
            message={`No buses found for ${booking?.date}. Try a different date.`}
          />
        )}

        {!loading && !error && buses.length > 0 && (
          <div className="flex flex-col gap-4 mt-6">
            {buses.map((bus) => (
              <BusCard key={bus._id} bus={bus} onSelect={onSelectBus} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const EmptyState = ({ icon: Icon, title, message }) => (
  <div className="flex flex-col items-center text-center py-16">
    <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
      <Icon size={24} className="text-slate-400" />
    </div>
    <h3 className="font-semibold text-slate-900">{title}</h3>
    <p className="text-slate-500 text-sm mt-1 max-w-sm">{message}</p>
  </div>
);

export default AvailableBuses;