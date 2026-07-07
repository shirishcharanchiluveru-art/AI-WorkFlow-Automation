import React from 'react';
import { useMission } from '../context/MissionContext';
import {
  BarChart3,
  TrendingUp,
  Clock,
  FileCheck,
  Mail,
  Target,
  Zap,
  Percent
} from 'lucide-react';

const AnalyticsView = () => {
  const { analytics } = useMission();

  const linePoints = "50,150 150,110 250,130 350,70 450,90 550,40 650,20";
  const areaPoints = "50,180 50,150 150,110 250,130 350,70 450,90 550,40 650,20 650,180";

  const agentUtilizationData = [
    { name: 'CEO Agent', val: 92, color: 'bg-cyan-500' },
    { name: 'Planner Agent', val: 88, color: 'bg-cyan-400' },
    { name: 'Knowledge Agent', val: 78, color: 'bg-emerald-500' },
    { name: 'Doc Generator', val: 84, color: 'bg-emerald-400' },
    { name: 'Reviewer Agent', val: 94, color: 'bg-indigo-500' },
    { name: 'Email Dispatcher', val: 68, color: 'bg-purple-500' },
    { name: 'Analytics Agent', val: 72, color: 'bg-amber-500' }
  ];

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto font-mono text-xs max-w-7xl mx-auto w-full select-none custom-scrollbar">

      {/* Title Header */}
      <section className="hud-panel p-4 rounded-xl flex items-center justify-between corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-950/40 rounded-lg border border-cyan-500/25">
            <BarChart3 className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-widest text-glow-cyan m-0">
              Operations Intelligence Center
            </h2>
            <p className="text-[10px] text-slate-500 font-mono tracking-wider mt-0.5">
              REAL-TIME STATISTICAL AUDIT LOGS AND AGENT UTILIZATION METRICS
            </p>
          </div>
        </div>
        <div className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
          LOGS ANALYSIS: LIVE
        </div>
      </section>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

        <div className="hud-panel p-4 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 opacity-10 text-cyan-500"><TrendingUp className="w-full h-full" /></div>
          <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold">Missions Complete</div>
          <div className="text-lg font-bold text-slate-100 tracking-wide">{analytics.tasksCompleted}</div>
          <div className="text-[8px] text-emerald-400 font-mono mt-1.5 flex items-center gap-0.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block mr-0.5" />+12.4% MoM
          </div>
        </div>

        <div className="hud-panel p-4 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 opacity-10 text-cyan-500"><Clock className="w-full h-full" /></div>
          <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold">Avg Execution</div>
          <div className="text-lg font-bold text-slate-100 tracking-wide">{analytics.avgExecutionTime}s</div>
          <div className="text-[8px] text-emerald-400 font-mono mt-1.5 flex items-center gap-0.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-0.5" />-4.2s optimization
          </div>
        </div>

        <div className="hud-panel p-4 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 opacity-10 text-cyan-500"><FileCheck className="w-full h-full" /></div>
          <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold">Vault Docs</div>
          <div className="text-lg font-bold text-slate-100 tracking-wide">{analytics.docsGenerated}</div>
          <div className="text-[8px] text-slate-500 font-mono mt-1.5 uppercase font-bold">100% indexed</div>
        </div>

        <div className="hud-panel p-4 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 opacity-10 text-cyan-500"><Mail className="w-full h-full" /></div>
          <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold">Dispatches</div>
          <div className="text-lg font-bold text-slate-100 tracking-wide">{analytics.emailsSent}</div>
          <div className="text-[8px] text-emerald-400 font-mono mt-1.5 uppercase font-bold">Delivered</div>
        </div>

        <div className="hud-panel p-4 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 opacity-10 text-cyan-500"><Target className="w-full h-full" /></div>
          <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold">Swarm Accuracy</div>
          <div className="text-lg font-bold text-emerald-400 tracking-wide">{analytics.aiAccuracy}%</div>
          <div className="text-[8px] text-slate-500 font-mono mt-1.5 uppercase font-bold">SLA Standard: &gt;95%</div>
        </div>

        <div className="hud-panel p-4 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 opacity-10 text-cyan-500"><Zap className="w-full h-full" /></div>
          <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold">Hours Reclaimed</div>
          <div className="text-lg font-bold text-cyan-300 tracking-wide">{analytics.timeSaved}h</div>
          <div className="text-[8px] text-cyan-400 font-mono mt-1.5 flex items-center gap-0.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse inline-block mr-0.5" />Saved: $4,520
          </div>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Line Chart */}
        <div className="lg:col-span-7 hud-panel p-5 rounded-xl flex flex-col h-[360px] relative corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
          <div className="absolute top-4 left-4 font-mono text-[9px] text-sky-500/60 uppercase tracking-widest flex items-center gap-2 font-bold">
            <TrendingUp className="w-3.5 h-3.5" /> Operations Volume Index (MoM)
          </div>

          <div className="flex-1 mt-6 relative flex items-center justify-center">
            <svg viewBox="0 0 700 200" className="w-full h-[220px] select-none pointer-events-none">
              <defs>
                <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(0, 240, 255, 0.25)" />
                  <stop offset="100%" stopColor="rgba(0, 240, 255, 0)" />
                </linearGradient>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0088ff" />
                  <stop offset="50%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              <line x1="50" y1="180" x2="650" y2="180" stroke="rgba(6,182,212,0.08)" strokeWidth="1" />
              <line x1="50" y1="130" x2="650" y2="130" stroke="rgba(6,182,212,0.04)" strokeWidth="1" />
              <line x1="50" y1="80" x2="650" y2="80" stroke="rgba(6,182,212,0.04)" strokeWidth="1" />
              <line x1="50" y1="30" x2="650" y2="30" stroke="rgba(6,182,212,0.04)" strokeWidth="1" />

              <line x1="50" y1="30" x2="50" y2="180" stroke="rgba(6,182,212,0.08)" strokeWidth="1" />
              <line x1="150" y1="30" x2="150" y2="180" stroke="rgba(6,182,212,0.02)" strokeWidth="1" />
              <line x1="250" y1="30" x2="250" y2="180" stroke="rgba(6,182,212,0.02)" strokeWidth="1" />
              <line x1="350" y1="30" x2="350" y2="180" stroke="rgba(6,182,212,0.02)" strokeWidth="1" />
              <line x1="450" y1="30" x2="450" y2="180" stroke="rgba(6,182,212,0.02)" strokeWidth="1" />
              <line x1="550" y1="30" x2="550" y2="180" stroke="rgba(6,182,212,0.02)" strokeWidth="1" />
              <line x1="650" y1="30" x2="650" y2="180" stroke="rgba(6,182,212,0.08)" strokeWidth="1" />

              <polygon points={areaPoints} fill="url(#areaGrad)" />
              <polyline fill="none" stroke="url(#lineGrad)" strokeWidth="3" points={linePoints} className="drop-shadow-[0_4px_10px_rgba(6,182,212,0.3)]" />

              <circle cx="50" cy="150" r="4.5" fill="#0088ff" />
              <circle cx="150" cy="110" r="4.5" fill="#0088ff" />
              <circle cx="250" cy="130" r="4.5" fill="#0088ff" />
              <circle cx="350" cy="70" r="4.5" fill="#00f0ff" />
              <circle cx="450" cy="90" r="4.5" fill="#00f0ff" />
              <circle cx="550" cy="40" r="4.5" fill="#10b981" />
              <circle cx="650" cy="20" r="5" fill="#10b981" stroke="#050816" strokeWidth="2.5" />

              <text x="50" y="195" fill="rgba(148, 163, 184, 0.6)" fontSize="9" textAnchor="middle" fontFamily="monospace">JAN</text>
              <text x="150" y="195" fill="rgba(148, 163, 184, 0.6)" fontSize="9" textAnchor="middle" fontFamily="monospace">FEB</text>
              <text x="250" y="195" fill="rgba(148, 163, 184, 0.6)" fontSize="9" textAnchor="middle" fontFamily="monospace">MAR</text>
              <text x="350" y="195" fill="rgba(148, 163, 184, 0.6)" fontSize="9" textAnchor="middle" fontFamily="monospace">APR</text>
              <text x="450" y="195" fill="rgba(148, 163, 184, 0.6)" fontSize="9" textAnchor="middle" fontFamily="monospace">MAY</text>
              <text x="550" y="195" fill="rgba(148, 163, 184, 0.6)" fontSize="9" textAnchor="middle" fontFamily="monospace">JUN</text>
              <text x="650" y="195" fill="rgba(0, 240, 255, 0.9)" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">JUL (LIVE)</text>

              <text x="38" y="183" fill="rgba(148, 163, 184, 0.5)" fontSize="9" textAnchor="end" fontFamily="monospace">0</text>
              <text x="38" y="133" fill="rgba(148, 163, 184, 0.5)" fontSize="9" textAnchor="end" fontFamily="monospace">20</text>
              <text x="38" y="83" fill="rgba(148, 163, 184, 0.5)" fontSize="9" textAnchor="end" fontFamily="monospace">40</text>
              <text x="38" y="33" fill="rgba(148, 163, 184, 0.5)" fontSize="9" textAnchor="end" fontFamily="monospace">60</text>
            </svg>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="lg:col-span-5 hud-panel p-5 rounded-xl flex flex-col h-[360px] corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
          <div className="font-mono text-[9px] text-sky-500/60 uppercase tracking-widest flex items-center gap-2 border-b border-sky-950 pb-2.5 mb-4 font-bold">
            <Percent className="w-3.5 h-3.5" /> Swarm Uptime & Utilization
          </div>

          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 custom-scrollbar">
            {agentUtilizationData.map((agent, idx) => (
              <div key={idx} className="space-y-1 text-slate-200">
                <div className="flex justify-between items-center text-[9px]">
                  <span className="font-bold">{agent.name}</span>
                  <span className="text-cyan-400 font-bold">{agent.val}% Utilization</span>
                </div>
                <div className="h-2.5 bg-sky-950/80 rounded border border-sky-900/30 overflow-hidden flex">
                  <div
                    className={`h-full ${agent.color} transition-all duration-500`}
                    style={{ width: `${agent.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AnalyticsView;
