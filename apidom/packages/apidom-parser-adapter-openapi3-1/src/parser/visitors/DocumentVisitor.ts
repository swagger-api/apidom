import stampit from 'stampit';
import { visit, BREAK } from '.';
import SpecificationVisitor from './SpecificationVisitor';

const DocumentVisitor = stampit(SpecificationVisitor, {
  methods: {
    document(documentNode) {
      const openApiVisitor = this.retrieveVisitorInstance(['document', 'objects', 'OpenApi']);
      visit(documentNode.child, openApiVisitor);
      this.element.content.push(openApiVisitor.element);

      return BREAK;
    },
  },
});

export default DocumentVisitor;
