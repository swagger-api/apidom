'use strict';

const { addSourceMap } = require('../source-map');
const { visit } = require('../visitor');
const { ValueVisitor } = require('../visitors/generics');
const { isOpenApiExtension } = require('../predicates');

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

  if (isOpenApiExtension({}, node)) {
    memberElement.classes.push('openApiExtension');
  }

  return memberElement;
};

// parseOpenApiExtensions :: (Options, Array.<PropertyNode>) -> Element
const parseOpenApiExtensions = ({ namespace, sourceMap, accumulator }, nodeList) => {
  return nodeList
    .filter(isOpenApiExtension({}))
    .reduce((acc, node) => {
      acc.push(parseOpenApiExtension({ namespace, sourceMap }, node));
      return acc;
    }, new namespace.elements.Array());
};

module.exports = {
  parseOpenApiExtension,
  parseOpenApiExtensions,
};
