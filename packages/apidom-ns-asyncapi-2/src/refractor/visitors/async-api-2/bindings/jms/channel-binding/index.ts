import stampit from 'stampit';
import { always } from 'ramda';

import JmsChannelBindingElement from '../../../../../../elements/bindings/jms/JmsChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const JmsChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'jms', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new JmsChannelBindingElement();
    this.element.classes.push('channel-binding');
  },
});

export default JmsChannelBindingVisitor;
