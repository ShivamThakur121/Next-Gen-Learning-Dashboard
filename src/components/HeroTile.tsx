"use client";

import { motion, Variants } from "framer-motion";
import { Flame, Trophy, Clock, Sparkles } from "lucide-react";

export default function HeroTile() {
  // Flame bounce animation using Framer Motion
  const flameVariants: Variants = {
    animate: {
      scale: [1, 1.1, 1],
      y: [0, -3, 0],
      filter: [
        "drop-shadow(0 0 4px rgba(249, 115, 22, 0.4))",
        "drop-shadow(0 0 12px rgba(249, 115, 22, 0.8))",
        "drop-shadow(0 0 4px rgba(249, 115, 22, 0.4))",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.header
      className="relative col-span-1 md:col-span-2 overflow-hidden rounded-3xl bg-slate-950 border border-slate-800/80 p-8 flex flex-col justify-between min-h-[220px] shadow-lg mesh-gradient-purple"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Dynamic Ambient Glow inside the card */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />

      {/* SVG Vector Backdrop Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Top Section: Greeting & Streak */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold font-mono tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 px-2.5 py-1 rounded-full uppercase flex items-center gap-1.5">
              <Sparkles size={12} className="animate-spin [animation-duration:8s]" />
              Pro Status Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
            Welcome back, <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Challenger!</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 font-medium font-sans">
            You're completing courses 40% faster than last week. Keep up the momentum!
          </p>
        </div>

        {/* Daily Streak Indicator */}
        <motion.div
          className="self-start sm:self-center flex items-center gap-3.5 px-4.5 py-2.5 rounded-2xl bg-orange-500/8 border border-orange-500/20 backdrop-blur-sm cursor-default select-none shadow-md shrink-0"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <motion.div variants={flameVariants} animate="animate" className="text-orange-500">
            <Flame size={28} fill="currentColor" />
          </motion.div>
          <div>
            <div className="text-[10px] font-bold font-mono tracking-wider text-orange-400/80 uppercase">
              Daily Streak
            </div>
            <div className="text-lg font-black font-sans text-orange-400 leading-tight">
              12 Days
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section: Micro-Stats widgets */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800/40">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
            <Trophy size={18} />
          </div>
          <div>
            <div className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">
              XP Earned
            </div>
            <div className="text-sm font-bold font-sans text-slate-200">
              3,450 XP
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
            <Clock size={18} />
          </div>
          <div>
            <div className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">
              Time Studied
            </div>
            <div className="text-sm font-bold font-sans text-slate-200">
              18.4 Hours
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
            <Flame size={18} fill="currentColor" />
          </div>
          <div>
            <div className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">
              Next Reward
            </div>
            <div className="text-sm font-bold font-sans text-slate-200">
              15 Day Bonus
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
