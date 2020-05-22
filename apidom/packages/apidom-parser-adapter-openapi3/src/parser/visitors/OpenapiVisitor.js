'use strict';

const stampit = require('stampit');
const SpecificationVisitor = require('./SpecificationVisitor');

const OpenapiVisitor = stampit(SpecificationVisitor, {
  methods: {
    property(propertyNode) {
      const keyElement = new this.namespace.elements.String(propertyNode.key.value);
      const openapiElement = new this.namespace.elements.Openapi(propertyNode.value.value);
      const { MemberElement } = this.namespace.elements.Element.prototype;

      this.element = new MemberElement(
        this.maybeAddSourceMap(propertyNode.key, keyElement),
        this.maybeAddSourceMap(propertyNode.value, openapiElement),
      );
    },
  },
});

module.exports = OpenapiVisitor;
