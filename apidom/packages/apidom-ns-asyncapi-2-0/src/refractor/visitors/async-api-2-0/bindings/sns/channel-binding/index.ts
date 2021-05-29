import stampit from 'stampit';
import { always } from 'ramda';

import SnsChannelBindingElement from '../../../../../../elements/bindings/sns/SnsChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const SnsChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'sns', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new SnsChannelBindingElement();
  },
});

export default SnsChannelBindingVisitor;
