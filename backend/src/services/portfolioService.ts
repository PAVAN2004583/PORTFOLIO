import { portfolioState, type ContactMessage, type Education, type Project, type Skill } from '../data/portfolio.js';

export const getProjectList = () => [...portfolioState.projects];
export const getProjectById = (id: string) => portfolioState.projects.find((project) => project.id === id) ?? null;

export const createProject = (payload: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
  const newProject: Project = {
    ...payload,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  portfolioState.projects.unshift(newProject);
  return newProject;
};

export const updateProject = (id: string, payload: Partial<Project>) => {
  const project = portfolioState.projects.find((item) => item.id === id);
  if (!project) return null;

  Object.assign(project, payload, { updated_at: new Date().toISOString() });
  return project;
};

export const deleteProject = (id: string) => {
  const index = portfolioState.projects.findIndex((item) => item.id === id);
  if (index === -1) return false;

  portfolioState.projects.splice(index, 1);
  return true;
};

export const getSkillList = () => [...portfolioState.skills];
export const createSkill = (payload: Omit<Skill, 'id' | 'created_at'>) => {
  const newSkill: Skill = {
    ...payload,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };

  portfolioState.skills.push(newSkill);
  return newSkill;
};

export const updateSkill = (id: string, payload: Partial<Skill>) => {
  const skill = portfolioState.skills.find((item) => item.id === id);
  if (!skill) return null;

  Object.assign(skill, payload);
  return skill;
};

export const deleteSkill = (id: string) => {
  const index = portfolioState.skills.findIndex((item) => item.id === id);
  if (index === -1) return false;

  portfolioState.skills.splice(index, 1);
  return true;
};

export const getEducationList = () => [...portfolioState.education];
export const createEducation = (payload: Omit<Education, 'id' | 'created_at'>) => {
  const newEducation: Education = {
    ...payload,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };

  portfolioState.education.unshift(newEducation);
  return newEducation;
};

export const updateEducation = (id: string, payload: Partial<Education>) => {
  const education = portfolioState.education.find((item) => item.id === id);
  if (!education) return null;

  Object.assign(education, payload);
  return education;
};

export const deleteEducation = (id: string) => {
  const index = portfolioState.education.findIndex((item) => item.id === id);
  if (index === -1) return false;

  portfolioState.education.splice(index, 1);
  return true;
};

export const getContactMessages = () => [...portfolioState.contactMessages];
export const createContactMessage = (payload: Omit<ContactMessage, 'id' | 'created_at' | 'status'>) => {
  const newMessage: ContactMessage = {
    ...payload,
    id: crypto.randomUUID(),
    status: 'new',
    created_at: new Date().toISOString(),
  };

  portfolioState.contactMessages.unshift(newMessage);
  return newMessage;
};

export const updateContactMessageStatus = (id: string, status: ContactMessage['status']) => {
  const message = portfolioState.contactMessages.find((item) => item.id === id);
  if (!message) return null;

  message.status = status;
  return message;
};

export const getResume = () => portfolioState.resume;
export const setResume = (url: string) => {
  portfolioState.resume = { ...portfolioState.resume, url };
  return portfolioState.resume;
};
