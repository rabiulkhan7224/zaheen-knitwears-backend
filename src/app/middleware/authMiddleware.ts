import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../modules/auth/authService';

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;

    // 1. Check cookie first
    if (req.cookies?.token) {
      token = req.cookies.token;
    }
    // 2. Fallback to Bearer header (for API clients like mobile/Postman)
    else if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({ success: false, message: 'Not authorized, no token' });
      return;
    }

    const decoded = AuthService.verifyToken(token);
    req.user = { id: decoded.id, role: decoded.role };

    next();
    return;
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
    return;
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes((req.user as any).role)) {
      return next(new Error('You do not have permission to perform this action'));
    }
    return next();
  };
};