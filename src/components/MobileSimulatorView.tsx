import React, { useState } from 'react';
import { Smartphone, Camera, ShieldCheck, Zap, Lock, RefreshCw } from 'lucide-react';

export const MobileSimulatorView: React.FC<{ imageSrc: string }> = ({ imageSrc }) => {
  const [autoProtect, setAutoProtect] = useState(true);

  return (
    <div className="space-y-6 py-2 flex flex-col items-center">
      <div className="text-center space-y-1">
        <h2 className="text-lg font-bold text-slate-900 flex items-center justify-center space-x-2">
          <Smartphone className="w-5 h-5 text-indigo-600" />
          <span>Mobile App Architecture Simulator (React Native / Expo)</span>
        </h2>
        <p className="text-xs text-slate-500 font-medium">Live Camera Privacy Scan &amp; On-Device Offline INT8 AI Engine</p>
      </div>

      {/* Phone Shell Device Simulator */}
      <div className="w-[320px] h-[600px] bg-slate-900 border-4 border-slate-300 rounded-[44px] p-3 shadow-xl relative flex flex-col justify-between overflow-hidden">
        {/* Phone Notch */}
        <div className="w-32 h-4 bg-slate-800 rounded-b-xl mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-slate-950" />
        </div>

        {/* Camera Live Viewfinder */}
        <div className="relative flex-1 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 mt-4 flex items-center justify-center">
          <img src={imageSrc} alt="Camera Stream" className="w-full h-full object-cover" />

          {/* AR Camera Privacy Warning Overlay */}
          <div className="absolute top-3 left-3 right-3 bg-slate-950/80 backdrop-blur border border-amber-500/30 rounded-xl p-2.5 text-[10px] space-y-1 shadow-md">
            <span className="font-bold text-amber-400 flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>Live Privacy Risk Preview</span>
            </span>
            <div className="text-slate-200 font-medium">⚠ License Plate &amp; Child Face Detected</div>
          </div>
        </div>

        {/* Camera Controls & Settings */}
        <div className="bg-slate-800 p-3 rounded-2xl space-y-2.5 mt-2 border border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-200 font-medium">
            <span>Auto Protect Before Capture</span>
            <button
              onClick={() => setAutoProtect(!autoProtect)}
              className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${autoProtect ? 'bg-indigo-600' : 'bg-slate-600'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${autoProtect ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>

          <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-indigo-900/40 cursor-pointer">
            <Camera className="w-4 h-4" />
            <span>Capture Protected Photo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
