const { Visitor } = require('json-ast');

const LiteralVisitor = require('./Literal');

class ApiDOMVisitor extends Visitor {
    constructor(namespace) {
        super();
        this.namespace = namespace;
        this.result = null;
    }

    toElement(node) {
        const literalVisitor = new LiteralVisitor(this.namespace);
        node.accept(literalVisitor);
        return literalVisitor.result;
    }
}

module.exports = ApiDOMVisitor;