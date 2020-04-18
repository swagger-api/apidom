'use strict';

const ApiDOMVisitor = require('./ApiDOM');
const OpenApi3Visitor = require('./OpenApi3');

class ParseResultVisitor extends ApiDOMVisitor {
    object(objectNode) {
        const parseResultElement = new this.namespace.elements.ParseResult();

        const openApi3Visitor = new OpenApi3Visitor(this.namespace);
        objectNode.accept(openApi3Visitor);
        parseResultElement.push(openApi3Visitor.result);

        this.result = parseResultElement;
        this.stop = true;
    }
}

module.exports = ParseResultVisitor;
