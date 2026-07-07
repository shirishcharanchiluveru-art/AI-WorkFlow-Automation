import React, { useState } from 'react';
import { useMission } from '../context/MissionContext';
import {
  Settings,
  Key,
  Gauge,
  Cpu,
  RefreshCw,
  Info,
  Sliders,
  CheckCircle2
} from 'lucide-react';

const SettingsView = () => {
  const { settings, setSettings, addNotification } = useMission();
  const [apiKey, setApiKey] = useState(settings.openAiApiKey);
  const [speed, setSpeed] = useState(settings.simulationSpeed);
  const [model, setModel] = useState(settings.modelName);

  const handleSave = () => {
    setSettings(prev => ({
      ...prev,
      openAiApiKey: apiKey,
      simulationSpeed: Number(speed),
      modelName: model
    }));
    addNotification("Operations configuration matrix updated.", "success");
  };

  const handleReset = () => {
    if (window.confirm("Confirm system wipe? All synthesized documents and logs will be reset to default.")) {
      localStorage.removeItem('openAiApiKey');
      window.location.reload();
    }
  };

  const modelsList = [
    { value: 'gpt-4o', label: 'GPT-4o (OpenAI Core Swarm)' },
    { value: 'claude-3.5-sonnet', label: 'Claude 3.5 Sonnet (Anthropic Node)' },
    { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro (DeepMind Vector)' },
    { value: 'llama-3-70b', label: 'Llama 3 70B (Open-Source Cluster)' }
  ];

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto font-mono text-xs max-w-4xl mx-auto w-full select-none custom-scrollbar">

      {/* Title Header */}
      <section className="hud-panel p-4 rounded-xl flex items-center justify-between corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-950/40 rounded-lg border border-cyan-500/25">
            <Settings className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-widest text-glow-cyan m-0">
              Operations Control Panel
            </h2>
            <p className="text-[10px] text-slate-500 font-mono tracking-wider mt-0.5">
              CONFIGURE VECTOR PIPELINES, KEYWORDS INDEXING AND SIMULATION THROTTLING
            </p>
          </div>
        </div>
        <div className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
          NODE CONFIG: WRITABLE
        </div>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Settings form */}
        <section className="hud-panel p-5 rounded-xl flex flex-col justify-between corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
          <div className="space-y-4">
            <div className="text-cyan-400 font-bold uppercase tracking-widest text-[9px] border-b border-sky-950 pb-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" /> Node Tuning Options
            </div>

            <div className="space-y-1.5">
              <label className="text-[8.5px] text-slate-400 uppercase font-bold flex items-center gap-1">
                <Key className="w-3 h-3 text-cyan-500" /> OpenAI-Compatible Endpoint Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-........................................"
                className="w-full bg-[#030611] text-cyan-100 border border-sky-900/60 rounded px-3 py-2 focus:outline-none focus:border-cyan-500 font-mono text-[9px]"
              />
              <p className="text-[7.5px] text-slate-600">
                (Optional: Enables real-time AI responses in RAG search if provided. Otherwise, high-quality mocks are utilized.)
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[8.5px] text-slate-400 uppercase font-bold flex items-center gap-1">
                <Cpu className="w-3 h-3 text-cyan-500" /> Swarm Model Node
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-[#030611] text-cyan-100 border border-sky-900/60 rounded px-3 py-2 focus:outline-none focus:border-cyan-500 font-mono text-[9px]"
              >
                {modelsList.map((m, idx) => (
                  <option key={idx} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[8.5px] text-slate-400 uppercase font-bold flex items-center gap-1">
                <Gauge className="w-3 h-3 text-cyan-500" /> Simulation Pipeline Speed
              </label>
              <div className="flex gap-2">
                {[0.5, 1, 2, 4].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`flex-1 py-1.5 border rounded font-mono text-[9px] transition-all duration-300 uppercase cursor-pointer ${
                      Number(speed) === s
                        ? 'bg-cyan-500/15 border-cyan-500 text-cyan-400 font-bold'
                        : 'bg-[#030611] border-sky-950/80 text-slate-500 hover:text-slate-300 hover:border-sky-900/60'
                    }`}
                  >
                    {s === 1 ? '1.0x Normal' : s === 0.5 ? '0.5x Slow' : `${s}.0x Fast`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 py-2 border border-cyan-400/40 hover:border-cyan-400 rounded font-bold uppercase tracking-wider transition-all duration-300 mt-4 flex items-center justify-center gap-1 cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Save Configurations
          </button>
        </section>

        {/* Telemetry */}
        <section className="hud-panel p-5 rounded-xl flex flex-col justify-between corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
          <div className="space-y-4">
            <div className="text-cyan-400 font-bold uppercase tracking-widest text-[9px] border-b border-sky-950 pb-2 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" /> Operations Telemetry
            </div>

            <div className="space-y-3 font-mono text-[9.5px] text-slate-400">
              <div className="flex justify-between border-b border-sky-950/30 pb-1">
                <span>FIRMWARE BUILD:</span>
                <span className="text-cyan-500">MC-OS-V2.6.4</span>
              </div>
              <div className="flex justify-between border-b border-sky-950/30 pb-1">
                <span>ACTIVE SOCKET CLUSTER:</span>
                <span className="text-slate-300">WSS://HQ.VECTOR.CORP/SWARM</span>
              </div>
              <div className="flex justify-between border-b border-sky-950/30 pb-1">
                <span>THREADING POOL SIZE:</span>
                <span className="text-slate-300">16 Virtual cores</span>
              </div>
              <div className="flex justify-between border-b border-sky-950/30 pb-1">
                <span>MODEL TEMPERATURE COEFF:</span>
                <span className="text-slate-300">0.25 (Determinism priority)</span>
              </div>
              <div className="flex justify-between border-b border-sky-950/30 pb-1">
                <span>DATABASE STATUS:</span>
                <span className="text-emerald-400 font-bold">SQLITE_VIRTUAL ONLINE</span>
              </div>
              <div className="flex justify-between pb-1">
                <span>SWARM LICENSE CODE:</span>
                <span className="text-slate-300">HACK-ATHON-EVAL-2026</span>
              </div>
            </div>
          </div>

          <div className="border-t border-sky-950 pt-4 mt-4">
            <button
              onClick={handleReset}
              className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2 border border-red-500/30 hover:border-red-500 rounded font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Wipe Operations DB
            </button>
          </div>
        </section>

      </div>

    </div>
  );
};

export default SettingsView;
