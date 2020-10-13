import stampit from 'stampit';
import { JsonNode } from 'apidom-ast';

import { BREAK } from '..';
import SpecificationVisitor from '../SpecificationVisitor';
import { isServerObject } from '../../predicates';
import { ValueVisitor } from '../generics';

const ServersVisitor = stampit(ValueVisitor, SpecificationVisitor, {
  init() {
    this.element = new this.namespace.elements.Array();
    this.element.classes.push('servers');
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
