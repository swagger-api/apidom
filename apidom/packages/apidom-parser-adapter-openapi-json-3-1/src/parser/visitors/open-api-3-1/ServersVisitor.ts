import stampit from 'stampit';
import { JsonNode } from 'apidom-ast';
// @ts-ignore
import { appendMetadata, SpecificationVisitor, BREAK } from 'apidom-parser-adapter-json';

import { isServerObject } from '../../predicates';
import { ValueVisitor } from '../generics';

const ServersVisitor = stampit(ValueVisitor, SpecificationVisitor, {
  init() {
    this.element = new this.namespace.elements.Array();
    appendMetadata(['servers'], this.element);
  },
  methods: {
    array(arrayNode) {
      arrayNode.items.forEach((item: JsonNode) => {
        if (isServerObject({}, item)) {
          const element = this.nodeToElement(['document', 'objects', 'Server'], item);
          this.element.push(element);
        } else {
          const element = this.nodeToElement(['value'], item);
          this.element.push(element);
        }
      });

      this.maybeAddSourceMap(arrayNode, this.element);

      return BREAK;
    },
  },
});

export default ServersVisitor;
