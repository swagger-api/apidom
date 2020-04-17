'use strict';

const { Visitor } = require('json-ast');

class LiteralVisitor extends Visitor {
    constructor(...args) {
        super(...args);
        this.result = null;
    }

    key(keyNode) {
        this.result = keyNode.value;
    }

    string(stringNode) {
        this.result = stringNode.value;
    }

    number(numberNode) {
        this.result = numberNode.value;
    }

    boolean(booleanNode){
        this.result = booleanNode.value;
    };

    nil(nullNode) {
        this.result = nullNode.value;
    }
}

module.exports = LiteralVisitor;