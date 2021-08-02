import stampit from 'stampit';
import { always } from 'ramda';

import StompChannelBindingElement from '../../../../../../elements/bindings/stomp/StompChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const StompChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'stomp', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new StompChannelBindingElement();
  },
});

export default StompChannelBindingVisitor;
