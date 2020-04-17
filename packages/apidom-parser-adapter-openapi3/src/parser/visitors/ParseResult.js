'use strict';

const ApiDOMVisitor = require('./ApiDOM');
const OpenApi3Visitor = require('./OpenApi3');

class ParseResultVisitor extends ApiDOMVisitor {
    object(objectNode) {
        this.result = new this.namespace.elements.ParseResult();

        const openApi3Visitor = new OpenApi3Visitor(this.namespace);
        objectNode.accept(openApi3Visitor);
        this.result.push(openApi3Visitor.result);

        this.stop = true;
    }
}

module.exports = ParseResultVisitor;
