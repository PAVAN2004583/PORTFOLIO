export type Role = 'admin' | 'viewer';

export interface Project {
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
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: string;
  created_at: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  description: string;
  start_date: string;
  end_date: string | null;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read';
  created_at: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
