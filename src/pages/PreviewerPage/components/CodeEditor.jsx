import * as React from 'react';
import Editor from '@monaco-editor/react';
import Toolbar from '../../../components/toolbar';
// import { Combobox } from '../../../components/ui/combobox';

export default function CodeEditor({ onMount }) {
  return (
    <div className="flex flex-col h-[100%]">
      <Toolbar className="bg-[#1e1e1e]">{/* <Combobox /> */}</Toolbar>
      <Editor
        height="100vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        options={{
          inlineSuggest: true,
          fontSize: '12px',
          formatOnType: true,
          autoClosingBrackets: true,
          minimap: { scale: 10 },
        }}
        onMount={onMount}
      />
    </div>
  );
}
