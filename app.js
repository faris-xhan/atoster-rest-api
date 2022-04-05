import jobsPkRouter from './routes/JobsPk/jobsPk.router.js';
import jobBoxRouter from './routes/JobBox/jobox.router.js';
import indexRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import express from 'express';
import logger from 'morgan';
import path from 'path';

// Load Env
config();

const app = express();

const PUBLIC_DIRECTORY = path.resolve('.', 'public');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(PUBLIC_DIRECTORY));
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/jobbox', jobBoxRouter);
app.use('/jobspk', jobsPkRouter);

export default app;
