import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, Check } from 'lucide-react';

export const BackgroundStudioView: React.FC<{ imageSrc: string }> = ({ imageSrc }) => {
  const [bgMode, setBgMode] = useState<'blur' | 'color' | 'gradient' | 'bokeh'>('blur');

  return (
    <div className="space-y-6 py-2">
      <div className="bg-white border-2 border-slate-200 rounded-[32px] p-6 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-base">
            <ImageIcon className="w-5 h-5" />
            <span>AI Background Studio &amp; Depth Matting</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-full border border-slate-200 text-xs">
            {(['blur', 'color', 'gradient', 'bokeh'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setBgMode(m)}
                className={`px-4 py-1.5 rounded-full font-bold capitalize transition-all cursor-pointer ${
                  bgMode === m ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="relative bg-slate-100 border-2 border-slate-200 rounded-[28px] overflow-hidden min-h-[380px] flex items-center justify-center p-3 shadow-inner">
          <img
            src={imageSrc}
            alt="Background Studio"
            className={`max-h-[450px] object-contain rounded-2xl ${
              bgMode === 'blur' || bgMode === 'bokeh' ? 'brightness-105' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
};
