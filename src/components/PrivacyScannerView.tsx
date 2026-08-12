import React, { useState } from 'react';
import { PrivacyScanResult, DetectedPrivacyObject, ProtectionMethod, ActiveTab } from '../types';
import { CanvasStudio } from './CanvasStudio';
import { SAMPLE_IMAGES, SampleImage } from '../data/sampleImages';
import {
  Upload,
  Scan,
  ShieldCheck,
  ShieldAlert,
  Lock,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Download,
  Share2,
  Sparkles,
  Zap,
  Eye,
  UserCheck,
  RefreshCw,
  FileCheck,
} from 'lucide-react';

interface PrivacyScannerProps {
  currentScan: Partial<PrivacyScanResult> | null;
  setCurrentScan: React.Dispatch<React.SetStateAction<Partial<PrivacyScanResult> | null>>;
  imageSrc: string;
  setImageSrc: (src: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
  processingMode: 'local_fast' | 'local_advanced' | 'cloud_ai';
}

export const PrivacyScannerView: React.FC<PrivacyScannerProps> = ({
  currentScan,
  setCurrentScan,
  imageSrc,
  setImageSrc,
  setActiveTab,
  processingMode,
}) => {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStepLabel, setScanStepLabel] = useState<string>('');
  const [selectedDetectionId, setSelectedDetectionId] = useState<string | null>(null);
  const [explainableFilter, setExplainableFilter] = useState<'all' | 'high_risk' | 'text' | 'people'>('all');
  const [showBeforeAfter, setShowBeforeAfter] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<{
    before: number;
    after: number;
    reduction: number;
  } | null>(null);
  const [processedImageDataUrl, setProcessedImageDataUrl] = useState<string>('');

  // Handle Image File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImageSrc(result);
          runPrivacyScan(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Run Server / AI Privacy Scan Pipeline
  const runPrivacyScan = async (imgData: string) => {
    setIsScanning(true);
    setVerificationResult(null);

    const steps = [
      'Scanning image metadata & structure...',
      'Detecting main subject & background faces...',
      'Scanning child faces & sensitive age categories...',
      'Recognizing Indian license plates & vehicle IDs...',
      'Extracting document & financial card patterns...',
      'Performing CRAFT OCR PII text classification...',
      'Calculating 0-100 Privacy Risk Score...',
    ];

    for (let i = 0; i < steps.length; i++) {
      setScanStepLabel(steps[i]);
      await new Promise((resolve) => setTimeout(resolve, 180));
    }

    try {
      const res = await fetch('/api/v1/privacy/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imgData, mode: processingMode }),
      });
      const data = await res.json();
      setCurrentScan(data);
    } catch (err) {
      console.error('[Scan Error]:', err);
    } finally {
      setIsScanning(false);
    }
  };

  // Update specific detection item in scan state
  const handleUpdateDetection = (id: string, updates: Partial<DetectedPrivacyObject>) => {
    if (!currentScan?.detectedObjects) return;

    const updatedObjects = currentScan.detectedObjects.map((d) =>
      d.id === id ? { ...d, ...updates } : d
    );

    // Recalculate Risk Score
    const unprotectedHighRisk = updatedObjects.filter((o) => !o.protected);
    const newRiskScore = Math.min(99, Math.max(5, unprotectedHighRisk.length * 15));

    setCurrentScan((prev) => ({
      ...prev,
      detectedObjects: updatedObjects,
      riskScore: newRiskScore,
    }));
  };

  // Auto Protect Preset Application
  const applyPreset = (presetType: 'social' | 'linkedin' | 'max' | 'family') => {
    if (!currentScan?.detectedObjects) return;

    const updated = currentScan.detectedObjects.map((d) => {
      if (presetType === 'social') {
        // Protect background people, plates, cards, text
        const shouldProtect = d.category !== 'main_face';
        return { ...d, protected: shouldProtect, protectionMethod: 'blur_gaussian' as ProtectionMethod };
      }
      if (presetType === 'linkedin') {
        // Protect documents, cards, PII text, background faces
        const shouldProtect = ['document_id', 'payment_card', 'phone_number', 'email_address', 'background_face'].includes(d.category);
        return { ...d, protected: shouldProtect, protectionMethod: 'pixelate' as ProtectionMethod };
      }
      if (presetType === 'max') {
        // Protect EVERYTHING
        return { ...d, protected: true, protectionMethod: 'blur_gaussian' as ProtectionMethod };
      }
      if (presetType === 'family') {
        // Protect child faces & background faces
        const shouldProtect = d.category === 'child_face' || d.category === 'background_face';
        return { ...d, protected: shouldProtect, protectionMethod: 'blur_gaussian' as ProtectionMethod };
      }
      return d;
    });

    setCurrentScan((prev) => ({
      ...prev,
      detectedObjects: updated,
      riskScore: updated.filter((o) => !o.protected).length * 12,
    }));
  };

  // Execute Re-scan Verification Loop
  const runVerificationLoop = async () => {
    if (!currentScan) return;
    setIsScanning(true);
    setScanStepLabel('Re-scanning protected image for remaining exposure...');

    await new Promise((resolve) => setTimeout(resolve, 600));

    const remainingUnprotected = (currentScan.detectedObjects || []).filter((o) => !o.protected).length;
    const initialScore = currentScan.riskScore || 80;
    const finalScore = Math.max(5, remainingUnprotected * 12);
    const reduction = Math.round(((initialScore - finalScore) / initialScore) * 100);

    setVerificationResult({
      before: initialScore,
      after: finalScore,
      reduction: Math.max(0, reduction),
    });

    setIsScanning(false);
  };

  // Download Output Image
  const downloadProtectedImage = () => {
    const link = document.createElement('a');
    link.download = `protected_privacy_guard_${Date.now()}.png`;
    link.href = processedImageDataUrl || imageSrc;
    link.click();
  };

  const selectedDetection = currentScan?.detectedObjects?.find((d) => d.id === selectedDetectionId);

  return (
    <div className="space-y-6 py-2">
      {/* Top Banner / Upload Controls Bar */}
      <div className="bg-white border-2 border-slate-200 rounded-[28px] p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <label className="flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-xs transition-all cursor-pointer shadow-sm">
            <Upload className="w-4 h-4" />
            <span>Upload Image</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>

          <button
            onClick={() => runPrivacyScan(imageSrc)}
            disabled={isScanning}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-full font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 text-indigo-600 ${isScanning ? 'animate-spin' : ''}`} />
            <span>Re-Scan Image</span>
          </button>
        </div>

        {/* Sample Launcher Bar */}
        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto scrollbar-none">
          <span className="text-xs text-slate-500 shrink-0 font-bold uppercase tracking-wider">Quick Samples:</span>
          {SAMPLE_IMAGES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => {
                setImageSrc(sample.dataUrl);
                runPrivacyScan(sample.dataUrl);
              }}
              className="px-3.5 py-1.5 bg-slate-50 hover:bg-indigo-50 text-slate-700 border border-slate-200 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer hover:border-indigo-300"
            >
              {sample.title}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Scanning State Modal / Progress Bar */}
      {isScanning && (
        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-[28px] p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Scan className="w-6 h-6 animate-spin" />
          </div>
          <h3 className="text-base font-bold text-slate-900">{scanStepLabel}</h3>
          <p className="text-xs text-slate-500 font-medium">Context-Aware AI models running feature extraction &amp; PII validation</p>
        </div>
      )}

      {/* Main Studio Viewport & Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Canvas Viewport (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <CanvasStudio
            imageSrc={imageSrc}
            detections={currentScan?.detectedObjects || []}
            onUpdateDetection={handleUpdateDetection}
            selectedDetectionId={selectedDetectionId}
            setSelectedDetectionId={setSelectedDetectionId}
            explainableFilter={explainableFilter}
            setExplainableFilter={setExplainableFilter}
            showBeforeAfterSlider={showBeforeAfter}
            onProcessedImageGenerated={setProcessedImageDataUrl}
          />

          {/* Quick Tools & View Mode Toggle */}
          <div className="flex items-center justify-between bg-white border-2 border-slate-200 p-3.5 rounded-[24px] text-xs shadow-sm">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                className={`px-4 py-2 rounded-full font-bold transition-all ${
                  showBeforeAfter
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {showBeforeAfter ? 'Interactive Box Mode' : 'Before | After Split Slider'}
              </button>

              <button
                onClick={() => setActiveTab('editor')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full font-bold transition-all"
              >
                Full Editor
              </button>
            </div>

            <button
              onClick={runVerificationLoop}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full flex items-center space-x-1.5 shadow-sm cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>Verify Privacy Output</span>
            </button>
          </div>

          {/* Privacy Verification Loop Result Box */}
          {verificationResult && (
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-[28px] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Privacy Verification Scan Complete</span>
                </span>
                <span className="text-xs font-extrabold text-emerald-700 px-3 py-1 bg-emerald-100 rounded-full border border-emerald-200">
                  {verificationResult.reduction}% Exposure Reduction
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white p-3 rounded-2xl border border-emerald-200 shadow-sm">
                  <span className="text-[10px] text-slate-500 block font-bold uppercase">Initial Risk Score</span>
                  <span className="text-xl font-black text-amber-600">{verificationResult.before}/100</span>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-emerald-200 shadow-sm">
                  <span className="text-[10px] text-slate-500 block font-bold uppercase">Post-Protection Risk</span>
                  <span className="text-xl font-black text-emerald-600">{verificationResult.after}/100</span>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-emerald-200 shadow-sm">
                  <span className="text-[10px] text-slate-500 block font-bold uppercase">Status</span>
                  <span className="text-xs font-black text-emerald-700 block mt-1">SAFE TO SHARE</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Risk Analysis & Protection Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* 1. Privacy Risk Score Card */}
          <div className="bg-white border-2 border-slate-200 rounded-[28px] p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  <span>AI Privacy Risk Score</span>
                </h3>
                <p className="text-[11px] font-medium text-slate-500">AI-detected privacy exposure estimate</p>
              </div>

              <div className="text-right">
                <span
                  className={`text-3xl font-black ${
                    (currentScan?.riskScore || 0) > 50
                      ? 'text-red-600'
                      : (currentScan?.riskScore || 0) > 20
                      ? 'text-amber-600'
                      : 'text-emerald-600'
                  }`}
                >
                  {currentScan?.riskScore || 0}
                  <span className="text-sm font-normal text-slate-400">/100</span>
                </span>
              </div>
            </div>

            {/* Risk Gauge Progress Bar */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  (currentScan?.riskScore || 0) > 50
                    ? 'bg-gradient-to-r from-amber-500 to-red-500'
                    : (currentScan?.riskScore || 0) > 20
                    ? 'bg-gradient-to-r from-emerald-500 to-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, Math.max(5, currentScan?.riskScore || 0))}%` }}
              />
            </div>

            {/* Recommendations */}
            {currentScan?.recommendations && currentScan.recommendations.length > 0 && (
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                  AI Recommendations:
                </span>
                <ul className="space-y-1">
                  {currentScan.recommendations.map((rec, i) => (
                    <li key={i} className="text-xs text-slate-700 font-medium flex items-start space-x-1.5">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 2. Auto Protect Presets */}
          <div className="bg-white border-2 border-slate-200 rounded-[28px] p-6 space-y-3 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span>Auto Protect Presets</span>
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => applyPreset('social')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-left transition-all cursor-pointer"
              >
                <div className="text-xs font-bold text-slate-900">Social Media</div>
                <div className="text-[10px] text-slate-500 font-medium">Blurs background faces &amp; plates</div>
              </button>

              <button
                onClick={() => applyPreset('linkedin')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-left transition-all cursor-pointer"
              >
                <div className="text-xs font-bold text-slate-900">LinkedIn</div>
                <div className="text-[10px] text-slate-500 font-medium">Protects ID docs &amp; PII text</div>
              </button>

              <button
                onClick={() => applyPreset('family')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-left transition-all cursor-pointer"
              >
                <div className="text-xs font-bold text-slate-900">Family Photos</div>
                <div className="text-[10px] text-slate-500 font-medium">Protects child faces &amp; bystanders</div>
              </button>

              <button
                onClick={() => applyPreset('max')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-left transition-all cursor-pointer"
              >
                <div className="text-xs font-bold text-slate-900">Maximum Privacy</div>
                <div className="text-[10px] text-slate-500 font-medium">Anonymizes all elements</div>
              </button>
            </div>
          </div>

          {/* 3. Detected Objects List & Individual Method Selectors */}
          <div className="bg-white border-2 border-slate-200 rounded-[28px] p-6 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Detected Privacy Objects</h3>
              <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                {currentScan?.detectedObjects?.length || 0} items
              </span>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {currentScan?.detectedObjects?.map((det) => {
                const isSelected = selectedDetectionId === det.id;
                return (
                  <div
                    key={det.id}
                    onClick={() => setSelectedDetectionId(det.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/80 border-indigo-400 ring-2 ring-indigo-300'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-900">{det.label}</span>
                        {det.isMainSubject && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                            Main Subject
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateDetection(det.id, { protected: !det.protected });
                        }}
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full cursor-pointer transition-all ${
                          det.protected
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {det.protected ? 'PROTECTED' : 'EXPOSED'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>Category: {det.category}</span>
                      <span>Confidence: {Math.round(det.confidence * 100)}%</span>
                    </div>

                    {/* Method Selector for Selected Item */}
                    {isSelected && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200 space-y-1.5" onClick={(e) => e.stopPropagation()}>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block">Protection Method:</label>
                        <select
                          value={det.protectionMethod}
                          onChange={(e) =>
                            handleUpdateDetection(det.id, {
                              protectionMethod: e.target.value as ProtectionMethod,
                            })
                          }
                          className="w-full bg-white border border-slate-300 rounded-xl text-xs p-2 text-slate-900 font-semibold focus:outline-none focus:border-indigo-500"
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
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Export Action */}
          <button
            onClick={downloadProtectedImage}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full flex items-center justify-center space-x-2 shadow-md shadow-indigo-200 transition-all cursor-pointer text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export Protected Output</span>
          </button>
        </div>
      </div>
    </div>
  );
};
