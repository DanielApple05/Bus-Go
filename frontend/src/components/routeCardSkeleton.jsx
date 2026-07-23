const RouteCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 animate-pulse">
          {/* Icon */}
          <div className="w-14 h-14 rounded-lg bg-slate-200 shrink-0" />

          {/* Route Details */}
          <div className="flex-1">
            <div className="h-5 w-40 bg-slate-200 rounded mb-3" />

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-200" />
              <div className="h-3 w-12 bg-slate-200 rounded" />
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col items-end shrink-0">
            <div className="h-3 w-8 bg-slate-200 rounded mb-2" />
            <div className="h-5 w-20 bg-slate-200 rounded" />
          </div>
        </div>))}
    </div>
  );
};

export default RouteCardSkeleton;