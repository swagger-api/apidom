import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const ChannelBindingsVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ChannelBindings']),
  },
  init() {
    this.element = new this.namespace.elements.ChannelBindings();
  },
});

export default ChannelBindingsVisitor;
