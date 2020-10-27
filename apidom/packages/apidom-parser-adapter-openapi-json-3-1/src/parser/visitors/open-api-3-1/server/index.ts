import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';
import { ValueVisitor } from '../../generics';

const ServerVisitor = stampit(ValueVisitor, FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Server']),
  },
  init() {
    this.element = new this.namespace.elements.Server();
  },
});

export default ServerVisitor;
