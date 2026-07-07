import React, { useState, useEffect } from 'react';
import { useMission } from '../context/MissionContext';
import {
  Clock,
  Layers,
  Sun,
  Moon
} from 'lucide-react';

const RadialGauge = ({ value, label, max = 100, unit = '%', isCpu = false }) => {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(100, (value / max) * 100);
  const offset = circumference - (percentage / 100) * circumference;

  let strokeColor = 'var(--accent)';
  if (isCpu) {
    if (value > 75) strokeColor = '#ef4444';
    else if (value > 45) strokeColor = '#f59e0b';
  }

  return (
    <div className="flex items-center gap-2.5 px-3 py-1 bg-card border b-subtle rounded-md font-mono select-none h-11 shrink-0 transition-colors duration-300">
      <svg className="w-8 h-8 -rotate-90">
        <circle cx="16" cy="16" r={radius} fill="transparent" stroke="rgba(var(--accent-rgb), 0.06)" strokeWidth="2" />
        <circle
          cx="16" cy="16" r={radius}
          fill="transparent" strokeWidth="2.5"
          style={{ stroke: strokeColor, filter: `drop-shadow(0 0 4px ${strokeColor})` }}
          className="transition-all duration-300"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div>
        <div className="text-[7.5px] t-dim uppercase tracking-widest leading-none mb-0.5">{label}</div>
        <div className="text-[10px] t-heading font-bold tracking-wider leading-none">
          {value}<span className="text-[8px] t-dim font-normal ml-0.5">{unit}</span>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const { activeMission, systemHealth, agents, theme, toggleTheme } = useMission();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => { setTime(new Date()); }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (t) => t.toLocaleTimeString('en-US', { hour12: false });
  const isMissionActive = activeMission && activeMission.status === 'running';
  const onlineAgents = Object.values(agents).length;

  return (
    <header className="h-20 glass-panel border-b b-panel px-6 flex items-center justify-between relative select-none shrink-0 z-10 corner-bracket corner-bracket-bl corner-bracket-br transition-all duration-300" style={{color: 'var(--text-body)'}}>
      {/* Top glow line */}
      <div className={`absolute top-0 left-0 w-full h-[1px] transition-all duration-500`}
        style={{background: isMissionActive
          ? 'linear-gradient(to right, transparent, var(--accent), transparent)'
          : 'linear-gradient(to right, transparent, var(--border-panel), transparent)'
        }} />

      {/* Operations Info */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            {isMissionActive ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{backgroundColor: 'var(--accent)'}}></span>
                <span className="relative inline-flex rounded-full h-3 w-3" style={{backgroundColor: 'var(--accent)'}}></span>
              </>
            ) : (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/30 opacity-50"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500/70"></span>
              </>
            )}
          </div>
          <div>
            <div className="text-[7.5px] t-dim font-mono tracking-widest uppercase">System Core Status</div>
            <div className={`text-[10px] font-mono font-bold tracking-wider ${
              isMissionActive ? 't-accent text-glow-cyan' : 't-success text-glow-emerald'
            }`}>
              {isMissionActive ? 'COGNITIVE SWARM ACTIVE' : 'SWARM STANDBY LOCK'}
            </div>
          </div>
        </div>

        {/* Audio Visualizer */}
        <div className="flex items-end gap-0.5 h-6 px-4 border-l b-subtle">
          {[1,2,3,4,5,2].map((n, i) => (
            <div key={i} className={`w-0.75 origin-bottom rounded-t-sm ${
              isMissionActive ? `bar-anim-${n > 5 ? 2 : n}` : ''
            }`} style={{
              backgroundColor: isMissionActive ? 'var(--accent)' : 'var(--border-subtle)',
              height: isMissionActive ? `${[16,20,12,24,8,16][i]}px` : `${[6,4,6,4,6,4][i]}px`
            }} />
          ))}
        </div>
      </div>

      {/* Clock, Theme Toggle & Nodes */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="flex items-center justify-center w-11 h-11 bg-card hover:bg-accent border b-subtle rounded-md font-mono transition-all duration-300 t-accent cursor-pointer"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 hover:scale-110 transition-transform" />
          ) : (
            <Moon className="w-4 h-4 hover:scale-110 transition-transform" style={{color: 'var(--accent)'}} />
          )}
        </button>

        {/* Clock */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-card border b-subtle rounded-md font-mono text-[9px] h-11 shrink-0 transition-colors duration-300">
          <Clock className="w-3.5 h-3.5 t-accent" style={{opacity: 0.8}} />
          <div>
            <div className="text-[7.5px] t-dim uppercase tracking-widest leading-none mb-0.5">Local Ops Time</div>
            <span className="t-heading font-bold tracking-widest leading-none">{formatTime(time)}</span>
          </div>
        </div>

        {/* Nodes */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-card border b-subtle rounded-md font-mono text-[9px] h-11 shrink-0 transition-colors duration-300">
          <Layers className="w-3.5 h-3.5 t-accent" style={{opacity: 0.8}} />
          <div>
            <div className="text-[7.5px] t-dim uppercase tracking-widest leading-none mb-0.5">Online Nodes</div>
            <div className="leading-none t-heading">
              <span className="t-success font-bold">{onlineAgents}</span>
              <span className="t-dim">/10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gauges */}
      <div className="flex items-center gap-4 border-l b-panel pl-6 h-full transition-colors duration-300">
        <RadialGauge value={systemHealth.cpuUsage} label="Swarm CPU" unit="%" isCpu={true} />
        <RadialGauge value={systemHealth.memoryUsage} label="Core RAM" unit="%" />
        <RadialGauge value={systemHealth.apiLatency} label="RTT Latency" max={200} unit="ms" />
      </div>
    </header>
  );
};

export default Header;
