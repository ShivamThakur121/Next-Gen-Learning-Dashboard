"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, BookOpen, Activity, Settings, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "analytics", label: "Performance", icon: Activity },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* DESKTOP & TABLET SIDEBAR */}
      <motion.aside
        className={`hidden md:flex flex-col relative h-screen bg-[#0d111b]/80 backdrop-blur-md border-r border-slate-800/60 transition-all duration-300 z-40 ${
          isExpanded ? "w-64" : "w-20"
        }`}
        layout
      >
        {/* LOGO AREA */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800/40 gap-3 overflow-hidden">
          <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400 shrink-0">
            <GraduationCap size={24} />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold text-lg bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent truncate font-sans"
              >
                Aura Learning
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* NAVIGATION ITEMS */}
        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative w-full h-12 flex items-center rounded-xl transition-colors cursor-pointer group focus:outline-none ${
                  isActive ? "text-blue-400" : "text-slate-400 hover:text-slate-200"
                } ${isExpanded ? "px-4" : "justify-center"}`}
              >
                {/* Active Tab Spring Highlight */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabHighlight"
                    className="absolute inset-0 bg-blue-500/8 border border-blue-500/20 rounded-xl z-0"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                <div className="relative z-10 flex items-center gap-4 shrink-0">
                  <Icon size={20} className={isActive ? "text-blue-400" : "text-slate-400 group-hover:scale-110 transition-transform"} />
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-medium text-sm font-sans"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </div>

                {/* Tooltip on collapsed state */}
                {!isExpanded && (
                  <div className="absolute left-24 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none z-50 whitespace-nowrap shadow-xl">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* EXPAND / COLLAPSE TOGGLE BUTTON */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hidden lg:flex absolute bottom-8 -right-4 p-2 bg-slate-900 border border-slate-800 rounded-full hover:border-slate-700 text-slate-400 hover:text-slate-200 cursor-pointer shadow-lg z-50 focus:outline-none"
        >
          {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </motion.aside>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-6 left-4 right-4 h-16 glass-panel rounded-2xl border border-slate-800/80 shadow-2xl flex justify-around items-center px-4 z-40">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative py-2 px-4 flex flex-col items-center justify-center rounded-xl cursor-pointer ${
                isActive ? "text-blue-400" : "text-slate-400"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabMobileHighlight"
                  className="absolute inset-0 bg-blue-500/10 border border-blue-500/25 rounded-xl z-0"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              <Icon size={20} className="relative z-10" />
              <span className="text-[10px] mt-1 font-semibold relative z-10 font-sans tracking-wide">
                {item.label.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
