# API Documentation

Base URL: http://localhost:3001/api

## Authentication

### POST /api/auth/login
Request body:
```json
{
  "email": "admin@portfolio.dev",
  "password": "admin123"
}
```
Response: token and admin user data.

### GET /api/auth/me
Headers: Authorization: Bearer <token>

### POST /api/auth/logout
Returns success response.

## Portfolio

### GET /api/projects
Public projects listing.

### GET /api/projects/:id
Fetches one project.

### POST /api/projects
Admin only. Create a project entry.

### PUT /api/projects/:id
Admin only. Update a project entry.

### DELETE /api/projects/:id
Admin only. Delete a project entry.

### GET /api/skills
Public skills list.

### POST /api/skills
Admin only.

### PUT /api/skills/:id
Admin only.

### DELETE /api/skills/:id
Admin only.

### GET /api/education
Public education list.

### POST /api/education
Admin only.

### PUT /api/education/:id
Admin only.

### DELETE /api/education/:id
Admin only.

### POST /api/contact
Create new contact message.

### GET /api/contact
Admin only. List messages.

### PATCH /api/contact/:id
Admin only. Update message status.

### GET /api/resume
Public resume metadata.

### PUT /api/resume
Admin only. Update resume URL.

## AI Assistant

### POST /api/ai/ask
Request body:
```json
{
  "question": "What projects has Pavan built?"
}
```
Response:
```json
{
  "success": true,
  "data": {
    "answer": "Pavan has worked on ...",
    "source": "portfolio-data"
  }
}
```
