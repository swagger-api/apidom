import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const ChannelItemVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ChannelItem']),
  },
  init() {
    this.element = new this.namespace.elements.ChannelItem();
  },
});

export default ChannelItemVisitor;
