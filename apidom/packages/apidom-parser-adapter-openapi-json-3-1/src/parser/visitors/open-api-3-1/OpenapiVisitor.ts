import stampit from 'stampit';
// @ts-ignore
import { SpecificationVisitor, BREAK } from 'apidom-parser-adapter-json';

import { ValueVisitor } from '../generics';

const OpenapiVisitor = stampit(ValueVisitor, SpecificationVisitor, {
  methods: {
    string(stringNode) {
      const openapiElement = new this.namespace.elements.Openapi(stringNode.value);
      this.element = this.maybeAddSourceMap(stringNode, openapiElement);
      return BREAK;
    },
  },
});

export default OpenapiVisitor;
