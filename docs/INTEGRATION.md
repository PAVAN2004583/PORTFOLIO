# Integration Guide

This application connects multiple layers to provide a complete portfolio experience.

1. The frontend React app renders public pages and admin dashboard screens.
2. Each page uses the API service layer in `frontend/src/services/api.ts`.
3. Requests go to the Express server on port 3001.
4. Express routes delegate work to controllers and service logic.
5. The service layer reads and updates the in-memory portfolio state for the demo application.
6. The AI endpoint includes portfolio data and optionally calls OpenAI when an API key is configured.
7. The same data is reflected across public pages and admin operations.

## Local development
- Frontend: `npm run dev` inside `frontend`
- Backend: `npm run dev` inside `backend`
- Default API: `http://localhost:3001/api`
- Default frontend: `http://localhost:5173`
