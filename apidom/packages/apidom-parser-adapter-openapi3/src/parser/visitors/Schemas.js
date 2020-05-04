'use strict';

const { AST: { JsonString }} = require('json-ast');
const ApiDOMVisitor = require('./ApiDOM');
const SchemaVisitor = require('./Schema');

class SchemasVisitor extends ApiDOMVisitor {
    visit(node) {
        if (this.result === null) {
            const sourceMap = new this.namespace.elements.SourceMap();
            sourceMap.position = node.position;
            sourceMap.astNode = node;

            this.result = new this.namespace.elements.Schemas();
            this.result.meta.set('sourceMap', sourceMap);
        }

        return super.visit(node);
    }

    object(objectNode) {
        objectNode.properties.forEach(propertyNode => {
            const keyElement = this.toElement(propertyNode.key);
            const { MemberElement } = this.namespace.elements.Element.prototype;
            const schemaVisitor = new SchemaVisitor(this.namespace);

            propertyNode.value.accept(schemaVisitor);
            this.result.push(new MemberElement(keyElement, schemaVisitor.result));
        });
        this.stop = true;
    }
}

module.exports = SchemasVisitor;