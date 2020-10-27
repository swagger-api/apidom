import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';
import { ValueVisitor } from '../../generics';

const ServerBindingsVisitor = stampit(ValueVisitor, FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ServerBindings']),
  },
  init() {
    this.element = new this.namespace.elements.ServerBindings();
  },
});

export default ServerBindingsVisitor;
