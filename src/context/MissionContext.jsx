import React, { createContext, useState, useEffect, useContext } from 'react';

const MissionContext = createContext();

export const useMission = () => useContext(MissionContext);

// Initial Agent configuration with coordinates for the visual node graph
const initialAgents = {
  ceo: { id: 'ceo', name: 'CEO Agent', role: 'Executive Commander', status: 'idle', progress: 0, executionTime: '0s', lastAction: 'Standing by', confidenceScore: 98, x: 50, y: 12 },
  planner: { id: 'planner', name: 'Planner Agent', role: 'Workflow Architect', status: 'idle', progress: 0, executionTime: '0s', lastAction: 'Standing by', confidenceScore: 95, x: 50, y: 38 },
  knowledge: { id: 'knowledge', name: 'Knowledge Agent', role: 'RAG policy retriever', status: 'idle', progress: 0, executionTime: '0s', lastAction: 'Standing by', confidenceScore: 92, x: 20, y: 28 },
  screening: { id: 'screening', name: 'Resume Screener', role: 'Candidate analyst', status: 'idle', progress: 0, executionTime: '0s', lastAction: 'Standing by', confidenceScore: 89, x: 15, y: 52 },
  scheduler: { id: 'scheduler', name: 'Scheduler Agent', role: 'Timeline planner', status: 'idle', progress: 0, executionTime: '0s', lastAction: 'Standing by', confidenceScore: 94, x: 22, y: 76 },
  docgen: { id: 'docgen', name: 'Doc Generator', role: 'Contract & report compiler', status: 'idle', progress: 0, executionTime: '0s', lastAction: 'Standing by', confidenceScore: 96, x: 80, y: 28 },
  email: { id: 'email', name: 'Email Dispatcher', role: 'Secure transmission desk', status: 'idle', progress: 0, executionTime: '0s', lastAction: 'Standing by', confidenceScore: 97, x: 85, y: 52 },
  reviewer: { id: 'reviewer', name: 'Reviewer Agent', role: 'Compliance auditor', status: 'idle', progress: 0, executionTime: '0s', lastAction: 'Standing by', confidenceScore: 99, x: 78, y: 76 },
  analytics: { id: 'analytics', name: 'Analytics Agent', role: 'KPI evaluator', status: 'idle', progress: 0, executionTime: '0s', lastAction: 'Standing by', confidenceScore: 93, x: 38, y: 92 },
  execution: { id: 'execution', name: 'Execution Desk', role: 'System output handler', status: 'idle', progress: 0, executionTime: '0s', lastAction: 'Standing by', confidenceScore: 95, x: 62, y: 92 }
};

// Preset demo missions
export const DEMO_MISSIONS = [
  {
    id: 'm1',
    title: 'Hire a Software Engineer',
    prompt: 'Hire a Software Engineer',
    steps: [
      { agentId: 'ceo', action: 'Mission Received', detail: 'Analyzing request: Hire a Software Engineer. Spawning hiring protocol.', duration: 1500 },
      { agentId: 'planner', action: 'Analyze Request', detail: 'Creating hiring workflow, specifying candidate profile criteria.', duration: 2000 },
      { agentId: 'knowledge', action: 'Read Company Policy', detail: 'Searching Knowledge Base. Found probation limits (3 months) and salary bands ($140k-$170k).', duration: 2500 },
      { agentId: 'screening', action: 'Rank Resumes', detail: 'Parsing resumes repository. Top candidates: Alex Mercer (95% fit), Jane Doe (91% fit).', duration: 3000 },
      { agentId: 'scheduler', action: 'Schedule Interview', detail: 'Booking slots for July 8th. Panel confirmed (VP of Eng). Calendars synced.', duration: 2000 },
      { agentId: 'docgen', action: 'Generate Invite Packet', detail: 'Compiling interview invite letter and technical questionnaire document.', duration: 2200 },
      { agentId: 'email', action: 'Send Email Invite', detail: 'Drafted and sent interview invitation to alex.mercer@gmail.com. Sent CC to HR panel.', duration: 1800 },
      { agentId: 'analytics', action: 'Calculate Hiring Time', detail: 'Estimated Time-to-Hire: 14 Days. Efficiency score: +18% vs industry average.', duration: 1500 },
      { agentId: 'ceo', action: 'Mission Complete', detail: 'Hiring pipeline successfully automated. Invite dispatched. Offer letter ready in documents.', duration: 1500 }
    ],
    docType: 'Interview Questions',
    docTitle: 'Technical_Interview_Questions_Alex_Mercer.md',
    docContent: `# TECHNICAL INTERVIEW ROADMAP - ALEX MERCER (95% match)
Role: Senior Software Engineer (React/Node.js Focus)
Salary Grade: E6
Date: July 8th, 2026

## 1. Advanced Architecture (20 mins)
- Explain React 19 concurrent features. How do Server Actions change API strategy?
- Discuss scaling Express applications in high-throughput node contexts.

## 2. Coding Challenge (20 mins)
- Live challenge: Implement a custom event emitter with throttling and wildcard support.

## 3. Culture & System Design (20 mins)
- How does the candidate handle cross-team dependency delays?
- Cite experience moving legacy SPAs to micro-frontends.`
  },
  {
    id: 'm2',
    title: 'Generate a Sales Proposal for Tesla',
    prompt: 'Generate Sales Proposal for Tesla',
    steps: [
      { agentId: 'ceo', action: 'Mission Received', detail: 'Reviewing proposal inquiry for Tesla energy division partnership.', duration: 1500 },
      { agentId: 'planner', action: 'Analyze Requirements', detail: 'Mapping client timeline, volume scaling, and software pricing structures.', duration: 1800 },
      { agentId: 'knowledge', action: 'Retrieve Tesla Research', detail: 'Retrieving context. Found current vehicle firmware stack and energy storage software guidelines.', duration: 2200 },
      { agentId: 'docgen', action: 'Compile Draft Proposal', detail: 'Compiling proposal outline covering industrial telemetry, RAG diagnostics, and pilot pricing.', duration: 2800 },
      { agentId: 'analytics', action: 'Verify Pricing Model', detail: 'Running pricing curves. 1-year pilot: $450k. Projected client ROI: $2.4M saved in maintenance.', duration: 2000 },
      { agentId: 'reviewer', action: 'Compliance Audit', detail: 'Auditing SLA clauses and IP protection covenants. Confidence rating: 99%. Approved.', duration: 2500 },
      { agentId: 'email', action: 'Email Proposal', detail: 'Secure PDF dispatched to procurement@tesla.com. Copy uploaded to analytics vault.', duration: 1800 },
      { agentId: 'ceo', action: 'Mission Complete', detail: 'Tesla enterprise sales proposal compiled, approved, and dispatched. Copied to client folder.', duration: 1500 }
    ],
    docType: 'Quotation',
    docTitle: 'Tesla_AI_Solution_Proposal.md',
    docContent: `# ENTERPRISE PARTNERSHIP PROPOSAL: TESLA ENERGY DIVISION
Compiled by: AI Mission Control Platform
Version: 1.0 (Staging)

## Executive Summary
Implementation of real-time AI agents for monitoring battery telemetry and optimizing grid dispatching speeds.

## Scope of Work
- Setup of custom Knowledge Agents connected to cell sensor logs.
- Automatic document synthesis and diagnostic reports.

## Pricing
- Setup & Pilot Integration: $150,000 (Fixed Fee)
- Annual Software Licensing: $300,000 (SaaS fee, billed monthly)
Total Contract Value (Year 1): $450,000 USD`
  },
  {
    id: 'm3',
    title: 'Create Interview Questions for React Developer',
    prompt: 'Create Interview Questions for React Developer',
    steps: [
      { agentId: 'ceo', action: 'Mission Received', detail: 'Initializing request: Technical evaluation questionnaire for React developers.', duration: 1000 },
      { agentId: 'planner', action: 'Define Tech Scope', detail: 'Selecting core focus areas: Hooks lifecycles, virtual DOM rendering, and performance bottlenecks.', duration: 1500 },
      { agentId: 'knowledge', action: 'Retrieve Standards', detail: 'Searching codebase guidelines. Sourced standards on component hydration and state coupling.', duration: 1800 },
      { agentId: 'docgen', action: 'Generate Interview Sheet', detail: 'Assembling list of questions, code diagnostics, and evaluation rubric.', duration: 2000 },
      { agentId: 'reviewer', action: 'Verify Technical Depth', detail: 'Evaluating questions. Adjusted complexity rating from mid to senior. Certified quality.', duration: 1800 },
      { agentId: 'ceo', action: 'Mission Complete', detail: 'React Developer Interview Questions sheet synthesized. Document cataloged for download.', duration: 1200 }
    ],
    docType: 'Interview Questions',
    docTitle: 'React_Senior_Developer_Interview.md',
    docContent: `# INTERVIEW QUESTIONS: SENIOR REACT DEVELOPER

## Section A: Advanced Rendering & Fiber
1. Explain how React Fiber prioritizes updates. What is the difference between transition updates and high-priority updates?
2. What are the common causes of memory leaks in custom React hooks, and how do you profile them in Chrome DevTools?

## Section B: Practical Code Review
3. Spot the performance bottleneck in this component:
\`\`\`jsx
function SensorMonitor({ feed }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    feed.on('data', (val) => {
      setData((prev) => [...prev, val]);
    });
  }, [feed]);
  return <div>{data.map(d => <Card key={d.id} {...d} />)}</div>;
}
\`\`\`
*(Expected Answer: Re-renders on every tick. Fix by windowing or batching state updates)*`
  },
  {
    id: 'm4',
    title: 'Generate Monthly Sales Report',
    prompt: 'Generate Monthly Sales Report',
    steps: [
      { agentId: 'ceo', action: 'Mission Received', detail: 'Processing request: Sales performance evaluation for June 2026.', duration: 1200 },
      { agentId: 'planner', action: 'Map Data Streams', detail: 'Connecting to Stripe API and CRM accounts to pull monthly aggregates.', duration: 1800 },
      { agentId: 'knowledge', action: 'Retrieve Policies', detail: 'Retrieving tax calculations and regional sales commission tables.', duration: 1500 },
      { agentId: 'analytics', action: 'Aggregate Revenues', detail: 'Calculated totals: $482,900 Gross Sales (+14.5% MoM). Top performer: NA-West.', duration: 2500 },
      { agentId: 'docgen', action: 'Format Report', detail: 'Building charts, summarizing key KPIs, and compiling executive PDF layout.', duration: 2200 },
      { agentId: 'reviewer', action: 'Verify Ledger Balance', detail: 'Double-checking balance logs and profit distribution formulas. 100% matched.', duration: 1500 },
      { agentId: 'email', action: 'Send Exec Summary', detail: 'Report brief transmitted to management-board@company.com with attachment.', duration: 1500 },
      { agentId: 'ceo', action: 'Mission Complete', detail: 'Monthly Sales Report finalized. KPI widgets updated. PDF archived.', duration: 1200 }
    ],
    docType: 'Report',
    docTitle: 'June_2026_Sales_Performance_Report.md',
    docContent: `# MONTHLY SALES PERFORMANCE REPORT
Month: June 2026
Generated: July 4th, 2026 (AI Mission Control)

## Key Performance Indicators
- **Total Revenue**: $482,900 USD (+14.5% MoM)
- **Customer Acquisition Cost (CAC)**: $142 (-8.2%)
- **Average Order Value (AOV)**: $1,250
- **Total Conversions**: 386 clients

## Performance Summary
NA-West led sales with $210,000, followed by EMEA at $145,000. Enterprise accounts grew by 20%, driven by battery telemetry software deals.`
  },
  {
    id: 'm5',
    title: 'Prepare Employee Offer Letter',
    prompt: 'Prepare Employee Offer Letter',
    steps: [
      { agentId: 'ceo', action: 'Mission Received', detail: 'Spawning offer sheet workflow. Target: Alex Mercer.', duration: 1200 },
      { agentId: 'knowledge', action: 'Retrieve Policies', detail: 'Retrieved stock option tables and benefits policies. Found HR-E6 compensation guidelines.', duration: 1800 },
      { agentId: 'docgen', action: 'Draft Contract Clauses', detail: 'Compiling legal sections, standard covenants, salary base ($165k), and grant details.', duration: 2500 },
      { agentId: 'reviewer', action: 'Audit Offer Letter', detail: 'Auditing salary levels and non-disclosure sections. 100% compliant. Certified.', duration: 1800 },
      { agentId: 'email', action: 'Draft Outbox Mail', detail: 'Offer package uploaded and queued for delivery. Verification token created.', duration: 1500 },
      { agentId: 'ceo', action: 'Mission Complete', detail: 'Offer Letter generated successfully. Added to documents list. Link shared with hiring team.', duration: 1200 }
    ],
    docType: 'Offer Letter',
    docTitle: 'Offer_Letter_Alex_Mercer.md',
    docContent: `# EMPLOYMENT OFFER CONTRACT
Date: July 4th, 2026

Dear Alex Mercer,

We are thrilled to offer you the position of **Senior Software Engineer** at AI Systems Corp.

## Terms of Employment
- **Base Salary**: $165,000 USD per annum, payable in semi-monthly installments.
- **Equity**: 10,000 Incentive Stock Options (ISOs), subject to standard 1-year cliff and 4-year vesting schedule.
- **Benefits**: Comprehensive medical, dental, vision, and 4 weeks of paid annual leave.
- **Start Date**: August 1st, 2026.

Please sign and return this offer package by July 15th, 2026 to accept.`
  }
];

export const MissionProvider = ({ children }) => {
  const [currentView, setView] = useState('dashboard');
  const [missions, setMissions] = useState([]);
  const [activeMission, setActiveMission] = useState(null);
  const [agents, setAgents] = useState(initialAgents);
  const [documents, setDocuments] = useState([
    { id: 'doc-0', type: 'HR Notice', title: 'Workplace_Hybrid_Guidelines_2026.md', content: '# Hybrid Work Guidelines (2026)\nEmployees must spend 3 days in office, 2 days remote.', createdDate: '2026-06-15' },
    { id: 'doc-1', type: 'Offer Letter', title: 'Offer_Letter_Template.md', content: '# Employment Offer Letter Template\nStandard template for senior and lead engineer roles.', createdDate: '2026-06-20' },
  ]);
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'Hiring_Policy_2026.pdf', size: '1.2 MB', date: '2026-07-01', status: 'Indexed' },
    { name: 'Employee_Handbook.docx', size: '3.4 MB', date: '2026-07-02', status: 'Indexed' },
  ]);
  const [ragQueries, setRagQueries] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [systemHealth, setSystemHealth] = useState({
    cpuUsage: 14,
    memoryUsage: 42,
    apiLatency: 120,
    activeWorkers: 10
  });

  const [analytics, setAnalytics] = useState({
    tasksCompleted: 14,
    avgExecutionTime: 18.2,
    docsGenerated: 8,
    emailsSent: 12,
    aiAccuracy: 98.4,
    timeSaved: 56.5,
    agentUtilization: 78
  });

  const [theme, setTheme] = useState(localStorage.getItem('mc-theme') || 'dark');

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') { root.classList.add('light'); } else { root.classList.remove('light'); }
    localStorage.setItem('mc-theme', theme);
  }, [theme]);

  const [settings, setSettings] = useState({
    openAiApiKey: localStorage.getItem('openAiApiKey') || '',
    simulationSpeed: 1,
    modelName: 'gpt-4o'
  });

  useEffect(() => {
    localStorage.setItem('openAiApiKey', settings.openAiApiKey);
  }, [settings.openAiApiKey]);

  // Jitter health metrics
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemHealth(prev => {
        const activeCount = Object.values(agents).filter(a => a.status !== 'idle').length;
        const baseCpu = activeCount > 0 ? 45 : 12;
        return {
          cpuUsage: Math.min(100, Math.max(5, baseCpu + Math.floor(Math.random() * 8) - 4)),
          memoryUsage: Math.min(100, Math.max(20, 42 + Math.floor(Math.random() * 4) - 2)),
          apiLatency: Math.max(60, 110 + Math.floor(Math.random() * 20) - 10),
          activeWorkers: 10 + activeCount
        };
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [agents]);

  const addNotification = (text, type = 'info') => {
    const newNotif = {
      id: Date.now() + Math.random().toString(36).substr(2, 5),
      text,
      type,
      time: new Date().toLocaleTimeString()
    };
    setNotifications(prev => [newNotif, ...prev].slice(0, 50));
  };

  const launchMission = (missionText) => {
    if (activeMission && activeMission.status === 'running') {
      addNotification("A mission is already running in the operations matrix.", "error");
      return;
    }

    const normalizedText = missionText.toLowerCase();
    let selectedMission = DEMO_MISSIONS.find(dm =>
      normalizedText.includes(dm.title.toLowerCase()) ||
      normalizedText.includes(dm.prompt.toLowerCase())
    );

    if (!selectedMission) {
      selectedMission = {
        id: 'm-dynamic',
        title: missionText.length > 30 ? missionText.substring(0, 30) + '...' : missionText,
        prompt: missionText,
        steps: [
          { agentId: 'ceo', action: 'Mission Received', detail: `Parsing custom prompt: "${missionText}". Initializing agent mapping.`, duration: 1500 },
          { agentId: 'planner', action: 'Formulate Task Strategy', detail: 'Decomposing mission into execution steps.', duration: 2000 },
          { agentId: 'knowledge', action: 'Search Knowledge Graph', detail: 'Checking files for context matching the prompt.', duration: 2500 },
          { agentId: 'docgen', action: 'Generate Output Document', detail: 'Synthesizing customized files and reports.', duration: 2500 },
          { agentId: 'reviewer', action: 'Audit Quality', detail: 'Double-checking system outputs against accuracy heuristics.', duration: 2000 },
          { agentId: 'email', action: 'Outbox Relay', detail: 'Drafting brief updates. Standard dispatch initialized.', duration: 1500 },
          { agentId: 'ceo', action: 'Mission Complete', detail: `Mission "${missionText}" completed successfully. Operations log closed.`, duration: 1500 }
        ],
        docType: 'Report',
        docTitle: `${missionText.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20)}_Output.md`,
        docContent: `# AI MISSION RESULTS
Prompt: "${missionText}"
Executed On: ${new Date().toLocaleString()}

## Mission Summary
Our AI agent swarm received, planned, researched, generated, reviewed, and successfully executed your prompt.

## Diagnostic Outputs
- **Total Execution Steps**: 7
- **Involved Agents**: CEO, Planner, Knowledge, Docgen, Reviewer, Email
- **System Confidence**: 96.5%`
      };
    }

    setAgents(prev => {
      const reset = {};
      Object.keys(prev).forEach(key => {
        reset[key] = { ...prev[key], status: 'idle', progress: 0, executionTime: '0s', lastAction: 'Standing by' };
      });
      return reset;
    });

    const missionSteps = selectedMission.steps;
    const missionId = Date.now();

    const runningMission = {
      id: missionId,
      title: selectedMission.title,
      status: 'running',
      currentStep: 0,
      totalSteps: missionSteps.length,
      logs: [],
      docType: selectedMission.docType,
      docTitle: selectedMission.docTitle,
      docContent: selectedMission.docContent
    };

    setActiveMission(runningMission);
    addNotification(`Operations launched: "${selectedMission.title}"`, "info");

    let stepIndex = 0;

    const runNextStep = () => {
      if (stepIndex >= missionSteps.length) {
        setActiveMission(prev => ({ ...prev, status: 'completed', currentStep: missionSteps.length }));

        setAgents(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(key => {
            if (updated[key].status === 'processing' || updated[key].status === 'thinking') {
              updated[key].status = 'completed';
              updated[key].progress = 100;
            }
          });
          return updated;
        });

        const newDoc = {
          id: `doc-${Date.now()}`,
          type: selectedMission.docType,
          title: selectedMission.docTitle,
          content: selectedMission.docContent,
          createdDate: new Date().toISOString().split('T')[0]
        };
        setDocuments(prev => [newDoc, ...prev]);

        setMissions(prev => [{
          id: missionId,
          title: selectedMission.title,
          timestamp: new Date().toLocaleTimeString(),
          status: 'success',
          stepsCount: missionSteps.length
        }, ...prev]);

        setAnalytics(prev => ({
          ...prev,
          tasksCompleted: prev.tasksCompleted + 1,
          docsGenerated: prev.docsGenerated + 1,
          emailsSent: prev.emailsSent + (selectedMission.steps.some(s => s.agentId === 'email') ? 1 : 0),
          timeSaved: Math.round((prev.timeSaved + Math.round((Math.random() * 4 + 2) * 10) / 10) * 10) / 10,
          aiAccuracy: Math.round((prev.aiAccuracy * 0.95 + 98 + Math.random() * 2) * 10) / 10
        }));

        addNotification(`Mission: "${selectedMission.title}" completed successfully.`, "success");
        return;
      }

      const step = missionSteps[stepIndex];
      const agentId = step.agentId;
      const stepDuration = step.duration / settings.simulationSpeed;

      setActiveMission(prev => {
        const timeStr = new Date().toLocaleTimeString();
        const newLog = `[${timeStr}] [${agents[agentId]?.name || agentId}] => ${step.action}: ${step.detail}`;
        return { ...prev, currentStep: stepIndex, logs: [...prev.logs, newLog] };
      });

      setAgents(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(k => {
          if (updated[k].status === 'thinking' || updated[k].status === 'processing') {
            updated[k].status = 'completed';
            updated[k].progress = 100;
          }
        });
        const isOdd = stepIndex % 2 === 1;
        updated[agentId] = {
          ...updated[agentId],
          status: isOdd ? 'processing' : 'thinking',
          progress: 35,
          executionTime: `${(stepDuration / 1000).toFixed(1)}s`,
          lastAction: step.action
        };
        return updated;
      });

      addNotification(`${agents[agentId]?.name} => ${step.action}`, "warning");

      let currentProgress = 35;
      const progressIntervalTime = Math.min(200, stepDuration / 5);
      const progressIncrement = (100 - 35) / (stepDuration / progressIntervalTime);

      const progressTimer = setInterval(() => {
        currentProgress += progressIncrement;
        if (currentProgress >= 100) { currentProgress = 100; clearInterval(progressTimer); }
        setAgents(prev => {
          if (prev[agentId].status === 'idle') { clearInterval(progressTimer); return prev; }
          return { ...prev, [agentId]: { ...prev[agentId], progress: Math.min(100, Math.round(currentProgress)) } };
        });
      }, progressIntervalTime);

      setTimeout(() => { clearInterval(progressTimer); stepIndex++; runNextStep(); }, stepDuration);
    };

    runNextStep();
  };

  const uploadFile = (name, size) => {
    const formattedSize = size ? `${(size / (1024 * 1024)).toFixed(1)} MB` : '1.5 MB';
    const newFile = { name, size: formattedSize, date: new Date().toISOString().split('T')[0], status: 'Indexing...' };
    setUploadedFiles(prev => [newFile, ...prev]);
    addNotification(`File uploaded: ${name}. Context processing started.`, "info");
    setTimeout(() => {
      setUploadedFiles(prev => prev.map(f => f.name === name ? { ...f, status: 'Indexed' } : f));
      addNotification(`Knowledge Index updated: ${name} fully vectorized.`, "success");
    }, 4000);
  };

  const askRagQuestion = async (query) => {
    if (!query.trim()) return;
    const lowerQuery = query.toLowerCase();
    let answer = '';
    let citation = '';

    if (lowerQuery.includes('probation') || lowerQuery.includes('trial')) {
      answer = 'According to the Company Hiring Policy (Section 4.2), the standard employee probation period is three (3) calendar months from the official start date. During this time, employment may be terminated by either party with a notice period of one (1) week.';
      citation = 'Hiring_Policy_2026.pdf (Page 8, Section 4.2)';
    } else if (lowerQuery.includes('hybrid') || lowerQuery.includes('remote') || lowerQuery.includes('office')) {
      answer = 'The company operates on a hybrid workspace structure. All employees are required to work in the office at least three (3) days a week (Tuesday through Thursday are core collaborative days) and may work remotely up to two (2) days (Monday and Friday).';
      citation = 'Workplace_Hybrid_Guidelines_2026.md (Page 1, Paragraph 3)';
    } else if (lowerQuery.includes('leave') || lowerQuery.includes('vacation')) {
      answer = 'Employees receive twenty (20) days of Paid Time Off (PTO) per calendar year, accrued monthly. Accrued but unused vacation days can roll over to the next year up to a maximum limit of five (5) working days.';
      citation = 'Employee_Handbook.docx (Page 14, Leave Policy)';
    } else if (lowerQuery.includes('benefit') || lowerQuery.includes('health') || lowerQuery.includes('insurance')) {
      answer = 'Comprehensive benefits package is activated on day 1, covering health, dental, and vision insurance. Standard packages are subsidized at 90% by the corporation. Stock options vest over a 4-year period with a 1-year cliff.';
      citation = 'Employee_Handbook.docx (Page 22, Compensation & Options)';
    } else {
      answer = `Based on our indexed company directories, your query matches guidelines related to general operations. We found that the standard corporate compliance mandates continuous review. We recommend checking with HR for any custom amendments to these rules.`;
      citation = uploadedFiles[0]?.name || 'Hiring_Policy_2026.pdf';
    }

    const newQueryObj = { id: Date.now(), query, answer, citation, timestamp: new Date().toLocaleTimeString() };
    setRagQueries(prev => [newQueryObj, ...prev]);
    addNotification(`Knowledge Agent retrieved response for: "${query.substring(0, 20)}..."`, "success");
  };

  return (
    <MissionContext.Provider value={{
      currentView, setView, missions, activeMission, setActiveMission,
      agents, setAgents, documents, setDocuments, uploadedFiles, uploadFile,
      ragQueries, askRagQuestion, notifications, addNotification,
      systemHealth, analytics, settings, setSettings, launchMission,
      theme, toggleTheme
    }}>
      {children}
    </MissionContext.Provider>
  );
};
