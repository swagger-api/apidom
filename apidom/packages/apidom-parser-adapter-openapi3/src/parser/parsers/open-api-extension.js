'use strict';

const { addSourceMap } = require('../source-map');
const { visit } = require('../visitor');
const { ValueVisitor } = require('../visitors/generics');

// parseOpenApiExtension :: (Options, PropertyNode) -> Element
const parseOpenApiExtension = ({ namespace, sourceMap }, node) => {
  const keyElement = new namespace.elements.String(node.key.value);
  const { MemberElement } = namespace.elements.Element.prototype;
  const valueVisitor = ValueVisitor();

  visit(node.value, valueVisitor, { state: { namespace, sourceMap }});

  const { element: valueElement } = valueVisitor;
  const memberElement = new MemberElement(
    sourceMap ? addSourceMap(node.key, keyElement) : keyElement,
    sourceMap ? addSourceMap(node.value, valueElement): valueElement,
  )
  memberElement.classes.push('openApiExtension');

  return memberElement;
};

module.exports = parseOpenApiExtension;
