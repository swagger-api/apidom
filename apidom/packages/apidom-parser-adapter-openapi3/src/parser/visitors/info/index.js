'use strict';

const stampit = require('stampit');
const { visit, BREAK } = require('../../visitor');
const SpecificationVisitor = require('../SpecificationVisitor');
const { ValueVisitor } = require('../generics');
const { isOpenApiExtension } = require('../../predicates');

const InfoVisitor = stampit(SpecificationVisitor, {
  props: {
    keyElement: null,
  },
  methods: {
    key(keyNode) {
      this.keyElement = this.maybeAddSourceMap(keyNode, new this.namespace.elements.String('info'));
    },

    object(objectNode) {
      const infoElement = new this.namespace.elements.Info();
      const { MemberElement } = this.namespace.elements.Element.prototype;
      const supportedProps = ['title', 'description', 'termsOfService', 'version', 'contact', 'license'];

      objectNode.properties.forEach(propertyNode => {
        if (supportedProps.includes(propertyNode.key.value)) {
          infoElement.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'openApi', 'info', propertyNode.key.value], propertyNode)
          );
        } else if (isOpenApiExtension({}, propertyNode)) {
          infoElement.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'openApi', 'openApiExtension'], propertyNode)
          );
        }
      });

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, infoElement),
      )

      return BREAK;
    },
  },
});

module.exports = InfoVisitor;
