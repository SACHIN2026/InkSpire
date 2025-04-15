import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import MenuBar from './MenuBar';
const TiptapEditor = ({value, onChange = () => {}}) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
            }),
            Image,
        ],
        content: value,
        onUpdate({editor}){
            onChange(editor.getHTML())
        },
    });

    //clean up

    useEffect(() =>{
        return () =>{
            if(editor){
                editor.destroy();
            }
        }
    }, [editor]);




  return (
      <div>
          <MenuBar editor={editor} />
          <EditorContent editor={editor} className="border border-gray-300 rounded-md p-4 mb-4" />
      </div>
  )
  
}

export default TiptapEditor;
