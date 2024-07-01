import express from 'express';
import Blog from '../models/blog.js';
import verifyToken from '../middleware/verifyToken.js';

const blogRouter = express.Router();

// Get all blogs
blogRouter.get('/getAll', async (req, res) => {
    try {
        const blogs = await Blog.find({});
        return res.status(200).json(blogs);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Get a blog by ID
blogRouter.get('/find/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Create a new blog
blogRouter.post('/', verifyToken, async (req, res) => {
    try {
        const blog = await Blog.create({ ...req.body, userId: req.user.id });
        return res.status(201).json(blog);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

blogRouter.put('/updatedBlog/:id', verifyToken, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (blog.userId !== req.user.id) {
            throw new Error("You can only update your own posts")
        }
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        return res.status(200).json(updatedBlog)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


blogRouter.delete('/deleteBlog/:id', verifyToken, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (blog.userId !== req.user.id) {
            throw new Error("You can delete only your own posts")
        }
        const deleteBlog = await Blog.findByIdAndDelete(req.params.id)
        return res.status(200).json({msg: 'Successfully deleted Blog'})
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


export default blogRouter;
