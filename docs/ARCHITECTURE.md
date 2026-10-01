# Architecture Overview

The portfolio application is built on a layered architecture that separates frontend, backend, and business data responsibilities.

## Frontend
- React + TypeScript + Vite
- Tailwind CSS-based interface
- Routing for public pages and admin dashboard
- API service layer for data fetching and state updates

## Backend
- Express + TypeScript server
- Request validation with safe response structure
- Authentication and authorization middleware
- Portfolio data service layer
- AI request integration with fallback logic

## Data Flow
Frontend -> HTTP request -> Express API -> Service -> In-memory portfolio store -> JSON response

## AI Flow
Frontend -> POST /api/ai/ask -> Backend -> Portfolio context -> OpenAI API (when configured) -> Human-readable answer

## Admin flow
Admin login -> JWT token -> Protected API endpoints -> CRUD operations -> Public pages update automatically in the running app

## Security notes
- JWT tokens for admin sessions
- Protected admin routes
- Input validation
- CORS configuration
- Rate limiting on API endpoints
- No secrets exposed in frontend code
