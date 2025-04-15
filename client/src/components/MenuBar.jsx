// src/components/MenuBar.jsx
import React from 'react'

const MenuBar = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 border rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 border rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 border rounded ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
      >
        Underline
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-2 border rounded ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 border rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
      >
        Bullet List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 border rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
      >
        Ordered List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 border rounded ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
      >
        Quote
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 border rounded ${editor.isActive('codeBlock') ? 'bg-gray-200' : ''}`}
      >
        Code Block
      </button>
      <button
        onClick={() => {
          const url = window.prompt("Enter URL");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={`p-2 border rounded ${editor.isActive("link") ? "bg-gray-200" : ""}`}
      >
        Link
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        className="p-2 border rounded"
      >
        Unset Link
      </button>
      <button
        onClick={() => {
          const url = window.prompt("Enter Image URL");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className="p-2 border rounded"
      >
        Image
      </button>
    </div>
  );
};

export default MenuBar;
