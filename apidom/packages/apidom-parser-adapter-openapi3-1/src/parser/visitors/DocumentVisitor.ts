import stampit from 'stampit';
import { visit, BREAK } from '../visitor';
import SpecificationVisitor from './SpecificationVisitor';

const DocumentVisitor = stampit(SpecificationVisitor, {
  methods: {
    document(documentNode) {
      const openApiVisitor = this.retrieveVisitorInstance(['document', 'objects', 'OpenApi']);
      const commentVisitor = this.retrieveVisitorInstance(['document', 'comment']);

      visit(documentNode.child, openApiVisitor);
      visit(documentNode.comments, commentVisitor);

      this.element.content.push(openApiVisitor.element);
      this.element.meta.set('comments', commentVisitor.element);

      return BREAK;
    },
  },
});

export default DocumentVisitor;
