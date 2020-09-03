import stampit from 'stampit';
import { BREAK } from 'apidom-ast';

import SpecificationVisitor from '../../SpecificationVisitor';

const HttpMethodVisitor = stampit(SpecificationVisitor, {
  methods: {
    key(keyNode) {
      this.element.key = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String(keyNode.value),
      );
    },

    property(propertyNode) {
      const { MemberElement } = this.namespace.elements.Element.prototype;
      this.element = this.maybeAddSourceMap(propertyNode, new MemberElement());
    },

    object(objectNode) {
      const operationElement = new this.namespace.elements.Operation();

      this.element.value = this.maybeAddSourceMap(objectNode, operationElement);

      return BREAK;
    },
  },
});

export default HttpMethodVisitor;
