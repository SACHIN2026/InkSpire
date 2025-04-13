import Blog from "../models/Blog.js";

//create a blog

export const createBlog = async (req , res ) => {
    try {
        const {title , content, tags} = req.body;
        const blog = await Blog.create({
            title,
            content,
            tags,
            author : req.user._id,
            published: true, // Set published to true by default
        });
        res.status(201).json({blog});

    } catch (error) {
        res.status(500).json({message : error.message});
    }
};

//get all blogs

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({published: true}).populate('author', 'username');
        res.status(200).json({blogs});

    } catch (error) {
        res.status(500).json({message : error.message});
        
    }
};


//update a blog post by id

export const updateBlog = async (req,res) =>{
    try {
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({message : "Blog not found"});
        }

        // //check if the user is the author of the blog post
        // if(blog.author.toString() !== req.user._id.toString()){
        //     return res.status(401).json({message : "You are not authorized to update this blog"});
        // }
        
        Object.assign(blog, req.body);
        await blog.save();
        res.status(200).json({blog});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};

//delete a blog post by id

export const deleteBlog = async (req, res) =>{
    try {
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({message : "Blog not found"});
        }

        // //check if the user is the author of the blog post
        // if(blog.author.toString() !== req.user._id.toString()){
        //     return res.status(401).json({message : "You are not authorized to delete this blog"});
        // }
        await blog.deleteOne();
        res.status(200).json({message : "Blog deleted successfully"});

    } catch (error) {
        res.status(500).json({message : error.message});
    }
};

