
'use client'

import { useState } from "react";
import Markdown from "react-markdown";
import rehypeLight from "rehype-highlight";
// import "highlight.js/styles/atom-one-dark.min.css";

import './editor.css'

const MarkdownEditor = () => {
    const [markdown, setMarkdown] = useState('');
  
    const handleInputChange = (e) => {
      setMarkdown(e.target.value);
    };
  
    const insertText = (text) => {
      setMarkdown(markdown + text);
    };
  
    return (
      <div className="markdown-editor-container flex flex-col">
        <div className="toolbar bg-gray-200 p-2 flex gap-3">
          <button onClick={() => insertText('# Heading 1\n')}>H1</button>
          <button onClick={() => insertText('## Heading 2\n')}>H2</button>
          <button onClick={() => insertText('**bold text**')}>Bold</button>
          <button onClick={() => insertText('*italic text*')}>Italic</button>
          <button onClick={() => insertText('- List item\n')}>List</button>
          <button onClick={() => insertText('```code```')}>Code</button>
        </div>
        <textarea
          className="markdown-input w-full h-1/2 p-4 border-b-2 border-gray-300"
          value={markdown}
          onChange={handleInputChange}
        />
        <div className="markdown-preview w-full h-1/2 p-4 overflow-auto">
          <Markdown rehypePlugins={[rehypeLight]}>{markdown}</Markdown>
        </div>
      </div>
    );
  };
  

  export default MarkdownEditor;