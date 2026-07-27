import { useNavigate } from 'react-router-dom';
import { CheckCircle, Bus, Calendar, Armchair, Mail, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useBooking } from '../context/BookingContext';

const Confirmation = () => {
  const { booking, resetBooking } = useBooking();
  const navigate = useNavigate();

  if (!booking.booking) {
    navigate('/');
    return null;
  }

  const { bus, from, to, date, seatNumbers, passenger, booking: confirmedBooking } = booking;

  const handleBookAnother = () => {
    resetBooking();
    navigate('/');
  };

  const handleViewBookings = () => {
    resetBooking();
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-lg mx-auto px-6 pt-32 pb-16">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Booking Confirmed!</h1>
          <p className="text-slate-500 text-sm mt-2">
            Your ticket has been booked successfully. A confirmation has been noted against your email.
          </p>
        </div>

        {/* Ticket card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="bg-orange-600 px-6 py-4 flex items-center justify-between">
            <span className="text-white font-semibold">BusGo E-Ticket</span>
            <span className="text-orange-100 text-xs font-mono">
              #{confirmedBooking._id.slice(-8).toUpperCase()}
            </span>
          </div>

          <div className="px-6 py-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">From</div>
                <div className="font-semibold text-slate-900">{from}</div>
              </div>
              <div className="flex-1 mx-4 border-t border-dashed border-slate-300" />
              <div className="text-right">
                <div className="text-xs text-slate-400">To</div>
                <div className="font-semibold text-slate-900">{to}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <InfoRow icon={Calendar} label="Travel Date" value={date} />
              <InfoRow icon={Bus} label="Bus" value={bus.busType} className="capitalize" />
              <InfoRow icon={Armchair} label="Seat(s)" value={seatNumbers?.join(', ') || '—'} />
              <InfoRow icon={Mail} label="Passenger" value={passenger.name} />
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm text-slate-500">Amount Paid</span>
              <span className="font-bold text-orange-600 text-lg">
                ₦{confirmedBooking.totalPrice.toLocaleString()}
              </span>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <span>Payment Ref</span>
              <span className="font-mono">{confirmedBooking.paymentRef}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:border-orange-600 hover:text-orange-600"
          >
            <Download size={16} />
            Save / Print Ticket
          </button>
          <button
            onClick={handleViewBookings}
            className="py-3 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700"
          >
            View My Bookings
          </button>
          <button
            onClick={handleBookAnother}
            className="py-3 rounded-lg text-slate-600 font-medium hover:text-orange-600"
          >
            Book Another Trip
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          A copy of this confirmation has been sent to {passenger.email}
        </p>
      </div>
    </div>
  );
};

const InfoRow = ({ icon: Icon, label, value, className = '' }) => (
  <div className="flex items-start gap-2">
    <Icon size={16} className="text-slate-400 mt-0.5 shrink-0" />
    <div>
      <div className="text-xs text-slate-400">{label}</div>
      <div className={`text-sm font-medium text-slate-900 ${className}`}>{value}</div>
    </div>
  </div>
);

export default Confirmation;