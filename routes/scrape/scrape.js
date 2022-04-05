import jobBoxRouter from './JobBox/router.js';
const router = express.Router();
import express from 'express';

router.get('/', (req, res, next) => {
  return res.json({ message: 'Say hello to scrapper' });
});

router.use('/jobbox', jobBoxRouter);

export default router;
