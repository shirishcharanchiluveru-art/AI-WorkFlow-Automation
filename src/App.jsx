import React from 'react';
import { MissionProvider, useMission } from './context/MissionContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import MissionControlView from './components/MissionControlView';
import AgentsView from './components/AgentsView';
import DocumentGeneratorView from './components/DocumentGeneratorView';
import KnowledgeBaseView from './components/KnowledgeBaseView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';

const ViewRenderer = () => {
  const { currentView } = useMission();

  switch (currentView) {
    case 'dashboard':
      return <DashboardView />;
    case 'mission-control':
      return <MissionControlView />;
    case 'agents':
      return <AgentsView />;
    case 'documents':
      return <DocumentGeneratorView />;
    case 'knowledge-base':
      return <KnowledgeBaseView />;
    case 'analytics':
      return <AnalyticsView />;
    case 'settings':
      return <SettingsView />;
    default:
      return <DashboardView />;
  }
};

function MainAppContent() {
  return (
    <div className="flex h-screen w-screen overflow-hidden app-shell cyber-grid select-none transition-colors duration-300">
      {/* Moving mesh background glow */}
      <div className="mesh-background" />

      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Operations Terminal panel */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header />

        {/* Core view scroll container */}
        <main className="flex-1 overflow-hidden flex flex-col bg-[#030612]/20">
          <ViewRenderer />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <MissionProvider>
      <MainAppContent />
    </MissionProvider>
  );
}

export default App;
