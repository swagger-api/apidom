import stampit from 'stampit';
import { always } from 'ramda';

import AmqpMessageBinding0_9Element from '../../../../../../elements/bindings/amqp-0-9/AmqpMessageBinding0-9';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const AmqpMessageBinding0_9Visitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'amqp', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new AmqpMessageBinding0_9Element();
  },
});

export default AmqpMessageBinding0_9Visitor;
