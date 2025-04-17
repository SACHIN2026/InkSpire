import express from 'express';
import multer from 'multer';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'blog_images',
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
    },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res)=>{
    try {
        res.status(200).json({
            message: 'Image uploaded successfully',
            imageUrl: req.file.path,
        });
        
    } catch (error) {
        return res.status(500).json({ message: 'Error uploading image' });
        
    }
})

export default router;