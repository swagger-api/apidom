import stampit from 'stampit';
import { always } from 'ramda';

import AmqpChannelBinding1_0Element from '../../../../../../elements/bindings/amqp-1-0/AmqpChannelBinding1-0';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const AmqpChannelBinding1_0Visitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'amqp1', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new AmqpChannelBinding1_0Element();
  },
});

export default AmqpChannelBinding1_0Visitor;
