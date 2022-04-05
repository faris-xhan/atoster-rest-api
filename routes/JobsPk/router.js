import express from 'express';
import scrapper from './scrapper.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { after = '2022-03-28T12:59:55' } = req.query;

  try {
    const { posts, url } = await scrapper.getPosts(after);
    return res.json({ posts, meta: { url } });
  } catch (error) {
    next(error);
  }
});

export default router;
