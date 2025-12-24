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
            const {user,token}= await this.authService.login(validateData)
            res.status(200).json({
                success:true,
                message: 'User logged in successfully',
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

}






    
