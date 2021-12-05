import stampit from 'stampit';
import { always } from 'ramda';

import AmqpChannelBindingElement from '../../../../../../elements/bindings/amqp/AmqpChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const AmqpChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'amqp', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new AmqpChannelBindingElement();
    this.element.classes.push('channel-binding');
  },
});

export default AmqpChannelBindingVisitor;
