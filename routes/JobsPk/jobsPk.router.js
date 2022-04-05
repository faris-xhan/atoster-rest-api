import scrapper from './jobsPk.scrapper.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { after } = req.query;

  try {
    const { posts, url } = await scrapper.getPosts(after);
    return res.json({ posts, meta: { url, count: posts.length } });
  } catch (error) {
    next(error);
  }
});

export default router;
