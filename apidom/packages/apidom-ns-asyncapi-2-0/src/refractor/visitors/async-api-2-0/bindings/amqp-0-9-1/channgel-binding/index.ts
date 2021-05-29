import stampit from 'stampit';
import { always } from 'ramda';

import AmqpChannelBinding0_9_1Element from '../../../../../../elements/bindings/amqp-0-9-1/AmqpChannelBinding0-9-1';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const AmqpChannelBinding0_9_1Visitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'amqp', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new AmqpChannelBinding0_9_1Element();
  },
});

export default AmqpChannelBinding0_9_1Visitor;
