"use client"
import { motion } from "framer-motion"

const MenuBar = ({ editor }) => {
  if (!editor) return null

  return (
    <motion.div
      className="flex flex-wrap gap-1 mb-3 p-1 bg-base-200 rounded-lg"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        tooltip="Bold"
      >
        <i className="fa-solid fa-bold"></i>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        tooltip="Italic"
      >
        <i className="fa-solid fa-italic"></i>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        tooltip="Underline"
      >
        <i className="fa-solid fa-underline"></i>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        tooltip="Strikethrough"
      >
        <i className="fa-solid fa-strikethrough"></i>
      </ToolbarButton>

      <ToolbarDivider />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        tooltip="Bullet List"
      >
        <i className="fa-solid fa-list-ul"></i>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        tooltip="Ordered List"
      >
        <i className="fa-solid fa-list-ol"></i>
      </ToolbarButton>

      <ToolbarDivider />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        tooltip="Quote"
      >
        <i className="fa-solid fa-quote-left"></i>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
        tooltip="Code Block"
      >
        <i className="fa-solid fa-code"></i>
      </ToolbarButton>

      <ToolbarDivider />

      <ToolbarButton
        onClick={() => {
          const url = window.prompt("Enter URL")
          if (url) {
            editor.chain().focus().setLink({ href: url }).run()
          }
        }}
        isActive={editor.isActive("link")}
        tooltip="Add Link"
      >
        <i className="fa-solid fa-link"></i>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().unsetLink().run()}
        tooltip="Remove Link"
        disabled={!editor.isActive("link")}
      >
        <i className="fa-solid fa-link-slash"></i>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => {
          const url = window.prompt("Enter Image URL")
          if (url) {
            editor.chain().focus().setImage({ src: url }).run()
          }
        }}
        tooltip="Insert Image"
      >
        <i className="fa-solid fa-image"></i>
      </ToolbarButton>
    </motion.div>
  )
}

// Toolbar button component
const ToolbarButton = ({ children, onClick, isActive, tooltip, disabled = false }) => (
  <motion.button
    onClick={onClick}
    className={`btn btn-sm ${isActive ? "btn-primary" : "btn-ghost"} ${disabled ? "btn-disabled" : ""}`}
    whileHover={!disabled ? { scale: 1.05 } : {}}
    whileTap={!disabled ? { scale: 0.95 } : {}}
    title={tooltip}
    disabled={disabled}
  >
    {children}
  </motion.button>
)

// Toolbar divider component
const ToolbarDivider = () => <div className="w-px h-6 bg-base-300 mx-1" />

export default MenuBar
