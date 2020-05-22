'use strict';

const stampit = require('stampit');
const { BREAK } = require('../visitor');
const { isOpenApiExtension } = require('../predicates');
const SpecificationVisitor = require('./SpecificationVisitor');

const OpenApiVisitor = stampit(SpecificationVisitor, {
  methods: {
    object(objectNode) {
      this.element = new this.namespace.elements.OpenApi3();
      const supportedProps = ['openapi', 'info', 'components'];

      objectNode.properties.forEach(propertyNode => {
        if (supportedProps.includes(propertyNode.key.value)) {
          this.element.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'openApi', propertyNode.key.value], propertyNode)
          );
        } else if (isOpenApiExtension({}, propertyNode)) {
          this.element.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'openApi', 'openApiExtension'], propertyNode)
          );
        }
      })

      return BREAK;
    },
  },
});

module.exports = OpenApiVisitor;
