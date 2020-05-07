'use strict';

const { AST: { JsonString }} = require('json-ast');
const ApiDOMVisitor = require('./ApiDOM');
const { decorateWithSourcemap } = require('../utils');

class InfoVisitor extends ApiDOMVisitor {
    visit(node) {
        if (this.result === null) {
            this.result = decorateWithSourcemap(node, new this.namespace.elements.Info());
        }

        return super.visit(node);
    }

    property(propertyNode) {
        if (propertyNode.value instanceof JsonString) {
            const keyElement = this.toElement(propertyNode.key);
            const valueElement = this.toElement(propertyNode.value);
            const { MemberElement } = this.namespace.elements.Element.prototype;

            this.result.push(decorateWithSourcemap(propertyNode, new MemberElement(keyElement, valueElement)));
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