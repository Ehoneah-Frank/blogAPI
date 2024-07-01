import express from 'express';
import authRouter from '../controllers/auth.js';
import blogRouter from '../controllers/blog.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/blogs', blogRouter);

export default router;
