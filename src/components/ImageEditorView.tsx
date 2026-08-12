import React, { useState } from 'react';
import { DetectedPrivacyObject, ProtectionMethod, ActiveTab } from '../types';
import { CanvasStudio } from './CanvasStudio';
import {
  MousePointer,
  Scan,
  Shield,
  Eye,
  Sliders,
  RotateCcw,
  RotateCw,
  Crop,
  Maximize2,
  Image as ImageIcon,
  Sparkles,
  Type,
  PenTool,
  Undo2,
  Redo2,
  Download,
  Layers,
} from 'lucide-react';

interface ImageEditorProps {
  imageSrc: string;
  detections: DetectedPrivacyObject[];
  onUpdateDetection: (id: string, updates: Partial<DetectedPrivacyObject>) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const ImageEditorView: React.FC<ImageEditorProps> = ({
  imageSrc,
  detections,
  onUpdateDetection,
  setActiveTab,
}) => {
  const [activeTool, setActiveTool] = useState<string>('select');
  const [selectedDetectionId, setSelectedDetectionId] = useState<string | null>(null);
  const [explainableFilter, setExplainableFilter] = useState<'all' | 'high_risk' | 'text' | 'people'>('all');
  const [blurStrength, setBlurStrength] = useState<number>(18);
  const [pixelBlockSize, setPixelBlockSize] = useState<number>(12);
  const [showBeforeAfter, setShowBeforeAfter] = useState<boolean>(false);
  const [processedDataUrl, setProcessedDataUrl] = useState<string>('');

  const selectedDetection = detections.find((d) => d.id === selectedDetectionId);

  const toolbarButtons = [
    { id: 'select', label: 'Select', icon: <MousePointer className="w-4 h-4" /> },
    { id: 'detect', label: 'Detect', icon: <Scan className="w-4 h-4" /> },
    { id: 'protect', label: 'Protect', icon: <Shield className="w-4 h-4" /> },
    { id: 'blur', label: 'Blur', icon: <Eye className="w-4 h-4" /> },
    { id: 'pixelate', label: 'Pixelate', icon: <Sliders className="w-4 h-4" /> },
    { id: 'crop', label: 'Crop', icon: <Crop className="w-4 h-4" /> },
    { id: 'rotate', label: 'Rotate', icon: <RotateCw className="w-4 h-4" /> },
    { id: 'background', label: 'Background', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'enhance', label: 'Enhance', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'draw', label: 'Draw Mask', icon: <PenTool className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-4 py-2">
      {/* Top Professional Editor Toolbar */}
      <div className="bg-white border-2 border-slate-200 rounded-[28px] p-3 flex flex-wrap items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          {toolbarButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveTool(btn.id)}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTool === btn.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {btn.icon}
              <span>{btn.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 text-slate-600 hover:text-slate-900 rounded-full bg-slate-100 border border-slate-200" title="Undo">
            <Undo2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-600 hover:text-slate-900 rounded-full bg-slate-100 border border-slate-200" title="Redo">
            <Redo2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.download = `edited_privacy_${Date.now()}.png`;
              link.href = processedDataUrl || imageSrc;
              link.click();
            }}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs font-bold flex items-center space-x-1 shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Main Studio Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas Area (8 Cols) */}
        <div className="lg:col-span-8 space-y-3">
          <CanvasStudio
            imageSrc={imageSrc}
            detections={detections}
            onUpdateDetection={onUpdateDetection}
            selectedDetectionId={selectedDetectionId}
            setSelectedDetectionId={setSelectedDetectionId}
            explainableFilter={explainableFilter}
            setExplainableFilter={setExplainableFilter}
            showBeforeAfterSlider={showBeforeAfter}
            onProcessedImageGenerated={setProcessedDataUrl}
          />

          <div className="flex items-center justify-between bg-white border-2 border-slate-200 p-3.5 rounded-[24px] text-xs shadow-sm">
            <button
              onClick={() => setShowBeforeAfter(!showBeforeAfter)}
              className={`px-4 py-2 rounded-full font-bold transition-all ${
                showBeforeAfter ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-800'
              }`}
            >
              {showBeforeAfter ? 'Interactive Mask View' : 'Compare Original vs Protected'}
            </button>
            <span className="text-slate-500 font-medium">Non-destructive editing layer active</span>
          </div>
        </div>

        {/* Right Inspector & Controls Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border-2 border-slate-200 rounded-[28px] p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span>Layer Inspector Controls</span>
            </h3>

            {selectedDetection ? (
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-500 font-bold block mb-1">Target Element:</span>
                  <span className="font-extrabold text-indigo-700 text-sm bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 inline-block">
                    {selectedDetection.label}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 font-bold block mb-1">Protection Method:</span>
                  <select
                    value={selectedDetection.protectionMethod}
                    onChange={(e) =>
                      onUpdateDetection(selectedDetection.id, {
                        protectionMethod: e.target.value as ProtectionMethod,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
                  >
                    <option value="blur_gaussian">Gaussian Blur</option>
                    <option value="blur_motion">Motion Blur</option>
                    <option value="blur_radial">Radial Blur</option>
                    <option value="pixelate">Pixelation Block</option>
                    <option value="mosaic">Mosaic Tile</option>
                    <option value="redact_solid">Solid Redaction</option>
                    <option value="synthetic_face">Synthetic Face</option>
                    <option value="remove_object">AI Content Inpaint</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 font-bold mb-1">
                    <span>Blur Strength / Radius:</span>
                    <span>{blurStrength}px</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={blurStrength}
                    onChange={(e) => {
                      setBlurStrength(Number(e.target.value));
                      onUpdateDetection(selectedDetection.id, { blurRadius: Number(e.target.value) });
                    }}
                    className="w-full accent-indigo-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 font-bold mb-1">
                    <span>Pixel Block Size:</span>
                    <span>{pixelBlockSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="32"
                    value={pixelBlockSize}
                    onChange={(e) => {
                      setPixelBlockSize(Number(e.target.value));
                      onUpdateDetection(selectedDetection.id, { pixelBlockSize: Number(e.target.value) });
                    }}
                    className="w-full accent-indigo-600"
                  />
                </div>

                <div className="pt-2 flex items-center space-x-2">
                  <button
                    onClick={() =>
                      onUpdateDetection(selectedDetection.id, {
                        protected: !selectedDetection.protected,
                      })
                    }
                    className={`w-full py-2.5 rounded-full font-bold cursor-pointer transition-all ${
                      selectedDetection.protected
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {selectedDetection.protected ? 'Protected (Click to Expose)' : 'Exposed (Click to Protect)'}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Select any bounding box on the image canvas to adjust its specific blur radius, pixelation size, or anonymization mode.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
