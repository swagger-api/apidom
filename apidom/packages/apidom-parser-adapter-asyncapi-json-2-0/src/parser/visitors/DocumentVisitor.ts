import stampit from 'stampit';
import { JsonDocument } from 'apidom-ast';
// @ts-ignore
import { DocumentVisitor as JsonDocumentVisitor } from 'apidom-parser-adapter-json';

const DocumentVisitor = stampit(JsonDocumentVisitor, {
  methods: {
    document(documentNode: JsonDocument) {
      const element = this.nodeToElement(['document', 'objects', 'AsyncApi'], documentNode);
      this.element.content.push(element);
    },
  },
});

export default DocumentVisitor;
