'use strict';

const { AST: { JsonNode } } = require('json-ast');

const { visit } = require('../visitor');

const SchemaVisitor = () => ({
  element: null,
  schema: null,

  object(objectNode) {
    const { MemberElement } = this.namespace.elements.Element.prototype;

    this.schema = new this.namespace.elements.Schema(JsonNode.toJSON(objectNode));
    this.element = new MemberElement(this.schemaName, this.schema);

    return false;
  }
});

module.exports = SchemaVisitor;
