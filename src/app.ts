
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { Database } from './config/db';
import router from './app/routers';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './app/middleware/errorMiddleware';

const app:Application = express();
app.use(express.json());
app.use(cookieParser());
// CORS Configuration - MUST come before routes
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Your frontend URL
    credentials: true, // ← Crucial: allows cookies to be sent
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
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
app.use('/api/v1', router);
// error
app.use(globalErrorHandler);

export default app;