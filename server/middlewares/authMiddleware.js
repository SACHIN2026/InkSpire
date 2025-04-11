// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// // Middleware to protect routes

// export const protect = async (req, res, next) =>{
//     let token;

//     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
//         token = req.headers.authorization.split(' ')[1];
//     }

//     if(!token){
//         return res.status(401).json({message : "Not authorized, no token"});
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await User.findById(decoded.id).select('-password');
//         next();
//     }
//     catch (error) {
//         return res.status(401).json({message : "Not authorized, token failed"});
//     }
// }

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    // Step 1: Check for token in header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        console.log("🔐 Token received:", token);
    } else {
        console.log("❌ No token found in Authorization header");
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        // Step 2: Check JWT_SECRET
        console.log("🔑 JWT_SECRET:", process.env.JWT_SECRET);

        // Step 3: Decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token decoded:", decoded);

        // Step 4: Fetch user
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            console.log("❌ No user found with decoded ID:", decoded.id);
            return res.status(404).json({ message: "User not found" });
        }

        console.log("👤 Authenticated user:", user.email || user._id);

        req.user = user;
        next();
    } catch (error) {
        console.error("❌ JWT verification failed:", error.message);
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
};
