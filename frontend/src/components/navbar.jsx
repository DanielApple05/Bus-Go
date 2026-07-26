import { Bus, Headphones } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import AuthModal from './authModal';
import { useState } from 'react';

const navLinks = [
  { tab: 'Home', path: "/" },
  { tab: 'My Bookings', path: "/booking" },
  { tab: 'Routes', path: "/routes" },
  { tab: 'contact', path: "/coming-soon" }
];

const NavBar = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <>
      <header className="flex items-center justify-between px-10 h-20 bg-white fixed z-30 w-full top-0  ">
        <div className="flex items-center gap-2">
          <Bus className="text-orange-600" size={26} strokeWidth={2.5} />
          <span className="text-xl font-bold text-slate-900">Bus<span className="text-orange-600">Go</span></span>
        </div>

        <nav className="flex gap-8  ">
          {navLinks.map(({ tab, path }) => (
            <NavLink
              to={path}
              reloadDocument
              key={tab}
              className={({ isActive }) => `text-sm font-medium ${isActive
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-slate-700 hover:text-orange-600'
                }`} >
              {tab}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-700">Hi, {user.name.split(' ')[0]}</span>
              <button onClick={logout} className="px-4 py-2 text-sm font-medium border border-slate-300 rounded-lg text-slate-800 hover:border-orange-600 hover:text-orange-600">
                Log Out
              </button>
            </div>
          ) : (
            <>
              <button onClick={() => setModalOpen(true)} className="px-4 py-2 text-sm font-medium border border-slate-300 rounded-lg text-slate-800 hover:border-orange-600 hover:text-orange-600">
                Sign In
              </button>
              <button onClick={() => setModalOpen(true)} className="px-4 py-2 text-sm font-medium bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                Sign Up
              </button>
            </>
          )}
        </div>
        <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </header >
    </>
  );
}

export default NavBar;