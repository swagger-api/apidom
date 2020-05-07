const { Visitor } = require('json-ast');

const PrimitiveVisitor = require('./Primitive');

class ApiDOMVisitor extends Visitor {
    constructor(namespace) {
        super();
        this.namespace = namespace;
        this.result = null;
    }

    toElement(node) {
        const primitiveVisitor = new PrimitiveVisitor(this.namespace);
        node.accept(primitiveVisitor);
        return primitiveVisitor.result;
    }
}

module.exports = ApiDOMVisitor;