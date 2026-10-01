INSERT INTO users (id, name, email, password_hash, role) VALUES
('11111111-1111-1111-1111-111111111111', 'Portfolio Admin', 'admin@portfolio.dev', '$2a$10$J3tO4mY9vEA7NTl8T4J7A.4eU4g3Yl5Kq1uQn7xskK6jNlkV2mEgm', 'admin')
ON CONFLICT (email) DO NOTHING;

INSERT INTO skills (name, category, level) VALUES
('AWS', 'Cloud', 'Learning'),
('Azure', 'Cloud', 'Learning'),
('Docker', 'DevOps', 'Intermediate'),
('GitHub Actions', 'DevOps', 'Intermediate'),
('Linux', 'Tools', 'Intermediate'),
('Python', 'Programming', 'Intermediate'),
('JavaScript', 'Programming', 'Advanced'),
('TypeScript', 'Programming', 'Advanced'),
('React', 'Web Development', 'Advanced'),
('Node.js', 'Web Development', 'Advanced'),
('PostgreSQL', 'Database', 'Intermediate'),
('Networking', 'Networking', 'Intermediate')
ON CONFLICT DO NOTHING;

INSERT INTO education (degree, institution, description, start_date, end_date) VALUES
('Master of Computer Applications (MCA)', 'University Name', 'Focused on software engineering, cloud architecture, and distributed systems.', '2023-08-01', '2025-06-30'),
('B.Sc. Computer Science', 'Previous College', 'Built strong fundamentals in programming, databases, and computer networks.', '2020-06-01', '2023-05-31');

INSERT INTO projects (title, description, technologies, github_url, live_url, image_url, featured) VALUES
('CloudOps Dashboard', 'A monitoring dashboard for cloud resources that surfaces status, incidents, and deployment health.', ARRAY['React', 'Node.js', 'AWS'], 'https://github.com/example/cloudops-dashboard', 'https://example.com/cloudops', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31', TRUE),
('Portfolio CMS', 'A full-stack portfolio content management system with admin authentication and public pages.', ARRAY['React', 'Express', 'PostgreSQL'], 'https://github.com/example/portfolio-cms', 'https://example.com/portfolio-cms', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3', TRUE),
('Student Resource Portal', 'A student portal for learning resources, assignments, and cloud learning tracks.', ARRAY['TypeScript', 'Node.js', 'MongoDB'], 'https://github.com/example/student-portal', 'https://example.com/student-portal', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f', FALSE);
