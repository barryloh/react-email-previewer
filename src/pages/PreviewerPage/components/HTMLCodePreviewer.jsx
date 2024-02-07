import * as React from 'react';

export default function HTMLCodePreviewer({ template }) {
  return (
    <div className="h-[100%] p-4 text-left overflow-auto">
      <code className="text-xs text-left whitespace-pre">{template}</code>
    </div>
  );
}
