"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X, Check, Copy, Database, HelpCircle } from "lucide-react";

interface DemoBannerProps {
  isMock: boolean;
  error?: string | null;
}

export default function DemoBanner({ isMock, error }: DemoBannerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const sqlSchema = `-- Copy & Execute in Supabase SQL Editor:
CREATE TABLE public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    progress INTEGER NOT NULL,
    icon_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.courses (title, progress, icon_name) VALUES
('Advanced React & Render Optimizations', 78, 'Atom'),
('Next.js Production Architecture & RSCs', 45, 'Layers'),
('Framer Motion Masterclass: Advanced Physics', 90, 'Sparkles'),
('High Performance Postgres & DB Scaling', 25, 'Database');`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Mini floating notification toast */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 right-4 z-50 max-w-sm sm:max-w-md pointer-events-auto"
      >
        <div className="glass-panel p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-slate-800/80 flex items-start gap-3.5 relative overflow-hidden">
          {/* Animated Background Pulse */}
          <div className={`absolute top-0 right-0 w-24 h-24 blur-2xl rounded-full opacity-20 pointer-events-none -mr-8 -mt-8 ${
            isMock ? "bg-amber-500" : "bg-emerald-500"
          }`} />

          {/* Status Icon */}
          <div className={`p-2.5 rounded-xl border shrink-0 ${
            isMock 
              ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
              : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
          }`}>
            <Database size={18} className={isMock ? "animate-pulse" : ""} />
          </div>

          {/* Texts */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black font-mono uppercase tracking-wider px-2 py-0.5 rounded-md ${
                isMock ? "bg-amber-500/10 text-amber-400" : "bg-emerald-500/10 text-emerald-400"
              }`}>
                {isMock ? "Demo Mock Mode" : "Live Supabase Mode"}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 font-medium font-sans leading-relaxed">
              {isMock 
                ? "Running on local data templates. Connect a Supabase instance to store changes."
                : "Active connection synchronized with your Supabase database server."
              }
            </p>

            {isMock && (
              <button
                onClick={() => setIsOpen(true)}
                className="text-[11px] font-extrabold text-blue-400 hover:text-blue-300 transition-colors mt-2 flex items-center gap-1 font-sans cursor-pointer focus:outline-none"
              >
                <Info size={12} /> Get Database Schema
              </button>
            )}

            {error && (
              <div className="text-[10px] font-semibold text-rose-400 font-mono mt-1.5 border-t border-slate-800/60 pt-1.5 truncate">
                {error}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Database Schema Drawer Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal dialog box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-slate-950 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden z-10"
            >
              {/* Top ambient glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-900 border border-transparent hover:border-slate-800 text-slate-400 hover:text-slate-200 transition-all cursor-pointer focus:outline-none"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3.5 mb-5 relative z-10">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
                  <Database size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-black font-sans text-white">
                    Connect Supabase Database
                  </h3>
                  <p className="text-xs text-slate-400 font-medium font-sans">
                    Execute SQL and configure environment keys to sync live
                  </p>
                </div>
              </div>

              {/* Setup Steps */}
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 relative z-10">
                <div>
                  <h4 className="text-xs font-extrabold font-mono text-slate-400 uppercase tracking-widest mb-2">
                    Step 1: Environment Variables
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-1.5">
                    Duplicate <span className="font-mono text-blue-400">.env.example</span> into <span className="font-mono text-blue-400">.env.local</span> inside the project root and add your Supabase credentials:
                  </p>
                  <pre className="text-[11px] font-mono p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 overflow-x-auto">
                    {`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-api-key-here`}
                  </pre>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-extrabold font-mono text-slate-400 uppercase tracking-widest">
                      Step 2: Database Schema & Seed DDL
                    </h4>
                    <button
                      onClick={copyToClipboard}
                      className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check size={14} className="text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Copy SQL
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-1.5">
                    Open your **Supabase SQL Editor** and execute the following query:
                  </p>
                  <pre className="text-[10px] font-mono p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 overflow-x-auto max-h-[160px] scrollbar-thin">
                    {sqlSchema}
                  </pre>
                </div>

                <div>
                  <h4 className="text-xs font-extrabold font-mono text-slate-400 uppercase tracking-widest mb-1.5">
                    Step 3: Refresh Application
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Once the server restarts with the new env credentials, the dashboard will establish a live database sync!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
