import stampit from 'stampit';
import { always } from 'ramda';
// @ts-ignore
import { DocumentVisitor as OpenApiYamlDocumentVisitor } from 'apidom-parser-adapter-openapi-yaml-3-1';
import { YamlMapping } from 'apidom-ast';

const DocumentVisitor = stampit(OpenApiYamlDocumentVisitor, {
  props: {
    specPath: always(['kind']),
  },
  // @ts-ignore
  init({ specPath = this.specPath } = {}) {
    this.specPath = specPath;
  },
  methods: {
    mapping(mappingNode: YamlMapping) {
      const element = this.nodeToElement(this.specPath(), mappingNode);
      this.element.content.push(element);
    },
  },
});

type SpecPath = () => string[];
type Options = Record<string, unknown>;

export const documentVisitorFactory = (specPath: SpecPath) => (opts: Options) =>
  DocumentVisitor({ specPath, ...opts });

export default DocumentVisitor;
