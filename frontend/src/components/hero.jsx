import TripSearchForm from './tripSearchForm';

const Hero = ({ onSearch }) => {
  return (
    <section className="mt-20 relative bg-linear-to-br from-slate-800 via-slate-700 to-orange-900 px-5 py-10 xl:p-14 overflow-hidden">
      <div className="relative max-w-2xl">
        <h1 className="text-3xl xl:text-5xl font-bold text-white leading-tight">
          Your Journey,<br />Our Priority<span className="text-orange-500">.</span>
        </h1>
        <p className="mt-4 text-slate-200 text-base sm:text-lg">
          Book bus tickets easily, travel comfortably and get to your destination safely.
        </p>

        <div className="flex items-center gap-3 mt-6">
          <div className="flex -space-x-3 shrink-0">
            {[1, 2, 3].map((n) => (
              <div key={n} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-300 border-2 border-white" />
            ))}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-orange-600 border-2 border-white flex items-center justify-center text-white text-xs font-semibold">
              2K+
            </div>
          </div>
          <div className="text-xs sm:text-sm text-slate-200">
            Happy travelers<br /><span className="font-semibold text-white">trust BusGo</span>
          </div>
        </div>
      </div>
      <div className="mt-8 ">
        <TripSearchForm onSearch={onSearch} />
      </div>
    </section>
  );
}

export default Hero;