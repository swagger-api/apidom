'use strict';

const ApiDOMVisitor = require('./ApiDOM');
const OpenapiVisitor = require('./Openapi');
const InfoVisitor = require('./Info');
const ComponentsVisitor = require('./Components');
const { decorateWithSourcemap } = require('../utils');

class OpenApi3Visitor extends ApiDOMVisitor {
    visit(node) {
        if (this.result === null) {
            this.result = decorateWithSourcemap(node, new this.namespace.elements.OpenApi3());
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

        const openapiElement = decorateWithSourcemap(propertyNode, new MemberElement(keyElement, openapiVisitor.result));

        this.result.content.push(openapiElement);
    }

    info(propertyNode) {
        const infoVisitor = new InfoVisitor(this.namespace);
        const { MemberElement } = this.namespace.elements.Element.prototype;
        const keyElement = this.toElement(propertyNode.key);

        propertyNode.value.accept(infoVisitor);

        const infoElement = decorateWithSourcemap(propertyNode, new MemberElement(keyElement, infoVisitor.result));

        this.result.content.push(infoElement);
    }

    components(propertyNode) {
        const componentsVisitor = new ComponentsVisitor(this.namespace);
        const { MemberElement } = this.namespace.elements.Element.prototype;
        const keyElement = this.toElement(propertyNode.key);

        propertyNode.value.accept(componentsVisitor);

        const componentsElement = decorateWithSourcemap(propertyNode, new MemberElement(keyElement, componentsVisitor.result));

        this.result.content.push(componentsElement);
    }
}

module.exports = OpenApi3Visitor;