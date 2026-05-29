export default function Loading() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#07090e] text-slate-100 select-none">
      
      {/* 1. SIDEBAR SKELETON (Left) */}
      <aside className="hidden md:flex flex-col w-20 lg:w-20 h-screen bg-[#0d111b]/50 border-r border-slate-800/40 p-4 items-center gap-8 shrink-0">
        {/* Logo circle */}
        <div className="w-12 h-12 rounded-xl bg-slate-800/40 animate-pulse" />
        
        {/* Navigation list */}
        <div className="flex-1 flex flex-col gap-6 w-full items-center mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-10 h-10 rounded-xl bg-slate-800/30 animate-pulse" />
          ))}
        </div>
      </aside>

      {/* 2. MAIN CONTENT SKELETON (Right) */}
      <div className="flex-1 h-screen overflow-y-auto p-6 sm:p-10 pb-28 md:pb-10">
        
        {/* Top Navbar spacer skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col gap-2">
            <div className="w-40 h-6 rounded-lg bg-slate-800/50 animate-pulse" />
            <div className="w-24 h-4 rounded-md bg-slate-800/30 animate-pulse" />
          </div>
          <div className="w-28 h-10 rounded-xl bg-slate-800/40 animate-pulse" />
        </div>

        {/* Bento Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          
          {/* Hero Tile Skeleton (2 cols) */}
          <div className="col-span-1 md:col-span-2 h-[220px] rounded-3xl bg-slate-950/40 border border-slate-800/30 p-8 flex flex-col justify-between animate-pulse">
            <div className="space-y-3">
              <div className="w-32 h-5 rounded-md bg-slate-800/50" />
              <div className="w-64 h-8 rounded-lg bg-slate-800/60" />
              <div className="w-96 h-4 rounded-md bg-slate-800/30" />
            </div>
            <div className="flex gap-8 border-t border-slate-850 pt-6 mt-4">
              <div className="w-24 h-10 rounded-xl bg-slate-800/40" />
              <div className="w-24 h-10 rounded-xl bg-slate-800/40" />
            </div>
          </div>

          {/* Course Card 1 Skeleton (1 col) */}
          <div className="h-[180px] rounded-2xl bg-slate-950/40 border border-slate-800/30 p-5 flex flex-col justify-between animate-pulse">
            <div className="w-10 h-10 rounded-xl bg-slate-800/50" />
            <div className="w-3/4 h-5 rounded-md bg-slate-800/60 my-2" />
            <div className="w-full space-y-2 mt-auto">
              <div className="flex justify-between">
                <div className="w-16 h-3 rounded bg-slate-800/40" />
                <div className="w-8 h-3 rounded bg-slate-800/40" />
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900" />
            </div>
          </div>

          {/* Course Card 2 Skeleton (1 col) */}
          <div className="h-[180px] rounded-2xl bg-slate-950/40 border border-slate-800/30 p-5 flex flex-col justify-between animate-pulse">
            <div className="w-10 h-10 rounded-xl bg-slate-800/50" />
            <div className="w-5/6 h-5 rounded-md bg-slate-800/60 my-2" />
            <div className="w-full space-y-2 mt-auto">
              <div className="flex justify-between">
                <div className="w-16 h-3 rounded bg-slate-800/40" />
                <div className="w-8 h-3 rounded bg-slate-800/40" />
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900" />
            </div>
          </div>

          {/* Course Card 3 Skeleton (1 col) */}
          <div className="h-[180px] rounded-2xl bg-slate-950/40 border border-slate-800/30 p-5 flex flex-col justify-between animate-pulse">
            <div className="w-10 h-10 rounded-xl bg-slate-800/50" />
            <div className="w-2/3 h-5 rounded-md bg-slate-800/60 my-2" />
            <div className="w-full space-y-2 mt-auto">
              <div className="flex justify-between">
                <div className="w-16 h-3 rounded bg-slate-800/40" />
                <div className="w-8 h-3 rounded bg-slate-800/40" />
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900" />
            </div>
          </div>

          {/* Course Card 4 Skeleton (1 col) */}
          <div className="h-[180px] rounded-2xl bg-slate-950/40 border border-slate-800/30 p-5 flex flex-col justify-between animate-pulse">
            <div className="w-10 h-10 rounded-xl bg-slate-800/50" />
            <div className="w-4/5 h-5 rounded-md bg-slate-800/60 my-2" />
            <div className="w-full space-y-2 mt-auto">
              <div className="flex justify-between">
                <div className="w-16 h-3 rounded bg-slate-800/40" />
                <div className="w-8 h-3 rounded bg-slate-800/40" />
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900" />
            </div>
          </div>

          {/* Activity Tile Skeleton (3 cols) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 h-[260px] rounded-3xl bg-slate-950/40 border border-slate-800/30 p-6 flex flex-col justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800/50" />
              <div className="space-y-1.5">
                <div className="w-44 h-4 rounded bg-slate-800/55" />
                <div className="w-72 h-3 rounded bg-slate-800/35" />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center py-4">
              <div className="w-full h-20 rounded-xl bg-slate-800/20" />
            </div>
            <div className="flex justify-end gap-2">
              <div className="w-24 h-3 rounded bg-slate-800/35" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
