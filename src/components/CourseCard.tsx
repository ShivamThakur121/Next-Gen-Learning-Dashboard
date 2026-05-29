"use client";

import { motion, Variants } from "framer-motion";
import * as Icons from "lucide-react";
import { Course } from "@/lib/supabase";

interface CourseCardProps {
  course: Course;
  index: number;
}

// Icon mapper mapping database string names to Lucide icons with a fallback
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name] || Icons.HelpCircle;
  return <IconComponent className={className} size={22} />;
};

export default function CourseCard({ course, index }: CourseCardProps) {
  const { title, progress, icon_name } = course;

  // Select styling theme based on index for variety and vibrant aesthetics
  const themes = [
    {
      glow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
      border: "hover:border-purple-500/40",
      accent: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      bar: "bg-gradient-to-r from-purple-500 to-pink-500",
      bgMesh: "mesh-gradient-purple",
    },
    {
      glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
      border: "hover:border-blue-500/40",
      accent: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      bar: "bg-gradient-to-r from-blue-500 to-indigo-500",
      bgMesh: "mesh-gradient-blue",
    },
    {
      glow: "hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]",
      border: "hover:border-pink-500/40",
      accent: "text-pink-400 bg-pink-500/10 border-pink-500/20",
      bar: "bg-gradient-to-r from-pink-500 to-rose-500",
      bgMesh: "mesh-gradient-pink",
    },
    {
      glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
      border: "hover:border-emerald-500/40",
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      bar: "bg-gradient-to-r from-emerald-500 to-teal-500",
      bgMesh: "mesh-gradient-emerald",
    },
  ];

  const currentTheme = themes[index % themes.length];

  // Motion variants for Staggered Entrance
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1, // Staggered loading offset
      },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.018, y: -2 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20, // Strict Spring physics constraint
      }}
      className={`relative w-full h-[180px] overflow-hidden rounded-2xl bg-slate-950/90 border border-slate-800/80 p-5 flex flex-col justify-between shadow-md transition-all duration-300 ${currentTheme.glow} ${currentTheme.border} ${currentTheme.bgMesh}`}
    >
      {/* Dynamic Glow Spotlight Inside Card */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] blur-2xl rounded-full pointer-events-none" />

      {/* Subtle Grain SVG Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <svg width="100%" height="100%">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Header: Dynamic Icon & Study Label */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className={`p-2.5 rounded-xl border ${currentTheme.accent} shrink-0 shadow-sm`}>
          <DynamicIcon name={icon_name} />
        </div>
        <span className="text-[10px] font-bold font-mono tracking-wider text-slate-500 uppercase">
          Course
        </span>
      </div>

      {/* Title */}
      <div className="relative z-10 my-2">
        <h3 className="text-sm sm:text-base font-extrabold tracking-tight text-slate-100 font-sans line-clamp-2 leading-tight">
          {title}
        </h3>
      </div>

      {/* Bottom Area: Progress Label & Animated Progress Bar */}
      <div className="relative z-10 mt-auto w-full">
        <div className="flex items-center justify-between text-[11px] font-bold font-mono text-slate-400 mb-1.5">
          <span>Completion</span>
          <span className="font-extrabold text-slate-200">{progress}%</span>
        </div>
        
        {/* Progress Tracker background track */}
        <div className="relative w-full h-2 rounded-full bg-slate-900 border border-slate-950 overflow-hidden">
          {/* Custom spring animated fill */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 15,
              delay: 0.3 + index * 0.1, // Wait for staggered card load, then fill the gauge!
            }}
            className={`absolute left-0 top-0 h-full rounded-full ${currentTheme.bar} shadow-[0_0_8px_rgba(255,255,255,0.05)]`}
          />
        </div>
      </div>
    </motion.article>
  );
}
