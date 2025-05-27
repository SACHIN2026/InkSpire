import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    bio: {
        type: String,
        default: "",
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    }]

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;