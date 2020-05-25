'use strict';

const stampit = require('stampit');
const { visit, BREAK } = require('../../../visitor');
const SpecificationVisitor = require('../../SpecificationVisitor');
const { isOpenApiExtension } = require('../../../predicates');

const LicenseVisitor = stampit(SpecificationVisitor, {
  props: {
    keyElement: null,
  },
  methods: {
    key(keyNode) {
      this.keyElement = this.maybeAddSourceMap(keyNode, new this.namespace.elements.String('license'));
    },

    object(objectNode) {
      const licenseElement = new this.namespace.elements.Object();
      const { MemberElement } = this.namespace.elements.Element.prototype;
      const commentVisitor = this.retrieveVisitorInstance(['document', 'comment']);

      objectNode.properties.forEach(propertyNode => {
        if (['name', 'url'].includes(propertyNode.key.value)) {
          licenseElement.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'openApi', 'info', 'license', propertyNode.key.value], propertyNode)
          );
        } else if (isOpenApiExtension({}, propertyNode)) {
          licenseElement.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'openApi', 'openApiExtension'], propertyNode)
          );
        }
      });

      visit(objectNode.comments, commentVisitor);
      licenseElement.meta.set('comments', commentVisitor.element);
      licenseElement.classes.push('license');

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, licenseElement),
      )

      return BREAK;
    },
  },
});

module.exports = LicenseVisitor;
