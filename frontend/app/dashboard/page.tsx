'use client';

import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import DocumentUploader from '@/components/DocumentUploader';
import AttentionMonitor from '@/components/AttentionMonitor';
import VoiceInput from '@/components/VoiceInput';
import AssessmentHub from '@/components/AssessmentHub';
import LearningDashboard from '@/components/LearningDashboard';
import CodeSandbox from '@/components/CodeSandbox';
import StudyPlanner from '@/components/StudyPlanner';
import BadgesDisplay from '@/components/BadgesDisplay';
import PodcastPlayer from '@/components/PodcastPlayer';
import ProtegeMode from '@/components/ProtegeMode';
import AccessibilityToggle from '@/components/AccessibilityToggle';

type Tab = 'chat' | 'documents' | 'assessments' | 'analytics' | 'attention' | 'code' | 'planner' | 'badges' | 'podcast' | 'protege';

const tabs: { id: Tab; label: string; icon: string; group: string }[] = [
  { id: 'chat', label: 'Chat', icon: '\uD83D\uDCAC', group: 'core' },
  { id: 'documents', label: 'Docs', icon: '\uD83D\uDCC4', group: 'core' },
  { id: 'code', label: 'Code', icon: '\uD83D\uDCBB', group: 'core' },
  { id: 'assessments', label: 'Quiz', icon: '\uD83D\uDCDD', group: 'learn' },
  { id: 'protege', label: 'Teach', icon: '\uD83E\uDDD1\u200D\uD83C\uDFEB', group: 'learn' },
  { id: 'podcast', label: 'Audio', icon: '\uD83C\uDFA7', group: 'learn' },
  { id: 'analytics', label: 'Stats', icon: '\uD83D\uDCCA', group: 'track' },
  { id: 'badges', label: 'Badges', icon: '\uD83C\uDFC6', group: 'track' },
  { id: 'planner', label: 'Plan', icon: '\uD83D\uDCC5', group: 'track' },
  { id: 'attention', label: 'Focus', icon: '\uD83D\uDC41', group: 'track' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('chat');

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Navigation */}
      <header className="border-b border-border bg-card px-3 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 shrink-0">
          <a href="/" className="font-bold text-lg text-primary">ZenForge</a>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full hidden sm:inline">Guru-Agent</span>
        </div>

        <nav className="flex items-center gap-0.5 overflow-x-auto mx-2 scrollbar-hide">
          {tabs.map((tab, i) => {
            const prevGroup = i > 0 ? tabs[i - 1].group : tab.group;
            return (
              <div key={tab.id} className="flex items-center">
                {tab.group !== prevGroup && i > 0 && (
                  <div className="w-px h-5 bg-border mx-1 shrink-0" />
                )}
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                  title={tab.label}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden lg:inline">{tab.label}</span>
                </button>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 shrink-0">
          <AccessibilityToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {activeTab === 'chat' && <ChatInterface />}

        {activeTab === 'documents' && (
          <div className="h-full overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold">Document Manager</h2>
              <p className="text-muted-foreground">Upload study materials (PDF, DOCX, PPTX, TXT) to build your knowledge base.</p>
              <DocumentUploader />
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="h-full overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <CodeSandbox />
            </div>
          </div>
        )}

        {activeTab === 'assessments' && (
          <div className="h-full overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <AssessmentHub />
            </div>
          </div>
        )}

        {activeTab === 'protege' && (
          <div className="h-full overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto">
              <ProtegeMode />
            </div>
          </div>
        )}

        {activeTab === 'podcast' && (
          <div className="h-full overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto">
              <PodcastPlayer />
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="h-full overflow-y-auto p-6">
            <div className="max-w-6xl mx-auto">
              <LearningDashboard />
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="h-full overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <BadgesDisplay />
            </div>
          </div>
        )}

        {activeTab === 'planner' && (
          <div className="h-full overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <StudyPlanner />
            </div>
          </div>
        )}

        {activeTab === 'attention' && (
          <div className="h-full overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold">Focus & Attention</h2>
              <AttentionMonitor />
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="font-semibold mb-3">Voice Input</h3>
                <VoiceInput
                  onTranscription={(text, lang) => {
                    console.log('Transcription:', text, lang);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
