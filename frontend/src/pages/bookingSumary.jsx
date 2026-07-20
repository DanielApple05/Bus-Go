import { ArrowLeft, Lock, ShieldCheck, Info } from 'lucide-react';
import Navbar from '../components/Navbar';

const Card = ({ title, children }) => {
  return (
    <div className="rounded-xl border border-slate-200 p-5">
      <h3 className="font-semibold text-slate-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

const Row = ({ label, value, strong }) => {
  return (
    <div className="flex items-center justify-between text-sm py-1">
      <span className="text-slate-500">{label}</span>
      <span className={strong ? 'font-semibold text-slate-900' : 'text-slate-700'}>{value}</span>
    </div>
  );
}

const BookingSummary = ({ booking, onBack, onPay }) => {
  const { route, bus, passenger, seatNumber, date } = booking;
  const serviceFee = 1000;
  const total = bus.price + serviceFee;

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-orange-600 mb-4">
          <ArrowLeft size={18} />
        </button>

        <h1 className="text-2xl font-bold text-slate-900">Booking Summary</h1>
        <p className="text-slate-500 text-sm mt-1">Please confirm your trip details</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card title="Trip Details">
            <Row label="Route" value={`${route.from} → ${route.to}`} />
            <Row label="Date" value={date} />
            <Row label="Bus" value={bus.name} strong />
            <Row label="Departure" value={bus.departure} />
            <Row label="Arrival" value={bus.arrival} />
          </Card>

          <Card title="Passenger Details">
            <Row label="Name" value={passenger.name} />
            <Row label="Email" value={passenger.email} />
            <Row label="Phone" value={passenger.phone} />
            <div className="mt-4 pt-4 border-t border-slate-100">
              <Row label="Seat Number" value={seatNumber} strong />
            </div>
          </Card>

          <div className="rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-4">Payment Summary</h3>
            <Row label="Ticket Price" value={`₦${bus.price.toLocaleString()}`} />
            <Row label="Service Fee" value={`₦${serviceFee.toLocaleString()}`} />
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
              <span className="font-semibold text-slate-900">Total Amount</span>
              <span className="font-bold text-orange-600">₦{total.toLocaleString()}</span>
            </div>
            <button
              onClick={onPay}
              className="w-full flex items-center justify-center gap-2 mt-5 py-3 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700"
            >
              <Lock size={16} />
              Proceed to Payment
            </button>
            <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-slate-400">
              <ShieldCheck size={14} />
              Secure payments by Paystack
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6 p-4 rounded-lg bg-indigo-50 text-indigo-700 text-sm">
          <Info size={16} className="shrink-0" />
          Free cancellation up to 6 hours before departure
        </div>
      </div>
    </div>
  );
}

export default BookingSummary;