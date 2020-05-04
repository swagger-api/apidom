'use strict';

const ApiDOMVisitor = require('./ApiDOM');

class OpenapiVisitor extends ApiDOMVisitor {
    value(valueNode) {
        const openapi = new this.namespace.elements.Openapi();
        const element = this.toElement(valueNode);
        openapi.set(element.toValue());
        openapi.meta.set('sourceMap', element.meta.get('sourceMap'));

        this.result = openapi;
        this.stop = true;
    }
}

module.exports = OpenapiVisitor;