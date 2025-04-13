import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true,
    },

    content : {
        type: String,
        required : true,
    },

    tags : [
        {type: String}
    ],

    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    },

    published: {
        type: Boolean,
        default: true, // Default to true for published blogs
    }


}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;