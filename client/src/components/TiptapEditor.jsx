import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
const TiptapEditor = ({value, onchange = () => {}}) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: value,
        onUpdate({editor}){
            onchange(editor.getHTML())
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




  return <EditorContent editor={editor} className="border border-gray-300 rounded-md p-4 mb-4" />
  
}

export default TiptapEditor;
