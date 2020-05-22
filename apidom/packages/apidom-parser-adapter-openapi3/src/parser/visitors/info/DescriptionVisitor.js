'use strict';

const stampit = require('stampit');
const SpecificationVisitor = require('../SpecificationVisitor');
const { BREAK } = require('../../visitor');

const DescriptionVisitor = stampit(SpecificationVisitor, {
  methods: {
    property(propertyNode) {
      const keyElement = new this.namespace.elements.String(propertyNode.key.value);
      const valueElement = new this.namespace.elements.String(propertyNode.value.value);
      const { MemberElement } = this.namespace.elements.Element.prototype;

      this.element = new MemberElement(
        this.maybeAddSourceMap(propertyNode.key, keyElement),
        this.maybeAddSourceMap(propertyNode.value, valueElement),
      );

      return BREAK;
    },
  },
});

module.exports = DescriptionVisitor;
