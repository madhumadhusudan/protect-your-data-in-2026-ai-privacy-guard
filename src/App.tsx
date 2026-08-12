import React, { useState, useEffect } from 'react';
import { ActiveTab, PrivacyScanResult, DetectedPrivacyObject } from './types';
import { SAMPLE_IMAGES, SampleImage } from './data/sampleImages';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AuthModal, UserProfile } from './components/AuthModal';
import { DashboardView } from './components/DashboardView';
import { PrivacyScannerView } from './components/PrivacyScannerView';
import { ImageEditorView } from './components/ImageEditorView';
import { ObjectRemoverView } from './components/ObjectRemoverView';
import { BackgroundStudioView } from './components/BackgroundStudioView';
import { VideoPrivacyView } from './components/VideoPrivacyView';
import { PrivacyCopilotView } from './components/PrivacyCopilotView';
import { MobileSimulatorView } from './components/MobileSimulatorView';
import { ResearchDashboardView } from './components/ResearchDashboardView';
import { PrivacyReportView } from './components/PrivacyReportView';
import { HistoryAndSettingsView } from './components/HistoryAndSettingsView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [processingMode, setProcessingMode] = useState<'local_fast' | 'local_advanced' | 'cloud_ai'>('local_fast');
  const [imageSrc, setImageSrc] = useState<string>(SAMPLE_IMAGES[0].dataUrl);
  const [currentScan, setCurrentScan] = useState<Partial<PrivacyScanResult> | null>(null);

  // User Auth & Role State (Demo User, Regular User, Admin)
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: 'usr_demo_01',
    name: 'Demo Explorer',
    email: 'demo@privacyguard.ai',
    role: 'demo',
    department: 'Public Preview Sandbox',
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Run initial scan on mount so app loads with active intelligence
  useEffect(() => {
    fetch('/api/v1/privacy/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: SAMPLE_IMAGES[0].dataUrl, mode: 'fast' }),
    })
      .then((res) => res.json())
      .then((data) => setCurrentScan(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSelectSampleImage = (sample: SampleImage) => {
    setImageSrc(sample.dataUrl);
    setActiveTab('scanner');
    fetch('/api/v1/privacy/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: sample.dataUrl, mode: processingMode }),
    })
      .then((res) => res.json())
      .then((data) => setCurrentScan(data))
      .catch((err) => console.error(err));
  };

  const handleUpdateDetection = (id: string, updates: Partial<DetectedPrivacyObject>) => {
    if (!currentScan?.detectedObjects) return;
    const updated = currentScan.detectedObjects.map((d) => (d.id === id ? { ...d, ...updates } : d));
    const unprotected = updated.filter((o) => !o.protected).length;
    setCurrentScan((prev) => ({
      ...prev,
      detectedObjects: updated,
      riskScore: Math.min(99, Math.max(5, unprotected * 14)),
    }));
  };

  const handleResetAuth = () => {
    setCurrentUser({
      id: 'usr_demo_01',
      name: 'Demo Explorer',
      email: 'demo@privacyguard.ai',
      role: 'demo',
      department: 'Public Preview Sandbox',
    });
    setIsAuthModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white flex flex-col justify-between">
      <div>
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          processingMode={processingMode}
          setProcessingMode={setProcessingMode}
          currentRiskScore={currentScan?.riskScore}
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'dashboard' && (
            <DashboardView setActiveTab={setActiveTab} onSelectSampleImage={handleSelectSampleImage} />
          )}

          {activeTab === 'scanner' && (
            <PrivacyScannerView
              currentScan={currentScan}
              setCurrentScan={setCurrentScan}
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
              setActiveTab={setActiveTab}
              processingMode={processingMode}
            />
          )}

          {activeTab === 'editor' && (
            <ImageEditorView
              imageSrc={imageSrc}
              detections={currentScan?.detectedObjects || []}
              onUpdateDetection={handleUpdateDetection}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'remover' && <ObjectRemoverView imageSrc={imageSrc} />}

          {activeTab === 'background' && <BackgroundStudioView imageSrc={imageSrc} />}

          {activeTab === 'video' && <VideoPrivacyView />}

          {activeTab === 'copilot' && (
            <PrivacyCopilotView currentScan={currentScan} setCurrentScan={setCurrentScan} />
          )}

          {activeTab === 'mobile' && <MobileSimulatorView imageSrc={imageSrc} />}

          {activeTab === 'research' && <ResearchDashboardView />}

          {activeTab === 'reports' && <PrivacyReportView currentScan={currentScan} />}

          {activeTab === 'history' && <HistoryAndSettingsView />}
        </main>
      </div>

      {/* Auth Modal for Role Selection */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={(user) => setCurrentUser(user)}
        onLogout={handleResetAuth}
      />

      {/* Developer Information & Vision Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

