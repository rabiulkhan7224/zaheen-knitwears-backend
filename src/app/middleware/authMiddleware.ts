import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../modules/auth/authService';

export const protect= async(req:Request, res:Response, next:NextFunction) => {
try {
    let token=req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null;
    if(!token){
        return res.status(401).json({success:false, message:'Not authorized, no token'});
    }
    const decoded= AuthService.verifyToken(token);
    req.user={ id: decoded.id,role: decoded.role };
    next();
} catch (error) {
    next(error);
}
}

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new Error('You do not have permission to perform this action'));
    }
    next();
  };
};