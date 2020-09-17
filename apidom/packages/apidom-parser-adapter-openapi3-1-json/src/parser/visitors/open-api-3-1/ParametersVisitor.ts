import stampit from 'stampit';
import { JsonNode } from 'apidom-ast';

import { BREAK } from '..';
import SpecificationVisitor from '../SpecificationVisitor';
import { isParameterObject, isReferenceObject } from '../../predicates';
import { ValueVisitor } from '../generics';

const ParametersVisitor = stampit(ValueVisitor, SpecificationVisitor, {
  init() {
    this.element = new this.namespace.elements.Array();
    this.element.classes.push('parameters');
  },
  methods: {
    array(arrayNode) {
      arrayNode.items.forEach(<T extends JsonNode>(item: T): void => {
        if (isParameterObject({}, item)) {
          this.element.push(new this.namespace.elements.Parameter());
        } else if (isReferenceObject({}, item)) {
          this.element.push(new this.namespace.elements.Reference());
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

export default ParametersVisitor;
