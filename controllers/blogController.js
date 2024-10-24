import express from 'express';
import Blog from '../models/blogModel.js';



// Create a new blog
export const createBlog = async (req, res) => {
    try {
        const blog = await Blog.create ({ ...req.body, userId: req.user.id})
        return res.status(201).json(blog)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        return res.status(200).json(blogs);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
};

// Get a blog by ID
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById (req.params.id)
        if(!blog) {
            return res.status(404).json({message: 'Blog not found'})
        }
        return res.status(200).json(blog)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
};

// Update a blog by ID
export const updateBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (!blog){
            return res.status(404).json({message: 'Blog not found'})
        }
        if (blog.userId.toString() !== req.user.id) {
            return res.status(403).json({message: 'You are not authorized to update this blog'})
        }
        const updatedBlog = await Blog.findByIdAndUpdate ( req.params.id, {$set: req.body}, {new: true});
        return res.status(200).json(updatedBlog);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
};

// Delete a blog by ID
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if(!blog) {
            return res.status(404).json({message: 'Blog not found'});
        }
        if (blog.userId.toString() !== req.user.id) {
            return res.status(403).json({message: 'You are not authorized to delete this blog'});
        }
        await Blog.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: 'Blog deleted successfully'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }
};