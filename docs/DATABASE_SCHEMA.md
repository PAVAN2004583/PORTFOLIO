# Database Schema

The project includes a PostgreSQL-ready schema in `database/schema.sql` and sample seed data in `database/seed.sql`.

## Tables

### users
- id: UUID primary key
- name: string
- email: unique email
- password_hash: encrypted password
- role: admin or viewer
- created_at: timestamp
- updated_at: timestamp

### projects
- id: UUID primary key
- title: portfolio project title
- description: project summary
- technologies: array of technologies
- github_url: code repository URL
- live_url: deployment URL
- image_url: image source
- featured: boolean flag
- created_at: creation timestamp
- updated_at: update timestamp

### skills
- id: UUID primary key
- name: skill name
- category: cloud, database, web, networking, etc.
- level: beginner/intermediate/advanced
- created_at: timestamp

### education
- id: UUID primary key
- degree: qualification
- institution: school or college
- description: academic summary
- start_date: start date
- end_date: completion date or null
- created_at: timestamp

### contact_messages
- id: UUID primary key
- name: sender name
- email: sender email
- message: message body
- status: new or read
- created_at: timestamp

## Relationships
- Users are independent admin accounts.
- Projects, skills, education, and messages are standalone entities used by public and admin services.
- Indexes are provided for featured projects, skill categories, and message status filtering.
