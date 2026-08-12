import React, { useRef, useEffect, useState } from 'react';
import { DetectedPrivacyObject, ProtectionMethod } from '../types';
import { Eye, EyeOff, Layers, Sliders, CheckCircle2, Shield, RefreshCw } from 'lucide-react';

interface CanvasStudioProps {
  imageSrc: string;
  detections: DetectedPrivacyObject[];
  onUpdateDetection: (id: string, updates: Partial<DetectedPrivacyObject>) => void;
  selectedDetectionId?: string | null;
  setSelectedDetectionId: (id: string | null) => void;
  explainableFilter: 'all' | 'high_risk' | 'text' | 'people';
  setExplainableFilter: (filter: 'all' | 'high_risk' | 'text' | 'people') => void;
  showBeforeAfterSlider: boolean;
  onProcessedImageGenerated?: (dataUrl: string) => void;
  manualDrawingMode?: boolean;
}

export const CanvasStudio: React.FC<CanvasStudioProps> = ({
  imageSrc,
  detections,
  onUpdateDetection,
  selectedDetectionId,
  setSelectedDetectionId,
  explainableFilter,
  setExplainableFilter,
  showBeforeAfterSlider,
  onProcessedImageGenerated,
  manualDrawingMode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0-100%
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Load image
  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
    img.onload = () => {
      imgRef.current = img;
      setImageLoaded(true);
    };
  }, [imageSrc]);

  // Render processed image & bounding boxes onto canvas
  useEffect(() => {
    if (!imageLoaded || !imgRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imgRef.current;
    canvas.width = img.width || 800;
    canvas.height = img.height || 600;

    // 1. Draw base original image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // 2. Apply pixel transformations for each protected detection
    detections.forEach((det) => {
      if (!det.protected) return;

      const x = (det.boundingBox.x / 100) * canvas.width;
      const y = (det.boundingBox.y / 100) * canvas.height;
      const w = (det.boundingBox.width / 100) * canvas.width;
      const h = (det.boundingBox.height / 100) * canvas.height;

      // Apply safety margin
      const marginPct = (det.safetyMarginPct || 8) / 100;
      const mx = Math.max(0, x - w * marginPct);
      const my = Math.max(0, y - h * marginPct);
      const mw = Math.min(canvas.width - mx, w * (1 + marginPct * 2));
      const mh = Math.min(canvas.height - my, h * (1 + marginPct * 2));

      applyProtectionToRegion(ctx, det.protectionMethod, mx, my, mw, mh, det);
    });

    // Notify parent of updated rendered image DataURL
    if (onProcessedImageGenerated) {
      onProcessedImageGenerated(canvas.toDataURL('image/jpeg', 0.9));
    }
  }, [imageLoaded, imageSrc, detections]);

  // Apply protection method to a canvas bounding box
  const applyProtectionToRegion = (
    ctx: CanvasRenderingContext2D,
    method: ProtectionMethod,
    x: number,
    y: number,
    w: number,
    h: number,
    det: DetectedPrivacyObject
  ) => {
    if (w <= 0 || h <= 0) return;

    ctx.save();

    if (method === 'blur_gaussian' || method === 'blur_motion' || method === 'blur_radial') {
      const radius = det.blurRadius || 18;
      ctx.filter = `blur(${radius}px)`;
      ctx.drawImage(ctx.canvas, x, y, w, h, x, y, w, h);
      ctx.filter = 'none';
    } else if (method === 'pixelate' || method === 'mosaic') {
      const blockSize = det.pixelBlockSize || 12;
      const offCanvas = document.createElement('canvas');
      offCanvas.width = Math.max(1, Math.floor(w / blockSize));
      offCanvas.height = Math.max(1, Math.floor(h / blockSize));
      const offCtx = offCanvas.getContext('2d');
      if (offCtx) {
        offCtx.imageSmoothingEnabled = false;
        offCtx.drawImage(ctx.canvas, x, y, w, h, 0, 0, offCanvas.width, offCanvas.height);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(offCanvas, 0, 0, offCanvas.width, offCanvas.height, x, y, w, h);
        ctx.imageSmoothingEnabled = true;
      }
    } else if (method === 'redact_solid') {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = '#f87171';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('REDACTED', x + 8, y + Math.min(20, h / 2));
    } else if (method === 'synthetic_face') {
      ctx.fillStyle = '#312e81';
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#818cf8';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('SYNTHETIC FACE', x + 6, y + h / 2);
    } else if (method === 'remove_object') {
      // Content-Aware Inpaint Fill simulation
      ctx.fillStyle = '#334155';
      ctx.fillRect(x, y, w, h);
      ctx.filter = 'blur(12px)';
      ctx.drawImage(ctx.canvas, x - 10, y - 10, w + 20, h + 20, x, y, w, h);
      ctx.filter = 'none';
    }

    ctx.restore();
  };

  // Filter detections according to explainable highlight tab
  const filteredDetections = detections.filter((det) => {
    if (explainableFilter === 'high_risk') return det.severity === 'high' || det.severity === 'critical';
    if (explainableFilter === 'text')
      return ['phone_number', 'email_address', 'residential_address', 'sensitive_text', 'document_id', 'payment_card'].includes(
        det.category
      );
    if (explainableFilter === 'people')
      return ['main_face', 'background_face', 'child_face', 'person_body'].includes(det.category);
    return true;
  });

  return (
    <div className="space-y-3" ref={containerRef}>
      {/* Explainable Overlay Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white border-2 border-slate-200 p-3 rounded-[24px] text-xs shadow-sm">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span className="font-bold text-slate-800">Highlight Layers:</span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
            {(
              [
                { id: 'all', label: 'Show All' },
                { id: 'high_risk', label: 'High Risk' },
                { id: 'text', label: 'Sensitive Text' },
                { id: 'people', label: 'People' },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                onClick={() => setExplainableFilter(f.id)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                  explainableFilter === f.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2 text-slate-500 font-bold">
          <span className="text-[11px]">Active Detections:</span>
          <span className="text-indigo-600 font-extrabold">{filteredDetections.length}</span>
        </div>
      </div>

      {/* Main Canvas Viewport Container */}
      <div className="relative bg-slate-100 border-2 border-slate-200 rounded-[28px] overflow-hidden min-h-[420px] flex items-center justify-center p-2 shadow-inner">
        {/* Hidden Canvas for Pixel Math processing */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Display Image with Interactive Bounding Box Overlays */}
        {imageLoaded && imgRef.current && (
          <div className="relative max-w-full max-h-[600px] flex items-center justify-center">
            {/* If Split Slider mode is enabled */}
            {showBeforeAfterSlider ? (
              <div className="relative w-full overflow-hidden select-none" style={{ aspectRatio: `${imgRef.current.width}/${imgRef.current.height}` }}>
                {/* Processed Canvas Overlay Image */}
                <img
                  src={canvasRef.current?.toDataURL() || imageSrc}
                  alt="Protected"
                  className="absolute inset-0 w-full h-full object-contain"
                />

                {/* Original Image Clipped Layer */}
                <div
                  className="absolute top-0 left-0 bottom-0 overflow-hidden border-r-2 border-indigo-500 shadow-2xl"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={imageSrc}
                    alt="Original"
                    className="absolute top-0 left-0 w-full h-full object-contain max-w-none"
                    style={{ width: containerRef.current?.clientWidth || '100%' }}
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700">
                    Original
                  </span>
                </div>

                <span className="absolute top-3 right-3 bg-indigo-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-400">
                  Protected Output
                </span>

                {/* Interactive Drag Handle Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                />
              </div>
            ) : (
              /* Standard Interactive Bounding Box Overlay Mode */
              <div className="relative w-full flex items-center justify-center">
                <img
                  src={canvasRef.current?.toDataURL() || imageSrc}
                  alt="Interactive Studio"
                  className="max-w-full max-h-[550px] object-contain rounded-lg"
                />

                {/* Overlay Interactive Bounding Boxes */}
                {filteredDetections.map((det) => {
                  const isSelected = selectedDetectionId === det.id;
                  const getCategoryColor = (cat: string) => {
                    if (cat === 'child_face' || cat === 'payment_card' || cat === 'document_id')
                      return 'border-red-500 bg-red-500/10 text-red-300';
                    if (cat === 'license_plate' || cat === 'phone_number')
                      return 'border-amber-500 bg-amber-500/10 text-amber-300';
                    return 'border-indigo-500 bg-indigo-500/10 text-indigo-300';
                  };

                  return (
                    <div
                      key={det.id}
                      onClick={() => setSelectedDetectionId(det.id)}
                      className={`absolute border-2 rounded transition-all cursor-pointer group z-20 ${getCategoryColor(
                        det.category
                      )} ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-[1.01]' : 'hover:border-white'}`}
                      style={{
                        left: `${det.boundingBox.x}%`,
                        top: `${det.boundingBox.y}%`,
                        width: `${det.boundingBox.width}%`,
                        height: `${det.boundingBox.height}%`,
                      }}
                    >
                      {/* Badge Label */}
                      <div className="absolute -top-6 left-0 flex items-center space-x-1 px-1.5 py-0.5 rounded bg-slate-950/90 border border-slate-700 text-[10px] font-bold whitespace-nowrap shadow-md pointer-events-none">
                        <span className="uppercase text-indigo-400">{det.category.replace('_', ' ')}</span>
                        <span className="text-slate-400 font-mono">
                          {Math.round(det.confidence * 100)}%
                        </span>
                        {det.protected ? (
                          <Shield className="w-3 h-3 text-emerald-400 ml-1" />
                        ) : (
                          <Eye className="w-3 h-3 text-amber-400 ml-1" />
                        )}
                      </div>

                      {/* Protection Toggle Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateDetection(det.id, { protected: !det.protected });
                        }}
                        className={`absolute -bottom-6 right-0 text-[10px] font-bold px-2 py-0.5 rounded flex items-center space-x-1 transition-all shadow cursor-pointer ${
                          det.protected
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {det.protected ? <Shield className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{det.protected ? 'Protected' : 'Exposed'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
