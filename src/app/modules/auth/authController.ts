import { Request, Response, NextFunction } from "express";
import { AuthValidator } from "../../validators/authValidator";
import { AuthService } from "./authService";
import { OAuth2Client } from "google-auth-library";
import { EnvConfig } from "../../../config/env";
const googleClient = new OAuth2Client(EnvConfig.googleClientId);
export class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    
    try {

      const validateData = AuthValidator.registerSchema.parse(req.body);
      
      // 


      const { user, token } = await this.authService.register(validateData);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token: token,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validateData = AuthValidator.loginSchema.parse(req.body);
      const { user } = await this.authService.login(validateData);
      this.authService.sendTokenResponse(
        res,
        user,
        "User logged in successfully",
        200
      );
    } catch (error) {
      next(error);
    }
  };

  getMe = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // req.user is attached by protect middleware
      if (!req.user) {
        res.status(401).json({ success: false, message: "Not authenticated" });
        return;
      }

      const user = await this.authService.getUserById((req.user as any).id);

      if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
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
  };

  //
  logout = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      AuthService.clearAuthCookie(res);
      res.status(200).json({
        success: true,
        message: "User logged out successfully",
      });
      return;
    } catch (error) {
      next(error);
    }
  };

  googleTokenLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { token } = req.body;

      if (!token) {
        res.status(400).json({ success: false, message: "No token provided" });
        return;
      }

      // Verify Google ID token
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: EnvConfig.googleClientId,
      });

      const payload = ticket.getPayload();

      if (!payload || !payload.email) {
        res
          .status(401)
          .json({ success: false, message: "Invalid Google token" });
        return;
      }

      // Find or create user
      let user = await this.authService.findOrCreateGoogleUser({
        id: payload.sub,
        emails: [{ value: payload.email }],
        displayName: payload.name,
        name: {
          givenName: payload.given_name,
          familyName: payload.family_name,
        },
        photos: payload.picture ? [{ value: payload.picture }] : [],
      });

      // Set JWT cookie and respond
      this.authService.sendTokenResponse(
        res,
        user,
        "Google login successful",
        200
      );

      
      return;
    } catch (error: any) {
      next(error);
    }
  };
}
