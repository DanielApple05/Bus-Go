const BusCardSkeleton = () => {
  return (
    <div className="space-y-4 mt-6">
      {[...Array(3)].map((_, index) => (
        <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 animate-pulse">
          {/* Bus Image */}
          <div className="w-28 h-20 rounded-lg bg-slate-200 shrink-0" />
          {/* Bus Details */}
          <div className="flex-1">
            <div className="h-5 w-32 bg-slate-200 rounded mb-3" />

            <div className="flex gap-3 mb-3">
              <div className="h-3 w-20 bg-slate-200 rounded" />
              <div className="h-3 w-12 bg-slate-200 rounded" />
            </div>

            <div className="h-4 w-16 bg-slate-200 rounded mb-2" />

            <div className="h-3 w-40 bg-slate-200 rounded" />
          </div>
          {/* Price & Button */}
          <div className="text-right shrink-0 flex flex-col items-end">
            <div className="h-5 w-20 bg-slate-200 rounded mb-2" />
            <div className="h-3 w-14 bg-slate-200 rounded mb-3" />

            <div className="h-3 w-24 bg-slate-200 rounded mb-1" />
            <div className="h-4 w-10 bg-slate-200 rounded mb-4" />

            <div className="h-10 w-28 bg-slate-200 rounded-lg" />
          </div>
        </div>))}
    </div>);
};

export default BusCardSkeleton;