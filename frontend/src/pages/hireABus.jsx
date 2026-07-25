// pages/HireABus.jsx
import { useState } from 'react';
import Navbar from '../components/navbar';

const HireABus = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    pickupLocation: '',
    eventDate: '',
    passengers: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend endpoint for this yet — see note below
    console.log('Hire request:', form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div>
        <Navbar />
        <div className="max-w-md mx-auto text-center py-24 px-6">
          <h1 className="text-2xl font-bold text-slate-900">Request Received</h1>
          <p className="text-slate-500 mt-2">We'll reach out to confirm pricing and availability.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-20 px-6 py-14">
        <h1 className="text-3xl font-bold text-slate-900">Hire a Bus</h1>
        <p className="text-slate-500 mt-2">Tell us about your trip and we'll get back to you with a quote.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
          <Input label="Full Name" value={form.name} onChange={handleChange('name')} />
          <Input label="Email" type="email" value={form.email} onChange={handleChange('email')} />
          <Input label="Phone" value={form.phone} onChange={handleChange('phone')} />
          <Input label="Pickup Location" value={form.pickupLocation} onChange={handleChange('pickupLocation')} />
          <Input label="Event Date" type="date" value={form.eventDate} onChange={handleChange('eventDate')} />
          <Input label="Number of Passengers" type="number" value={form.passengers} onChange={handleChange('passengers')} />

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-800">Additional Notes</span>
            <textarea
              value={form.notes}
              onChange={handleChange('notes')}
              rows={4}
              className="px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-orange-500"
            />
          </label>

          <button type="submit" className="mt-2 py-3 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <label className="flex flex-col gap-1.5">
    <span className="text-sm font-medium text-slate-800">{label}</span>
    <input
      {...props}
      className="h-11 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:border-orange-500"
    />
  </label>
);

export default HireABus;