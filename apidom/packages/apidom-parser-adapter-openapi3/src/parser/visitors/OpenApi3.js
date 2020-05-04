'use strict';

const ApiDOMVisitor = require('./ApiDOM');
const OpenapiVisitor = require('./Openapi');
const InfoVisitor = require('./Info');
const ComponentsVisitor = require('./Components');

class OpenApi3Visitor extends ApiDOMVisitor {
    visit(node) {
        if (this.result === null) {
            this.result = new this.namespace.elements.OpenApi3();
            const sourceMap = new this.namespace.elements.SourceMap();
            sourceMap.position = node.position;
            sourceMap.astNode = node;
            this.result.meta.set('sourceMap', sourceMap);
        }

        return super.visit(node);
    }

    property(propertyNode) {
        if (propertyNode.key.value === 'openapi') {
            this.openapi(propertyNode);
        } else if (propertyNode.key.value === 'info') {
            this.info(propertyNode);
        } else if (propertyNode.key.value === 'components') {
            this.components(propertyNode);
        }
    }

    openapi(propertyNode) {
        const openapiVisitor = new OpenapiVisitor(this.namespace);
        const { MemberElement } = this.namespace.elements.Element.prototype;
        const keyElement = this.toElement(propertyNode.key);

        propertyNode.value.accept(openapiVisitor);

        const openapiElement = new MemberElement(keyElement, openapiVisitor.result);
        openapiElement.astNode = propertyNode;

        this.result.content.push(openapiElement);
    }

    info(propertyNode) {
        const infoVisitor = new InfoVisitor(this.namespace);
        const { MemberElement } = this.namespace.elements.Element.prototype;
        const keyElement = this.toElement(propertyNode.key);

        propertyNode.value.accept(infoVisitor);

        const infoElement = new MemberElement(keyElement, infoVisitor.result);
        infoElement.astNode = propertyNode;

        this.result.content.push(infoElement);
    }

    components(propertyNode) {
        const componentsVisitor = new ComponentsVisitor(this.namespace);
        const { MemberElement } = this.namespace.elements.Element.prototype;
        const keyElement = this.toElement(propertyNode.key);

        propertyNode.value.accept(componentsVisitor);

        const componentsElement = new MemberElement(keyElement, componentsVisitor.result);
        componentsElement.astNode = propertyNode;

        this.result.content.push(componentsElement);
    }
}

module.exports = OpenApi3Visitor;