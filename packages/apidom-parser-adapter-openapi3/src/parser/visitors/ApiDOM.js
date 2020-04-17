const { Visitor } = require('json-ast');

class ApiDOMVisitor extends Visitor {
    constructor(namespace) {
        super();
        this.namespace = namespace;
        this.result = null;
    }
}

module.exports = ApiDOMVisitor;