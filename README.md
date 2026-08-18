# 🛡️ AI Privacy Guard — Context-Aware Intelligent Image Privacy Platform

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Gemini 3.6 Flash](https://img.shields.io/badge/Gemini_3.6_Flash-Vision_AI-8E44AD?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

> **AI Privacy Guard** is a context-aware intelligent image anonymization and privacy protection web platform. It leverages on-device INT8 object detection paired with server-side **Gemini 3.6 Flash Vision AI** to automatically identify, score, and selectively protect sensitive personal information (PII, faces, license plates, QR codes, financial cards) without obscuring the primary intent or main subject of media.

---

## 📸 Platform Visual Previews & Screenshots.
<img width="1339" height="592" alt="Screenshot 2026-08-18 231940" src="https://github.com/user-attachments/assets/9cb061c7-2f6d-4c76-b5a5-3c1e6e117e66" />



### 1. Main Dashboard & Privacy Risk Index
- **Dynamic Bounding Overlay**: Visualizes all detected sensitive elements with risk color coding (Red = High Risk, Yellow = Medium Risk, Green = Low Risk / Preserved Subject).
- **Privacy Vulnerability Breakdown**: Live score calculation out of 100 with one-click **Auto-Protect All** execution.

### 2. Multi-Method Image Editor & Layer Inspector.
- Custom control over every single detected element.
- Fine-tune blur radiuses (Gaussian, Motion, Radial), pixelation block sizes, solid redactions, or synthetic face masks.

### 3. AI Object Remover & Content-Aware Inpainting
- Effortlessly remove photobombers, unwanted background clutter, or private watermarks with non-destructive inpainting.

### 4. Background Studio & Depth Matting
- Automatically segregate foreground subjects from background environments with Bokeh depth blur and AI backdrop replacement.

### 5. Conversational Privacy Copilot Agent
- Natural language assistant powered by Gemini 3.6 Flash for parsing prompts like `"Blur all license plates and redact credit card numbers"`.

---

## ✨ Key Features & Capabilities

- 🧠 **Context-Aware Saliency Detection**: Intelligently distinguishes between the main selfie/photo subject and background bystanders to avoid unnecessary over-blurring.
- 🚗 **Vehicle & Plate Recognition**: Detects Indian and international vehicle license plates and applies automatic pixelation or Gaussian blur.
- 💳 **Financial PII & QR Detection**: Automatically flags credit card numbers, CVVs, UPI QR codes, and phone numbers.
- 🪪 **Identity Document Protection**: Identifies Government IDs (Aadhaar, PAN cards, Passports, Driver Licenses) and redacts sensitive numbers.
- 🎥 **Video Privacy Simulation**: Features temporal tracking and multi-frame mask propagation to prevent frame flickering during video playback.
- 📱 **Mobile Architecture Simulator**: React Native / Expo mobile device simulator showcasing live camera privacy scanning and on-device offline processing.
- 📊 **Research & Benchmark Dashboard**: Comparative analytics displaying Precision, Recall, F1 Score, mAP50, and latency across YOLOv8, CRAFT OCR, and Gemini Vision models.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React Icons, HTML5 Canvas API.
- **Backend**: Express.js server, Node.js, `tsx` runner, `esbuild` CommonJS bundling.
- **AI Integration**: `@google/genai` TypeScript SDK utilizing **Gemini 3.6 Flash** (`gemini-3.6-flash`) for multi-modal vision parsing and natural language intent orchestration.
- **Styling Design System**: Bento Grid architecture with rounded container cards (`rounded-[32px]`), pill-shaped controls (`rounded-full`), clean white canvases, and indigo accent highlights.

---

## 🚀 Step-by-Step Usage Guide

### Step 1: Select or Upload Media
1. Launch the application in your browser.
2. Choose one of the pre-loaded high-resolution sample scenarios (e.g., *Street Scene with Vehicle & Bystanders*, *Coffee Shop Selfie with Credit Card*, *Document Scan*) or upload a custom image.

### Step 2: Run AI Privacy Scan
1. Click **"Run Full AI Privacy Scan"**.
2. The server-side Gemini 3.6 Flash vision engine scans the image and highlights all detected sensitive bounding boxes.
3. Review the calculated **Privacy Risk Score** (0-100) and risk breakdown.

### Step 3: Customizing Anonymization in the Image Editor
1. Click on any bounding box in the interactive Canvas Studio or select it from the Layer Inspector.
2. Select your desired protection method:
   - **Gaussian Blur**: Smooth mathematical blurring with adjustable strength radius (1px - 50px).
   - **Motion Blur**: Directional kinetic blur for moving vehicles.
   - **Pixelate**: Retain structural context while obfuscating fine detail.
   - **Solid Redact**: Complete opacity mask for sensitive numbers or IDs.
   - **Synthetic Anonymize**: Replace sensitive human faces with privacy avatar layers.

### Step 4: Using the AI Privacy Copilot
1. Navigate to the **Privacy Copilot** tab.
2. Type natural language instructions such as:
   - *"Protect all background people and license plates."*
   - *"Remove the vehicle from the background."*
   - *"Redact phone numbers and email addresses."*
3. The Copilot automatically parses your intent and updates the canvas layers.

### Step 5: Exporting & Audit Reports
1. Click **"Export Protected Photo"** to download the high-resolution anonymized image.
2. Switch to the **Privacy Report** tab to view or print a PDF audit document detailing scan metrics and protection compliance.

---

## 💻 Local Setup & Development Guide

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn
- Gemini API Key (set in `.env` or `.env.example`)

### Installation Commands

```bash
# 1. Clone or navigate to project directory
cd ai-privacy-guard

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Add your GEMINI_API_KEY=your_actual_key_here in .env
```

### Running in Development Mode

```bash
# Starts the Express backend + Vite dev server on http://localhost:3000
npm run dev
```

### Building for Production

```bash
# Build Vite frontend and bundle Express server into dist/server.cjs
npm run build

# Start production server
npm start
```

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | System health check and model status |
| `GET` | `/api/privacy/status` | Active AI models and quantization info |
| `POST` | `/api/privacy/scan` | Server-side Gemini 3.6 Flash vision privacy scan |
| `POST` | `/api/privacy/copilot` | Natural language command parsing and action execution |

---

## 📜 License & Compliance

Built for research, educational, and enterprise privacy protection. Adheres to strict local-first data retention guidelines — uploaded visual media is processed in-memory and transient storage only.
