import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'viewer';
};

export type AuthenticatedRequest = Request & {
  user?: AuthUser;
};

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;

  if (!token) {
    return res.status(401).json({ success: false, error: 'Authentication required.' });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as AuthUser;
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ success: false, error: 'Invalid or expired token.' });
  }
};

export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, error: 'Admin authorization required.' });
  }

  return next();
};
