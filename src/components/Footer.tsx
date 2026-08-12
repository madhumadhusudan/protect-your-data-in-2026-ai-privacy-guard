import React from 'react';
import {
  ShieldAlert,
  Heart,
  Mail,
  Github,
  Globe,
  Code2,
  Sparkles,
  Lock,
  Cpu,
  CheckCircle2,
} from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Mission Statement ("Good Words") */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-900/50">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                AI Privacy Guard
              </span>
            </div>

            <p className="text-xs text-slate-400 font-normal leading-relaxed pr-2">
              In an interconnected digital world, personal identity and visual privacy are fundamental rights. AI Privacy Guard was engineered to bridge cutting-edge Vision AI with local-first compliance—empowering photographers, organizations, and everyday citizens to share media without compromising sensitive faces, vehicle plates, QR codes, or financial credentials.
            </p>

            <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-3.5 py-2 rounded-2xl w-fit">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Context-Aware Anonymization &amp; On-Device Edge Intelligence</span>
            </div>
          </div>

          {/* Quick Platform Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              Platform Tools
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <button
                  onClick={() => setActiveTab('scanner')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  AI Privacy Scanner
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('editor')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Selective Image Editor
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('remover')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Content-Aware Object Remover
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('copilot')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Gemini AI Privacy Copilot
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('research')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Research &amp; Model Benchmarks
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('mobile')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  React Native Mobile Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* Developer Information Section */}
          <div className="md:col-span-4 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-indigo-400">
              <Code2 className="w-4 h-4" />
              <span>Developer &amp; Creator Info</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-extrabold text-white">Madhusudan S</p>
                  <p className="text-slate-400 text-[11px] font-medium">Lead AI Systems &amp; Vision Engineer</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Active Developer
                </span>
              </div>

              <div className="pt-2 space-y-2 text-slate-300 font-medium">
                <a
                  href="mailto:madhusudans8618@gmail.com"
                  className="flex items-center space-x-2 text-slate-300 hover:text-indigo-400 transition-colors group"
                >
                  <div className="w-7 h-7 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">madhusudans8618@gmail.com</span>
                </a>

                <div className="flex items-center space-x-2 text-slate-300">
                  <div className="w-7 h-7 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <span>Google AI Studio Build Applet</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-medium leading-relaxed">
              Designed with high-precision computer vision, React 18, TypeScript, Tailwind CSS, and Gemini 3.6 Flash AI.
            </div>
          </div>
        </div>

        {/* Bottom Banner & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} AI Privacy Guard. Developed with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>by <strong className="text-slate-300">Madhusudan S</strong>.</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero-Data Retention Compliance</span>
            </span>
            <span className="flex items-center space-x-1 text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>INT8 Edge Engine</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
