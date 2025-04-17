// src/components/LexicalEditor.jsx
import React, { useEffect, useCallback } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { $generateHtmlFromNodes } from '@lexical/html';
import MenuBar from './MenuBar';

const theme = {
  paragraph: 'mb-4',
};

const editorConfig = {
  namespace: 'LexicalEditor',
  theme,
  editorState: null,
  onError: (error) => {
    console.error('Lexical Editor Error:', error);
  },
};

const LexicalEditor = ({ value, onChange = () => {} }) => {
  const handleChange = useCallback((editorState) => {
    editorState.read(() => {
      const html = $generateHtmlFromNodes(editorState, null);
      onChange(html);
    });
  }, [onChange]);

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="border border-gray-300 rounded-md p-4 mb-4">
        <MenuBar />
        <RichTextPlugin
          contentEditable={<ContentEditable className="min-h-[150px] outline-none" />}
          placeholder={<div className="text-gray-500">Write your blog post here...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={handleChange} />
      </div>
    </LexicalComposer>
  );
};

export default LexicalEditor;
