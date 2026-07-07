import React, { useRef, useEffect, useState } from 'react';
import { useMission } from '../context/MissionContext';
import { motion } from 'framer-motion';
import {
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

const connections = [
  { from: 'ceo', to: 'planner' },
  { from: 'planner', to: 'knowledge' },
  { from: 'knowledge', to: 'screening' },
  { from: 'knowledge', to: 'docgen' },
  { from: 'screening', to: 'scheduler' },
  { from: 'scheduler', to: 'docgen' },
  { from: 'docgen', to: 'reviewer' },
  { from: 'docgen', to: 'email' },
  { from: 'email', to: 'analytics' },
  { from: 'reviewer', to: 'execution' },
  { from: 'analytics', to: 'execution' },
  { from: 'execution', to: 'ceo' }
];

const AgentGraph = () => {
  const { agents, activeMission } = useMission();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const isMissionRunning = activeMission && activeMission.status === 'running';

  const getConnectionStatus = (fromId, toId) => {
    if (!isMissionRunning) return 'idle';

    const activeAgentKey = Object.keys(agents).find(key => agents[key].status === 'thinking' || agents[key].status === 'processing');
    if (!activeAgentKey) return 'idle';

    if (toId === activeAgentKey) return 'active';
    if (agents[fromId].status === 'completed' && agents[toId].status === 'completed') return 'completed';
    return 'idle';
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] cyber-grid border border-sky-950/60 rounded-xl overflow-hidden bg-black/70 select-none corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br"
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline opacity-10 pointer-events-none" />
      <div className="absolute top-4 left-4 font-mono text-[9px] text-cyan-500/80 uppercase tracking-widest flex items-center gap-2 bg-black/80 px-2.5 py-1 rounded border border-cyan-500/15">
        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
        SWARM DIAGNOSTIC MAP // SUBGRID: 08
      </div>

      {/* SVG Canvas Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
          <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {connections.map((conn, idx) => {
          const fromNode = agents[conn.from];
          const toNode = agents[conn.to];
          if (!fromNode || !toNode) return null;

          const x1 = (fromNode.x / 100) * dimensions.width;
          const y1 = (fromNode.y / 100) * dimensions.height;
          const x2 = (toNode.x / 100) * dimensions.width;
          const y2 = (toNode.y / 100) * dimensions.height;

          const status = getConnectionStatus(conn.from, conn.to);

          let strokeColor = 'rgba(6, 182, 212, 0.08)';
          let strokeWidth = 1.2;
          let filter = '';
          let isAnimated = false;

          if (status === 'active') {
            strokeColor = 'url(#activeGrad)';
            strokeWidth = 2.5;
            filter = 'url(#neonGlow)';
            isAnimated = true;
          } else if (status === 'completed') {
            strokeColor = 'rgba(16, 185, 129, 0.25)';
            strokeWidth = 1.6;
          }

          return (
            <g key={`conn-${idx}`}>
              <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                filter={filter}
                className={isAnimated ? 'animate-flow-path' : ''}
              />

              {status === 'active' && (
                <>
                  <motion.circle
                    r="4.5"
                    fill="#00f0ff"
                    filter="url(#neonGlow)"
                    initial={{ cx: x1, cy: y1 }}
                    animate={{ cx: x2, cy: y2 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.circle
                    r="2.5"
                    fill="#fff"
                    initial={{ cx: x1, cy: y1 }}
                    animate={{ cx: x2, cy: y2 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </>
              )}
            </g>
          );
        })}
      </svg>

      {/* HTML Nodes Layer */}
      {Object.values(agents).map((agent) => {
        const Icon = agentIcons[agent.id] || Briefcase;
        const isActive = agent.status === 'thinking' || agent.status === 'processing';
        const isCompleted = agent.status === 'completed';

        let nodeBorder = '';
        let glowClass = '';

        if (isActive) {
          nodeBorder = 'border-cyan-400 bg-sky-950/75 text-cyan-300';
          glowClass = 'animate-cyber-pulse';
        } else if (isCompleted) {
          nodeBorder = 'border-emerald-500 bg-emerald-950/30 text-emerald-400';
          glowClass = 'animate-glow-green';
        } else {
          nodeBorder = 'border-sky-950/80 bg-[#02050f]/95 text-slate-400';
        }

        return (
          <div
            key={agent.id}
            style={{
              left: `${agent.x}%`,
              top: `${agent.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className="absolute z-10 flex flex-col items-center group cursor-pointer"
          >
            <div className="relative flex items-center justify-center">

              {/* Orbit rings */}
              <div className={`absolute -inset-3.5 rounded-full border border-dashed transition-all duration-500 pointer-events-none ${
                isActive
                  ? 'border-cyan-400/40 animate-orbit-cw'
                  : 'border-sky-950/20 group-hover:border-sky-900/40'
              }`} />

              <div className={`absolute -inset-2 rounded-full border border-dashed transition-all duration-500 pointer-events-none ${
                isActive
                  ? 'border-purple-400/30 animate-orbit-ccw'
                  : 'border-sky-950/10'
              }`} />

              {/* Core node */}
              <motion.div
                whileHover={{ scale: 1.12 }}
                transition={{ type: 'spring', stiffness: 350, damping: 14 }}
                className={`w-13 h-13 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative ${nodeBorder} ${glowClass}`}
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-md pointer-events-none" />
                )}

                <Icon className={`w-5.5 h-5.5 transition-all duration-300 ${
                  isActive ? 'drop-shadow-[0_0_6px_rgba(6,182,212,0.8)] scale-105' : 'opacity-85'
                }`} />

                {/* Progress ring */}
                {(isActive || isCompleted) && (
                  <svg className="absolute -inset-1.5 w-[64px] h-[64px] -rotate-90 pointer-events-none">
                    <circle
                      cx="32" cy="32" r="30"
                      fill="transparent"
                      stroke={isActive ? '#00f0ff' : '#10b981'}
                      strokeWidth="1.5"
                      strokeDasharray={`${2 * Math.PI * 30}`}
                      strokeDashoffset={`${2 * Math.PI * 30 * (1 - agent.progress / 100)}`}
                      className="transition-all duration-300"
                    />
                  </svg>
                )}

                {/* Status dot */}
                <span className={`absolute bottom-0 right-0 flex h-2 w-2 rounded-full border border-black/95 ${
                  agent.status === 'thinking' ? 'bg-cyan-400 animate-ping' :
                  agent.status === 'processing' ? 'bg-amber-500 animate-pulse' :
                  agent.status === 'completed' ? 'bg-emerald-500' :
                  'bg-sky-950'
                }`} />
              </motion.div>
            </div>

            {/* Status readout */}
            <div className="mt-3 text-center bg-black/90 px-3 py-1 border border-sky-950 rounded shadow-md select-none pointer-events-none min-w-[95px] relative">
              <div className="absolute top-0 left-0 w-1 h-[2px] bg-cyan-500/60" />
              <div className="absolute bottom-0 right-0 w-1 h-[2px] bg-cyan-500/60" />

              <div className={`text-[9.5px] font-mono font-bold uppercase tracking-wider ${
                isActive ? 'text-cyan-400 text-glow-cyan' : isCompleted ? 'text-emerald-400' : 'text-slate-300'
              }`}>
                {agent.name}
              </div>
              <div className="text-[7.5px] text-slate-500 font-mono tracking-widest mt-0.5">
                {agent.status === 'thinking' ? 'THINKING...' :
                 agent.status === 'processing' ? `PROC [${agent.progress}%]` :
                 agent.status === 'completed' ? 'COMPLETED' :
                 'STANDBY'}
              </div>
              <div className="text-[6.5px] text-sky-800/70 font-mono mt-0.5 tracking-wider uppercase">
                LOC [{agent.x}.{agent.y}]
              </div>
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-24 scale-0 group-hover:scale-100 transition-all duration-200 z-50 origin-bottom bg-slate-950/95 border border-cyan-500/30 p-3.5 rounded shadow-[0_12px_30px_rgba(0,0,0,0.9)] w-56 font-mono text-[9.5px] space-y-1.5 pointer-events-none text-slate-200">
              <div className="text-cyan-400 font-bold border-b border-sky-950 pb-1 mb-1.5 flex justify-between uppercase">
                <span>{agent.name}</span>
                <span className="text-[7px] text-slate-500 tracking-wider">LOC [{agent.x}.{agent.y}]</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>SECTOR FUNCTION:</span>
                <span className="text-slate-200 text-right max-w-[110px] truncate">{agent.role}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>OPERATION MODE:</span>
                <span className={`font-bold ${isActive ? 'text-cyan-400' : isCompleted ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {agent.status.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>CONFIDENCE RATIO:</span>
                <span className="text-emerald-400">{agent.confidenceScore}%</span>
              </div>
              {isActive && (
                <>
                  <div className="flex justify-between text-slate-400">
                    <span>SECTOR STAGE:</span>
                    <span className="text-cyan-300 font-bold">{agent.progress}%</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>COMPUTE TIME:</span>
                    <span className="text-cyan-300 font-bold">{agent.executionTime}</span>
                  </div>
                  <div className="text-slate-400 border-t border-sky-950/80 pt-1 mt-1 font-sans">
                    <span className="text-slate-500 font-mono text-[8px]">LOG: </span>
                    <span className="text-amber-400 italic block mt-0.5 truncate text-[9px]">{agent.lastAction}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AgentGraph;
