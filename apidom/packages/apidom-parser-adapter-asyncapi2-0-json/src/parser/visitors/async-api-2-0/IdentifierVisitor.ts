import stampit from 'stampit';
import { BREAK } from 'apidom-ast';
import SpecificationVisitor from '../SpecificationVisitor';

const IdentifierVisitor = stampit(SpecificationVisitor, {
  methods: {
    string(stringNode) {
      const identifierElement = new this.namespace.elements.Identifier(stringNode.value);
      this.element = this.maybeAddSourceMap(stringNode, identifierElement);
      return BREAK;
    },
  },
});

export default IdentifierVisitor;
