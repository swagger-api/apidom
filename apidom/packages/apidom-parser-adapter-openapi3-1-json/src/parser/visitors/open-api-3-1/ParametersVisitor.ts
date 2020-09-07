import stampit from 'stampit';

import SpecificationVisitor from '../SpecificationVisitor';
import { isParameterObject, isReferenceObject } from '../../predicates';

const ParametersVisitor = stampit(SpecificationVisitor, {
  init() {
    this.element = new this.namespace.elements.Array();
    this.element.classes.push('parameters');
  },
  methods: {
    array(arrayNode) {
      this.maybeAddSourceMap(arrayNode, this.element);
    },
    object(objectNode) {
      if (isParameterObject({}, objectNode)) {
        this.element.content.push(new this.namespace.elements.Parameter());
      } else if (isReferenceObject({}, objectNode)) {
        this.element.content.push(new this.namespace.elements.Reference());
      }
    },
  },
});

export default ParametersVisitor;
