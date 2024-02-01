import * as React from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({ onMount }) {
  return (
    <Editor
      height="100vh"
      defaultLanguage="javascript"
      theme="vs-dark"
      options={{
        inlineSuggest: true,
        fontSize: "12px",
        formatOnType: true,
        autoClosingBrackets: true,
        minimap: { scale: 10 }
      }}
      onMount={onMount}
    />
  )
}