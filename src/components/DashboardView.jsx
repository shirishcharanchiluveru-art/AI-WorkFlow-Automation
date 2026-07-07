import React from 'react';
import { useMission } from '../context/MissionContext';
import { Shield, Cpu, Terminal, Layers, Activity, Database, ArrowRight } from 'lucide-react';

const DashboardView = () => {
  const { setView, notifications, missions, analytics } = useMission();

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto font-mono text-xs max-w-7xl mx-auto w-full select-none custom-scrollbar">
      {/* Banner */}
      <div className="bg-accent border b-accent p-3 rounded-lg flex items-center justify-between" style={{color: 'var(--accent)'}}>
        <span className="flex items-center gap-2 text-[10px] tracking-wider font-bold">
          <Shield className="w-4 h-4 t-accent animate-pulse" />
          ALL MISSION CHANNELS ONLINE // CODENAME: ANTIGRAVITY COGNITIVE CORE DEPLOYED
        </span>
        <span className="text-[8px] t-dim">STABILITY INDEX: 99.98%</span>
      </div>

      {/* 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Cpu, label: 'Swarm Telemetry Node', title: 'ACTIVE AGENTS COGNITION', desc: '10 specialized cognitive nodes are linked via real-time RPC pipelines. Active model load balancing enabled.', link: 'agents', linkText: 'Inspect Swarm Roster' },
          { icon: Activity, label: 'Pipeline Efficiency', title: `${analytics.timeSaved} Hours Saved`, desc: 'Automated document compilation, RAG searches, and email relays bypass standard office process timelines.', link: 'analytics', linkText: 'Analyze Operations KPIs' },
          { icon: Database, label: 'RAG Knowledge Stack', title: 'VECTORIZED MEMORY', desc: 'Company policy handbooks fully vectorized. Search models retrieve compliance citations instantly.', link: 'knowledge-base', linkText: 'Access Document Indices' },
        ].map((card, i) => (
          <div key={i} className="hud-panel p-5 rounded-xl flex flex-col justify-between h-[180px] corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
            <div>
              <div className="text-[9px] t-dim uppercase tracking-widest mb-1.5 flex items-center gap-1 font-bold">
                <card.icon className="w-3.5 h-3.5 t-accent" /> {card.label}
              </div>
              <div className="text-base font-bold t-heading tracking-wider">{card.title}</div>
              <div className="text-[10.5px] t-muted mt-2 font-sans leading-relaxed">{card.desc}</div>
            </div>
            <button onClick={() => setView(card.link)} className="text-[9px] t-accent font-bold uppercase tracking-wider flex items-center gap-1 group mt-2 cursor-pointer">
              {card.linkText} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Bottom panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Notifications */}
        <section className="lg:col-span-7 hud-panel p-5 rounded-xl flex flex-col h-[340px] corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
          <div className="flex items-center justify-between border-b b-panel pb-3 mb-3">
            <span className="t-accent font-bold uppercase tracking-widest text-[9.5px] text-glow-cyan flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> Operations System Notifications
            </span>
            <span className="text-[8px] t-dim uppercase font-bold">Live Sensor Broadcast</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {notifications.length > 0 ? notifications.map((notif) => (
              <div key={notif.id} className="flex justify-between items-center bg-card border b-subtle p-2.5 rounded font-mono text-[9px]">
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 rounded text-[7.5px] border font-bold uppercase tracking-wider font-mono ${
                    notif.type === 'success' ? 'b-success t-success bg-success-t' :
                    notif.type === 'error' ? 'b-error t-error bg-error-t' :
                    notif.type === 'warning' ? 'b-warning t-warning bg-warning-t' :
                    'b-accent t-accent bg-accent'
                  }`}>{notif.type}</span>
                  <span className="t-body font-sans text-[9.5px]">{notif.text}</span>
                </div>
                <span className="t-dim text-[8px]">{notif.time}</span>
              </div>
            )) : (
              <div className="h-full flex flex-col items-center justify-center t-faint py-10">
                <p className="font-mono text-[9px] tracking-wider uppercase">NO RECENT SYSTEM NOTIFICATIONS RECEIVED.</p>
              </div>
            )}
          </div>
        </section>

        {/* Missions */}
        <section className="lg:col-span-5 hud-panel p-5 rounded-xl flex flex-col h-[340px] corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
          <div className="flex items-center justify-between border-b b-panel pb-3 mb-3">
            <span className="t-accent font-bold uppercase tracking-widest text-[9.5px] text-glow-cyan flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Recent Completed Missions
            </span>
            <span className="text-[8px] t-dim uppercase font-bold">{missions.length} Registered</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
            {missions.length > 0 ? missions.map((m) => (
              <div key={m.id} className="bg-card border b-subtle rounded-lg p-3 space-y-2 flex flex-col justify-between">
                <div className="flex items-center justify-between font-bold">
                  <span className="t-heading text-[9.5px] truncate max-w-[160px]">{m.title}</span>
                  <span className="t-success bg-success-t border b-success px-1.5 py-0.5 rounded text-[7px] font-mono tracking-widest uppercase">Success</span>
                </div>
                <div className="flex justify-between items-center text-[8px] t-dim font-mono">
                  <span>STEPS EXECUTED: {m.stepsCount}</span>
                  <span>{m.timestamp}</span>
                </div>
              </div>
            )) : (
              <div className="h-full flex flex-col items-center justify-center t-faint py-10">
                <p className="font-mono text-[9px] tracking-wider uppercase">NO MISSIONS LOGGED YET.</p>
                <button onClick={() => setView('mission-control')} className="t-accent hover:underline font-mono text-[8.5px] uppercase font-bold tracking-widest mt-2 cursor-pointer">Launch a Mission</button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardView;
