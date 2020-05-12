'use strict';

const { addSourceMap } = require('../source-map');
const { visit } = require('../visitor');
const { ObjectVisitor } = require('./generics');

const SchemaVisitor = () => ({
  element: null,

  object(objectNode) {
    const { MemberElement } = this.namespace.elements.Element.prototype;
    const schemaKeyElement = new this.namespace.elements.String(this.schemaKeyNode.value);
    const state = { namespace: this.namespace, sourceMap: this.sourceMap };
    const objectVisitor = ObjectVisitor();

    visit(objectNode, objectVisitor, { state });
    const schemaElement = new this.namespace.elements.Schema(objectVisitor.element.content)

    this.element = new MemberElement(
      this.sourceMap ? addSourceMap(this.schemaKeyNode, schemaKeyElement) : schemaKeyElement,
      this.sourceMap ? addSourceMap(objectNode, schemaElement) : schemaElement,
    );

    return false;
  }
});

module.exports = SchemaVisitor;
