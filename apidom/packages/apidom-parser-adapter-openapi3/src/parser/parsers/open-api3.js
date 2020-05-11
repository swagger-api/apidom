'use strict';

const parseOpenapi = require('./openapi');
const parseInfo = require('./info');
const parseComponents = require('./components');

// parseOpenApi3 :: (Options, JsonNode) -> Element
const parseOpenApi3 = ({ namespace, sourceMap }, node) => {
  const openApi3Element = new namespace.elements.OpenApi3();
  const state = { namespace, sourceMap };

  node.properties.forEach(propertyNode => {
    if (propertyNode.key.value === 'openapi') {
      openApi3Element.content.push(parseOpenapi(state, propertyNode));
    } else if (propertyNode.key.value === 'info') {
      openApi3Element.content.push(parseInfo(state, propertyNode));
    } else if (propertyNode.key.value === 'components') {
      openApi3Element.content.push(parseComponents(state, propertyNode));
    }
  });

  return openApi3Element;
};

module.exports = parseOpenApi3;
