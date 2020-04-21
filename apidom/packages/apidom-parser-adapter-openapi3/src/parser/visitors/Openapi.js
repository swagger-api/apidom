'use strict';

const ApiDOMVisitor = require('./ApiDOM');
const LiteralVisitor = require('./Literal');

class Openapi extends ApiDOMVisitor {
    value(valueNode) {
        const valueVisitor = new LiteralVisitor();
        const sourceMap = new this.namespace.elements.SourceMap();

        valueNode.accept(valueVisitor);
        sourceMap.position = valueNode.position;

        const openapi = new this.namespace.elements.Openapi();
        openapi.set(valueVisitor.result);
        openapi.meta.set('sourceMap', sourceMap);

        this.result = openapi;
        this.stop = true;
    }
}

module.exports = Openapi;