import React from 'react';
import { useMission } from '../context/MissionContext';
import {
  LayoutDashboard,
  Compass,
  Users,
  FileText,
  Database,
  BarChart3,
  Settings,
  ShieldCheck
} from 'lucide-react';

const Sidebar = () => {
  const { currentView, setView } = useMission();

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'mission-control', name: 'Mission Control', icon: Compass },
    { id: 'agents', name: 'Agents Swarm', icon: Users },
    { id: 'documents', name: 'Doc Vault', icon: FileText },
    { id: 'knowledge-base', name: 'Knowledge Base', icon: Database },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Control Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 glass-sidebar flex flex-col h-screen relative select-none shrink-0 z-25 transition-colors duration-300" style={{color: 'var(--text-body)'}}>
      {/* Top glowing bar */}
      <div className="absolute top-0 left-0 w-full h-[2px] opacity-60" style={{background: 'linear-gradient(to right, transparent, var(--accent), transparent)'}} />

      {/* Brand Header */}
      <div className="p-6 border-b flex items-center gap-3 b-panel">
        <div className="relative">
          <ShieldCheck className="w-8 h-8 t-accent drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.3)]" />
          <div className="absolute -inset-1 rounded-full blur animate-pulse" style={{background: 'rgba(var(--accent-rgb), 0.15)'}} />
        </div>
        <div>
          <h1 className="text-md font-bold tracking-widest uppercase text-glow-cyan font-mono m-0 t-heading">
            Operations
          </h1>
          <p className="text-[9px] uppercase font-mono tracking-wider t-accent" style={{opacity: 0.8}}>
            AI Mission Control
          </p>
        </div>
      </div>

      {/* Navigation Directory */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <div className="text-[9px] font-mono tracking-widest uppercase mb-4 px-2 t-faint">
          Systems Directory
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-left transition-all duration-300 group relative font-mono text-xs tracking-wider cursor-pointer ${
                isActive
                  ? 'bg-accent t-accent shadow-[inset_0_0_8px_rgba(var(--accent-rgb),0.1)]'
                  : 'hover:bg-card t-muted border-l-2 border-transparent'
              }`}
              style={isActive ? {borderLeft: '2px solid var(--accent)'} : {}}
            >
              {!isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-0 group-hover:h-3 rounded transition-all duration-300" style={{background: 'rgba(var(--accent-rgb), 0.3)'}} />
              )}

              <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                isActive ? 't-accent' : 't-dim group-hover:t-accent'
              }`} />

              <span className="truncate">{item.name}</span>

              {item.id === 'mission-control' && isActive && (
                <span className="ml-auto flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{backgroundColor: 'var(--accent)'}}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{backgroundColor: 'var(--accent)'}}></span>
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t b-panel bg-card font-mono text-[9px] t-faint space-y-1">
        <div className="flex justify-between">
          <span>HOST CODENAME:</span>
          <span className="t-accent" style={{opacity: 0.7}}>AGY-OOM-26</span>
        </div>
        <div className="flex justify-between">
          <span>SECURITY LEVEL:</span>
          <span className="t-success font-bold">OVERWATCH-V</span>
        </div>
        <div className="flex justify-between">
          <span>GRID STABILITY:</span>
          <span className="t-accent">99.8%</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
