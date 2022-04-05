import express from 'express';
import scrapper from './scraper.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { after = '2022-04-05T10:44:28' } = req.query;

  const { posts, url } = await scrapper.getPosts(after);

  return res.json({ posts, meta: { url } });
});

export default router;
