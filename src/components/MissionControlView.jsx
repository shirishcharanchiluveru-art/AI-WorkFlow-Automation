import React, { useState, useEffect, useRef } from 'react';
import { useMission, DEMO_MISSIONS } from '../context/MissionContext';
import AgentGraph from './AgentGraph';
import {
  Play,
  Terminal,
  Layers,
  Sparkles
} from 'lucide-react';

const MissionControlView = () => {
  const {
    launchMission,
    activeMission,
    agents
  } = useMission();

  const [inputText, setInputText] = useState('');
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeMission?.logs]);

  const handleLaunch = () => {
    if (!inputText.trim()) return;
    launchMission(inputText);
  };

  const handleSelectDemo = (prompt) => {
    setInputText(prompt);
  };

  const isRunning = activeMission && activeMission.status === 'running';

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto font-mono text-xs max-w-7xl mx-auto w-full select-none custom-scrollbar">

      {/* Command Dispatch Panel */}
      <section className="hud-panel p-5 rounded-xl flex flex-col gap-4 relative corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-[10px] text-glow-cyan">
            <Terminal className="w-4 h-4" /> COMMAND DISPATCH TERMINAL
          </div>
          {isRunning && (
            <span className="text-[8.5px] text-cyan-400 animate-pulse font-mono tracking-widest uppercase bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-500/25">
              EXECUTING DISPATCH VECTOR SWARM...
            </span>
          )}
        </div>

        {/* Input box */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder='Assign a mission (e.g., "Hire a Software Engineer", "Generate a Sales Proposal for Tesla")...'
              disabled={isRunning}
              className="w-full bg-black/60 text-cyan-100 border border-sky-950/90 rounded-lg px-4 py-3.5 pl-10 focus:outline-none focus:border-cyan-500/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] placeholder-sky-900/60 font-mono tracking-wide text-xs transition-all duration-300 disabled:opacity-50"
              onKeyDown={(e) => e.key === 'Enter' && handleLaunch()}
            />
            <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-800 pointer-events-none" />
          </div>
          <button
            onClick={handleLaunch}
            disabled={isRunning || !inputText.trim()}
            className={`px-6 rounded-lg font-bold uppercase tracking-wider flex items-center gap-2 border transition-all duration-300 cursor-pointer ${
              isRunning
                ? 'bg-sky-950/15 border-sky-950/40 text-sky-800 cursor-not-allowed'
                : !inputText.trim()
                ? 'bg-sky-950/30 border-sky-950/30 text-sky-700 cursor-not-allowed'
                : 'bg-cyan-500/10 border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:text-cyan-300'
            }`}
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-pulse' : ''}`} /> Launch Mission
          </button>
        </div>

        {/* Suggested demo buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[8.5px] text-slate-500 mr-1 uppercase tracking-widest font-bold">Preset Demos:</span>
          {DEMO_MISSIONS.map((demo) => (
            <button
              key={demo.id}
              onClick={() => handleSelectDemo(demo.prompt)}
              disabled={isRunning}
              className="bg-black/40 hover:bg-cyan-950/15 text-slate-400 hover:text-cyan-400 px-3 py-1.5 border border-sky-950/80 hover:border-cyan-500/30 rounded font-mono text-[8.5px] tracking-wide transition-all duration-300 uppercase cursor-pointer disabled:opacity-50"
            >
              {demo.title}
            </button>
          ))}
        </div>
      </section>

      {/* Interactive Node Map */}
      <section className="relative">
        <AgentGraph />
      </section>

      {/* Bottom panels: Logs on left, agent states roster on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Terminal Logs (7 columns) */}
        <section className="lg:col-span-7 hud-panel p-5 rounded-xl flex flex-col h-[320px] corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
          <div className="flex items-center justify-between border-b border-sky-950/60 pb-3 mb-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-[9.5px] text-glow-cyan">
              <Terminal className="w-4 h-4" /> Swarm Communications Console
            </div>
            <div className="flex items-center gap-1.5 text-[8px] text-cyan-500/60 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              CONSOLE FEED SYNCED
            </div>
          </div>

          {/* CRT terminal */}
          <div className="flex-1 crt-terminal rounded-lg p-4 font-mono text-[9.5px] overflow-y-auto space-y-2 select-text custom-scrollbar">
            {activeMission && activeMission.logs.length > 0 ? (
              <>
                {activeMission.logs.map((log, idx) => {
                  let colorClass = 'text-cyan-300/80';
                  if (log.includes('Complete')) {
                    colorClass = 'text-emerald-400 text-glow-emerald font-bold';
                  } else if (log.includes('Received') || log.includes('Analyze')) {
                    colorClass = 'text-cyan-400 font-semibold';
                  } else if (log.includes('Error') || log.includes('Failed')) {
                    colorClass = 'text-red-500';
                  }

                  return (
                    <div key={idx} className={`leading-relaxed border-l-2 border-cyan-950/50 pl-2.5 py-0.5 ${colorClass}`}>
                      {log}
                    </div>
                  );
                })}
                {isRunning && (
                  <div className="flex items-center gap-1 text-cyan-400/85 italic pl-2.5 pt-1">
                    <span className="terminal-cursor" />
                    Agent swarm executing next instruction block...
                  </div>
                )}
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-sky-900/60 gap-1.5">
                <Terminal className="w-6 h-6 opacity-35 text-cyan-500" />
                <p className="font-mono text-[9px] text-center tracking-widest uppercase">
                  SWARM CORE ONLINE. DISPATCH COMMAND SIGNAL TO INITIATE COGNITIVE PIPELINE.
                </p>
              </div>
            )}
            <div ref={terminalEndRef} />
          </div>
        </section>

        {/* Scrollable Agent Cards sidebar (5 columns) */}
        <section className="lg:col-span-5 hud-panel p-5 rounded-xl flex flex-col h-[320px] corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
          <div className="flex items-center justify-between border-b border-sky-950/60 pb-3 mb-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-[9.5px] text-glow-cyan">
              <Layers className="w-4 h-4" /> Agent Swarm Roster
            </div>
            <div className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">
              Nodes telemetry
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
            {Object.values(agents).map((agent) => {
              const isAgentActive = agent.status === 'thinking' || agent.status === 'processing';
              const isAgentCompleted = agent.status === 'completed';

              let cardStyle = '';
              if (isAgentActive) {
                cardStyle = 'bg-cyan-950/15 border-cyan-500/40 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.05)]';
              } else if (isAgentCompleted) {
                cardStyle = 'bg-emerald-950/5 border-emerald-500/15 text-slate-350';
              } else {
                cardStyle = 'bg-black/40 border-sky-950/45 text-slate-500';
              }

              return (
                <div
                  key={agent.id}
                  className={`border p-2.5 rounded-lg transition-all duration-300 font-mono text-[8.5px] relative ${cardStyle}`}
                >
                  {isAgentActive && (
                    <div className="absolute top-0 right-0 w-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                  )}

                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`font-bold uppercase tracking-wider ${
                      isAgentActive ? 'text-cyan-400' : isAgentCompleted ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      {agent.name}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded uppercase font-bold text-[7.5px] tracking-wider flex items-center gap-1 ${
                      agent.status === 'thinking' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                      agent.status === 'processing' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      agent.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-slate-900/60 text-slate-500 border border-sky-950/30'
                    }`}>
                      {agent.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-t border-sky-950/30 pt-1.5 text-[8px] text-slate-500">
                    <div>
                      <span>ACCURACY: </span>
                      <span className="text-emerald-500 font-bold">{agent.confidenceScore}%</span>
                    </div>
                    <div>
                      <span>RTT EX: </span>
                      <span className="text-cyan-400">{agent.executionTime}</span>
                    </div>
                    <div>
                      <span>PROGRESS: </span>
                      <span className="text-cyan-400">{agent.progress}%</span>
                    </div>
                  </div>

                  {isAgentActive && (
                    <div className="mt-1.5 border-t border-cyan-950/25 pt-1 font-sans">
                      <span className="text-slate-500 font-mono text-[7px]">ACTION: </span>
                      <span className="text-amber-400 italic text-[8.5px] line-clamp-1">{agent.lastAction}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MissionControlView;
