import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  return res.json({ message: 'Hello Friend' });
});

export default router;
