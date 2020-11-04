import stampit from 'stampit';
import { YamlMapping } from 'apidom-ast';
// @ts-ignore
import { DocumentVisitor as YamlDocumentVisitor } from 'apidom-parser-adapter-yaml-1-2';

const DocumentVisitor = stampit(YamlDocumentVisitor, {
  methods: {
    mapping(mappingNode: YamlMapping) {
      const openApiElement = this.nodeToElement(['document', 'objects', 'AsyncApi'], mappingNode);
      this.element.content.push(openApiElement);
    },
  },
});

export default DocumentVisitor;
