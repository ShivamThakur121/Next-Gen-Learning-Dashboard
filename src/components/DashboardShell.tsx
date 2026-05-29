"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import BentoGrid from "./BentoGrid";
import DemoBanner from "./DemoBanner";
import CourseCard from "./CourseCard";
import ActivityTile from "./ActivityTile";
import { Course } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, GraduationCap, Settings, Terminal, ShieldAlert } from "lucide-react";

interface DashboardShellProps {
  courses: Course[];
  isMock: boolean;
  error: string | null;
}

export default function DashboardShell({ courses, isMock, error }: DashboardShellProps) {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Format today's date beautifully
  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex h-screen overflow-hidden bg-[#07090e] text-slate-100 font-sans">
      
      {/* Dynamic Floating Toast Banner explaining mock/live database states */}
      <DemoBanner isMock={isMock} error={error} />

      {/* 1. SIDEBAR (Left) */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. DYNAMIC CONTENT AREA (Right) */}
      <div className="flex-1 h-screen overflow-y-auto p-6 sm:p-10 pb-28 md:pb-10 scroll-smooth">
        
        {/* UPPER HEADER BAR */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <span suppressHydrationWarning className="text-[10px] font-bold font-mono tracking-widest text-slate-500 uppercase">
              {todayFormatted}
            </span>
            <h2 className="text-xl font-extrabold tracking-tight text-white font-sans mt-0.5">
              {activeTab === "dashboard" && "Aura Analytics Center"}
              {activeTab === "courses" && "My Learning Catalog"}
              {activeTab === "analytics" && "Learning Performance Insights"}
              {activeTab === "settings" && "System Configurations"}
            </h2>
          </div>
          
          {/* User profile capsule */}
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-2xl bg-slate-900/60 border border-slate-800/40">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-sm">
              S
            </div>
            <span className="hidden sm:inline text-xs font-bold text-slate-300">Shivam Kumar</span>
          </div>
        </header>

        {/* ACTIVE VIEW PORTAL WITH COMPONENT SWAPS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {/* VIEW 1: MAIN BENTO DASHBOARD */}
            {activeTab === "dashboard" && (
              <BentoGrid courses={courses} />
            )}

            {/* VIEW 2: COURSES EXPANDED SECTION */}
            {activeTab === "courses" && (
              <section className="space-y-6">
                <div className="glass-panel p-6 rounded-3xl flex items-center gap-4 border-slate-800/40 mesh-gradient-blue">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/25 rounded-2xl text-blue-400">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">Course Management</h3>
                    <p className="text-xs text-slate-400 font-medium">Browse, continue, or reset active courses seeded from your database.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course, idx) => (
                    <CourseCard key={course.id} course={course} index={idx} />
                  ))}
                </div>
              </section>
            )}

            {/* VIEW 3: PERFORMANCE GRAPH & STATS */}
            {activeTab === "analytics" && (
              <section className="space-y-6">
                <ActivityTile />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="glass-panel p-6 rounded-3xl border-slate-800/40">
                    <h4 className="text-sm font-extrabold text-slate-200 mb-2">XP Breakdown</h4>
                    <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                      <li className="flex justify-between border-b border-slate-900 pb-1.5">
                        <span>React Lessons completed</span>
                        <span className="font-bold text-slate-200">1,200 XP</span>
                      </li>
                      <li className="flex justify-between border-b border-slate-900 pb-1.5">
                        <span>Framer Motion Masterclass</span>
                        <span className="font-bold text-slate-200">1,500 XP</span>
                      </li>
                      <li className="flex justify-between pb-0.5">
                        <span>Postgres Scaling Module</span>
                        <span className="font-bold text-slate-200">750 XP</span>
                      </li>
                    </ul>
                  </div>

                  <div className="glass-panel p-6 rounded-3xl border-slate-800/40">
                    <h4 className="text-sm font-extrabold text-slate-200 mb-2">Achievements Unlocked</h4>
                    <div className="flex gap-3 items-center">
                      <div className="p-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-xl">
                        <GraduationCap size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-200">System Architect</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Scored 90%+ on Framer Motion & Animation principles.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* VIEW 4: SYSTEM SETTINGS */}
            {activeTab === "settings" && (
              <section className="space-y-6 max-w-xl">
                <div className="glass-panel p-6 rounded-3xl border-slate-800/40 space-y-4">
                  <div className="flex items-center gap-3.5 border-b border-slate-900 pb-4">
                    <div className="p-2.5 bg-slate-800/60 text-slate-300 rounded-xl">
                      <Settings size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white">General Parameters</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Manage user metadata and dashboard themes.</p>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-300">Name</span>
                        <span className="text-[10px] text-slate-500 mt-0.5">Displayed on greets and streak toasts.</span>
                      </div>
                      <input 
                        type="text" 
                        value="Shivam Kumar" 
                        disabled
                        className="bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-400 font-medium focus:outline-none w-40 text-right"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-300">Default Mode</span>
                        <span className="text-[10px] text-slate-500 mt-0.5">Theme lock for the system interface.</span>
                      </div>
                      <span className="text-[10px] font-black font-mono uppercase bg-slate-900 border border-slate-800 text-blue-400 px-2.5 py-1.5 rounded-lg">
                        Dark Mode Locked
                      </span>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-6 rounded-3xl border-slate-800/40 space-y-3">
                  <div className="flex items-center gap-3.5 text-amber-400">
                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                      <Terminal size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-200">Database Connection Log</h4>
                      <span className="text-[10px] font-bold font-mono text-slate-500">Auto-Detect status</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl text-[10px] font-mono text-slate-400 space-y-1.5">
                    <div>[system] Initiating Aura Learning Shell...</div>
                    <div>[database] Scanning for env credentials...</div>
                    {isMock ? (
                      <>
                        <div className="text-amber-400">[warn] NEXT_PUBLIC_SUPABASE_URL not configured.</div>
                        <div className="text-amber-400">[warn] NEXT_PUBLIC_SUPABASE_ANON_KEY not configured.</div>
                        <div className="text-blue-400">[info] Transparently loaded 4 Course Mock Profiles successfully.</div>
                      </>
                    ) : (
                      <>
                        <div className="text-emerald-400">[success] Supabase credentials loaded correctly.</div>
                        <div className="text-emerald-400">[success] Synchronized 4 live table courses successfully.</div>
                      </>
                    )}
                  </div>
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
