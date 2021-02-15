import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import ChannelBindingsElement from '../../../../elements/ChannelBindings';

const ChannelBindingsVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ChannelBindings']),
  },
  init() {
    this.element = new ChannelBindingsElement();
  },
});

export default ChannelBindingsVisitor;
