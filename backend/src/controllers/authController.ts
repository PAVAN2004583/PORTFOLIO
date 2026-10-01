import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import { env } from '../config/env.js';
import { getAdminUser } from '../data/portfolio.js';
import type { ApiResponse } from '../utils/response.js';
import type { AuthenticatedRequest } from '../middleware/auth.js';

const createToken = (user: { id: string; email: string; name: string; role: 'admin' | 'viewer' }) =>
  jwt.sign(user, env.jwtSecret, { expiresIn: '8h' });

export const login = async (req: Request, res: Response<ApiResponse<{ token: string; user: { id: string; email: string; name: string; role: 'admin' | 'viewer' } }>>) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required.' });
  }

  const adminUser = getAdminUser();
  if (String(email).toLowerCase() !== adminUser.email.toLowerCase()) {
    return res.status(401).json({ success: false, error: 'Invalid email or password.' });
  }

  const isValidPassword = await bcrypt.compare(String(password), adminUser.passwordHash);
  if (!isValidPassword) {
    return res.status(401).json({ success: false, error: 'Invalid email or password.' });
  }

  const payload = { id: adminUser.id, email: adminUser.email, name: adminUser.name, role: adminUser.role };
  const token = createToken(payload);

  return res.status(200).json({
    success: true,
    data: {
      token,
      user: payload,
    },
  });
};

export const me = (req: AuthenticatedRequest, res: Response<ApiResponse<{ id: string; email: string; name: string; role: 'admin' | 'viewer' }>>) => {
  if (!req.user) {
    return res.status(401).json({ success: false, error: 'Authentication required.' });
  }

  return res.json({ success: true, data: req.user });
};

export const logout = (_req: Request, res: Response<ApiResponse<null>>) => {
  res.json({ success: true, data: null });
};
