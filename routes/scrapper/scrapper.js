import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  return res.json({ message: 'Say hello to scrapper' });
});

export default router;
