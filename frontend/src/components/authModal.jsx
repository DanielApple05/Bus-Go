import { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { registerUser, loginUser } from '../../api/auth';
import { useAuth } from '../context/authContext';

const AuthModal = ({ open, onClose }) => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();

  if (!open) return null;

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const result =
        mode === 'login'
          ? await loginUser({ email: form.email, password: form.password })
          : await registerUser(form);

      login(result.token, result.user);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex gap-2 mb-6 bg-slate-50 rounded-lg p-1">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'login' ? 'bg-white shadow text-slate-900' : 'text-slate-500'
              }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'signup' ? 'bg-white shadow text-slate-900' : 'text-slate-500'
              }`}
          >
            Sign Up
          </button>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-1">
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="text-slate-500 text-sm mb-5">
          {mode === 'login' ? 'Sign in to see your booking history.' : 'Sign up to keep track of your trips.'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === 'signup' && (
            <Field icon={User} type="text" placeholder="Full name" value={form.name} onChange={handleChange('name')} />
          )}
          <Field icon={Mail} type="email" placeholder="Email address" value={form.email} onChange={handleChange('email')} />
          <Field icon={Lock} type="password" placeholder="Password" value={form.password} onChange={handleChange('password')} />

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 py-3 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 disabled:bg-slate-300"
          >
            {submitting ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

const Field = ({ icon: Icon, ...props }) => (
  <div className="flex items-center gap-2 px-3 h-11 rounded-lg border border-slate-200 focus-within:border-orange-500">
    <Icon size={16} className="text-slate-400 shrink-0" />
    <input {...props} required className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
  </div>
);

export default AuthModal;