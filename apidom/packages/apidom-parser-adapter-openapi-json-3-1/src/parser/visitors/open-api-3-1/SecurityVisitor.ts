import stampit from 'stampit';
import { isJsonObject, JsonNode } from 'apidom-ast';
// @ts-ignore
import { SpecificationVisitor, BREAK } from 'apidom-parser-adapter-json';

import { ValueVisitor } from '../generics';

const SecurityVisitor = stampit(ValueVisitor, SpecificationVisitor, {
  init() {
    this.element = new this.namespace.elements.Array();
    this.element.classes.push('security');
  },
  methods: {
    array(arrayNode) {
      arrayNode.items.forEach((item: JsonNode) => {
        if (isJsonObject(item)) {
          const element = this.nodeToElement(['document', 'objects', 'SecurityRequirement'], item);
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

export default SecurityVisitor;
