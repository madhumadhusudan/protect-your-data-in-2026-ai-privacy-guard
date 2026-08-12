# AI Privacy Guard — Project Analysis & Requirements

## 1. Executive Summary
AI Privacy Guard is a research-grade, production-quality context-aware intelligent image privacy, anonymization, and image editing platform. Unlike naive blanket blurring tools, AI Privacy Guard integrates multi-category privacy detection, main-subject preservation, child privacy protection, Indian & international document/card/license plate detection, OCR PII extraction, 0-100 Privacy Risk Scoring, advanced regional blur/pixelation/redaction, AI object removal, background editing, video privacy mask propagation, and an interactive AI Privacy Copilot.

## 2. Core Problem & Research Contributions
1. **Context-Aware Privacy Detection**: Distinguishes primary subjects from background individuals and sensitive background elements.
2. **Main-Subject Preservation**: Uses multi-factor subject analysis (face size, centrality, saliency, pose, quality, semantic context) beyond basic 30% area rules.
3. **Multi-Category Protection**: Covers human faces, child faces, vehicles (Indian/international license plates), Indian ID documents (Aadhaar, PAN, Passport, Driving License, Voter ID), financial instruments (Payment cards with Luhn check, QR/UPI codes), and PII text (phone, email, address).
4. **Privacy Risk Score (0-100)**: Quantitative privacy risk scoring based on object category, confidence, visibility, size, and identifiability.
5. **Privacy Verification Loop**: Re-scans processed images to quantify detected risk reduction (e.g., 82/100 -> 12/100, 85% exposure reduction).
6. **Privacy Copilot**: Structured natural-language tool interface powered by Gemini 2.5/Gemini API.
7. **Hybrid AI & Privacy-First Architecture**: Local fast AI processing with optional user-consented cloud AI.

## 3. Technology Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Framer Motion (`motion`).
- **Backend / API**: Express 4, Node.js, TypeScript (`tsx` dev / `esbuild` prod bundle).
- **AI Intelligence**: Server-side `@google/genai` (Gemini API) for vision analysis, context classification, OCR PII detection, and AI Copilot intent parsing.
- **Canvas / Image Engine**: Client/Server HTML5 Canvas, OpenCV-style canvas manipulation (Gaussian, Motion, Radial blur, Pixelation, Redaction, Inpainting simulation).
