import type { ApiResponse, ContactMessage, Education, Project, Skill, UserSession } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

const getAuthHeaders = (includeAuth = true) => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (includeAuth) {
    const token = localStorage.getItem('portfolio_token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  return headers;
};

const request = async <T>(path: string, options: RequestInit = {}, includeAuth = true): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...getAuthHeaders(includeAuth),
      ...(options.headers ?? {}),
    },
  });

  const body = (await response.json()) as ApiResponse<T>;

  if (!response.ok || body.success === false) {
    throw new Error(body.error ?? 'Request failed.');
  }

  return body.data as T;
};

export const getProjects = () => request<Project[]>('/projects');
export const getSkills = () => request<Skill[]>('/skills');
export const getEducation = () => request<Education[]>('/education');
export const getResume = () => request<{ name: string; url: string }>('/resume');
export const updateResumeAdmin = (url: string) =>
  request<{ name: string; url: string }>('/resume', {
    method: 'PUT',
    body: JSON.stringify({ url }),
  });
export const sendContactMessage = (payload: { name: string; email: string; message: string }) =>
  request<ContactMessage>('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  }, false);

export const askAI = (question: string) =>
  request<{ answer: string; source: string }>('/ai/ask', {
    method: 'POST',
    body: JSON.stringify({ question }),
  }, false);

export const loginAdmin = async (email: string, password: string) => {
  const response = await request<{ token: string; user: UserSession }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }, false);

  localStorage.setItem('portfolio_token', response.token);
  return response;
};

export const getMe = () => request<UserSession>('/auth/me');
export const logoutAdmin = () => {
  localStorage.removeItem('portfolio_token');
  return request<{ success: boolean; data: null }>('/auth/logout', { method: 'POST' });
};

export const getContactMessages = () => request<ContactMessage[]>('/contact');
export const createProjectAdmin = (payload: Partial<Project>) =>
  request<Project>('/projects', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
export const updateProjectAdmin = (id: string, payload: Partial<Project>) =>
  request<Project>(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
export const deleteProjectAdmin = (id: string) =>
  request<{ deleted: boolean }>(`/projects/${id}`, {
    method: 'DELETE',
  });

export const createSkillAdmin = (payload: Partial<Skill>) =>
  request<Skill>('/skills', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
export const updateSkillAdmin = (id: string, payload: Partial<Skill>) =>
  request<Skill>(`/skills/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
export const deleteSkillAdmin = (id: string) =>
  request<{ deleted: boolean }>(`/skills/${id}`, {
    method: 'DELETE',
  });

export const createEducationAdmin = (payload: Partial<Education>) =>
  request<Education>('/education', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
export const updateEducationAdmin = (id: string, payload: Partial<Education>) =>
  request<Education>(`/education/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
export const deleteEducationAdmin = (id: string) =>
  request<{ deleted: boolean }>(`/education/${id}`, {
    method: 'DELETE',
  });

export const updateContactMessageStatus = (id: string, status: 'new' | 'read') =>
  request<ContactMessage>(`/contact/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
