import { Router } from 'express';
import { askAI } from '../controllers/aiController.js';
import { login, logout, me } from '../controllers/authController.js';
import {
  createContactMessage,
  createEducationItem,
  createProject,
  createSkill,
  deleteEducationItem,
  deleteProject,
  deleteSkill,
  getProject,
  getResume,
  listContactMessages,
  listEducation,
  listProjects,
  listSkills,
  updateContactMessage,
  updateEducationItem,
  updateProject,
  updateResume,
  updateSkill,
} from '../controllers/portfolioController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

export const apiRouter = Router();

apiRouter.get('/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok', service: 'portfolio-backend' } });
});

apiRouter.post('/auth/login', login);
apiRouter.post('/auth/logout', logout);
apiRouter.get('/auth/me', authenticate, me);

apiRouter.get('/projects', listProjects);
apiRouter.get('/projects/:id', getProject);
apiRouter.post('/projects', authenticate, requireAdmin, createProject);
apiRouter.put('/projects/:id', authenticate, requireAdmin, updateProject);
apiRouter.delete('/projects/:id', authenticate, requireAdmin, deleteProject);

apiRouter.get('/skills', listSkills);
apiRouter.post('/skills', authenticate, requireAdmin, createSkill);
apiRouter.put('/skills/:id', authenticate, requireAdmin, updateSkill);
apiRouter.delete('/skills/:id', authenticate, requireAdmin, deleteSkill);

apiRouter.get('/education', listEducation);
apiRouter.post('/education', authenticate, requireAdmin, createEducationItem);
apiRouter.put('/education/:id', authenticate, requireAdmin, updateEducationItem);
apiRouter.delete('/education/:id', authenticate, requireAdmin, deleteEducationItem);

apiRouter.get('/contact', authenticate, requireAdmin, listContactMessages);
apiRouter.post('/contact', createContactMessage);
apiRouter.patch('/contact/:id', authenticate, requireAdmin, updateContactMessage);

apiRouter.get('/resume', getResume);
apiRouter.put('/resume', authenticate, requireAdmin, updateResume);

apiRouter.post('/ai/ask', askAI);
