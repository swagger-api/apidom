import stampit from 'stampit';
import { always } from 'ramda';
// @ts-ignore
import { DocumentVisitor as OpenApiJsonDocumentVisitor } from 'apidom-parser-adapter-openapi-json-3-1';
import { JsonDocument } from 'apidom-ast';

const DocumentVisitor = stampit(OpenApiJsonDocumentVisitor, {
  props: {
    specPath: always(['value']),
  },
  // @ts-ignore
  init({ specPath = this.specPath } = {}) {
    this.specPath = specPath;
  },
  methods: {
    document(documentNode: JsonDocument) {
      const element = this.nodeToElement(this.specPath(), documentNode);
      this.element.content.push(element);
    },
  },
});

type SpecPath = () => string[];
type Options = Record<string, unknown>;

export const documentVisitorFactory = (specPath: SpecPath) => (opts: Options) =>
  DocumentVisitor({ specPath, ...opts });

export default DocumentVisitor;
