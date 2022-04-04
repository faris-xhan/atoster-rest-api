import express from 'express';
import { scrape } from '../scrapper/main.js';
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { posts, url, ids } = await scrape(3);

    return res.json({
      posts,
      meta: {
        count: posts.length,
        url,
        ids,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
