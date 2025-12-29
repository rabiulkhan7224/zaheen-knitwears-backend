import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') })
export class EnvConfig {
    static get port():number{
        return parseInt(process.env.PORT || '5000');
    }
    static get mongoUri():string{
        return process.env.MONGO_URI || '';
    }
static get jwtSecret(): string { return process.env.JWT_SECRET!; }
  static get jwtExpiresIn(): string { return process.env.JWT_EXPIRES_IN || '7d'; }
  static get googleClientId(): string { return process.env.GOOGLE_CLIENT_ID!; }
  static get googleClientSecret(): string { return process.env.GOOGLE_CLIENT_SECRET!; }
  static get googleCallbackUrl(): string { return process.env.GOOGLE_CALLBACK_URL!; }
  static get stripeSecretKey(): string { return process.env.STRIPE_SECRET_KEY!; }
  static get stripeWebhookSecret(): string { return process.env.STRIPE_WEBHOOK_SECRET!; }
  static get frontendUrl(): string { return process.env.FRONTEND_URL!; }
  static get nodeEnv(): string { return process.env.NODE_ENV!; }

}