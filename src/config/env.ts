
export class EnvConfig {
    static get port():number{
        return parseInt(process.env.PORT || '5000');
    }
    static get mongoUri():string{
        return process.env.MONGO_URI || 'mongodb://localhost:27017/myapp';
    }
    // Add more as needed (e.g., JWT_SECRET)
}