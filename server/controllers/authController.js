import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

//Register a new user

export const registerUser = async (req, res) =>{
    try {
        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({message : "Please fill all fields"})
        }

        const userExits = await User.findOne({email});
        if(userExits){
            return res.status(400).json({message : "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password : hashedPassword,
        });

        const token = generateToken(user._id);
        res.status(201).json({
            _id : user._id,
            username : user.username,
            email : user.email,
            token,
        });
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

//Login a user

export const loginUser = async (res, req) =>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message : "Please fill all fields"})
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = generateToken(user._id);
        res.status(200).json({
            _id : user._id,
            username : user.username,
            email : user.email,
            token,
        });

        
    } catch (error) {
        res.status(500).json({message : error.message});
        
    };
}