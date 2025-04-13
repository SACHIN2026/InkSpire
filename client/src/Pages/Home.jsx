import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4 text-primary">Welcome to InkSpire</h1>
      <p className="text-xl text-neutral mb-6">
        Your AI-powered blogging platform built for developers, by a developer.
      </p>
      <Link to="/blogs" className="btn btn-primary">
        View Blogs
      </Link>
    </div>
  );
};

export default Home;
