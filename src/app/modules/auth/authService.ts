import jwt from "jsonwebtoken";
import { Response } from "express";
import { IUser, User, UserRole } from "../user/userModel";
import { EnvConfig } from "./../../../config/env";
import bcrypt from "bcryptjs";

export class AuthService {
  private generateToken(user: IUser): string {
    return jwt.sign({ id: user._id, role: user.role }, EnvConfig.jwtSecret, {
      expiresIn: "7d",
    });
  }

  private setAuthCookie(res: Response, token: string) {
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
      httpOnly: true,           // JS can't access (prevents XSS)
      secure: isProduction,     // Only sent over HTTPS in production
      sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-site if frontend on different domain
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (match JWT expiration)
      path: '/',                // Available throughout the site
    });
  }

  // Helper to clear cookie on logout
  static clearAuthCookie(res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
    });
  }

  sendTokenResponse(res: Response, user: IUser, message: string, statusCode: number) {
    const token = this.generateToken(user);
    this.setAuthCookie(res, token);

    res.status(statusCode).json({
      success: true,
      message: message,
      token: token,
      data: { 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      },
    });
  }

  async register(data: { name: string; email: string; password: string }) {
    console.log(data)
// Check if email already exists
    const existingUser = await User.findOne({ email: data.email.toLowerCase() });

    if (existingUser) {
      // Throw a clear error (will be caught in controller)
      throw new Error('Email already in use. Please login or use a different email.');
    }    const hashed = await bcrypt.hash(data.password, 10);
    const user = await User.create({ ...data, password: hashed });

    return { user, token: this.generateToken(user) };
  }

  async login(data: { email: string; password: string }) {
    const user = await User.findOne({ email: data.email });
    if (!user || !user.password) {
      throw new Error("Invalid credentials");
    }

    const match = await bcrypt.compare(data.password, user.password);
    if (!match) throw new Error("Invalid credentials");
    return { user, };
  }

async getUserById(id: string): Promise<IUser | null> {
  return await User.findById(id).select('-password -googleId');
}

  static verifyToken(token: string) {
    return jwt.verify(token, EnvConfig.jwtSecret) as {
      id: string;
      role: UserRole;
    };
  }
}
// Auth service methods would go here
