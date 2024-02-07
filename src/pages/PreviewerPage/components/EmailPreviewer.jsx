import * as React from 'react';

export default function EmailPreviewer({ template, templateError }) {
  return templateError ? (
    <p className="font-sm font-medium mt-4">{templateError}</p>
  ) : (
    <iframe
      title="react.email Previewer"
      className="w-[100%] h-[100%]"
      srcDoc={template}
    />
  );
}
