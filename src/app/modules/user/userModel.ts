import { Document, model, Schema } from "mongoose";

export enum UserRole{
    USER='user',
    ADMIN='admin'
}
export interface IUser extends Document {
    name: string;
  email: string;
  password?: string;          // undefined for Google-only users
  googleId?: string;
  role: UserRole;
  isVerified: boolean;
}

const userSchema =new Schema<IUser>({

name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
  isVerified: { type: Boolean, default: false },    
} ,{
    timestamps: true
}
)
export const User = model<IUser>("User",userSchema)