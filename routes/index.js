import express from 'express';
import jobsBoxScrapper from './JobBox/jobox.scrapper.js';
import jobsPkScapper from './JobsPk/jobsPk.scrapper.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { jobsBoxAfter, jobsPkAfter } = req.query;
  const promises = Promise.all([
    jobsBoxScrapper.getPosts(jobsBoxAfter),
    jobsPkScapper.getPosts(jobsPkAfter),
  ]);

  promises
    .then((values) => {
      return res.json({
        data: values,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

export default router;
