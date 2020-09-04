import stampit from 'stampit';
import { BREAK } from '../..';

import SpecificationVisitor from '../../SpecificationVisitor';

const HttpMethodVisitor = stampit(SpecificationVisitor, {
  methods: {
    object(objectNode) {
      const operationElement = new this.namespace.elements.Operation();

      this.element = this.maybeAddSourceMap(objectNode, operationElement);

      return BREAK;
    },
  },
});

export default HttpMethodVisitor;
