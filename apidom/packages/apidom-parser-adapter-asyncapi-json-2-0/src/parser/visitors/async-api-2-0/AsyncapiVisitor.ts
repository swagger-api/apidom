import stampit from 'stampit';
// @ts-ignore
import { SpecificationVisitor, BREAK } from 'apidom-parser-adapter-json';

import { ValueVisitor } from '../generics';

const AsyncapiVisitor = stampit(ValueVisitor, SpecificationVisitor, {
  methods: {
    string(stringNode) {
      const asyncapiElement = new this.namespace.elements.AsyncApiVersion(stringNode.value);
      this.element = this.maybeAddSourceMap(stringNode, asyncapiElement);
      return BREAK;
    },
  },
});

export default AsyncapiVisitor;
