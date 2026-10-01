import bcrypt from 'bcryptjs';

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github_url: string;
  live_url: string;
  image_url: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  level: string;
  created_at: string;
};

export type Education = {
  id: string;
  degree: string;
  institution: string;
  description: string;
  start_date: string;
  end_date: string | null;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read';
  created_at: string;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: 'admin';
  passwordHash: string;
  created_at: string;
};

const now = () => new Date().toISOString();

export const portfolioState = {
  adminUser: {
    id: 'admin-1',
    name: 'Portfolio Admin',
    email: 'admin@portfolio.dev',
    role: 'admin' as const,
    passwordHash: bcrypt.hashSync('admin123', 10),
    created_at: now(),
  },
  projects: [
    {
      id: 'project-1',
      title: 'CloudOps Dashboard',
      description: 'A monitoring dashboard for cloud resources that surfaces deployment health, incidents, and system status for operations teams.',
      technologies: ['React', 'Node.js', 'AWS', 'Docker'],
      github_url: 'https://github.com/PAVAN2004583',
      live_url: 'https://portfolio-demo.local',
      image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      featured: true,
      created_at: now(),
      updated_at: now(),
    },
    {
      id: 'project-2',
      title: 'Portfolio CMS',
      description: 'A content management system for personal portfolio websites with secure dashboard access and public marketing pages.',
      technologies: ['React', 'Express', 'PostgreSQL', 'JWT'],
      github_url: 'https://github.com/PAVAN2004583/PORTFOLIO',
      live_url: 'https://portfolio-demo.local',
      image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
      featured: true,
      created_at: now(),
      updated_at: now(),
    },
    {
      id: 'project-3',
      title: 'Student Resource Portal',
      description: 'A student portal for organizing assignments, learning resources, and technology pathways for academic growth.',
      technologies: ['TypeScript', 'Node.js', 'MongoDB'],
      github_url: 'https://github.com/PAVAN2004583',
      live_url: 'https://portfolio-demo.local',
      image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
      featured: false,
      created_at: now(),
      updated_at: now(),
    },
  ] as Project[],
  skills: [
    { id: 'skill-1', name: 'AWS', category: 'Cloud', level: 'Learning', created_at: now() },
    { id: 'skill-2', name: 'Azure', category: 'Cloud', level: 'Learning', created_at: now() },
    { id: 'skill-3', name: 'Docker', category: 'DevOps', level: 'Intermediate', created_at: now() },
    { id: 'skill-4', name: 'GitHub Actions', category: 'DevOps', level: 'Intermediate', created_at: now() },
    { id: 'skill-5', name: 'Linux', category: 'Tools', level: 'Intermediate', created_at: now() },
    { id: 'skill-6', name: 'Python', category: 'Programming', level: 'Intermediate', created_at: now() },
    { id: 'skill-7', name: 'JavaScript', category: 'Programming', level: 'Advanced', created_at: now() },
    { id: 'skill-8', name: 'TypeScript', category: 'Programming', level: 'Advanced', created_at: now() },
    { id: 'skill-9', name: 'React', category: 'Web Development', level: 'Advanced', created_at: now() },
    { id: 'skill-10', name: 'Node.js', category: 'Web Development', level: 'Advanced', created_at: now() },
    { id: 'skill-11', name: 'PostgreSQL', category: 'Database', level: 'Intermediate', created_at: now() },
    { id: 'skill-12', name: 'Networking', category: 'Networking', level: 'Intermediate', created_at: now() },
  ] as Skill[],
  education: [
    {
      id: 'edu-1',
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Ongoing advanced study in software engineering and cloud systems',
      description: 'Focused on software engineering, cloud architecture, and distributed systems.',
      start_date: '2023-08-01',
      end_date: '2025-06-30',
      created_at: now(),
    },
    {
      id: 'edu-2',
      degree: 'B.Sc. Computer Science',
      institution: 'Foundational computer science program',
      description: 'Built strong fundamentals in programming, databases, and computer networks.',
      start_date: '2020-06-01',
      end_date: '2023-05-31',
      created_at: now(),
    },
  ] as Education[],
  contactMessages: [] as ContactMessage[],
  resume: {
    name: 'Pavan Resume',
    url: 'https://github.com/PAVAN2004583/PORTFOLIO',
  },
};

export const getAdminUser = () => portfolioState.adminUser;
