import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';


const blogSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        minlength: 5,
    },
    content: {
        type: String,
        required: true,
        minlength: 20,
    },
    photo: {
        type: String,
        required: false,
    },
    categories: {
        type: [String],
        default: [],
    }
}, { timestamps: true });

const Blog = model('Blog', blogSchema);

export default Blog;
