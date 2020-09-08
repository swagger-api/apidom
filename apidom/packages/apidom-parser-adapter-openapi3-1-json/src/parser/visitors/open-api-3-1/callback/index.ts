import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const CallbackVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Callback']),
  },
  init() {
    this.element = new this.namespace.elements.Callback();
  },
});

export default CallbackVisitor;
