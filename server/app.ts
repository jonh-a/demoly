import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';

import { userRouter } from './src/routes/user'
import { songRouter } from './src/routes/song'

dotenv.config()

const MONGO_CONN = process.env?.MONGO_CONN || ''

const app: Express = express();
const version: string = '0.0.1';

app.locals.JWT_SECRET = process.env?.JWT_SECRET || ''

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

mongoose.connect(MONGO_CONN)

app.get('/health', (req: Request, res: Response) => res.json({ status: 'OK' }));
app.get('/version', (req: Request, res: Response) => res.json({ version }));
app.use('/user', userRouter)
app.use('/song', songRouter)

export default app;  
