import stampit from 'stampit';
import { BREAK } from 'apidom-ast';
import SpecificationVisitor from '../SpecificationVisitor';

const AsyncapiVisitor = stampit(SpecificationVisitor, {
  methods: {
    string(stringNode) {
      const asyncapiElement = new this.namespace.elements.Asyncapi(stringNode.value);
      this.element = this.maybeAddSourceMap(stringNode, asyncapiElement);
      return BREAK;
    },
  },
});

export default AsyncapiVisitor;
