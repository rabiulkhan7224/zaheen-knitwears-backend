import express, { Request, Response } from 'express'
import { Database } from './config/db';

const app = express();
app.use(express.json());
Database.connect();
// Home route
const homeRoute = (_req: Request, res: Response): void => {
  res.status(200).json({
    server: 'Active',
    success: true,
    status: 200,
    message: 'This is Home Route.',
    timestamp: new Date().toISOString()
  })
};
app.get('/', homeRoute);

export default app;