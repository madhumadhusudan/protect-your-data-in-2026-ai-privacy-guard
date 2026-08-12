/**
 * Shared Type Definitions for AI Privacy Guard
 */

export type PrivacyCategory =
  | 'main_face'
  | 'background_face'
  | 'child_face'
  | 'person_body'
  | 'license_plate'
  | 'document_id' // Aadhaar, PAN, Passport, Driving License, Voter ID
  | 'payment_card' // Credit/Debit Card
  | 'qr_code'
  | 'barcode'
  | 'phone_number'
  | 'email_address'
  | 'residential_address'
  | 'sensitive_text'
  | 'gps_metadata';

export type RiskSeverity = 'low' | 'moderate' | 'high' | 'critical';

export type ProtectionMethod =
  | 'blur_gaussian'
  | 'blur_motion'
  | 'blur_radial'
  | 'pixelate'
  | 'mosaic'
  | 'redact_solid'
  | 'synthetic_face'
  | 'remove_object'
  | 'strip_metadata'
  | 'none';

export interface BoundingBox {
  x: number; // Percentage 0 - 100 or pixels
  y: number;
  width: number;
  height: number;
}

export interface DetectedPrivacyObject {
  id: string;
  category: PrivacyCategory;
  label: string;
  confidence: number; // 0 - 1.0
  severity: RiskSeverity;
  boundingBox: BoundingBox;
  maskPolygon?: { x: number; y: number }[];
  isMainSubject?: boolean;
  protected: boolean;
  protectionMethod: ProtectionMethod;
  blurRadius?: number;
  pixelBlockSize?: number;
  details?: string; // e.g. "Masked Card: **** **** **** 8821" or "Confidence: 94%"
  safetyMarginPct?: number;
}

export interface ImageMetadata {
  filename?: string;
  width?: number;
  height?: number;
  hasGps: boolean;
  gpsCoords?: string;
  cameraModel?: string;
  timestamp?: string;
  softwareInfo?: string;
}

export interface PrivacyScanResult {
  scanId: string;
  riskScore: number; // 0 - 100
  riskLevel: RiskSeverity;
  detectedObjects: DetectedPrivacyObject[];
  mainSubjectId?: string;
  recommendations: string[];
  metadata: ImageMetadata;
  latencyMs: number;
  timestamp: string;
  modelVersions: {
    detector: string;
    ocr: string;
    riskScorer: string;
  };
}

export interface PrivacyVerificationResult {
  originalRiskScore: number;
  finalRiskScore: number;
  exposureReductionPct: number;
  remainingRiskObjects: number;
  status: 'safe' | 'review_recommended' | 'high_risk_remaining';
  findings: string[];
}

export interface CopilotAction {
  action: 'protect' | 'unprotect' | 'remove' | 'background' | 'enhance' | 'preset' | 'verify';
  targets?: PrivacyCategory[] | string[];
  method?: ProtectionMethod;
  parameters?: Record<string, any>;
  description: string;
}

export interface CopilotResponse {
  reply: string;
  actions: CopilotAction[];
  updatedRiskScore?: number;
  suggestedPrompts?: string[];
}

export interface PresetConfig {
  id: string;
  name: string;
  description: string;
  categoriesToProtect: PrivacyCategory[];
  defaultMethod: ProtectionMethod;
  preserveMainSubject: boolean;
}

export type ActiveTab =
  | 'dashboard'
  | 'scanner'
  | 'editor'
  | 'remover'
  | 'background'
  | 'video'
  | 'copilot'
  | 'history'
  | 'research'
  | 'reports'
  | 'settings'
  | 'mobile';

export interface ProjectHistoryItem {
  id: string;
  timestamp: string;
  name: string;
  originalImage: string;
  currentImage: string;
  initialRiskScore: number;
  currentRiskScore: number;
  detectionsCount: number;
  protectedCount: number;
  historySteps: {
    id: string;
    label: string;
    timestamp: string;
    imageSnapshot: string;
    riskScore: number;
  }[];
}

export interface BenchmarkData {
  modelName: string;
  version: string;
  architecture: string;
  precision: number;
  recall: number;
  f1Score: number;
  mAP50: number;
  latencyMs: number;
  memoryMb: number;
  ssim: number;
  quantization: 'FP32' | 'FP16' | 'INT8';
}
