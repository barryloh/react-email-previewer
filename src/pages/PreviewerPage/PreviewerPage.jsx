import * as React from 'react';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../../components/ui/resizable';
import CodeEditor from './components/CodeEditor';
import PreviewerPanel from './components/PreviewerPanel';

export default function PreviewerPage() {
  const codeEditorRef = React.useRef(null);
  const stylesEditorRef = React.useRef(null);

  const onCodeEditorMount = (editor) => {
    codeEditorRef.current = editor;
  };

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="min-w-[500px]" defaultSize={50}>
        <CodeEditor
          onMount={onCodeEditorMount}
          onStylesEditorMount={(_editor) => {
            stylesEditorRef.current = _editor;
          }}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="min-w-[600px]" defaultSize={50}>
        <PreviewerPanel
          codeEditorRef={codeEditorRef}
          stylesEditorRef={stylesEditorRef}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
