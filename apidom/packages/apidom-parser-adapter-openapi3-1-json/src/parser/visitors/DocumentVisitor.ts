import stampit from 'stampit';
import { isJsonObject } from 'apidom-ast';

import { visit } from '.';
import SpecificationVisitor from './SpecificationVisitor';

const DocumentVisitor = stampit(SpecificationVisitor, {
  methods: {
    literal(literalNode) {
      if (literalNode.isMissing) {
        const errorVisitor = this.retrieveVisitorInstance(['error']);
        visit(literalNode, errorVisitor);
        this.element.content.push(errorVisitor.element);
      }
    },

    document(documentNode) {
      const specPath = isJsonObject(documentNode.child)
        ? ['document', 'objects', 'OpenApi']
        : ['value'];

      const visitor = this.retrieveVisitorInstance(specPath);
      visit(documentNode.child, visitor);
      this.element.content.push(visitor.element);
    },

    error(errorNode) {
      const errorVisitor = this.retrieveVisitorInstance(['error']);
      visit(errorNode, errorVisitor);
      this.element.content.push(errorVisitor.element);
    },
  },
});

export default DocumentVisitor;
