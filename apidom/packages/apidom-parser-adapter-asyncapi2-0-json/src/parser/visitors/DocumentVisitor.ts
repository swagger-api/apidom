import stampit from 'stampit';
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
      const openApiVisitor = this.retrieveVisitorInstance(['document', 'objects', 'AsyncApi']);
      visit(documentNode.child, openApiVisitor);
      this.element.content.push(openApiVisitor.element);
    },

    error(errorNode) {
      const errorVisitor = this.retrieveVisitorInstance(['error']);
      visit(errorNode, errorVisitor);
      this.element.content.push(errorVisitor.element);
    },
  },
});

export default DocumentVisitor;
