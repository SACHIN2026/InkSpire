import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const BlogEditor = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Grab the JWT from localStorage (set at login)
    const token = localStorage.getItem("token");
    if (!token) {
      // Not logged in—redirect to login page
      return navigate("/login");
    }

    const blogData = {
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    try {
      const res = await axios.post("/blogs", blogData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Blog successfully submitted:", res.data);

      // Navigate to the new blog's details page
      navigate(`/blogs/${res.data.blog._id}`);
    } catch (error) {
      console.error("Error submitting blog:", error.response?.data || error.message);
        // Handle error (e.g., show a notification or alert)
        alert("Failed to submit blog. Please try again.");
        if (error.response?.status === 401) {
            navigate("/login");
          }
    }
    
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-4">Create Blog Post</h1>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          initialValue={content}
          init={{
            height: 500,
            menubar: false,
            plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image',
                'charmap', 'print', 'preview', 'anchor',
                'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'paste', 'help', 'wordcount'
              ],
            toolbar:
              "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
            file_picker_types: 'image',
            file_picker_callback: function(callback, value, meta){
                if(meta.filetype == 'image'){
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.onchange = async function () {
                        const file = this.files[0];
                        const formData = new FormData();
                        formData.append('file', file);
                        try {
                            const res = await axios.post('/upload', formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            });

                            // const data = await res.json();
                            //to tinyMCE
                            callback(res.data.imageUrl, {alt: file.name});

                        } catch (error) {
                            console.error('Error uploading image:', error);
                            alert('Failed to upload image. Please try again.');
                        }
                    };
                    input.click(); 
                }
            }
          }}
          onEditorChange={handleEditorChange}
        />
        <button
          type="submit"
          className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default BlogEditor;
