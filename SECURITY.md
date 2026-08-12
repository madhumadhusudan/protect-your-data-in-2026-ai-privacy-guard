# Security & Data Privacy Architecture

## Data Handling Rules
1. **Zero Raw Storage**: Images are processed strictly in-memory or transient session storage.
2. **Masked Card Storage**: Card numbers are never logged in raw form. Only masked formats like `**** **** **** 1234` are displayed in UI if needed.
3. **Local-First AI**: Detection and basic blurring run locally or on-server transiently without cloud export unless explicit user consent is given for Advanced AI.
4. **Input & Sanitization**: Strict file type validation (PNG, JPG, WEBP, MP4) and size bounds.
5. **No Key Leakage**: API Keys (`GEMINI_API_KEY`) strictly kept on Express server side.
