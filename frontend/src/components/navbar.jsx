import { Bus, Headphones } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { tab: 'Home', path: "/" },
  { tab: 'My Bookings', path: "/booking" },
  { tab: 'Routes', path: "/busRoutes" },
  { tab: 'About', path: "#" },
  { tab: 'contact', path: "#" }
];

const NavBar = () => {
  return (
    <>
      <header className="flex items-center justify-between px-10 py-4 bg-white">
        <div className="flex items-center gap-2">
          <Bus className="text-orange-600" size={26} strokeWidth={2.5} />
          <span className="text-xl font-bold text-slate-900">Bus<span className="text-orange-600">Go</span></span>
        </div>

        <nav className="flex items-center gap-8">
          {navLinks.map(({ tab, path}) => (
            <NavLink
              to={path}
              reloadDocument
              key={tab}
              className={({ isActive }) => `text-sm font-medium pb-1 ${isActive
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-slate-700 hover:text-orange-600'
                }`}
            >
              {tab}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm text-slate-700 hover:text-orange-600">
            <Headphones size={18} />
            Help
          </button>
          <button className="px-4 py-2 text-sm font-medium border border-slate-300 rounded-lg text-slate-800 hover:border-orange-600 hover:text-orange-600">
            Sign In
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-orange-600 text-white rounded-lg hover:bg-orange-700">
            Sign Up
          </button>
        </div>
      </header >
    </>
  );
}

export default NavBar;