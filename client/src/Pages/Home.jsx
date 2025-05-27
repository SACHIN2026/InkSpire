import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => (
  <motion.div
    className="text-center py-20"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.5 }}
  >
    <h1 className="text-5xl font-bold mb-4 text-primary">Welome to InkSpire</h1>
    <p className="text-xl text-neutral mb-6 text-purple-50">
 or AI-powered blogging platform built for developers, by a developer.
    </p>
    <Link to="/blogs" className="btn btn-primary">
      View Blogs
    </Link>
  </motion.div>
);

export default Home;
