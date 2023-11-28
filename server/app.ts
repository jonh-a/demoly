import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import { userRouter } from './src/routes/user';
import { songRouter } from './src/routes/song';

dotenv.config();

const MONGO_CONN = process.env?.MONGO_CONN || '';

const app: Express = express();
const version: string = '0.0.1';

app.locals.JWT_SECRET = process.env?.JWT_SECRET || '';
app.locals.PROD = process.env?.NODE_ENV === 'prod';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:8100',
    'https://demoly.usingthe.computer',
    'localhost'
  ],
}));

mongoose.connect(MONGO_CONN);

app.get('/health', (req: Request, res: Response) => res.json({ status: 'OK' }));
app.get('/version', (req: Request, res: Response) => res.json({ version }));
app.use('/user', userRouter);
app.use('/song', songRouter);

export default app;  
