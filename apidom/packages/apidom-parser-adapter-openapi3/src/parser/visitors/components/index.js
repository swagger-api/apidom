'use strict';

const stampit = require('stampit');
const { visit, BREAK } = require('../../visitor');
const SpecificationVisitor = require('../SpecificationVisitor');
const { isOpenApiExtension } = require('../../predicates');

const ComponentsVisitor = stampit(SpecificationVisitor, {
  props: {
    keyElement: null,
  },
  methods: {
    key(keyNode) {
      this.keyElement = this.maybeAddSourceMap(keyNode, new this.namespace.elements.String('components'));
    },

    object(objectNode) {
      const componentsElement = new this.namespace.elements.Components();
      const { MemberElement } = this.namespace.elements.Element.prototype;
      const commentVisitor = this.retrieveVisitorInstance(['document', 'comment']);
      const supportedProps = ['schemas'];

      objectNode.properties.forEach(propertyNode => {
        if (supportedProps.includes(propertyNode.key.value)) {
          componentsElement.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'openApi', 'components', propertyNode.key.value], propertyNode)
          );
        } else if (isOpenApiExtension({}, propertyNode)) {
          componentsElement.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'openApi', 'openApiExtension'], propertyNode)
          );
        }
      });

      visit(objectNode.comments, commentVisitor);
      componentsElement.meta.set('comments', commentVisitor.element);

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, componentsElement),
      )

      return BREAK;
    },
  },
});

module.exports = ComponentsVisitor;
