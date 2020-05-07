'use strict';

const { AST: { JsonString }} = require('json-ast');
const ApiDOMVisitor = require('./ApiDOM');
const SchemaVisitor = require('./Schema');
const { decorateWithSourcemap } = require('../utils');

class SchemasVisitor extends ApiDOMVisitor {
    visit(node) {
        if (this.result === null) {
           this.result = decorateWithSourcemap(node, new this.namespace.elements.Schemas());
        }

        return super.visit(node);
    }

    object(objectNode) {
        objectNode.properties.forEach(propertyNode => {
            const keyElement = this.toElement(propertyNode.key);
            const { MemberElement } = this.namespace.elements.Element.prototype;
            const schemaVisitor = new SchemaVisitor(this.namespace);

            propertyNode.value.accept(schemaVisitor);
            this.result.push(decorateWithSourcemap(propertyNode, new MemberElement(keyElement, schemaVisitor.result)));
        });
        this.stop = true;
    }
}

module.exports = SchemasVisitor;