import React from 'react';
import { History, Trash2, Settings, Shield, Lock } from 'lucide-react';

export const HistoryAndSettingsView: React.FC = () => {
  return (
    <div className="space-y-6 py-2 max-w-4xl mx-auto">
      <div className="bg-white border-2 border-slate-200 rounded-[32px] p-6 space-y-6 shadow-sm">
        <div className="flex items-center space-x-2 text-indigo-600 font-bold text-base">
          <History className="w-5 h-5" />
          <span>Local History &amp; Data Privacy Controls</span>
        </div>

        <div className="space-y-3 bg-slate-50 p-6 rounded-[24px] border border-slate-200">
          <h3 className="text-sm font-extrabold text-slate-900">Data Retention &amp; Privacy Safeguards</h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            AI Privacy Guard strictly respects local-first data privacy. Uploaded visual media is processed in-memory and transient storage only.
          </p>

          <div className="flex items-center space-x-3 pt-3">
            <button
              onClick={() => alert('Local history and temporary session cache cleared.')}
              className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-full text-xs font-bold flex items-center space-x-2 cursor-pointer transition-all shadow-sm"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
              <span>Delete My Data &amp; Clear Local History</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
