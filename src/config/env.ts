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
    // Add more as needed (e.g., JWT_SECRET)
}