import stampit from 'stampit';
import { BREAK } from 'apidom-ast';

import SpecificationVisitor from '../SpecificationVisitor';
import { isParameterObject, isReferenceObject } from '../../predicates';

const ParametersVisitor = stampit(SpecificationVisitor, {
  methods: {
    key(keyNode) {
      this.element.key = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String('parameters'),
      );
    },

    property(propertyNode) {
      const { MemberElement } = this.namespace.elements.Element.prototype;
      this.element = this.maybeAddSourceMap(propertyNode, new MemberElement());
    },

    object(objectNode) {
      /* eslint-disable no-nested-ternary */
      const valueElement = isParameterObject(objectNode)
        ? new this.namespace.elements.Parameter()
        : isReferenceObject()
        ? new this.namespace.elements.Reference()
        : new this.namespace.elements.Object();
      /* eslint-enable */

      this.element.value = this.maybeAddSourceMap(objectNode, valueElement);

      return BREAK;
    },
  },
});

export default ParametersVisitor;
