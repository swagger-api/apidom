'use strict';

const { AST: { JsonNode }} = require('json-ast');
const ApiDOMVisitor = require('./ApiDOM');
const { decorateWithSourcemap } = require('../utils');

class SchemaVisitor extends ApiDOMVisitor {
    object(objectNode) {
        this.result = decorateWithSourcemap(objectNode, new this.namespace.elements.Schema(JsonNode.toJSON(objectNode)));;
        this.stop = true;
    }
}

module.exports = SchemaVisitor;