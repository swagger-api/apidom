'use strict';

const { isComponentsSchemas } = require('../predicates');
const parseOpenApi3 = require('../parsers/open-api3');
const { visit } = require('../visitor');
const SchemasVisitor = require('./schemas');

const DocumentVisitor = () => ({
  element: null,

  document(documentNode) {
    const openApi3Element = parseOpenApi3(
      { namespace: this.namespace, sourceMap: this.sourceMap },
      documentNode.child
    );

    this.element = new this.namespace.elements.ParseResult();
    this.element.content.push(openApi3Element);
  },

  property(propertyNode, key, parent, path, ancestors) {
    if (isComponentsSchemas({ ancestors }, propertyNode)) {
      const componentsElement = this.element.findByElement('components').first;
      const state = { namespace: this.namespace, sourceMap: this.sourceMap };
      const schemasVisitor = SchemasVisitor();

      visit(propertyNode, schemasVisitor, { state });

      componentsElement.content.push(schemasVisitor.element);

      return false;
    }
  }
});

module.exports = DocumentVisitor;
