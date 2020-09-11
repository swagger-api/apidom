import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const ServerBindingsVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ServerBindings']),
  },
  init() {
    this.element = new this.namespace.elements.ServerBindings();
  },
});

export default ServerBindingsVisitor;
