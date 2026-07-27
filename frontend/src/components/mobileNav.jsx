import { useEffect } from 'react';
import { X, Bus, Headphones, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { tab: 'Home', path: '/' },
  { tab: 'My Bookings', path: '/booking' },
  { tab: 'Routes', path: '/routes' },
  { tab: 'Contact', path: '/coming-soon' },
];

const MobileNav = ({ open, onClose, isLoggedIn, user, logout, onAuthClick }) => {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleAuthClick = () => {
    onAuthClick();
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 xl:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white z-50 shadow-xl transition-transform duration-300 xl:hidden flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 h-20 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <Bus className="text-orange-600" size={24} strokeWidth={2.5} />
            <span className="text-lg font-bold text-slate-900">Bus<span className="text-orange-600">Go</span></span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600" aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col px-5 py-6 gap-1 overflow-y-auto">
          {navLinks.map(({ tab, path }) => (
            <NavLink
              key={tab}
              to={path}
              reloadDocument
              onClick={onClose}
              className={({ isActive }) =>
                `px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              {tab}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto px-5 py-6 border-t border-slate-100 flex flex-col gap-3 shrink-0">
          <button className="flex items-center gap-2 text-sm text-slate-700 px-3 py-2">
            <Headphones size={18} />
            Help
          </button>

          {isLoggedIn ? (
            <>
              <div className="px-3 text-sm text-slate-700 truncate">
                Hi, {user?.name?.split(' ')[0]}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 py-3 rounded-lg border border-slate-300 text-sm font-medium text-slate-800 hover:border-orange-600 hover:text-orange-600"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleAuthClick}
                className="py-3 rounded-lg border border-slate-300 text-sm font-medium text-slate-800 hover:border-orange-600 hover:text-orange-600"
              >
                Sign In
              </button>
              <button
                onClick={handleAuthClick}
                className="py-3 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileNav;