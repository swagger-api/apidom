import stampit from 'stampit';
import { BREAK, YamlScalar } from 'apidom-ast';

import { KindVisitor } from '../generics';
import SpecificationVisitor from '../SpecificationVisitor';

const IdentifierVisitor = stampit(KindVisitor, SpecificationVisitor, {
  methods: {
    scalar(scalarNode: YamlScalar) {
      const identifierElement = new this.namespace.elements.Identifier(scalarNode.content);
      this.element = this.maybeAddSourceMap(scalarNode, identifierElement);
      return BREAK;
    },
  },
});

export default IdentifierVisitor;
