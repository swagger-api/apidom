'use strict';

const ApiDOMVisitor = require('./ApiDOM');
const SchemasVisitor = require('./Schemas');

class ComponentsVisitor extends ApiDOMVisitor {
    visit(node) {
        if (this.result === null) {
            const sourceMap = new this.namespace.elements.SourceMap();
            sourceMap.position = node.position;
            sourceMap.astNode = node;

            this.result = new this.namespace.elements.Components();
            this.result.meta.set('sourceMap', sourceMap);
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

        const schemasElement = new MemberElement(keyElement, schemasVisitor.result);
        schemasElement.astNode = propertyNode;

        this.result.content.push(schemasElement);
    }
}

module.exports = ComponentsVisitor;