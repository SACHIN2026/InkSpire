// server/controllers/userController.js
import User from "../models/User.js";  // <— you need this import for getUserProfile

// GET /api/users/profile   (protected)
export const getProfile = (req, res) => {
  // req.user was set by your authMiddleware
  res.status(200).json(req.user);
};

// GET /api/users/:id   (public)
export const getUserProfile = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "No user ID provided" });
    }

    // Use a more robust approach to handle the user query
    let query = User.findById(req.params.id).select("-password");

    // Check if the User schema has a blogs field before trying to populate it
    const userSchema = User.schema.obj;
    if (userSchema.blogs) {
      query = query.populate("blogs");
    }

    const user = await query;

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error("getUserProfile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
