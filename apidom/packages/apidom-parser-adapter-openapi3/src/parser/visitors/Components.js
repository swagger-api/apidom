'use strict';

const ApiDOMVisitor = require('./ApiDOM');
const SchemasVisitor = require('./Schemas');
const { decorateWithSourcemap } = require('../utils');

class ComponentsVisitor extends ApiDOMVisitor {
    visit(node) {
        if (this.result === null) {
            this.result = decorateWithSourcemap(node, new this.namespace.elements.Components());
        }

        return super.visit(node);
    }

    property(propertyNode) {
        if (propertyNode.key.value === 'schemas') {
            this.schemas(propertyNode);
        }
    }

    schemas(propertyNode) {
        const schemasVisitor = new SchemasVisitor(this.namespace);
        const { MemberElement } = this.namespace.elements.Element.prototype;
        const keyElement = this.toElement(propertyNode.key);

        propertyNode.value.accept(schemasVisitor);

        const schemasElement = decorateWithSourcemap(propertyNode, new MemberElement(keyElement, schemasVisitor.result));

        this.result.content.push(schemasElement);
    }
}

module.exports = ComponentsVisitor;