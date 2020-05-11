'use strict';

const { addSourceMap } = require('../source-map');

// parseOpenapi :: (Options, JsonNode) -> Element
const parseOpenapi = ({ namespace, sourceMap }, node) => {
  const keyElement = new namespace.elements.String(node.key.value);
  const openapiElement = new namespace.elements.Openapi(node.value.value);
  const { MemberElement } = namespace.elements.Element.prototype;

  return new MemberElement(
    sourceMap ? addSourceMap(node.key, keyElement) : keyElement,
    sourceMap ? addSourceMap(node.value, openapiElement): openapiElement,
  )
};

module.exports = parseOpenapi;
