import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Calendar, Armchair } from 'lucide-react';
import Navbar from '../components/navbar';
import API from '../../api/axios';
import { useAuth } from '../context/authContext';

const statusStyles = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  cancelled: 'bg-red-100 text-red-700',
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

const { token, isLoggedIn } = useAuth();

useEffect(() => {
  if (!isLoggedIn) { setLoading(false); return; }
  API.get('/bookings/mine', { headers: { Authorization: `Bearer ${token}` } })
    .then(({ data }) => setBookings(data))
    .catch(console.error)
    .finally(() => setLoading(false));
}, [isLoggedIn, token]);

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10 mt-20">
        <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
        <p className="text-slate-500 text-sm mt-1">Your trip history on this device</p>

        {loading && <p className="text-slate-400 text-sm mt-6">Loading your bookings...</p>}

        {!loading && bookings.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500">No bookings yet.</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 px-5 py-2.5 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700"
            >
              Book a Trip
            </button>
          </div>
        )}

        <div className="flex flex-col gap-4 mt-6">
          {bookings.map((b) => (
            <div key={b._id} className="rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">
                  {b.route.from} &rarr; {b.route.to}
                </h3>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusStyles[b.status]}`}>
                  {b.status}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-500 mt-3">
                <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(b.travelDate).toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><Bus size={14} /> {b.bus.busType}</span>
                <span className="flex items-center gap-1"><Armchair size={14} /> {b.seatNumbers.join(', ')}</span>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                <span className="text-sm text-slate-500">Total Paid</span>
                <span className="font-semibold text-orange-600">₦{b.totalPrice.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;