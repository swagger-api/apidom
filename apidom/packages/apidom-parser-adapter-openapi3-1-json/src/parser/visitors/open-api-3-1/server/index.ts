import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const ServerVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Server']),
  },
  init() {
    this.element = new this.namespace.elements.Server();
  },
});

export default ServerVisitor;
