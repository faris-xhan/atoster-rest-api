import scraper from './scraper.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { after } = req.query;
  try {
    const { posts, url } = await scraper.getPosts(after);
    return res.json({ posts, meta: { url } });
  } catch (error) {
    next(error);
  }
});

export default router;
