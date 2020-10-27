import stampit from 'stampit';
import { isJsonObject, JsonNode } from 'apidom-ast';

import MapJsonObjectVisitor from '../../generics/MapJsonObjectVisitor';
import { isReferenceObject } from '../../../predicates';
import { ValueVisitor } from '../../generics';

const CallbacksVisitor = stampit(ValueVisitor, MapJsonObjectVisitor, {
  props: {
    specPath: (node: JsonNode) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceObject({}, node)
        ? ['document', 'objects', 'Reference']
        : isJsonObject(node)
        ? ['document', 'objects', 'Callback']
        : ['value'];
    },
  },
  init() {
    this.element = new this.namespace.elements.Object();
    this.element.classes.push('callbacks');
  },
});

export default CallbacksVisitor;
