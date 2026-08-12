# Deployment & Mobile Build Guide

## Cloud Run & Web Deployment
1. Build container image using `docker build -t ai-privacy-guard .`
2. Configure `GEMINI_API_KEY` in environment.
3. Deploy container binding to port `3000`.

## Mobile Build (React Native / Expo Architecture)
1. `cd apps/mobile`
2. Install dependencies: `npm install`
3. Launch Metro bundler: `npx expo start`
4. Standalone APK / iOS build: `eas build --platform all`
