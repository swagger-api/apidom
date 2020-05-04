'use strict';

const { AST: { JsonNode }} = require('json-ast');
const ApiDOMVisitor = require('./ApiDOM');

class SchemaVisitor extends ApiDOMVisitor {
    object(objectNode) {
        const schemaElement = new this.namespace.elements.Schema(JsonNode.toJSON(objectNode));
        const sourceMap = new this.namespace.elements.SourceMap();

        sourceMap.position = objectNode.position;
        sourceMap.astNode = objectNode;
        schemaElement.meta.set('sourceMap', sourceMap);

        this.result = schemaElement;
        this.stop = true;
    }
}

module.exports = SchemaVisitor;