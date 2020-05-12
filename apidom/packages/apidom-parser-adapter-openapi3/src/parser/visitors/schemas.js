'use strict';

const { visit } = require('../visitor');
const { parseSchemas } = require('../parsers/components');
const SchemaVisitor = require('./schema');

const SchemasVisitor = () => ({
  element: null,

  property(propertyNode) {
    const state = { namespace: this.namespace, sourceMap: this.sourceMap };
    const schemasElement = parseSchemas(
      { namespace: this.namespace, sourceMap: this.sourceMap },
      propertyNode,
    );

    propertyNode.value.properties.forEach(schemaNode => {
      const schemaVisitor = SchemaVisitor();
      visit(schemaNode, schemaVisitor, { state: { ...state, schemaKeyNode: schemaNode.key } });

      schemasElement.value.content.push(schemaVisitor.element);
    });

    this.element = schemasElement;

    return false;
  }
});

module.exports = SchemasVisitor;
