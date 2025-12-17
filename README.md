# Livra Uganda — Vite + Vue Starter

This repository is a starter scaffold for a financial services web app (Livra) with Firebase integration and macOS-inspired UI.

Features included in this scaffold:
- Firebase initialization (Auth, Realtime DB, Firestore, Storage)
- Phone number sign-in (Firebase Phone Auth placeholder)
- PIN setup (localStorage placeholder)
- Core views: Home, Wallet, Banking, Transactions, Profile
- QR code generator and camera scanner placeholders
- UGX currency formatting

Important notes & next steps:
- This scaffold provides UI and Firebase wiring. Production-ready payment flows (mobile money, card linking, loans, savings, investments) require integration with payment providers, bank APIs, and compliance checks.
- For Phone Auth to work in the browser you must configure Firebase Auth for your domain and ensure reCAPTCHA is set up.

Quick start

Install:

```bash
cd /workspaces/codespaces-blank
npm install
npm run dev
```

Open http://localhost:5173

Suggestions to make it real:
- Integrate MTN Mobile Money / Airtel Money APIs for deposits and withdrawals.
- Add server-side functions (Firebase Cloud Functions) for secure transactions, OTPs, and webhooks.
- Implement proper KYC (ID scan), fingerprint/authenticator integration (WebAuthn) on supported devices.
- Add secure vault for tokens, and PCI-compliant card tokenization for card linking.

Relworx integration (proxy server)

This scaffold includes a small Express proxy in `/server` that forwards requests to Relworx using your `RELWORX_API_KEY`. To run it locally:

```bash
cp .env.example .env
# edit .env and set RELWORX_API_KEY and RELWORX_ACCOUNT_NO
cd server
npm install
npm run start
```

Then start the frontend in another terminal (`npm run dev`) and the frontend will call `/api/relworx/*` on the backend.
