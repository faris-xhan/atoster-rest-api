import { scrape } from '../scrapper/main.js';
const router = express.Router();
import express from 'express';

router.get('/', async (req, res, next) => {
  const { per_page = 3 } = req.query;

  try {
    const { posts, url, ids } = await scrape(per_page);

    return res.json({
      posts,
      meta: {
        count: posts.length,
        per_page,
        url,
        ids,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
