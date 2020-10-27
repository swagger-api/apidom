import stampit from 'stampit';
import { YamlMapping } from 'apidom-ast';

import { BREAK } from '../..';
import SpecificationVisitor from '../../SpecificationVisitor';
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
