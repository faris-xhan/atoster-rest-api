import cookieParser from 'cookie-parser';
import indexRouter from './routes/index.js';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';

// Load Envi
config();

const app = express();

const PUBLIC_DIRECTORY = path.resolve('.', 'public');

// Connecting Database
mongoose.connect(process.env.DATABASE_URL, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Database Connected');
  }
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(PUBLIC_DIRECTORY));
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

export default app;
