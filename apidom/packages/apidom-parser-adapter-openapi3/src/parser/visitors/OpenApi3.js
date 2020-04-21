'use strict';

const ApiDOMVisitor = require('./ApiDOM');
const OpenapiVisitor = require('./Openapi');
const InfoVisitor = require('./Info');

class OpenApi3Visitor extends ApiDOMVisitor {
    constructor(...args) {
        super(...args);
        this.result = new this.namespace.elements.OpenApi3();
    }

    property(propertyNode) {
        if (propertyNode.key.value === 'openapi') {
            this.openapi(propertyNode);
        } else if (propertyNode.key.value === 'info') {
            this.info(propertyNode);
        }
    }

    openapi(propertyNode) {
        const openapiVisitor = new OpenapiVisitor(this.namespace);
        const { MemberElement } = this.namespace.elements.Element.prototype;
        const keyElement = this.toLiteral(propertyNode.key);

        propertyNode.value.accept(openapiVisitor);

        this.result.content.push(new MemberElement(keyElement, openapiVisitor.result));
    }

    info(propertyNode) {
        const infoVisitor = new InfoVisitor(this.namespace);
        const { MemberElement } = this.namespace.elements.Element.prototype;
        const keyElement = this.toLiteral(propertyNode.key);

        propertyNode.value.accept(infoVisitor);

        this.result.content.push(new MemberElement(keyElement, infoVisitor.result));
    }
}

module.exports = OpenApi3Visitor;