# AI Privacy Guard — System Architecture

## 1. System Overview
```
[User Interface (Web & Mobile View)]
        │
        ├──> Express API Service (/api/v1/*)
        │       ├──> Local Fast AI Detector & OCR Processor
        │       ├──> Gemini Vision Context Analyzer (@google/genai)
        │       ├──> Privacy Risk Scorer (0-100 PRS Engine)
        │       ├──> Image & Region Processing Engine (Blur/Pixelate/Inpaint/BG)
        │       └──> AI Privacy Copilot Tool Planner
        │
        └──> Canvas Processing Layer (Interactive Studio & Mask Render)
```

## 2. AI Pipeline
1. **Upload / Frame Grab**: Image or video frame stream ingested into pipeline.
2. **Parallel Detection**:
   - Object & Face Detection (Main face, Background face, Child face).
   - License Plate & Vehicle Identifier Detection.
   - Document & Financial Scanner (Aadhaar, PAN, Card, UPI QR).
   - OCR & PII Text Recognizer (Regex + Contextual NER).
   - Metadata Scanner (EXIF, GPS, Camera, Timestamp).
3. **Fusion & Context Analysis**:
   - Subject Score calculation: `SubjectScore = face_area_score + centrality_score + saliency_score + pose_score + image_quality_score`.
   - Role assignment: Primary Subject vs Background Person.
4. **Privacy Risk Scoring (0-100)**:
   - Category weights: Payment Card (Critical), ID Document (Critical), Child Face (High), License Plate (High), Phone/Email (High), Background Face (Moderate), Generic Text (Low).
5. **Action Recommendation**:
   - Preset rules (Social Media, LinkedIn, Public Posting, Family Photos, Professional Documents, Maximum Privacy).
6. **Transformation & Editing**:
   - Advanced Blur (Gaussian, Motion, Radial), Pixelation, Mosaic, Solid Redaction, Synthetic Face Anonymization, Object Inpainting Removal, Background Replacement/Bokeh.
7. **Verification Scan**:
   - Re-scan processed output to confirm risk reduction.

## 3. Data & API Architecture
- REST API under `/api/v1/*` with OpenAPI schema compatibility.
- Client state maintained in non-destructive local project store.
- Zero raw image logging; transient processing only.
