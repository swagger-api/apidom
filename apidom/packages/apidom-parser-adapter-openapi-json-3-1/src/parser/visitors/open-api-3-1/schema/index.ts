import stampit from 'stampit';
// @ts-ignore
import { SpecificationVisitor, BREAK } from 'apidom-parser-adapter-json';

import { ValueVisitor } from '../../generics';

const SchemaVisitor = stampit(ValueVisitor, SpecificationVisitor, {
  methods: {
    object(objectNode) {
      const objectElement = this.nodeToElement(['object'], objectNode);
      const schemaElement = new this.namespace.elements.Schema(objectElement.content);

      this.element = this.maybeAddSourceMap(objectNode, schemaElement);

      return BREAK;
    },
  },
});

export default SchemaVisitor;
