import React, { useState } from 'react';
import { X, ShieldCheck, User, CheckCircle2, Sparkles, LogOut } from 'lucide-react';

export type UserRole = 'demo';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDemoLogin = () => {
    const profile: UserProfile = {
      id: 'usr_demo_01',
      name: 'Demo Explorer',
      email: 'demo@privacyguard.ai',
      role: 'demo',
      department: 'Public Preview Sandbox',
    };

    setIsSuccess(true);
    setTimeout(() => {
      onLogin(profile);
      setIsSuccess(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white border-2 border-slate-200 rounded-[32px] max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-indigo-600 font-extrabold text-sm uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>AI Privacy Guard Sandbox</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Demo User Portal
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Explore all AI vision features, image editors, and privacy copilots in instant Demo Mode.
          </p>
        </div>

        {/* Success Alert */}
        {isSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center space-x-3 text-xs font-bold animate-in zoom-in-95">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Authenticated successfully as DEMO USER! Loading workspace...</span>
          </div>
        )}

        {/* Currently Logged In Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Session</span>
            <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-700 border border-emerald-200">
              ⚡ Demo User
            </span>
          </div>

          <div className="flex items-center space-x-3 pt-1">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-extrabold shadow-sm">
              D
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{currentUser.name || 'Demo Explorer'}</p>
              <p className="text-xs text-slate-500 truncate">{currentUser.email || 'demo@privacyguard.ai'}</p>
            </div>
          </div>
        </div>

        {/* Demo Quick Access Action */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleDemoLogin}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-emerald-200 cursor-pointer flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start / Resume Demo Session</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1"
          >
            <LogOut className="w-4 h-4" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
