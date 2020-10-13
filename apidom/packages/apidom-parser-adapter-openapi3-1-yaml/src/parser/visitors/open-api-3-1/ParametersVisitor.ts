import stampit from 'stampit';
import { YamlSequence } from 'apidom-ast';

import { BREAK } from '..';
import SpecificationVisitor from '../SpecificationVisitor';
import { isParameterObject, isReferenceObject } from '../../predicates';
import { KindVisitor } from '../generics';

const ParametersVisitor = stampit(KindVisitor, SpecificationVisitor, {
  init() {
    this.element = new this.namespace.elements.Array();
    this.element.classes.push('parameters');
  },
  methods: {
    sequence(sequenceNode: YamlSequence) {
      sequenceNode.content.forEach((item): void => {
        if (isParameterObject({}, item)) {
          this.element.push(new this.namespace.elements.Parameter());
        } else if (isReferenceObject({}, item)) {
          this.element.push(new this.namespace.elements.Reference());
        } else {
          const element = this.nodeToElement(['kind'], item);
          this.element.push(element);
        }
      });

      this.maybeAddSourceMap(sequenceNode, this.element);

      return BREAK;
    },
  },
});

export default ParametersVisitor;
