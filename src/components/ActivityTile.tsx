"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronRight } from "lucide-react";

interface CellData {
  day: number;
  count: number; // study minutes logged
  date: string;
}

export default function ActivityTile() {
  const [hoveredCell, setHoveredCell] = useState<CellData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Generate 24 weeks of mock learning contribution data
  const weeks = 24;
  const daysPerWeek = 7;
  const totalCells = weeks * daysPerWeek;
  
  const generateMockData = (): CellData[] => {
    const data: CellData[] = [];
    
    // Fixed static baseline UTC date to guarantee identical calendar maps on Server and Client
    const baselineDate = new Date("2026-05-30T00:00:00.000Z");
    
    for (let i = totalCells - 1; i >= 0; i--) {
      const date = new Date(baselineDate);
      date.setUTCDate(baselineDate.getUTCDate() - i);
      
      // Fully deterministic wave contribution metric using index trig to make a realistic, organic wave pattern
      const wave = Math.sin(i * 0.15) * Math.cos(i * 0.05);
      let count = 0;
      if (wave > 0.65) count = 120;
      else if (wave > 0.3) count = 90;
      else if (wave > 0.0) count = 45;
      else if (wave > -0.3) count = 15;
      
      // Periodic empty blocks representing rest days/weekends
      if (i % 7 === 0 || i % 13 === 0) {
        count = 0;
      }
      
      data.push({
        day: i,
        count,
        date: date.toLocaleDateString("en-US", {
          timeZone: "UTC",
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      });
    }
    return data;
  };

  const [cells] = useState<CellData[]>(generateMockData());

  // Determine cell color based on learning minutes logged
  const getCellColor = (count: number) => {
    if (count === 0) return "bg-slate-900 border-slate-950";
    if (count <= 30) return "bg-emerald-500/20 border-emerald-500/10 hover:bg-emerald-400/30";
    if (count <= 60) return "bg-emerald-500/40 border-emerald-500/20 hover:bg-emerald-400/50";
    if (count <= 90) return "bg-emerald-500/70 border-emerald-500/30 hover:bg-emerald-400/80";
    return "bg-emerald-400 border-emerald-400 hover:bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.3)]";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Center the tooltip above the cursor
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 48,
    });
  };

  return (
    <motion.section
      className="relative col-span-1 md:col-span-3 overflow-hidden rounded-3xl bg-slate-950 border border-slate-800/80 p-6 flex flex-col justify-between shadow-lg mesh-gradient-emerald min-h-[260px]"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
    >
      {/* Top Banner Area */}
      <div className="flex items-center justify-between z-10 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-emerald-400">
            <Calendar size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-sans leading-snug">
              Learning Activity Graph
            </h2>
            <p className="text-xs text-slate-400 font-medium font-sans">
              Daily study minutes logged over the past 6 months
            </p>
          </div>
        </div>

        <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors font-semibold font-sans cursor-pointer focus:outline-none bg-slate-900 border border-slate-800/60 px-3 py-1.5 rounded-xl">
          More Details <ChevronRight size={14} />
        </button>
      </div>

      {/* Grid container */}
      <div className="relative z-10 flex-1 flex flex-col justify-center select-none overflow-x-auto no-scrollbar scroll-smooth">
        <div className="min-w-[620px] py-2 flex flex-col justify-center">
          {/* Days of week indicators on left side + Heatmap Grid */}
          <div className="flex gap-3 items-center">
            {/* Week labels */}
            <div className="flex flex-col text-[10px] font-bold font-mono text-slate-500 gap-1.5 w-6 text-right shrink-0 pr-1 select-none">
              <span>Mon</span>
              <span className="opacity-0">Tue</span>
              <span>Wed</span>
              <span className="opacity-0">Thu</span>
              <span>Fri</span>
              <span className="opacity-0">Sat</span>
              <span className="opacity-0">Sun</span>
            </div>

            {/* Grid Layout of Cells */}
            <div 
              className="grid grid-flow-col grid-rows-7 gap-1.5 flex-1 relative"
              onMouseLeave={() => setHoveredCell(null)}
            >
              {cells.map((cell, idx) => (
                <motion.div
                  key={idx}
                  className={`w-3.5 h-3.5 rounded-sm border cursor-crosshair transition-all duration-100 ${getCellColor(
                    cell.count
                  )}`}
                  whileHover={{ scale: 1.25, zIndex: 30 }}
                  onMouseEnter={() => setHoveredCell(cell)}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                />
              ))}

              {/* FLOATING GLASS TOOLTIP */}
              <AnimatePresence>
                {hoveredCell && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute z-50 pointer-events-none p-2 rounded-xl bg-slate-950/95 border border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md whitespace-nowrap text-left flex flex-col gap-0.5"
                    style={{
                      left: tooltipPos.x,
                      top: tooltipPos.y,
                      transform: "translate(-50%, -100%)",
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    <span className="text-[10px] font-bold font-mono text-slate-400">
                      {hoveredCell.date}
                    </span>
                    <span className="text-xs font-extrabold font-sans text-slate-200">
                      {hoveredCell.count === 0 ? "No study session" : `${hoveredCell.count} mins studied`}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Legend bar */}
      <div className="relative z-10 flex items-center justify-end gap-2 text-[10px] font-bold font-mono text-slate-500 mt-4 select-none">
        <span>Less</span>
        <div className="w-2.5 h-2.5 rounded-sm bg-slate-900 border border-slate-950" />
        <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500/20 border border-emerald-500/10" />
        <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500/40 border border-emerald-500/20" />
        <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500/70 border border-emerald-500/30" />
        <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400 border border-emerald-400" />
        <span>More</span>
      </div>
    </motion.section>
  );
}
