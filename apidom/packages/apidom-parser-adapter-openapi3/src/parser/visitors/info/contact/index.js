'use strict';

const stampit = require('stampit');
const { visit, BREAK } = require('../../../visitor');
const SpecificationVisitor = require('../../SpecificationVisitor');
const { isOpenApiExtension } = require('../../../predicates');

const ContactVisitor = stampit(SpecificationVisitor, {
  props: {
    keyElement: null,
  },
  methods: {
    key(keyNode) {
      this.keyElement = this.maybeAddSourceMap(keyNode, new this.namespace.elements.String('contact'));
    },

    object(objectNode) {
      const contactElement = new this.namespace.elements.Object();
      const { MemberElement } = this.namespace.elements.Element.prototype;
      const commentVisitor = this.retrieveVisitorInstance(['document', 'comment']);

      objectNode.properties.forEach(propertyNode => {
        if (['name', 'url', 'email'].includes(propertyNode.key.value)) {
          contactElement.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'openApi', 'info', 'contact', propertyNode.key.value], propertyNode)
          );
        } else if (isOpenApiExtension({}, propertyNode)) {
          contactElement.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'openApi', 'openApiExtension'], propertyNode)
          );
        }
      });

      visit(objectNode.comments, commentVisitor);
      contactElement.meta.set('comments', commentVisitor.element);
      contactElement.classes.push('contact');

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, contactElement),
      )

      return BREAK;
    },
  },
});

module.exports = ContactVisitor;
