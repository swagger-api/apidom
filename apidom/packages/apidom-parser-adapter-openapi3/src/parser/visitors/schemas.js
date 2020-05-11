'use strict';

const { visit } = require('../visitor');
const { parseSchemas } = require('../parsers/components');
const SchemaVisitor = require('./schema');

const SchemasVisitor = () => ({
  element: null,

  property(propertyNode) {
    const state = { namespace: this.namespace, sourceMap: this.sourceMap };
    const schemaVisitor = SchemaVisitor();
    const schemasElement = parseSchemas(
      { namespace: this.namespace, sourceMap: this.sourceMap },
      propertyNode,
    );

    propertyNode.value.properties.forEach(schemaNode => {
      visit(schemaNode, schemaVisitor, { state: { ...state, schemaName: schemaNode.key.value } });

      schemasElement.value.content.push(schemaVisitor.element);
    });

    this.element = schemasElement;

    return false;
  }
});

module.exports = SchemasVisitor;
