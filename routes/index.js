import express from 'express';
import { scrape } from '../scrapper/main.js';
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await scrape();

    return res.json({
      posts,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
