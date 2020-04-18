const { Visitor } = require('json-ast');
const LiteralVisitor = require('./Literal');

class ApiDOMVisitor extends Visitor {
    constructor(namespace) {
        super();
        this.namespace = namespace;
        this.result = null;
    }

    toLiteral(node) {
        const literalVisitor = new LiteralVisitor();
        node.accept(literalVisitor);
        const element = this.namespace.toElement(literalVisitor.result);
        const sourceMap = new this.namespace.elements.SourceMap();
        sourceMap.position = node.position;
        element.meta.set('sourceMap', sourceMap);
        return element;
    }
}

module.exports = ApiDOMVisitor;