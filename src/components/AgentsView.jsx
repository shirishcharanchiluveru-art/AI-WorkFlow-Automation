import React from 'react';
import { useMission } from '../context/MissionContext';
import {
  Users,
  Briefcase,
  Map,
  Database,
  UserCheck,
  Calendar,
  FileText,
  Mail,
  CheckSquare,
  TrendingUp,
  Play
} from 'lucide-react';

const agentIcons = {
  ceo: Briefcase,
  planner: Map,
  knowledge: Database,
  screening: UserCheck,
  scheduler: Calendar,
  docgen: FileText,
  email: Mail,
  reviewer: CheckSquare,
  analytics: TrendingUp,
  execution: Play
};

const AgentsView = () => {
  const { agents } = useMission();

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto font-mono text-xs max-w-7xl mx-auto w-full select-none custom-scrollbar">

      {/* Title Header */}
      <section className="hud-panel p-4 rounded-xl flex items-center justify-between corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-950/40 rounded-lg border border-cyan-500/25">
            <Users className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-widest text-glow-cyan m-0">
              Operations Roster
            </h2>
            <p className="text-[10px] text-slate-500 font-mono tracking-wider mt-0.5">
              COGNITIVE NODE DEPLOYMENT AND FUNCTION SPECIFICATIONS LIST
            </p>
          </div>
        </div>
        <div className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
          NODE CONFIGURATION: ACTIVE
        </div>
      </section>

      {/* Grid of Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(agents).map((agent) => {
          const Icon = agentIcons[agent.id] || Briefcase;
          const isActive = agent.status === 'thinking' || agent.status === 'processing';
          const isCompleted = agent.status === 'completed';

          let cardStyle = '';
          let titleColor = '';

          if (isActive) {
            cardStyle = 'border-cyan-500/40 bg-cyan-950/10 shadow-[0_0_15px_rgba(6,182,212,0.05)]';
            titleColor = 'text-cyan-400 text-glow-cyan';
          } else if (isCompleted) {
            cardStyle = 'border-emerald-500/20 bg-emerald-950/5';
            titleColor = 'text-emerald-400';
          } else {
            cardStyle = 'border-sky-950 bg-black/40 text-slate-400';
            titleColor = 'text-slate-200';
          }

          return (
            <div
              key={agent.id}
              className={`hud-panel p-5 rounded-xl border flex flex-col justify-between transition-all duration-300 relative group hover:scale-[1.02] corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br ${cardStyle}`}
            >
              {/* Highlight active pulse dot */}
              {isActive && (
                <div className="absolute top-3 right-3 flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </div>
              )}

              <div className="space-y-4">
                {/* Agent Header */}
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg border transition-all duration-300 ${
                    isActive
                      ? 'border-cyan-500/40 text-cyan-400'
                      : 'border-sky-950 text-slate-500 group-hover:text-cyan-500/70 group-hover:border-cyan-500/20'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`text-[11px] font-bold uppercase tracking-wider ${titleColor}`}>
                      {agent.name}
                    </h3>
                    <p className="text-[8px] text-slate-500 font-mono tracking-wide uppercase leading-none mt-1">
                      Role: {agent.role}
                    </p>
                  </div>
                </div>

                {/* Description and Skills */}
                <div className="space-y-2 text-[9.5px] text-slate-400 font-sans border-t border-sky-950/40 pt-3">
                  <p className="leading-relaxed">
                    Provides core operations related to {agent.name.toLowerCase()} functionalities within the swarm. Integrated with custom vectorized search models.
                  </p>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[8px] pt-1">
                    <span className="bg-sky-950/45 text-cyan-400 px-1.5 py-0.5 rounded border border-sky-900/30 uppercase">
                      Llm-Node
                    </span>
                    <span className="bg-sky-950/45 text-cyan-400 px-1.5 py-0.5 rounded border border-sky-900/30 uppercase">
                      Auto-Exec
                    </span>
                    <span className="bg-sky-950/45 text-cyan-400 px-1.5 py-0.5 rounded border border-sky-900/30 uppercase">
                      JSON Schema
                    </span>
                  </div>
                </div>
              </div>

              {/* Metrics Bottom */}
              <div className="grid grid-cols-2 gap-4 border-t border-sky-950/40 pt-3 mt-4 text-[9px] font-mono text-slate-500">
                <div className="flex justify-between">
                  <span>CONFIDENCE:</span>
                  <span className="text-emerald-500 font-bold">{agent.confidenceScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span>CAPABILITY:</span>
                  <span className="text-cyan-400">CLASS-IV</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default AgentsView;
