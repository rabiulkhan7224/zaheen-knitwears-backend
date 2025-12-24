
import mongoose from 'mongoose';
import { EnvConfig } from './env';
export class Database {
    static async connect(){
        try {
           await mongoose.connect(EnvConfig.mongoUri)
            console.log("Database connected");
        } catch (error) {
           
            console.error("Database connection error:", error);
            process.exit(1);
        }
    }
}