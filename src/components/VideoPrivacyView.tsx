import React, { useState } from 'react';
import { Video, Play, Pause, ShieldCheck, Film } from 'lucide-react';

export const VideoPrivacyView: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="space-y-6 py-2">
      <div className="bg-white border-2 border-slate-200 rounded-[32px] p-6 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-base">
            <Video className="w-5 h-5" />
            <span>Video Privacy Studio &amp; Temporal Mask Propagation</span>
          </div>
          <span className="text-xs text-emerald-800 font-extrabold bg-emerald-100 border border-emerald-200 px-3.5 py-1 rounded-full">
            Temporal Object Tracking Active
          </span>
        </div>

        <div className="relative bg-slate-100 border-2 border-slate-200 rounded-[28px] min-h-[320px] flex flex-col items-center justify-center p-6 space-y-4 shadow-inner">
          <div className="w-16 h-16 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center shadow-sm">
            <Film className="w-8 h-8 text-indigo-600" />
          </div>
          <p className="text-xs text-slate-600 font-medium text-center max-w-md leading-relaxed">
            Multi-frame temporal tracking propagates face &amp; plate privacy masks consistently across video frames to prevent flickering.
          </p>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs font-bold flex items-center space-x-2 shadow-md shadow-indigo-200 transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause Tracking Preview' : 'Play Video Privacy Simulation'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
