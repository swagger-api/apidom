import stampit from 'stampit';
import { YamlMapping } from 'apidom-ast';
// @ts-ignore
import { BREAK, SpecificationVisitor } from 'apidom-parser-adapter-yaml-1-2';

import { KindVisitor } from '../../generics';

const SchemaVisitor = stampit(KindVisitor, SpecificationVisitor, {
  methods: {
    mapping(mappingNode: YamlMapping) {
      const objectElement = this.nodeToElement(['mapping'], mappingNode);
      const schemaElement = new this.namespace.elements.Schema(objectElement.content);

      this.element = this.maybeAddSourceMap(mappingNode, schemaElement);

      return BREAK;
    },
  },
});

export default SchemaVisitor;
