'use strict';

const ApiDOMVisitor = require('./ApiDOM');
const OpenapiVisitor = require('./Openapi');

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
        const visitor = new OpenapiVisitor(this.namespace);
        propertyNode.accept(visitor);
        this.result.content.push(visitor.result);
    }

    info(propertyNode) {

    }
}

module.exports = OpenApi3Visitor;