import stampit from 'stampit';

import SpecificationVisitor from '../SpecificationVisitor';
import { isParameterObject, isReferenceObject } from '../../predicates';

const ParametersVisitor = stampit(SpecificationVisitor, {
  init() {
    this.element = new this.namespace.elements.Array();
  },
  methods: {
    object(objectNode) {
      if (isParameterObject({}, objectNode)) {
        // TODO(vladimir.gorej@gmail.com): replace with real Parameter Object implementation
        this.element.content.push(new this.namespace.elements.Object());
      } else if (isReferenceObject({}, objectNode)) {
        // TODO(vladimir.gorej@gmail.com): replace with real Reference Object implementation
        this.element.content.push(new this.namespace.elements.Object());
      }
    },
  },
});

export default ParametersVisitor;
