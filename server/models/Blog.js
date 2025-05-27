import mongoose from "mongoose"

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        tags: [{ type: String }],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true },
)

// Virtual for like count
blogSchema.virtual("likeCount").get(function () {
    return this.likes.length
})

const Blog = mongoose.model("Blog", blogSchema)
export default Blog
