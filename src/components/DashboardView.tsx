import React from 'react';
import { ActiveTab } from '../types';
import { SAMPLE_IMAGES, SampleImage } from '../data/sampleImages';
import {
  ShieldCheck,
  Scan,
  Edit,
  Bot,
  Zap,
  Lock,
  ArrowRight,
  Eye,
  UserCheck,
  CreditCard,
  FileCode,
  Smartphone,
  Cpu,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';

interface DashboardProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectSampleImage: (sample: SampleImage) => void;
}

export const DashboardView: React.FC<DashboardProps> = ({ setActiveTab, onSelectSampleImage }) => {
  return (
    <div className="space-y-8 py-2">
      {/* Top Bento Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Main Bento Hero Card (col-span-2) */}
        <div className="col-span-1 md:col-span-2 bg-indigo-600 text-white rounded-[32px] p-8 flex flex-col justify-between shadow-lg shadow-indigo-200/80 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Project Nexus • B.E. AI Research</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Context-Aware AI Privacy Guard
            </h1>

            <p className="text-white/80 text-sm leading-relaxed max-w-xl font-medium">
              Intelligent privacy layer for visual media. Automatically identifies faces, child faces, license plates, Indian IDs, credit cards, and PII text while computing 0–100 Privacy Risk Scores.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3 pt-6">
            <button
              onClick={() => setActiveTab('scanner')}
              className="px-5 py-2.5 rounded-full bg-white text-indigo-700 hover:bg-slate-100 font-bold text-xs flex items-center space-x-2 shadow-md transition-all cursor-pointer"
            >
              <Scan className="w-4 h-4" />
              <span>Launch Privacy Scanner</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('copilot')}
              className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer backdrop-blur-sm"
            >
              <Bot className="w-4 h-4" />
              <span>AI Copilot</span>
            </button>
          </div>
        </div>

        {/* Bento Metric / Status Card (col-span-1) */}
        <div className="col-span-1 bg-white border-2 border-slate-200 rounded-[32px] p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Engine Accuracy</h2>
              <p className="text-4xl font-black text-slate-800">98.4%</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
              AI
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>Face &amp; ID Detection</span>
              <span className="text-emerald-600">Optimal</span>
            </div>
            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 w-[94%]" />
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Sub-200ms latency on local execution pipeline</p>
          </div>
        </div>

        {/* Bento Quick Actions Card (col-span-1) */}
        <div className="col-span-1 bg-slate-900 text-white rounded-[32px] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Navigation</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTab('editor')}
                className="p-3 bg-slate-800 hover:bg-slate-700/80 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border border-slate-700 cursor-pointer"
              >
                <Edit className="w-5 h-5 text-indigo-400" />
                <span className="text-[11px] font-bold">Editor</span>
              </button>

              <button
                onClick={() => setActiveTab('remover')}
                className="p-3 bg-slate-800 hover:bg-slate-700/80 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border border-slate-700 cursor-pointer"
              >
                <Eye className="w-5 h-5 text-emerald-400" />
                <span className="text-[11px] font-bold">Remover</span>
              </button>

              <button
                onClick={() => setActiveTab('video')}
                className="p-3 bg-slate-800 hover:bg-slate-700/80 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border border-slate-700 cursor-pointer"
              >
                <FileCode className="w-5 h-5 text-amber-400" />
                <span className="text-[11px] font-bold">Video</span>
              </button>

              <button
                onClick={() => setActiveTab('mobile')}
                className="p-3 bg-slate-800 hover:bg-slate-700/80 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border border-slate-700 cursor-pointer"
              >
                <Smartphone className="w-5 h-5 text-cyan-400" />
                <span className="text-[11px] font-bold">Mobile</span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">Current Mode</span>
            <span className="font-bold text-emerald-400">On-Device Active</span>
          </div>
        </div>
      </div>

      {/* Quick Test Datasets Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-indigo-600" />
              <span>Instant Test Scenes (Bento Collection)</span>
            </h2>
            <p className="text-xs font-medium text-slate-500">Select a pre-built scene to test the privacy detection &amp; risk scoring engine</p>
          </div>
          <button
            onClick={() => setActiveTab('scanner')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
          >
            <span>Upload Media</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SAMPLE_IMAGES.map((sample) => (
            <div
              key={sample.id}
              onClick={() => onSelectSampleImage(sample)}
              className="group bg-white border-2 border-slate-200 hover:border-indigo-500 rounded-[28px] p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col sm:flex-row gap-5 items-center"
            >
              <div className="w-full sm:w-44 h-32 rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200 shrink-0 relative">
                <img src={sample.dataUrl} alt={sample.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute bottom-2.5 right-2.5 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-900/90 text-amber-300 shadow-sm">
                  Risk: {sample.initialRisk}/100
                </span>
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest px-2.5 py-0.5 bg-indigo-50 rounded-full border border-indigo-100">
                    {sample.category}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {sample.simulatedDetectionsCount} Private Targets
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {sample.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                  {sample.description}
                </p>
                <div className="pt-1 flex items-center text-xs text-indigo-600 font-bold group-hover:translate-x-1 transition-transform">
                  <span>Scan &amp; Protect Scene</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Research Capabilities Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border-2 border-slate-200 rounded-[28px] p-6 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <UserCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Context-Aware Subject Preservation</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Evaluates face size, position, centrality, and pose to distinguish the primary subject from background bystanders, avoiding accidental anonymization of key subjects.
          </p>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-[28px] p-6 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <CreditCard className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Indian IDs, Cards &amp; PII OCR</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Detects Aadhaar, PAN, Passports, Indian license plates, Credit Cards (Luhn check), UPI QR codes, and phone/address text using multi-stage OCR.
          </p>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-[28px] p-6 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">0–100 Privacy Risk Scoring</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Calculates quantitative privacy risk scores before and after anonymization. Re-scans processed media to verify exposure reduction (e.g. 82 → 12).
          </p>
        </div>
      </div>

      {/* Integrated Modules Bento Box */}
      <div className="bg-white border-2 border-slate-200 rounded-[32px] p-6 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <span>Integrated Research Modules</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { id: 'scanner', label: 'Privacy Scan', desc: 'Auto & Manual Scan', icon: <Scan /> },
            { id: 'editor', label: 'Image Editor', desc: 'Gaussian, Pixelate, Redact', icon: <Edit /> },
            { id: 'remover', label: 'Object Remover', desc: 'AI Inpainting', icon: <Eye /> },
            { id: 'background', label: 'Background Studio', desc: 'Matting & Bokeh', icon: <ImageIcon /> },
            { id: 'video', label: 'Video Privacy', desc: 'Tracking & Propagation', icon: <FileCode /> },
            { id: 'copilot', label: 'AI Copilot', desc: 'Natural Language Agent', icon: <Bot /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as ActiveTab)}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-left group cursor-pointer"
            >
              <div className="text-indigo-600 group-hover:scale-110 transition-transform mb-2">
                {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
              </div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">{item.label}</div>
              <div className="text-[10px] text-slate-500 font-medium mt-0.5">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
