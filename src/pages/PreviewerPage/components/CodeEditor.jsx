import * as React from 'react';
import Editor from '@monaco-editor/react';
import Toolbar from '../../../components/toolbar';
import { Combobox } from '../../../components/ui/combobox';
import { getTemplates } from '../../../templates/templates';

export default function CodeEditor({ onMount }) {
  const codeEditorRef = React.useRef(null);

  const onEditorMount = (editor) => {
    codeEditorRef.current = editor;
    if (onMount) {
      onMount(editor);
    }
  };

  const onSelectItem = (item) => {
    codeEditorRef.current.setValue(item.template);
  };

  return (
    <div className="flex flex-col h-[100%]">
      <Toolbar className="bg-[#1e1e1e]">
        <Combobox
          items={getTemplates()}
          placeholder="Select template"
          searchPlaceholder="Search templates"
          emptyPlaceholder="No template found"
          onSelectItem={onSelectItem}
        />
      </Toolbar>
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
        onMount={onEditorMount}
      />
    </div>
  );
}
