import {attributesToProps} from "html-react-parser";

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