import cookieParser from 'cookie-parser';
import indexRouter from './routes/index.js';
import express from 'express';
import logger from 'morgan';
import path from 'path';

const app = express();

const PUBLIC_DIRECTORY = path.resolve('.', 'public');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(PUBLIC_DIRECTORY));
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

export default app;
