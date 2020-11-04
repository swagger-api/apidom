import stampit from 'stampit';
import { YamlScalar } from 'apidom-ast';
// @ts-ignore
import { BREAK, SpecificationVisitor } from 'apidom-parser-adapter-yaml-1-2';

import { KindVisitor } from '../generics';

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
