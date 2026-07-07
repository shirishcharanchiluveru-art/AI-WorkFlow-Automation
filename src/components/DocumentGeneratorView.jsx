import React, { useState } from 'react';
import { useMission } from '../context/MissionContext';
import {
  FileText,
  Download,
  Plus,
  FileCode,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';

const DocumentGeneratorView = () => {
  const { documents, setDocuments, addNotification } = useMission();
  const [selectedDocId, setSelectedDocId] = useState(documents[0]?.id || null);

  const [docType, setDocType] = useState('Report');
  const [docTitle, setDocTitle] = useState('');
  const [docContent, setDocContent] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);

  const selectedDoc = documents.find(d => d.id === selectedDocId);

  const handleCompile = () => {
    if (!docTitle.trim() || !docContent.trim() || isCompiling) return;
    setIsCompiling(true);

    setTimeout(() => {
      const extension = docType === 'Offer Letter' ? 'pdf' : 'docx';
      const finalTitle = docTitle.endsWith('.md') || docTitle.endsWith('.pdf') || docTitle.endsWith('.docx')
        ? docTitle
        : `${docTitle.replace(/[^a-zA-Z0-9]/g, '_')}.${extension}`;

      const newDoc = {
        id: `doc-${Date.now()}`,
        type: docType,
        title: finalTitle,
        content: docContent,
        createdDate: new Date().toISOString().split('T')[0]
      };

      setDocuments(prev => [newDoc, ...prev]);
      setSelectedDocId(newDoc.id);
      setIsCompiling(false);
      setDocTitle('');
      setDocContent('');
      addNotification(`Document generated: "${finalTitle}" compiled successfully.`, "success");
    }, 2000);
  };

  const triggerDownload = (filename, content, type) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    addNotification(`Exported ${type.toUpperCase()}: ${filename}`, "success");
  };

  const docTypes = [
    'Offer Letter', 'Invoice', 'Report', 'Quotation',
    'Interview Questions', 'Meeting Minutes', 'HR Notice'
  ];

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto font-mono text-xs max-w-7xl mx-auto w-full select-none custom-scrollbar">

      {/* Title Header */}
      <section className="hud-panel p-4 rounded-xl flex items-center justify-between corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-950/40 rounded-lg border border-cyan-500/25">
            <FileText className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-widest text-glow-cyan m-0">
              Document Synthesis Vault
            </h2>
            <p className="text-[10px] text-slate-500 font-mono tracking-wider mt-0.5">
              SYSTEM OUTPUT TERMINAL AND REPORTING COMPILED BY CONNECTED AGENT SUB-SYSTEMS
            </p>
          </div>
        </div>
        <div className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
          COMPILER MODE: ONLINE
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Side: Document Catalog */}
        <section className="lg:col-span-4 hud-panel p-5 rounded-xl flex flex-col h-[520px] corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
          <div className="flex items-center justify-between border-b border-sky-950 pb-2 mb-3">
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-[9px] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Generated Registry
            </span>
            <span className="text-[8px] text-slate-500 font-bold">{documents.length} Files</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
            {documents.map((doc) => {
              const isSelected = selectedDocId === doc.id;

              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all duration-300 font-mono text-[9px] block cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/25 border-cyan-500/40 text-cyan-200'
                      : 'bg-[#02040b]/40 border-sky-950/60 hover:bg-[#030612]/60 hover:border-cyan-500/25 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1 font-bold">
                    <span className="truncate text-[10px]">{doc.title}</span>
                    <span className="bg-sky-950/60 text-cyan-400/80 px-1.5 py-0.5 rounded text-[7px] tracking-wider uppercase whitespace-nowrap border border-sky-900/30">
                      {doc.type}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600 text-[8px]">
                    <span>CREATED: {doc.createdDate}</span>
                    <span>SIZE: {Math.round(doc.content.length / 50)} B</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Right Side: Document Details & Compiler */}
        <section className="lg:col-span-8 flex flex-col gap-6">

          {/* Details & Download */}
          {selectedDoc ? (
            <div className="hud-panel p-5 rounded-xl flex flex-col h-[300px] corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
              <div className="flex items-center justify-between border-b border-sky-950 pb-2 mb-3">
                <span className="text-cyan-400 font-bold uppercase tracking-widest text-[9px] flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5" /> File Inspector: {selectedDoc.title}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => triggerDownload(selectedDoc.title.replace(/\.[a-zA-Z]+$/, '.pdf'), selectedDoc.content, 'pdf')}
                    className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 px-2.5 py-1 border border-cyan-400/30 rounded font-mono text-[8.5px] tracking-wider transition-all duration-300 uppercase flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" /> PDF Export
                  </button>
                  <button
                    onClick={() => triggerDownload(selectedDoc.title.replace(/\.[a-zA-Z]+$/, '.docx'), selectedDoc.content, 'docx')}
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-2.5 py-1 border border-emerald-400/30 rounded font-mono text-[8.5px] tracking-wider transition-all duration-300 uppercase flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" /> DOCX Export
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-[#02040b]/90 border border-sky-950/60 rounded-lg p-4 font-mono text-[10px] text-cyan-200 overflow-y-auto space-y-1.5 select-text custom-scrollbar">
                <pre className="whitespace-pre-wrap font-sans leading-relaxed">{selectedDoc.content}</pre>
              </div>
            </div>
          ) : (
            <div className="hud-panel p-5 rounded-xl flex items-center justify-center h-[300px]">
              <span className="text-slate-500 tracking-wider font-bold">NO DOCUMENT SELECTED. CHOOSE FROM REGISTRY LIST.</span>
            </div>
          )}

          {/* Custom Document Compiler */}
          <div className="hud-panel p-5 rounded-xl flex flex-col h-[195px] relative corner-bracket corner-bracket-tl corner-bracket-tr corner-bracket-bl corner-bracket-br">
            {isCompiling && (
              <div className="absolute inset-0 bg-slate-950/90 rounded-xl z-20 flex flex-col items-center justify-center gap-3">
                <Cpu className="w-8 h-8 text-cyan-400 animate-spin" />
                <div className="text-[10px] text-cyan-300 uppercase tracking-widest font-bold animate-pulse">
                  COMPILING FILE CHUNKS INTO STATIC BUFFER...
                </div>
                <div className="w-48 h-1 bg-sky-950 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 animate-[flow_1.5s_linear_infinite]" style={{ width: '100%' }} />
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-[9px] border-b border-sky-950 pb-2 mb-3">
              <Plus className="w-3.5 h-3.5" /> Manual Document Compiler Desk
            </div>

            <div className="grid grid-cols-3 gap-3 mb-2.5">
              <div>
                <label className="text-[7.5px] text-slate-500 uppercase block mb-1">Doc Type</label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full bg-[#030611] text-cyan-100 border border-sky-900/60 rounded px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 font-mono text-[9px]"
                >
                  {docTypes.map((type, idx) => (
                    <option key={idx} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-[7.5px] text-slate-500 uppercase block mb-1">Document Title</label>
                <input
                  type="text"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  placeholder="e.g., Q2_Marketing_Budget"
                  className="w-full bg-[#030611] text-cyan-100 border border-sky-900/60 rounded px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 font-mono text-[9px]"
                />
              </div>
            </div>

            <div className="flex-1 flex gap-2 min-h-0">
              <div className="flex-1">
                <textarea
                  value={docContent}
                  onChange={(e) => setDocContent(e.target.value)}
                  placeholder="Paste document contents, Markdown format is supported..."
                  className="w-full h-full bg-[#030611] text-cyan-100 border border-sky-900/60 rounded p-2.5 focus:outline-none focus:border-cyan-500 font-mono text-[9px] resize-none"
                />
              </div>
              <button
                onClick={handleCompile}
                disabled={!docTitle.trim() || !docContent.trim() || isCompiling}
                className={`px-5 rounded font-bold uppercase tracking-wider flex items-center justify-center gap-1 border transition-all duration-300 shrink-0 cursor-pointer ${
                  !docTitle.trim() || !docContent.trim()
                    ? 'bg-sky-950/40 border-sky-900/35 text-sky-800 cursor-not-allowed'
                    : 'bg-cyan-500/10 border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300'
                }`}
              >
                Compile <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DocumentGeneratorView;
