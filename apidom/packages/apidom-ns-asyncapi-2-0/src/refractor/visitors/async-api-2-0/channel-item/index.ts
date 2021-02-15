import stampit from 'stampit';
import { always } from 'ramda';

import ChannelItemElement from '../../../../elements/ChannelItem';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const ChannelItemVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ChannelItem']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new ChannelItemElement();
  },
});

export default ChannelItemVisitor;
