import React, { useState } from 'react';
import { useMission } from '../context/MissionContext';
import {
  Database,
  UploadCloud,
  FileText,
  Search,
  CheckCircle2,
  BookOpen,
  Info,
  Calendar
} from 'lucide-react';

const KnowledgeBaseView = () => {
  const {
    uploadedFiles,
    uploadFile,
    ragQueries,
    askRagQuestion
  } = useMission();

  const [queryText, setQueryText] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!queryText.trim() || isSearching) return;
    setIsSearching(true);
    setTimeout(async () => {
      await askRagQuestion(queryText);
      setIsSearching(false);
      setQueryText('');
    }, 1500);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file.name, file.size);
    }
  };

  const handleSampleQuery = (q) => {
    setQueryText(q);
  };

  const sampleQueries = [
    "What is the probation policy?",
    "Explain the hybrid work policy",
    "What are the leave and vacation accrual rules?",
    "Describe option vesting and cliff timelines"
  ];

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto font-mono text-xs max-w-7xl mx-auto w-full select-none custom-scrollbar">

      {/* Title Header */}
      <section className="hud-panel p-4 rounded-xl flex items-center justify-between corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-950/40 rounded-lg border border-cyan-500/25">
            <Database className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-widest text-glow-cyan m-0">
              RAG Knowledge Assistant
            </h2>
            <p className="text-[10px] text-slate-500 font-mono tracking-wider mt-0.5">
              RETRIEVAL-AUGMENTED GENERATION SYSTEM FOR INTERNAL CORPORATE MANIFESTS
            </p>
          </div>
        </div>
        <div className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
          VECTOR ENGINE: ACTIVE
        </div>
      </section>

      {/* Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Side: Upload & Files list */}
        <section className="lg:col-span-4 space-y-6 flex flex-col">

          {/* Upload Drop Zone */}
          <div className="hud-panel p-5 rounded-xl flex flex-col items-center justify-center text-center corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
            <input
              type="file"
              id="file-upload-input"
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.docx,.txt"
            />
            <label
              htmlFor="file-upload-input"
              className="w-full flex flex-col items-center justify-center py-6 border border-dashed border-sky-900 hover:border-cyan-500/50 rounded-lg cursor-pointer bg-[#02040a]/40 hover:bg-[#030612]/80 transition-all duration-300 group"
            >
              <UploadCloud className="w-8 h-8 text-sky-700 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300 mb-2" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Ingest Company Manuals
              </span>
              <span className="text-[8px] text-slate-600 font-mono mt-1">
                Supports PDF, DOCX, TXT up to 10MB
              </span>
            </label>
          </div>

          {/* Indexed Documents Directory */}
          <div className="hud-panel p-5 rounded-xl flex-1 flex flex-col corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-[9px] border-b border-sky-950 pb-2 mb-3">
              <BookOpen className="w-3.5 h-3.5" /> Vectorized File Repository
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[280px] pr-1 custom-scrollbar">
              {uploadedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="bg-[#02040b]/60 border border-sky-950/60 rounded-lg p-2.5 flex items-center justify-between text-slate-300"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileText className="w-4 h-4 text-cyan-500/80 shrink-0" />
                    <div className="truncate font-mono">
                      <div className="truncate text-[9.5px] font-bold">{file.name}</div>
                      <div className="text-[8px] text-slate-500">{file.size}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className={`px-1.5 py-0.5 rounded text-[7.5px] font-bold tracking-widest ${
                      file.status === 'Indexed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 animate-pulse border border-amber-500/20'
                    }`}>
                      {file.status}
                    </span>
                    <span className="text-[7px] text-slate-500 font-mono flex items-center gap-0.5">
                      <Calendar className="w-2.5 h-2.5" /> {file.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Side: RAG query dialog */}
        <section className="lg:col-span-8 hud-panel p-5 rounded-xl flex flex-col min-h-[460px] corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
          <div className="flex items-center justify-between border-b border-sky-950 pb-3 mb-4">
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-[9.5px] text-glow-cyan">
              <Search className="w-4 h-4" /> Cognitive Search Desk
            </div>
            <div className="text-[8px] text-slate-500 font-mono">
              RETRIEVING ONLY FROM VECTOR CORP-STACK
            </div>
          </div>

          {/* Quick-Query Suggested Pills */}
          <div className="mb-4">
            <div className="text-[8px] text-slate-500 uppercase font-mono tracking-widest mb-1.5">
              Suggested Agent Queries:
            </div>
            <div className="flex flex-wrap gap-2">
              {sampleQueries.map((sq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSampleQuery(sq)}
                  disabled={isSearching}
                  className="bg-black/40 hover:bg-cyan-950/15 text-slate-400 hover:text-cyan-400 px-2 py-1.5 border border-sky-950/80 hover:border-cyan-500/30 rounded font-mono text-[8.5px] tracking-wide transition-all duration-300 uppercase cursor-pointer disabled:opacity-50"
                >
                  {sq}
                </button>
              ))}
            </div>
          </div>

          {/* Search box input */}
          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                placeholder="Ask the Knowledge Agent (e.g., probation rules)..."
                disabled={isSearching}
                className="w-full bg-[#030611] text-cyan-100 border border-sky-950/80 rounded-lg px-4 py-3.5 pl-10 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] placeholder-sky-900/60 font-mono tracking-wide text-xs transition-all duration-300 disabled:opacity-50"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-800 pointer-events-none" />
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching || !queryText.trim()}
              className={`px-5 rounded-lg font-bold uppercase tracking-wider flex items-center gap-2 border transition-all duration-300 cursor-pointer ${
                isSearching
                  ? 'bg-sky-950/15 border-sky-950/40 text-sky-800 cursor-not-allowed'
                  : !queryText.trim()
                  ? 'bg-sky-950/30 border-sky-950/30 text-sky-700 cursor-not-allowed'
                  : 'bg-cyan-500/10 border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300'
              }`}
            >
              Search Policy
            </button>
          </div>

          {/* Chat dialog queries */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 max-h-[240px] custom-scrollbar">
            {isSearching && (
              <div className="bg-sky-950/15 border border-sky-900/30 rounded-lg p-4 flex gap-3 animate-pulse">
                <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500 flex items-center justify-center font-bold text-cyan-400 text-[8px]">
                  K
                </div>
                <div className="flex-1 space-y-2">
                  <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                    Knowledge Agent is retrieving vector clusters...
                  </div>
                  <div className="h-2 bg-sky-900/30 rounded w-5/6" />
                  <div className="h-2 bg-sky-900/30 rounded w-2/3" />
                </div>
              </div>
            )}

            {ragQueries.length > 0 ? (
              ragQueries.map((rq) => (
                <div
                  key={rq.id}
                  className="bg-[#02040b]/75 border border-sky-950/80 rounded-lg p-4 space-y-2.5 relative text-slate-200"
                >
                  <div className="flex justify-between border-b border-sky-950/40 pb-1.5">
                    <span className="text-slate-400 font-bold text-[9.5px]">Q: {rq.query}</span>
                    <span className="text-[8px] text-slate-500">{rq.timestamp}</span>
                  </div>

                  <div className="font-sans leading-relaxed text-[11px] select-text">
                    {rq.answer}
                  </div>

                  <div className="pt-2 border-t border-sky-950/30 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[8.5px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono uppercase tracking-wider font-bold">
                      <CheckCircle2 className="w-3 h-3" /> VERIFIED CITATION: {rq.citation}
                    </div>
                    <div className="text-[8px] text-slate-500 font-mono">
                      MATCH CONFIDENCE: 98.4%
                    </div>
                  </div>
                </div>
              ))
            ) : (
              !isSearching && (
                <div className="h-full flex flex-col items-center justify-center text-sky-900/60 py-12">
                  <Info className="w-6 h-6 opacity-35 text-cyan-500" />
                  <p className="font-mono text-[9px] text-center tracking-widest uppercase">
                    No active RAG operations. Ask a question or click a query template.
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default KnowledgeBaseView;
