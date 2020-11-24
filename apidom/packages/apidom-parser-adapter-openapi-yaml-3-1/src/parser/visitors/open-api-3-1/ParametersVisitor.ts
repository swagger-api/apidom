import stampit from 'stampit';
import { YamlSequence } from 'apidom-ast';
// @ts-ignore
import { BREAK, SpecificationVisitor } from 'apidom-parser-adapter-yaml-1-2';

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
        if (isReferenceObject({}, item)) {
          const referenceElement = this.nodeToElement(['document', 'objects', 'Reference'], item);
          this.element.push(referenceElement);
        } else if (isParameterObject({}, item)) {
          const parameterElement = this.nodeToElement(['document', 'objects', 'Parameter'], item);
          this.element.push(parameterElement);
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
