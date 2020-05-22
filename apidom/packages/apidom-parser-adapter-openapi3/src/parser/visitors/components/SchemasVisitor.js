'use strict';

const stampit = require('stampit');
const SpecificationVisitor = require('../SpecificationVisitor');
const { BREAK } = require('../../visitor');

const SchemasVisitor = stampit(SpecificationVisitor, {
  props: {
    keyElement: null,
  },
  methods: {
    key(keyNode) {
      this.keyElement = this.maybeAddSourceMap(keyNode, new this.namespace.elements.String('schemas'));
    },

    object(objectNode) {
      const schemasElement = new this.namespace.elements.Object();
      const { MemberElement } = this.namespace.elements.Element.prototype;

      schemasElement.classes.push('schemas');

      objectNode.properties.forEach(propertyNode => {
        schemasElement.content.push(
          this.mapPropertyNodeToMemberElement(['document', 'openApi', 'schema'], propertyNode)
        );
      });

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, schemasElement),
      );

      return BREAK;
    },
  },
});

module.exports = SchemasVisitor;
