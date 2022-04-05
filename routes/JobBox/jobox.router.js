import scraper from './jobox.scrapper.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { after = '2022-04-05T11:50:07' } = req.query;
  try {
    const { posts, url } = await scraper.getPosts(after);
    return res.json({ posts, meta: { url, count: posts.length } });
  } catch (error) {
    next(error);
  }
});

export default router;
