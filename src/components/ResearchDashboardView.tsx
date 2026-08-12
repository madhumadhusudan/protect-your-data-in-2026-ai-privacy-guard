import React, { useEffect, useState } from 'react';
import { BenchmarkData } from '../types';
import { BarChart3, Cpu, Layers, CheckCircle } from 'lucide-react';

export const ResearchDashboardView: React.FC = () => {
  const [benchmarks, setBenchmarks] = useState<BenchmarkData[]>([]);

  useEffect(() => {
    fetch('/api/v1/research/benchmarks')
      .then((res) => res.json())
      .then((data) => setBenchmarks(data.benchmarks || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-6 py-2">
      <div className="bg-white border-2 border-slate-200 rounded-[32px] p-6 space-y-4 shadow-sm">
        <div className="flex items-center space-x-2 text-indigo-600 font-bold text-base">
          <BarChart3 className="w-5 h-5" />
          <span>Final-Year Research &amp; Quantitative Model Benchmarks</span>
        </div>

        {/* Model Benchmarks Table */}
        <div className="overflow-x-auto border-2 border-slate-200 rounded-[20px]">
          <table className="w-full text-xs text-left text-slate-700">
            <thead className="bg-slate-100 text-slate-900 font-extrabold uppercase text-[10px] border-b-2 border-slate-200">
              <tr>
                <th className="p-3.5">Model Architecture</th>
                <th className="p-3.5">Precision</th>
                <th className="p-3.5">Recall</th>
                <th className="p-3.5">F1 Score</th>
                <th className="p-3.5">mAP50</th>
                <th className="p-3.5">Latency (CPU)</th>
                <th className="p-3.5">Quantization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {benchmarks.map((bm, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">{bm.modelName}</td>
                  <td className="p-3.5 text-emerald-600 font-bold">{(bm.precision * 100).toFixed(1)}%</td>
                  <td className="p-3.5 text-emerald-600 font-bold">{(bm.recall * 100).toFixed(1)}%</td>
                  <td className="p-3.5 text-indigo-600 font-extrabold">{(bm.f1Score * 100).toFixed(1)}%</td>
                  <td className="p-3.5 text-amber-600 font-extrabold">{bm.mAP50}</td>
                  <td className="p-3.5 font-mono text-slate-600 font-bold">{bm.latencyMs}ms</td>
                  <td className="p-3.5">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full text-[10px] font-extrabold">
                      {bm.quantization}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
