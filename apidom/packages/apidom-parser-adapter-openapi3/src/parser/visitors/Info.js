'use strict';

const { AST: { JsonString }} = require('json-ast');
const ApiDOMVisitor = require('./ApiDOM');

class InfoVisitor extends ApiDOMVisitor {
    constructor(...args) {
        super(...args);
        this.result = null;
    }

    visit(node) {
        if (this.result === null) {
            const sourceMap = new this.namespace.elements.SourceMap();
            sourceMap.position = node.position;

            this.result = new this.namespace.elements.Info();
            this.result.meta.set('sourceMap', sourceMap);
        }

        return super.visit(node);
    }

    property(propertyNode) {
        if (propertyNode.value instanceof JsonString) {
            const keyElement = this.toLiteral(propertyNode.key);
            const valueElement = this.toLiteral(propertyNode.value);
            const { MemberElement } = this.namespace.elements.Element.prototype;

            this.result.push(new MemberElement(keyElement, valueElement));
        } else if (propertyNode.key.value === 'license') {
            this.license(propertyNode);
        } else if (propertyNode.key.value === 'contact') {
            this.contact(propertyNode);
        }
    }

    license(propertyNode) {

    }

    contact(propertyNode) {

    }
}

module.exports = InfoVisitor;