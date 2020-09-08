import stampit from 'stampit';

import MapJsonObjectVisitor from '../../generics/MapJsonObjectVisitor';
import { isReferenceObject } from '../../../predicates';

const CallbacksVisitor = stampit(MapJsonObjectVisitor, {
  props: {
    specPath: (node: any) => {
      if (isReferenceObject(node)) {
        return ['document', 'objects', 'Reference'];
      }
      return ['document', 'objects', 'Callback'];
    },
  },
  init() {
    this.element = new this.namespace.elements.Object();
    this.element.classes.push('callbacks');
  },
});

export default CallbacksVisitor;
