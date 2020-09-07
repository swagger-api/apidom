import stampit from 'stampit';
import { BREAK } from '../..';

import SpecificationVisitor from '../../SpecificationVisitor';

const HttpMethodVisitor = stampit(SpecificationVisitor, {
  props: {
    httpMethod: null,
  },
  methods: {
    object(objectNode) {
      const operationElement = new this.namespace.elements.Operation();
      const httpMethodElement = new this.namespace.elements.String(this.httpMethod);
      operationElement.setMetaProperty('httpMethod', httpMethodElement);

      this.element = this.maybeAddSourceMap(objectNode, operationElement);

      return BREAK;
    },
  },
});

export default HttpMethodVisitor;
