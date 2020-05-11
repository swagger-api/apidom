'use strict';

const { addSourceMap } = require('../source-map');

// parseSchemas :: (Options, JsonNode) -> Element
const parseSchemas = ({ namespace, sourceMap }, node) => {
  const schemasKeyElement = new namespace.elements.String('schemas');
  const { MemberElement } = namespace.elements.Element.prototype;
  const schemasElement = new namespace.elements.Object();

  schemasElement.classes.push('schemas');

  return new MemberElement(
    sourceMap ? addSourceMap(node.key, schemasKeyElement) : schemasKeyElement,
    sourceMap ? addSourceMap(node.value, schemasElement) : schemasElement
  );
};

// parseComponents :: (Options, JsonNode) -> Element
const parseComponents = ({ namespace, sourceMap }, node) => {
  const componentsKeyElement = new namespace.elements.String('components');
  const componentsElement = new namespace.elements.Components();
  const { MemberElement } = namespace.elements.Element.prototype;

  return new MemberElement(
    sourceMap ? addSourceMap(node.key, componentsKeyElement) : componentsKeyElement,
    sourceMap ? addSourceMap(node.value, componentsElement) : componentsElement
  );
};

module.exports = parseComponents;
module.exports.parseSchemas = parseSchemas;
