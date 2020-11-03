import stampit from 'stampit';
import { Literal, Error, JsonDocument } from 'apidom-ast';

import SpecificationVisitor from './SpecificationVisitor';

const DocumentVisitor = stampit(SpecificationVisitor, {
  methods: {
    literal(literalNode: Literal) {
      if (literalNode.isMissing) {
        const element = this.nodeToElement(['error'], literalNode);
        this.element.content.push(element);
      }
    },

    document(documentNode: JsonDocument) {
      const element = this.nodeToElement(['value'], documentNode);
      this.element.content.push(element);
    },

    error(errorNode: Error) {
      const element = this.nodeToElement(['error'], errorNode);
      this.element.content.push(element);
    },
  },
});

export default DocumentVisitor;
