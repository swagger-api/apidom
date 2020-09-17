import stampit from 'stampit';
import { always } from 'ramda';

import MapJsonObjectVisitor from '../../generics/MapJsonObjectVisitor';
import { ValueVisitor } from '../../generics';

const VariablesVisitor = stampit(ValueVisitor, MapJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ServerVariable']),
  },
  init() {
    this.element = new this.namespace.elements.Object();
    this.element.classes.push('variables');
  },
});

export default VariablesVisitor;
