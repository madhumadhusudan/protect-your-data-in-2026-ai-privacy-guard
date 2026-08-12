import React from 'react';
import { PrivacyScanResult } from '../types';
import { FileText, Download, ShieldCheck, Lock } from 'lucide-react';

export const PrivacyReportView: React.FC<{ currentScan: Partial<PrivacyScanResult> | null }> = ({
  currentScan,
}) => {
  return (
    <div className="space-y-6 py-2 max-w-3xl mx-auto">
      <div className="bg-white border-2 border-slate-200 rounded-[32px] p-6 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-base">
            <FileText className="w-5 h-5" />
            <span>AI Privacy Scan Assessment Report</span>
          </div>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-indigo-200 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>

        <div className="bg-slate-50 p-5 rounded-[24px] border border-slate-200 space-y-3.5 text-xs">
          <div className="flex justify-between text-slate-700 font-medium">
            <span>Report Scan ID:</span>
            <span className="font-mono text-indigo-700 font-bold">{currentScan?.scanId || 'scan_demo_8821'}</span>
          </div>
          <div className="flex justify-between text-slate-700 font-medium">
            <span>Initial Privacy Risk Score:</span>
            <span className="font-extrabold text-amber-600 text-sm">{currentScan?.riskScore || 84}/100</span>
          </div>
          <div className="flex justify-between text-slate-700 font-medium">
            <span>Detected Sensitive Elements:</span>
            <span className="font-bold text-slate-900">{currentScan?.detectedObjects?.length || 0} objects</span>
          </div>
        </div>
      </div>
    </div>
  );
};
