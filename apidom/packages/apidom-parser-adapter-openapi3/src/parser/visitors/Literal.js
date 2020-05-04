'use strict';

const { Visitor } = require('json-ast');

class LiteralVisitor extends Visitor {
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
        this.result = this._decorateWithSourcemap(element, stringNode);
        this.stop = true;
    }

    number(numberNode) {
        const element = new this.namespace.elements.Number(Number(numberNode.value));
        this.result = this._decorateWithSourcemap(element, numberNode);
        this.stop = true;
    }

    boolean(booleanNode){
        const element = new this.namespace.elements.Boolean(booleanNode.value === 'true');
        this.result = this._decorateWithSourcemap(element, booleanNode);
        this.stop = true;
    };

    nil(nullNode) {
        const element = new this.namespace.elements.Null();
        this.result = this._decorateWithSourcemap(element, nullNode);
        this.stop = true;
    }

    _decorateWithSourcemap(element, node) {
        const sourceMap = new this.namespace.elements.SourceMap();

        sourceMap.position = node.position;
        sourceMap.astNode = node;

        element.meta.set('sourceMap', sourceMap);

        return element;
    }
}

module.exports = LiteralVisitor;