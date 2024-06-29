import { Schema, model } from 'mongoose';

const blogSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        minlength: 5,
    },
    description: {
        type: String,
        required: true,
        minlength: 12,
    },
    photo: {
        type: String,
        required: true,
    },
    categories: {
        type: [String],
        default: [],
    }
}, { timestamps: true });

const Blog = model('Blog', blogSchema);

export default Blog;
