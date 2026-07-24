import TripSearchForm from './tripSearchForm';

const Hero = ({ onSearch }) => {
  return (
    <section className=" h-screen mt-20 relative bg-linear-to-br from-slate-800 via-slate-700 to-orange-900 p-14 overflow-hidden grid ">
      <div className="relative max-w-2xl">
        <h1 className="text-5xl font-bold text-white leading-tight">
          Your Journey,<br />Our Priority<span className="text-orange-500">.</span>
        </h1>
        <p className="mt-4 text-slate-200 text-lg">
          Book bus tickets easily, travel comfortably and get to your destination safely.
        </p>

        <div className="flex items-center gap-3 mt-6">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="w-9 h-9 rounded-full bg-slate-300 border-2 border-white" />
            ))}
            <div className="w-9 h-9 rounded-full bg-orange-600 border-2 border-white flex items-center justify-center text-              white text-xs font-semibold">
              2K+
            </div>
          </div>
          <div className="text-sm text-slate-200">
            Happy travelers<br /><span className="font-semibold text-white">trust BusGo</span>
          </div>
        </div>
      </div>
      {/* Search card overlaps hero bottom */}
      <TripSearchForm onSearch={onSearch} />
    </section>
  );
}

export default Hero;