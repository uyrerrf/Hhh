# WUZEN C2

High-grade Android RAT with React dashboard.

## Structure
- `server/` — Node/Express C2 backend with WebSocket
- `client/` — React dashboard (Vite)
- `payload/` — Kotlin Android payload

## Deploy
```bash
cd server && npm install && npm start
cd client && npm install && npm run dev
```

## GitHub Actions
Push to `main` triggers build + Render deploy.
