import {Router} from 'express';
import { createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlog } from '../controllers/blogController.js';
import verifyToken from '../middleware/verifyToken.js';

const blogRouter = Router();

blogRouter.post('/', verifyToken, createBlog);
blogRouter.get('/', getAllBlogs);
blogRouter.get('/:id', getBlogById);
blogRouter.patch('/:id', verifyToken, updateBlogById);
blogRouter.delete('/:id', verifyToken, deleteBlog);


export default blogRouter;
