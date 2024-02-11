import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

export function getReactEmailComponentFromText(tagName) {
  switch (tagName) {
    case 'Html':
      return Html;

    case 'Head':
      return Head;

    case 'Preview':
      return Preview;

    case 'Body':
      return Body;

    case 'Button':
      return Button;

    case 'Container':
      return Container;

    case 'Hr':
      return Hr;

    case 'Img':
      return Img;

    case 'Link':
      return Link;

    case 'Section':
      return Section;

    case 'Text':
      return Text;
  }

  return null;
}

export function parseProperty(property) {
  const {
    key: { name: propertyKey },
    value,
  } = property;

  if (value.type === 'ObjectExpression') {
    const propertyValue = {};

    value.properties.map((valueProperty) => {
      const parsedValues = parseProperty(valueProperty);
      // console.log('parsedValues:', parsedValues);

      propertyValue[parsedValues.key] = parsedValues.value;
    });

    return {
      key: propertyKey,
      value: propertyValue,
    };
  }
  if (value.type === 'Literal') {
    return {
      key: propertyKey,
      value: value.value,
    };
  }

  return null;
}

export function parseElement(element, styles) {
  if (element.type === 'JSXElement') {
    // console.log('>>:', element.openingElement.name.name, element);
    const component = getReactEmailComponentFromText(
      element.openingElement.name.name,
    );

    const { attributes } = element.openingElement;

    const props = {};
    if (attributes && attributes.length > 0) {
      attributes.forEach(({ name: { name: attributeKey }, value }) => {
        let propValue = null;

        if (value.type === 'JSXExpressionContainer') {
          propValue = {};

          if (value.expression.type === 'Identifier') {
            if (styles[value.expression.name]) {
              propValue = styles[value.expression.name];
            }
          } else if (value.expression.type === 'TemplateLiteral') {
            propValue = value.expression.quasis[0].value.cooked;
          } else if (value.expression.type === 'ObjectExpression') {
            value.expression.properties.forEach((property) => {
              const cv = parseProperty(property);

              propValue[cv.key] = cv.value;
            });
          }
        } else if (value.type === 'Literal') {
          propValue = value.value;
        }

        props[attributeKey] = propValue;
      });
    }

    // console.log(props);

    const children = element.children.map((child) =>
      parseElement(child, styles),
    );
    // console.log('children:', children);

    const reactElement = React.createElement(
      component,
      props,
      children.length > 0
        ? children.length === 1
          ? children[0]
          : children
        : null,
    );
    return reactElement;
  }
  if (element.type === 'JSXText') {
    return element.value;
  }

  return <></>;
}

export function parseCodeStyles(nodes) {
  if (nodes.type !== 'Program') {
    console.warn('Invalid nodes');
    throw new Error('Invalid nodes');
  }

  const styles = {};

  nodes.body.forEach((node) => {
    if (node.type === 'VariableDeclaration' && node.declarations) {
      const [declaration] = node.declarations;

      if (
        declaration.type === 'VariableDeclarator' &&
        declaration.init.type === 'ObjectExpression'
      ) {
        const variableName = declaration.id.name;

        const values = {};
        declaration.init.properties.forEach((property) => {
          const parsedProperty = parseProperty(property);
          if (parsedProperty) {
            const { key, value } = parsedProperty;
            values[key] = value;
          }
        });

        styles[variableName] = values;
      }
    }
  });

  return styles;
}

/*
export function parseAttributesToReactProps(domNode) {
  let props = {};

  let propKey = null;
  let propValueMap = '';

  // props = { class: { a: '123', ... } }

  let propValueKey = null;
  let isIteratingValue = false;

  console.log(domNode.attributes);
  domNode.attributes.forEach(({ name, value }, index) => {
    console.log('>>:', propValueKey, propKey, index, propValueMap);

    if (value === '{{') {
      propKey = name;
    }
    else if (name === '}}') {
      propValueMap = `{${propValueMap}}`;
      console.log('PropValueMap:', propValueMap);

      props[propKey] = JSON.parse(propValueMap);

      propKey = null;
    }
    else if (propKey) {
      if (name.charAt(name.length - 1) !== ':') {
        isIteratingValue= true;
        let formattedName = name.replaceAll(/'/g, '"');

        if (name.charAt(name.length - 1) === ',') {
          formattedName = formattedName.slice(0, formattedName.length - 1);
        }

        propValueMap = `${propValueMap}${isIteratingValue ? ' ': ''}${formattedName}`;
      }
      else {
        isIteratingValue = false;

        // Remove ":" at the end of the sentence
        let formattedName = name.slice(0, name.length - 1);

        // Only add quotes if no quote sare found
        if (formattedName.charAt(0) !== '"' && formattedName.charAt(0) !== "'") {
          formattedName = `"${formattedName}":`;
        }

        if (propValueMap.length > 0) {
          propValueMap = `${propValueMap},${formattedName}`;
        }
        else {
          propValueMap = `${formattedName}`;
        }
      }
    }
  });

  if (Object.keys(props).length === 0) {
    props = {
      ...props,
      ...(attributesToProps(domNode.attribs) || {})
    }
  }

  return props;
}
*/
