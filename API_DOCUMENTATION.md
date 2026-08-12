# AI Privacy Guard — API Documentation

## REST Endpoints (`/api/v1`)

### 1. Privacy Scan
- **POST** `/api/v1/privacy/scan`
  - Body: `{ image: string (base64/dataURL), mode: 'fast' | 'advanced' }`
  - Response: `{ scanId, detections, riskScore, riskLevel, recommendations, metadata }`

### 2. Auto / Manual Protect
- **POST** `/api/v1/privacy/protect`
  - Body: `{ image: string, detections: Detection[], preset: string }`
  - Response: `{ processedImage: string, appliedTransformations: string[] }`

### 3. Privacy Verification
- **POST** `/api/v1/privacy/verify`
  - Body: `{ originalImage: string, processedImage: string }`
  - Response: `{ beforeRiskScore, afterRiskScore, reductionPercentage, remainingDetections }`

### 4. AI Image Editor Operations
- **POST** `/api/v1/editor/blur`
- **POST** `/api/v1/editor/pixelate`
- **POST** `/api/v1/editor/remove`
- **POST** `/api/v1/editor/background`
- **POST** `/api/v1/editor/enhance`

### 5. AI Copilot Tool API
- **POST** `/api/v1/assistant/command`
  - Body: `{ command: string, imageState: Object }`
  - Response: `{ reply: string, actions: ToolAction[], updatedRiskScore: number }`

### 6. Health & Models
- **GET** `/api/v1/health`
- **GET** `/api/v1/models`
