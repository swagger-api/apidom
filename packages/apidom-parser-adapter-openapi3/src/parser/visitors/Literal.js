'use strict';

const { Visitor } = require('json-ast');

class LiteralVisitor extends Visitor {
    constructor(...args) {
        super(...args);
        this.result = null;
    }

    string(stringNode) {
        this.result = String(stringNode.value);
    }

    number(numberNode) {
        this.result = Number(numberNode.value);
    }

    boolean(booleanNode){
        this.result = booleanNode.value === 'true';
    };

    nil() {
        this.result = null
    }
}

module.exports = LiteralVisitor;