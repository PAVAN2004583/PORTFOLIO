import type { Request, Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.js';
import * as portfolioService from '../services/portfolioService.js';
import { errorResponse, successResponse } from '../utils/response.js';

const toString = (value: unknown, fallback = ''): string => {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.join(',');
  return fallback;
};

export const listProjects = (_req: Request, res: Response) => {
  return res.json(successResponse(portfolioService.getProjectList()));
};

export const getProject = (req: Request, res: Response) => {
  const project = portfolioService.getProjectById(String(req.params.id));
  if (!project) return res.status(404).json(errorResponse('Project not found.'));
  return res.json(successResponse(project));
};

export const createProject = (req: AuthenticatedRequest, res: Response) => {
  const payload = req.body ?? {};
  const title = toString(payload.title);
  const description = toString(payload.description);
  if (!title || !description) {
    return res.status(400).json(errorResponse('Title and description are required.'));
  }

  const project = portfolioService.createProject({
    title,
    description,
    technologies: Array.isArray(payload.technologies) ? payload.technologies.map((item: unknown) => String(item)) : [],
    github_url: toString(payload.github_url),
    live_url: toString(payload.live_url),
    image_url: toString(payload.image_url),
    featured: Boolean(payload.featured),
  });

  return res.status(201).json(successResponse(project));
};

export const updateProject = (req: AuthenticatedRequest, res: Response) => {
  const project = portfolioService.updateProject(String(req.params.id), req.body ?? {});
  if (!project) return res.status(404).json(errorResponse('Project not found.'));
  return res.json(successResponse(project));
};

export const deleteProject = (req: AuthenticatedRequest, res: Response) => {
  const deleted = portfolioService.deleteProject(String(req.params.id));
  if (!deleted) return res.status(404).json(errorResponse('Project not found.'));
  return res.json(successResponse({ deleted: true }));
};

export const listSkills = (_req: Request, res: Response) => {
  return res.json(successResponse(portfolioService.getSkillList()));
};

export const createSkill = (req: AuthenticatedRequest, res: Response) => {
  const payload = req.body ?? {};
  const name = toString(payload.name);
  const category = toString(payload.category);
  if (!name || !category) {
    return res.status(400).json(errorResponse('Name and category are required.'));
  }

  const skill = portfolioService.createSkill({
    name,
    category,
    level: toString(payload.level, 'Intermediate'),
  });

  return res.status(201).json(successResponse(skill));
};

export const updateSkill = (req: AuthenticatedRequest, res: Response) => {
  const skill = portfolioService.updateSkill(String(req.params.id), req.body ?? {});
  if (!skill) return res.status(404).json(errorResponse('Skill not found.'));
  return res.json(successResponse(skill));
};

export const deleteSkill = (req: AuthenticatedRequest, res: Response) => {
  const deleted = portfolioService.deleteSkill(String(req.params.id));
  if (!deleted) return res.status(404).json(errorResponse('Skill not found.'));
  return res.json(successResponse({ deleted: true }));
};

export const listEducation = (_req: Request, res: Response) => {
  return res.json(successResponse(portfolioService.getEducationList()));
};

export const createEducationItem = (req: AuthenticatedRequest, res: Response) => {
  const payload = req.body ?? {};
  const degree = toString(payload.degree);
  const institution = toString(payload.institution);
  const startDate = toString(payload.start_date);
  if (!degree || !institution || !startDate) {
    return res.status(400).json(errorResponse('Degree, institution, and start date are required.'));
  }

  const item = portfolioService.createEducation({
    degree,
    institution,
    description: toString(payload.description),
    start_date: startDate,
    end_date: toString(payload.end_date, '') || null,
  });

  return res.status(201).json(successResponse(item));
};

export const updateEducationItem = (req: AuthenticatedRequest, res: Response) => {
  const item = portfolioService.updateEducation(String(req.params.id), req.body ?? {});
  if (!item) return res.status(404).json(errorResponse('Education record not found.'));
  return res.json(successResponse(item));
};

export const deleteEducationItem = (req: AuthenticatedRequest, res: Response) => {
  const deleted = portfolioService.deleteEducation(String(req.params.id));
  if (!deleted) return res.status(404).json(errorResponse('Education record not found.'));
  return res.json(successResponse({ deleted: true }));
};

export const listContactMessages = (_req: AuthenticatedRequest, res: Response) => {
  return res.json(successResponse(portfolioService.getContactMessages()));
};

export const createContactMessage = (req: Request, res: Response) => {
  const payload = req.body ?? {};
  const name = toString(payload.name);
  const email = toString(payload.email);
  const message = toString(payload.message);
  if (!name || !email || !message) {
    return res.status(400).json(errorResponse('Name, email, and message are required.'));
  }

  const created = portfolioService.createContactMessage({
    name,
    email,
    message,
  });

  return res.status(201).json(successResponse(created));
};

export const updateContactMessage = (req: AuthenticatedRequest, res: Response) => {
  const payload = req.body ?? {};
  const status = toString(payload.status);
  if (!status || (status !== 'new' && status !== 'read')) {
    return res.status(400).json(errorResponse('Status must be new or read.'));
  }

  const message = portfolioService.updateContactMessageStatus(String(req.params.id), status as 'new' | 'read');
  if (!message) return res.status(404).json(errorResponse('Contact message not found.'));
  return res.json(successResponse(message));
};

export const getResume = (_req: Request, res: Response) => {
  return res.json(successResponse(portfolioService.getResume()));
};

export const updateResume = (req: AuthenticatedRequest, res: Response) => {
  const url = toString(req.body?.url).trim();
  if (!url) return res.status(400).json(errorResponse('Resume URL is required.'));

  return res.json(successResponse(portfolioService.setResume(url)));
};
