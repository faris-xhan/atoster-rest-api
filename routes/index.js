import { scrape } from '../scrapper/main.js';
const router = express.Router();
import express from 'express';
import Post from '../schema/Post.js';

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

router.post('/', async (req, res, next) => {
  const { id, title } = req.body;

  try {
    const post = new Post({ id, title });
    return res.json({
      post: await post.save(),
    });
  } catch (error) {
    next(error);
  }
});

router.get('/posted', async (req, res, next) => {
  try {
    const posts = await Post.find({}, { _id: false, __v: false });
    return res.json({ posts });
  } catch (error) {
    next(error);
  }
});

export default router;
