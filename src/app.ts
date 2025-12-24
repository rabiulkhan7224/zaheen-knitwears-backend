import express, { Request, Response } from 'express'
import { Database } from './config/db';
import router from './app/routers';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './app/middleware/errorMiddleware';

const app = express();
app.use(express.json());
app.use(cookieParser());
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