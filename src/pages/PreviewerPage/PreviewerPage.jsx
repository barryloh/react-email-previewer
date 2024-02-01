import * as React from 'react';
import { renderAsync } from '@react-email/render';
import parse, { attributesToProps, domToReact } from 'html-react-parser';
import { Head, Body, Preview, Img, Section, Text, Hr, Button as ButtonEmail, Container, Link } from '@react-email/components';
import JSON5 from 'json5'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "../../components/ui/resizable";
import { Button } from '../../components/ui/button';
import CodeEditor from "./components/CodeEditor";

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
      else if (nameCleaned === 'hr') {
        return <Hr {...props} />;
      }
      else if (nameCleaned === 'button1') {
        return <ButtonEmail {...props}>{domToReact(children, options)}</ButtonEmail>;
      }
      else if (nameCleaned === 'img') {
        return <Img {...props}></Img>;
      }
      else if (nameCleaned === 'link') {
        return <Link {...props}>{domToReact(children, options)}</Link>
      }
      else if (nameCleaned === 'head') {
        return <Head {...props}>{domToReact(children, options)}</Head>
      }
      else if (nameCleaned === 'preview') {
        return <Preview {...props}>{domToReact(children, options)}</Preview>
      }
      else if (nameCleaned === 'body1') {
        return <Body {...props}>{domToReact(children, options)}</Body>
      }
      else if (nameCleaned === 'section1') {
        return <Section {...props}>{domToReact(children, options)}</Section>;
      }
      else if (nameCleaned === 'container1') {
        return <Container {...props}>{domToReact(children, options)}</Container>;
      }
    }

    return null;
  }
};

export default function PreviewerPage() {
  const codeEditorRef = React.useRef(null);

  const [template, setTemplate] = React.useState('');
  const [templateError, setTemplateError] = React.useState(null);

  const onCodeEditorMount = (editor) => {
    codeEditorRef.current = editor;
  }

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

      const indexesStartOfJSONAttribute = [...parsedCode.matchAll(new RegExp(/{{/g, 'gi'))].map(str => str.index).reverse();
      const indexesEndOfJSONAttribute = [...parsedCode.matchAll(new RegExp(/}}/g, 'gi'))].map(str => str.index).reverse();

      if (indexesStartOfJSONAttribute.length > 0) {
        indexesStartOfJSONAttribute.forEach((startIndex, i) => {
          const endIndex = indexesEndOfJSONAttribute[i];

          const jsonAttribute = parsedCode.slice(startIndex + 2, endIndex);
          let data = JSON5.stringify(JSON5.parse('{' + jsonAttribute + '}'));

          data = data.replaceAll(/"/g, '\\"');
          console.log('data:', data);

          parsedCode = parsedCode.substring(0, startIndex) + '"{' + data + '}"' + parsedCode.substring(endIndex + 2, parsedCode.length);
        })
      }
      //
      // parsedCode = parsedCode.replaceAll(/={{/g, "={{");
      // parsedCode = parsedCode.replaceAll(/}}/g, "}}");

      console.log(parsedCode);

      const parsedToReactElment = parse(parsedCode, {
        // htmlparser2: {
        //   Tokenizer:
        // },
        ...options
      });
      const html = await renderAsync(parsedToReactElment, {
        pretty: false
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

  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="min-w-[500px]" defaultSize={50}>
        <CodeEditor
          onMount={onCodeEditorMount}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className={"min-w-[600px]"} defaultSize={50}>
        <div className="flex flex-col h-[100%]">
          <div className={"flex flex-row items-center h-[40px] border-b-2 px-4"}>
            <Button type={"button"} size="sm" onClick={showValue}>Preview</Button>
          </div>
          <div className="flex-1">
            {templateError ? (
              <p className="font-sm font-medium mt-4">{templateError}</p>
            ): (
              <iframe
                title="react.email Previewer"
                className={"w-[100%] h-[100%]"}
                srcDoc={template}
              />
            )}
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}