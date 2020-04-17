'use strict';

const ApiDOMVisitor = require('./ApiDOM');
const LiteralVisitor = require('./Literal');

class Openapi extends ApiDOMVisitor {
    property(propertyNode) {
        const keyVisitor = new LiteralVisitor();
        const valueVisitor = new LiteralVisitor();
        const { MemberElement } = this.namespace.elements.Element.prototype;

        propertyNode.key.accept(keyVisitor);
        propertyNode.value.accept(valueVisitor);

        this.result = new MemberElement(keyVisitor.result, valueVisitor.result);
        this.stop = true;
    }
}

module.exports = Openapi;