import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const ADMIN_ID = process.env.ADMIN_ID || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const JWT_SECRET = process.env.JWT_SECRET || 'tastypickle_jwt_secret_dev_key';

export interface AdminPayload {
  adminId: string;
  role: 'admin';
}

export function validateAdminCredentials(id: string, pass: string): boolean {
  if (!ADMIN_PASSWORD) {
    console.error('[Auth] ADMIN_PASSWORD environment variable is not configured');
    return false;
  }
  return id === ADMIN_ID && pass === ADMIN_PASSWORD;
}

export function generateAdminToken(adminId: string): string {
  return jwt.sign({ adminId, role: 'admin' }, JWT_SECRET, {
    expiresIn: '7d',
  });
}

export interface AuthenticatedRequest extends Request {
  admin?: AdminPayload;
}

export function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Missing or invalid token',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;

    if (decoded.role !== 'admin' || decoded.adminId !== ADMIN_ID) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Invalid admin privileges',
      });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Session expired or invalid token',
    });
  }
}
