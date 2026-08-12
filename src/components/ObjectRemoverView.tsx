import React, { useState } from 'react';
import { Eraser, Sparkles, Check, RefreshCw } from 'lucide-react';

export const ObjectRemoverView: React.FC<{ imageSrc: string }> = ({ imageSrc }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [removed, setRemoved] = useState(false);

  const handleInpaint = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setRemoved(true);
    }, 800);
  };

  return (
    <div className="space-y-6 py-2">
      <div className="bg-white border-2 border-slate-200 rounded-[32px] p-6 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-base">
            <Eraser className="w-5 h-5" />
            <span>AI Object Remover &amp; Content-Aware Inpainting</span>
          </div>
          <button
            onClick={handleInpaint}
            disabled={isProcessing}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs font-bold flex items-center space-x-2 shadow-md shadow-indigo-200 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isProcessing ? 'Inpainting...' : 'Remove Unwanted Object'}</span>
          </button>
        </div>

        <div className="relative bg-slate-100 border-2 border-slate-200 rounded-[28px] overflow-hidden min-h-[380px] flex items-center justify-center p-3 shadow-inner">
          <img src={imageSrc} alt="Inpaint Canvas" className="max-h-[450px] object-contain rounded-2xl" />
          {removed && (
            <div className="absolute top-6 right-6 bg-emerald-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 shadow-md">
              <Check className="w-4 h-4" />
              <span>Object Inpainted</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
