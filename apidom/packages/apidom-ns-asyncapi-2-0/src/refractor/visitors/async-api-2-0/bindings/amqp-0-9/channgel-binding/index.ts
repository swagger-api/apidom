import stampit from 'stampit';
import { always } from 'ramda';

import AmqpChannelBinding0_9Element from '../../../../../../elements/bindings/amqp-0-9/AmqpChannelBinding0-9';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const AmqpChannelBinding0_9Visitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'AmqpChannelBinding0_9']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new AmqpChannelBinding0_9Element();
  },
});

export default AmqpChannelBinding0_9Visitor;
