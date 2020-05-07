'use strict';

const { Visitor } = require('json-ast');

const { decorateWithSourcemap } = require('../utils');

class PrimitiveVisitor extends Visitor {
    constructor(namespace) {
        super();
        this.namespace = namespace;
        this.result = null;
    }

    key(keyNode) {
        return this.string(keyNode);
    }

    string(stringNode) {
        const element = new this.namespace.elements.String(String(stringNode.value));
        this.result = decorateWithSourcemap(stringNode, element);
        this.stop = true;
    }

    number(numberNode) {
        const element = new this.namespace.elements.Number(Number(numberNode.value));
        this.result = decorateWithSourcemap(numberNode, element);
        this.stop = true;
    }

    boolean(booleanNode){
        const element = new this.namespace.elements.Boolean(booleanNode.value === 'true');
        this.result = decorateWithSourcemap(booleanNode, element);
        this.stop = true;
    };

    nil(nullNode) {
        const element = new this.namespace.elements.Null();
        this.result = decorateWithSourcemap(nullNode, element);
        this.stop = true;
    }
}

module.exports = PrimitiveVisitor;