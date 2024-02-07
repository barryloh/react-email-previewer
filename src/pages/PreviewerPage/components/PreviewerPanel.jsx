import * as React from 'react';
import { Code2, Github, Laptop } from 'lucide-react';
import JSON5 from 'json5';
import parse, { attributesToProps, domToReact } from 'html-react-parser';
import { renderAsync } from '@react-email/render';
import {
  Body,
  Button as ButtonEmail,
  Container,
  Head,
  Hr,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '../../../components/ui/toggle-group';
import { Button } from '../../../components/ui/button';
import Toolbar from '../../../components/toolbar';
import EmailPreviewer from './EmailPreviewer';
import HTMLCodePreviewer from './HTMLCodePreviewer';

const options = {
  htmlparser2: {
    lowerCaseTags: false,
    lowerCaseAttributeNames: false,
  },
  trim: false,
  replace(domNode) {
    const { name, attribs, children } = domNode;

    if (name) {
      const nameCleaned = name.toLowerCase().trim();

      const props = attributesToProps(attribs) || {};
      if (attribs.style) {
        // console.log('AS:', attribs, domNode.attributes);
        let styles = attribs.style;
        styles = styles.replace('{{', '{');
        styles = styles.replace('}}', '}');
        // console.log('Styles:', styles);

        props.style = JSON5.parse(styles);
      }

      if (nameCleaned === 'text') {
        return <Text {...props}>{domToReact(children, options)}</Text>;
      }
      if (nameCleaned === 'hr') {
        return <Hr {...props} />;
      }
      if (nameCleaned === 'button1') {
        return (
          <ButtonEmail {...props}>{domToReact(children, options)}</ButtonEmail>
        );
      }
      if (nameCleaned === 'img') {
        return <Img {...props} />;
      }
      if (nameCleaned === 'link') {
        return <Link {...props}>{domToReact(children, options)}</Link>;
      }
      if (nameCleaned === 'head') {
        return <Head {...props}>{domToReact(children, options)}</Head>;
      }
      if (nameCleaned === 'preview') {
        return <Preview {...props}>{domToReact(children, options)}</Preview>;
      }
      if (nameCleaned === 'body1') {
        return <Body {...props}>{domToReact(children, options)}</Body>;
      }
      if (nameCleaned === 'section1') {
        return <Section {...props}>{domToReact(children, options)}</Section>;
      }
      if (nameCleaned === 'container1') {
        return (
          <Container {...props}>{domToReact(children, options)}</Container>
        );
      }
    }

    return null;
  },
};

export default function PreviewerPanel({ codeEditorRef }) {
  const [view, setView] = React.useState('desktop');
  const [template, setTemplate] = React.useState('');
  const [templateError, setTemplateError] = React.useState(null);

  const showValue = async () => {
    try {
      setTemplateError(null);

      const code = codeEditorRef.current.getValue();

      // const a = await renderAsync(<>
      // <Html lang="en">
      //   <Head />
      //   <Preview>Dropbox reset your password</Preview>
      //   <Body style={{
      //     backgroundColor: "#f6f9fc",
      //     padding: "10px 0",
      //   }}>
      //     <Container style={{
      //       backgroundColor: "#ffffff",
      //       border: "1px solid #f0f0f0",
      //       padding: "45px",
      //     }}></Container>
      //   </Body>
      // </Html>
      // </>);
      // console.log('A:', a);

      // <Container style={{
      //       backgroundColor: "#ffffff",
      //       border: "1px solid #f0f0f0",
      //       padding: "45px",
      //     }}>
      //       <Img
      //         src="https://demo.react.email/static/dropbox-logo.png"
      //         width="40"
      //         height="33"
      //         alt="Dropbox"
      //       />
      //       <Section>
      //         <Text>Some title</Text>
      //         <Hr />
      //         <Button href="https://example.com">Click me</Button>
      //       </Section>
      //     </Container>

      let parsedCode = code.replaceAll(/Html/g, 'html1');
      parsedCode = parsedCode.replaceAll(/Body/g, 'body1');
      parsedCode = parsedCode.replaceAll(/Section/g, 'section1');
      parsedCode = parsedCode.replaceAll(/Button/g, 'button1');
      parsedCode = parsedCode.replaceAll(/Container/g, 'container1');
      parsedCode = parsedCode.replaceAll(/\n/g, '');
      // parsedCode = parsedCode.replaceAll(/={{/g, "='{{");
      // parsedCode = parsedCode.replaceAll(/}}/g, "}}'");

      const indexesStartOfJSONAttribute = [
        ...parsedCode.matchAll(new RegExp(/{{/g, 'gi')),
      ]
        .map((str) => str.index)
        .reverse();
      const indexesEndOfJSONAttribute = [
        ...parsedCode.matchAll(new RegExp(/}}/g, 'gi')),
      ]
        .map((str) => str.index)
        .reverse();

      if (indexesStartOfJSONAttribute.length > 0) {
        indexesStartOfJSONAttribute.forEach((startIndex, i) => {
          const endIndex = indexesEndOfJSONAttribute[i];

          const jsonAttribute = parsedCode.slice(startIndex + 2, endIndex);
          let data = JSON5.stringify(JSON5.parse(`{${jsonAttribute}}`));

          data = data.replaceAll(/"/g, '\\"');
          console.log('data:', data);

          parsedCode = `${parsedCode.substring(
            0,
            startIndex,
          )}"{${data}}"${parsedCode.substring(
            endIndex + 2,
            parsedCode.length,
          )}`;
        });
      }
      //
      // parsedCode = parsedCode.replaceAll(/={{/g, "={{");
      // parsedCode = parsedCode.replaceAll(/}}/g, "}}");

      console.log(parsedCode);

      const parsedToReactElment = parse(parsedCode, {
        // htmlparser2: {
        //   Tokenizer:
        // },
        ...options,
      });
      const html = await renderAsync(parsedToReactElment, {
        pretty: true,
      });

      if (html) {
        let parsedHtml = html.replace('<html1', '<!DOCTYPE html><html');
        parsedHtml = parsedHtml.replace('</html1>', '</html>');

        console.log('Html:', parsedHtml);
        setTemplate(parsedHtml);
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
      <div className="flex-1">
        {view === 'desktop' ? (
          <EmailPreviewer template={template} templateError={templateError} />
        ) : (
          <></>
        )}
        {view === 'code' ? <HTMLCodePreviewer template={template} /> : <></>}
      </div>
    </div>
  );
}
