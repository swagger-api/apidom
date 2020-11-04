import stampit from 'stampit';
import { isJsonObject, JsonDocument } from 'apidom-ast';
// @ts-ignore
import { DocumentVisitor as JsonDocumentVisitor } from 'apidom-parser-adapter-json';

const DocumentVisitor = stampit(JsonDocumentVisitor, {
  methods: {
    document(documentNode: JsonDocument) {
      const specPath = isJsonObject(documentNode.child)
        ? ['document', 'objects', 'AsyncApi']
        : ['value'];
      const element = this.nodeToElement(specPath, documentNode);

      this.element.content.push(element);
    },
  },
});

export default DocumentVisitor;
