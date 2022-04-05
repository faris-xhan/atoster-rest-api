import express from 'express';
import jobsBoxScrapper from './JobBox/jobox.scrapper.js';
import jobsPkScapper from './JobsPk/jobsPk.scrapper.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const promises = Promise.all([
    jobsBoxScrapper.getPosts(),
    jobsPkScapper.getPosts(),
  ]);

  promises
    .then((values) => {
      return res.json({
        data: values,
      });
    })
    .catch((err) => {
      return next(error);
    });
});

export default router;
