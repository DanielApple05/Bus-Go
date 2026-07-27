const BusCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 mt-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="xl:flex grid items-center gap-4 p-4 rounded-xl border border-slate-200 animate-pulse">

          <div className="w-full xl:w-28 h-32 xl:h-20 rounded-lg bg-slate-200 shrink-0" />

          <div className="flex justify-between w-full">
            <div className="flex-1">
              <div className="h-5 w-32 bg-slate-200 rounded mb-3" />

              <div className="flex gap-3 mb-3">
                <div className="h-3 w-20 bg-slate-200 rounded" />
                <div className="h-3 w-12 bg-slate-200 rounded" />
              </div>

              <div className="h-4 w-16 bg-slate-200 rounded mb-2" />

              <div className="h-3 w-40 bg-slate-200 rounded" />
            </div>

            <div className="text-right shrink-0 flex flex-col items-end">
              <div className="h-5 w-20 bg-slate-200 rounded mb-2" />
              <div className="h-3 w-14 bg-slate-200 rounded mb-3" />

              <div className="h-3 w-24 bg-slate-200 rounded mb-1" />
              <div className="h-4 w-10 bg-slate-200 rounded mb-4" />

              <div className="h-10 w-28 bg-slate-200 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusCardSkeleton;