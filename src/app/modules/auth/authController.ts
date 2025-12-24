import { Request, Response, NextFunction } from "express";
import { AuthValidator } from "../../validators/authValidator";
import { AuthService } from "./authService";

export class AuthController{
    private authService: AuthService;
    constructor(){
        this.authService = new AuthService();
    }

    async register(req:Request, res:Response, next:NextFunction){
        try {
            const validateData=AuthValidator.registerSchema.parse(req.body)
            const {user,token}= await this.authService.register(validateData)
            res.status(201).json({
                success:true,
                message: 'User registered successfully',
                data:{
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
            token: token
                }
            })
      
      
        } catch (error) {
            next(error);
        }
    }

    async login(req:Request, res:Response, next:NextFunction){
        try {
            const validateData=AuthValidator.loginSchema.parse(req.body)
            const {user,}= await this.authService.login(validateData)
            this.authService.sendTokenResponse(res, user, 'User logged in successfully', 200);
            
        } catch (error) {
            next(error);
        }
        

    }

    async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // req.user is attached by protect middleware
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Not authenticated' });
        return;
      }

      const user = await this.authService.getUserById(req.user.id);

      if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
      return;
    } catch (error) {
      next(error);
    }
  }

  async logout(_req: Request, res: Response, next: NextFunction) {
    try {
      AuthService.clearAuthCookie(res);
      res.status(200).json({
        success: true,
        message: 'User logged out successfully',
      });
      return;
    } catch (error) {
      next(error);
    }
  }

}






    
