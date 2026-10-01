# Pavan Portfolio Platform

A modern full-stack portfolio website built for an MCA student with a cloud computing focus.

## Features
- Responsive public portfolio with Home, About, Skills, Projects, Education, Resume, and Contact sections
- Secure admin dashboard with protected routes and JWT-based authentication
- Project, skill, and education management
- Contact form with validation and message tracking
- AI assistant grounded in portfolio data
- Express backend with structured API responses and error handling

## Tech Stack
- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Security: JWT, CORS, Helmet, rate limiting
- AI: OpenAI integration with safe fallback behavior

## Project Structure
```text
PORTFOLIO/
├── backend/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── database/
│   ├── schema.sql
│   └── seed.sql
├── docs/
│   ├── PROJECT_SPEC.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── API_DOCUMENTATION.md
│   └── INTEGRATION.md
├── frontend/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── index.html
├── .env.example
├── .gitignore
├── AI_RULES.md
├── README.md
└── database/
```

## Local Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Environment Variables
Create a `.env` file in the backend from `.env.example` and set values like:
```env
PORT=3001
JWT_SECRET=your-secret
OPENAI_API_KEY=
FRONTEND_URL=http://localhost:5173
```

Frontend variables can be created in `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001/api
```

## Admin Login
```text
Email: admin@portfolio.dev
Password: admin123
```

## Deployment
The project is prepared for a Vercel + backend hosting combination. The frontend can be deployed to Vercel and the API can be deployed to Render or Railway. The schema in `database/schema.sql` is PostgreSQL-ready for production use.

## Testing
- Frontend route validation and forms were manually verified in the browser.
- Backend endpoints were checked with the local Express server.
- AI assistant fallback was verified without an API key.
