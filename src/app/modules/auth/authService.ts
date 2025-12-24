import jwt from "jsonwebtoken";
import { IUser, User, UserRole } from "../user/userModel";
import { EnvConfig } from "./../../../config/env";
import bcrypt from "./../../../../node_modules/bcryptjs/index.d";

export class AuthService {
  private generateToken(user: IUser): string {
    return jwt.sign({ id: user._id, role: user.role }, EnvConfig.jwtSecret, {
      expiresIn: "7d",
    });
  }

  async register(data: { name: string; email: string; password: string }) {
    const hashed = await bcrypt.hash(data.password, 10);
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
    return { user, token: this.generateToken(user) };
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
