import React from 'react';
import { ActiveTab } from '../types';
import { UserProfile } from './AuthModal';
import {
  ShieldAlert,
  Scan,
  Edit3,
  Eraser,
  Image,
  Video,
  Bot,
  Smartphone,
  BarChart3,
  FileText,
  History,
  Lock,
  Sparkles,
  User,
  UserCheck,
  Key,
  ChevronDown,
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  processingMode: 'local_fast' | 'local_advanced' | 'cloud_ai';
  setProcessingMode: (mode: 'local_fast' | 'local_advanced' | 'cloud_ai') => void;
  currentRiskScore?: number;
  currentUser: UserProfile;
  onOpenAuthModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  processingMode,
  setProcessingMode,
  currentRiskScore,
  currentUser,
  onOpenAuthModal,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'scanner', label: 'Privacy Scanner', icon: <Scan className="w-4 h-4" />, badge: 'Core' },
    { id: 'editor', label: 'Image Editor', icon: <Edit3 className="w-4 h-4" /> },
    { id: 'remover', label: 'Object Remover', icon: <Eraser className="w-4 h-4" /> },
    { id: 'background', label: 'Background Studio', icon: <Image className="w-4 h-4" /> },
    { id: 'video', label: 'Video Privacy', icon: <Video className="w-4 h-4" /> },
    { id: 'copilot', label: 'AI Copilot', icon: <Bot className="w-4 h-4" />, badge: 'AI' },
    { id: 'mobile', label: 'Mobile App', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'research', label: 'Research & Benchmarks', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports', icon: <FileText className="w-4 h-4" /> },
    { id: 'history', label: 'History & Settings', icon: <History className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-sm">
      {/* Top Banner & Platform Brand */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                AI Privacy Guard
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Nexus v2.4
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500 hidden sm:block">Context-Aware Visual Anonymization &amp; Privacy Engine</p>
          </div>
        </div>

        {/* Processing Mode Switcher & Risk Badge */}
        <div className="flex items-center space-x-3">
          {currentRiskScore !== undefined && (
            <div
              className={`hidden md:flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-bold ${
                currentRiskScore > 50
                  ? 'bg-red-50 border-red-200 text-red-700'
                  : currentRiskScore > 20
                  ? 'bg-amber-50 border-amber-200 text-amber-700'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Risk Index: {currentRiskScore}/100</span>
            </div>
          )}

          <div className="flex items-center p-1 bg-slate-100 rounded-full border border-slate-200 text-xs">
            <button
              onClick={() => setProcessingMode('local_fast')}
              className={`px-3 py-1 rounded-full transition-all font-semibold ${
                processingMode === 'local_fast'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Mode A: On-device / Local Fast AI (<200ms)"
            >
              Local Fast
            </button>
            <button
              onClick={() => setProcessingMode('local_advanced')}
              className={`px-3 py-1 rounded-full transition-all font-semibold ${
                processingMode === 'local_advanced'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Mode B: Advanced Local AI Model Architecture"
            >
              Local Adv
            </button>
            <button
              onClick={() => {
                if (window.confirm('Enable Cloud AI Mode? This mode leverages server-side Gemini Cloud AI for deep reasoning.')) {
                  setProcessingMode('cloud_ai');
                }
              }}
              className={`px-3 py-1 rounded-full transition-all font-semibold flex items-center space-x-1 ${
                processingMode === 'cloud_ai'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Mode C: Server-Side Gemini Cloud AI"
            >
              <Sparkles className="w-3 h-3" />
              <span>Cloud AI</span>
            </button>
          </div>

          {/* Top Right Login Option (Demo User Portal) */}
          <button
            onClick={onOpenAuthModal}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 text-xs font-bold transition-all shadow-sm cursor-pointer"
            title="Click to view Demo Account details"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] text-white font-extrabold">
              D
            </div>
            <span className="hidden sm:inline-block font-extrabold truncate max-w-[110px]">
              Demo User
            </span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>
        </div>
      </div>

      {/* Navigation Sub-bar with Bento Pill Design */}
      <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-2 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
