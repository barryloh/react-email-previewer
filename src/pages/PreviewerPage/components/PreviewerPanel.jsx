import * as React from 'react';
import { Code2, Github, Laptop } from 'lucide-react';
import { renderAsync } from '@react-email/render';
import * as acorn from 'acorn';
import * as acornJsx from 'acorn-jsx';

import {
  ToggleGroup,
  ToggleGroupItem,
} from '../../../components/ui/toggle-group';
import { Button } from '../../../components/ui/button';
import Toolbar from '../../../components/toolbar';
import EmailPreviewer from './EmailPreviewer';
import HTMLCodePreviewer from './HTMLCodePreviewer';
import { parseCodeStyles, parseElement } from '../../../lib/parser';

export default function PreviewerPanel({ codeEditorRef, stylesEditorRef }) {
  const [view, setView] = React.useState('desktop');
  const [template, setTemplate] = React.useState('');
  const [templateError, setTemplateError] = React.useState(null);

  const showValue = async () => {
    if (!codeEditorRef.current || !stylesEditorRef.current) {
      console.warn('Code editors are not ready');
      return;
    }

    try {
      console.debug('** Parsing styles ** ');
      const styleAsCodes = stylesEditorRef.current.getValue();
      const parsed = acorn.parse(styleAsCodes, {
        ecmaVersion: 9,
      });
      const styles = parseCodeStyles(parsed);
      console.debug({ styles });

      setTemplateError(null);

      console.debug('** Parsing codes ** ');
      const code = codeEditorRef.current.getValue();
      const elements = acorn.Parser.extend(
        acornJsx({
          allowNamespacedObjects: true,
        }),
      ).parse(code, {
        ecmaVersion: 9,
      });
      console.debug({ elements });

      if (elements.body && elements.body.length > 0) {
        const parsedElements = elements.body[0].expression;
        const reactElements = parseElement(parsedElements, styles);

        const parsedHtml = await renderAsync(reactElements, { pretty: true });
        setTemplate(parsedHtml);
      } else {
        setTemplate('');
      }
    } catch (err) {
      console.error(err);
      setTemplateError('An error has occurred. Check console for more details');
    }
  };

  return (
    <div className="flex flex-col h-[100%]">
      <Toolbar>
        <Button type="button" size="sm" onClick={showValue}>
          Preview
        </Button>
        <div className="h-[1px] flex-1" />
        <ToggleGroup
          type="single"
          variant="outline"
          size="xs"
          value={view}
          onValueChange={(value) => {
            if (value) {
              setView(value);
            }
          }}>
          <ToggleGroupItem value="desktop" aria-label="Toggle desktop view">
            <Laptop className="h-4 w-5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="code" aria-label="Toggle code">
            <Code2 className="h-4 w-5" />
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="h-[1px] flex-1" />
        <Button
          className="mr-1"
          variant="outline"
          type="button"
          size="sm"
          asChild>
          <a
            className="block"
            href="https://react.email"
            target="_blank"
            rel="noopener noreferrer">
            <p>react.email</p>
          </a>
        </Button>
        <Button variant="ghost" type="button" size="icon" asChild>
          <a
            href="https://github.com/barryloh/react-email-previewer"
            target="_blank"
            rel="noopener noreferrer">
            <Github size={16} />
          </a>
        </Button>
      </Toolbar>
      {view === 'desktop' ? (
        <EmailPreviewer template={template} templateError={templateError} />
      ) : (
        <></>
      )}
      {view === 'code' ? <HTMLCodePreviewer template={template} /> : <></>}
    </div>
  );
}
