import stampit from 'stampit';
import { isJsonString } from 'apidom-ast';

import MapJsonObjectVisitor from '../../generics/MapJsonObjectVisitor';

const VariablesVisitor = stampit(MapJsonObjectVisitor, {
  props: {
    specPath: (node: any) => {
      if (isJsonString(node)) {
        return ['value'];
      }
      return ['document', 'objects', 'ServerVariable'];
    },
  },
  init() {
    this.element = new this.namespace.elements.Object();
    this.element.classes.push('variables');
  },
});

export default VariablesVisitor;
