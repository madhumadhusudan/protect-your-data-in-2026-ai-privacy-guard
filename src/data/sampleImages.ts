/**
 * Pre-configured realistic sample scenes for instant testing of AI Privacy Guard.
 * Uses SVG DataURIs for ultra-fast, crisp, self-contained rendering.
 */

function createSvgDataUri(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}

export interface SampleImage {
  id: string;
  title: string;
  description: string;
  category: string;
  dataUrl: string;
  simulatedDetectionsCount: number;
  initialRisk: number;
}

const sampleGroupPhoto = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" style="background:#1e293b; font-family:sans-serif;">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  
  <!-- Park / Street Background elements -->
  <rect x="0" y="400" width="800" height="200" fill="#1e293b"/>
  <circle cx="100" cy="200" r="80" fill="#059669" opacity="0.4"/>
  <circle cx="700" cy="180" r="100" fill="#047857" opacity="0.4"/>

  <!-- Background Car with License Plate -->
  <g id="bg_car" opacity="0.8">
    <rect x="520" y="320" width="220" height="90" rx="10" fill="#475569"/>
    <rect x="550" y="280" width="160" height="50" rx="8" fill="#64748b"/>
    <!-- Indian License Plate -->
    <rect x="580" y="365" width="100" height="28" rx="4" fill="#facc15" stroke="#000" stroke-width="2"/>
    <text x="630" y="384" font-size="13" font-weight="bold" fill="#000" text-anchor="middle">KA 01 MJ 8821</text>
  </g>

  <!-- Background Person 1 -->
  <g id="bg_person_1">
    <circle cx="150" cy="260" r="28" fill="#f87171"/>
    <path d="M120 340 C120 290 180 290 180 340 Z" fill="#3b82f6"/>
    <circle cx="142" cy="255" r="3" fill="#000"/>
    <circle cx="158" cy="255" r="3" fill="#000"/>
    <path d="M145 270 Q150 275 155 270" stroke="#000" stroke-width="2" fill="none"/>
  </g>

  <!-- Background Child Person 2 -->
  <g id="bg_child">
    <circle cx="260" cy="300" r="22" fill="#fcd34d"/>
    <path d="M235 370 C235 325 285 325 285 370 Z" fill="#ec4899"/>
    <circle cx="253" cy="296" r="2.5" fill="#000"/>
    <circle cx="267" cy="296" r="2.5" fill="#000"/>
    <path d="M255 310 Q260 314 265 310" stroke="#000" stroke-width="2" fill="none"/>
    <text x="260" y="270" font-size="10" fill="#facc15" text-anchor="middle" font-weight="bold">CHILD</text>
  </g>

  <!-- Main Subject Person (Primary) -->
  <g id="main_subject">
    <circle cx="400" cy="220" r="55" fill="#fed7aa"/>
    <path d="M320 420 C320 300 480 300 480 420 Z" fill="#6366f1"/>
    <!-- Hair -->
    <path d="M345 200 Q400 140 455 200 Q400 170 345 200" fill="#1e1b4b"/>
    <!-- Eyes & Smile -->
    <circle cx="380" cy="210" r="5" fill="#1e1b4b"/>
    <circle cx="420" cy="210" r="5" fill="#1e1b4b"/>
    <path d="M380 245 Q400 265 420 245" stroke="#1e1b4b" stroke-width="4" fill="none"/>
  </g>

  <!-- Phone & UPI QR overlay on sign in background -->
  <g id="signboard" transform="translate(40, 60)">
    <rect x="0" y="0" width="220" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <text x="110" y="25" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">CITY PARKING &amp; CAFE</text>
    <text x="110" y="45" font-size="11" fill="#475569" text-anchor="middle">Call: +91 98765 43210</text>
    <text x="110" y="62" font-size="10" fill="#0284c7" text-anchor="middle">info@citypark.in</text>
    <!-- QR Code representation -->
    <rect x="150" y="70" width="40" height="40" fill="#000"/>
    <rect x="155" y="75" width="12" height="12" fill="#fff"/>
    <rect x="173" y="75" width="12" height="12" fill="#fff"/>
    <rect x="155" y="93" width="12" height="12" fill="#fff"/>
    <rect x="158" y="78" width="6" height="6" fill="#000"/>
    <rect x="176" y="78" width="6" height="6" fill="#000"/>
    <rect x="158" y="96" width="6" height="6" fill="#000"/>
  </g>

  <!-- Watermark Text -->
  <text x="780" y="580" font-size="12" fill="#94a3b8" text-anchor="end">AI PRIVACY GUARD SAMPLE #1 (SOCIAL SCENE)</text>
</svg>`;

const sampleDocumentPhoto = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" style="background:#0f172a; font-family:sans-serif;">
  <rect width="800" height="600" fill="#020617"/>
  
  <!-- Desk Background -->
  <rect x="40" y="40" width="720" height="520" rx="16" fill="#1e293b" stroke="#334155" stroke-width="2"/>
  
  <!-- Aadhaar/PAN Identity Document Card -->
  <g transform="translate(100, 100)">
    <rect x="0" y="0" width="340" height="210" rx="12" fill="#f8fafc" stroke="#3b82f6" stroke-width="3"/>
    <rect x="0" y="0" width="340" height="36" rx="12" fill="#1e3a8a"/>
    <text x="170" y="24" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">GOVERNMENT OF INDIA - UNIQUE ID</text>
    
    <!-- Photo on card -->
    <rect x="20" y="50" width="70" height="90" fill="#cbd5e1" stroke="#94a3b8"/>
    <circle cx="55" cy="80" r="18" fill="#64748b"/>
    <path d="M35 125 C35 105 75 105 75 125 Z" fill="#475569"/>

    <!-- Text details -->
    <text x="105" y="68" font-size="11" font-weight="bold" fill="#0f172a">NAME: RAJESH KUMAR SHARMA</text>
    <text x="105" y="86" font-size="10" fill="#475569">DOB: 14/08/1988 | MALE</text>
    <text x="105" y="104" font-size="10" fill="#475569">ADDRESS: #42, 5th Cross, Indiranagar</text>
    <text x="105" y="118" font-size="10" fill="#475569">Bengaluru, Karnataka - 560038</text>
    
    <!-- Aadhaar Number -->
    <text x="170" y="175" font-size="18" font-weight="bold" fill="#b91c1c" letter-spacing="2" text-anchor="middle">5482 9102 3841</text>
  </g>

  <!-- Payment Credit Card -->
  <g transform="translate(420, 310)">
    <rect x="0" y="0" width="300" height="190" rx="14" fill="linear-gradient(135deg, #1e1b4b, #312e81)" stroke="#818cf8" stroke-width="2"/>
    <text x="280" y="30" font-size="16" font-weight="bold" fill="#f8fafc" text-anchor="end">PLATINUM</text>
    
    <!-- Chip -->
    <rect x="30" y="45" width="45" height="35" rx="6" fill="#facc15" stroke="#ca8a04"/>
    
    <!-- Card Number -->
    <text x="30" y="115" font-size="17" font-weight="bold" fill="#ffffff" letter-spacing="2">4532 8821 9012 3456</text>
    
    <text x="30" y="145" font-size="9" fill="#94a3b8">VALID THRU</text>
    <text x="30" y="160" font-size="12" font-weight="bold" fill="#ffffff">09/28</text>

    <text x="160" y="145" font-size="9" fill="#94a3b8">CVV</text>
    <text x="160" y="160" font-size="12" font-weight="bold" fill="#f87171">882</text>
    
    <text x="30" y="180" font-size="11" font-weight="bold" fill="#e2e8f0">RAJESH K SHARMA</text>
  </g>

  <text x="780" y="580" font-size="12" fill="#94a3b8" text-anchor="end">AI PRIVACY GUARD SAMPLE #2 (FINANCIAL &amp; ID)</text>
</svg>`;

export const SAMPLE_IMAGES: SampleImage[] = [
  {
    id: 'sample_social_group',
    title: 'Social Group & Street Scene',
    description: 'Main subject with background people, child face, Indian license plate, parking signboard phone/email & QR code.',
    category: 'Social / Family',
    dataUrl: createSvgDataUri(sampleGroupPhoto),
    simulatedDetectionsCount: 6,
    initialRisk: 84,
  },
  {
    id: 'sample_financial_doc',
    title: 'Identity & Financial Document',
    description: 'Contains Indian Aadhaar ID card, Credit Card number, CVV, DOB, Address, and full Aadhaar number.',
    category: 'Documents & Cards',
    dataUrl: createSvgDataUri(sampleDocumentPhoto),
    simulatedDetectionsCount: 5,
    initialRisk: 96,
  },
];
