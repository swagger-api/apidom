import stampit from 'stampit';
import { isJsonObject, JsonNode } from 'apidom-ast';

import { BREAK } from '../..';
import SpecificationVisitor from '../../SpecificationVisitor';

const SecurityVisitor = stampit(SpecificationVisitor, {
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
