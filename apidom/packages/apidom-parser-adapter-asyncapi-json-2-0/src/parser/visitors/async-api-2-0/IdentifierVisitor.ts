import stampit from 'stampit';
// @ts-ignore
import { SpecificationVisitor, BREAK } from 'apidom-parser-adapter-json';

import { ValueVisitor } from '../generics';

const IdentifierVisitor = stampit(ValueVisitor, SpecificationVisitor, {
  methods: {
    string(stringNode) {
      const identifierElement = new this.namespace.elements.Identifier(stringNode.value);
      this.element = this.maybeAddSourceMap(stringNode, identifierElement);
      return BREAK;
    },
  },
});

export default IdentifierVisitor;
