import scrapeRouter from './routes/scrape/scrape.js';
import indexRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import express from 'express';
import logger from 'morgan';
import path from 'path';

// Load Env
config();

const app = express();

mongoose.connect(process.env.DATABASE_URL, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Database Connected');
  }
});

const PUBLIC_DIRECTORY = path.resolve('.', 'public');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(PUBLIC_DIRECTORY));
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/scrape', scrapeRouter);

export default app;
