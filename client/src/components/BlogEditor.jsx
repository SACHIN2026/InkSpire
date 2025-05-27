"use client"

import { useState } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { useNavigate } from "react-router-dom"
import axios from "../api/axios"
import { useNotification } from "../context/NotificationContext"
import { suggestTitle, summarizeBlog, generateOutline } from "../api/ai"
import { motion } from "framer-motion"

const BlogEditor = () => {
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const token = localStorage.getItem("token")

  const handleSuggestTitle = async () => {
    if (!content) {
      showNotification("error", "Please write some content first")
      return
    }

    setIsProcessing(true)
    try {
      const { data } = await suggestTitle(content, token)
      if (data?.title) {
        setTitle(data.title)
        showNotification("success", "Title suggested successfully!")
      }
    } catch (error) {
      console.error("Error suggesting title:", error)
      showNotification("error", "Failed to suggest title. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSummarizeBlog = async () => {
    if (!content) {
      showNotification("error", "Please write some content first")
      return
    }

    setIsProcessing(true)
    try {
      const { data } = await summarizeBlog(content, token)
      if (data?.summary) {
        setContent(data.summary)
        showNotification("success", "Blog summarized successfully!")
      }
    } catch (error) {
      console.error("Error summarizing blog:", error)
      showNotification("error", "Failed to summarize blog. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleGenerateOutline = async () => {
    if (!content) {
      showNotification("error", "Please write some content first")
      return
    }

    setIsProcessing(true)
    try {
      const { data } = await generateOutline(content, token)
      if (data?.outline) {
        setContent(data.outline)
        showNotification("success", "Outline generated successfully!")
      }
    } catch (error) {
      console.error("Error generating outline:", error)
      showNotification("error", "Failed to generate outline. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleEditorChange = (newContent) => {
    setContent(newContent)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      showNotification("error", "Please enter a title for your blog")
      return
    }

    // Ensure content is a string before trimming
    const contentString = typeof content === 'string' ? content : ''
    if (!contentString.trim()) {
      showNotification("error", "Please write some content for your blog")
      return
    }

    // Grab the JWT from localStorage (set at login)
    if (!token) {
      // Not logged in—redirect to login page
      showNotification("error", "You must be logged in to create a blog.")
      return navigate("/login")
    }

    const blogData = {
      title,
      content: contentString,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    setIsSubmitting(true)
    try {
      const res = await axios.post("/blogs", blogData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // Show success notification
      showNotification("success", "Blog submitted successfully!")

      // Navigate to the new blog's details page
      navigate(`/blogs/${res.data.blog._id}`)
    } catch (error) {
      // Show error notification
      showNotification("error", "Failed to submit blog. Please try again.")
      console.error("Error submitting blog:", error.response?.data || error.message)

      if (error.response?.status === 401) {
        navigate("/login")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.h1
          className="text-3xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Create Blog Post
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter your blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <label htmlFor="tags" className="block text-sm font-medium mb-1">
            Tags
          </label>
          <input
            id="tags"
            type="text"
            placeholder="Enter tags separated by commas (e.g., technology, programming, web)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="input input-bordered w-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border rounded-lg overflow-hidden"
        >
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            initialValue={content}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "print",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "paste",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
              file_picker_types: "image",
              file_picker_callback: (callback, value, meta) => {
                if (meta.filetype == "image") {
                  const input = document.createElement("input")
                  input.setAttribute("type", "file")
                  input.setAttribute("accept", "image/*")
                  input.onchange = async function () {
                    const file = this.files[0]
                    const formData = new FormData()
                    formData.append("file", file)
                    try {
                      const res = await axios.post("/upload", formData, {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      })
                      callback(res.data.imageUrl, { alt: file.name })
                    } catch (error) {
                      console.error("Error uploading image:", error)
                      showNotification("error", "Failed to upload image. Please try again.")
                    }
                  }
                  input.click()
                }
              },
            }}
            onEditorChange={handleEditorChange}
          />
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            type="submit"
            disabled={isSubmitting || isProcessing}
            className="btn btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fa-solid fa-paper-plane mr-2"></i>
            {isSubmitting ? "Submitting..." : "Submit Blog"}
          </motion.button>

          <motion.button
            type="button"
            onClick={handleSuggestTitle}
            disabled={isSubmitting || isProcessing}
            className="btn btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fa-solid fa-sparkles mr-2"></i>
            {isProcessing ? "Processing..." : "Suggest Title"}
          </motion.button>

          <motion.button
            type="button"
            onClick={handleSummarizeBlog}
            disabled={isSubmitting || isProcessing}
            className="btn btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fa-solid fa-file-lines mr-2"></i>
            {isProcessing ? "Processing..." : "Summarize Blog"}
          </motion.button>

          <motion.button
            type="button"
            onClick={handleGenerateOutline}
            disabled={isSubmitting || isProcessing}
            className="btn btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fa-solid fa-list mr-2"></i>
            {isProcessing ? "Processing..." : "Generate Outline"}
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  )
}

export default BlogEditor
