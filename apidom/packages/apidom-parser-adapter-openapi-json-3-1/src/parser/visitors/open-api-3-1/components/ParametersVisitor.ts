import stampit from 'stampit';
import { JsonNode } from 'apidom-ast';

import MapJsonObjectVisitor from '../../generics/MapJsonObjectVisitor';
import { ValueVisitor } from '../../generics';
import { isReferenceObject, isParameterObject } from '../../../predicates';

const ParametersVisitor = stampit(ValueVisitor, MapJsonObjectVisitor, {
  props: {
    specPath: (node: JsonNode) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceObject({}, node)
        ? ['document', 'objects', 'Reference']
        : isParameterObject({}, node)
        ? ['document', 'objects', 'Parameter']
        : ['value'];
    },
  },
  init() {
    this.element = new this.namespace.elements.Object();
    this.element.classes.push('parameters');
  },
});

export default ParametersVisitor;
