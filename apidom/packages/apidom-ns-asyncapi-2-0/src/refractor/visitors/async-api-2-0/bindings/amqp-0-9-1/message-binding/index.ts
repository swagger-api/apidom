import stampit from 'stampit';
import { always } from 'ramda';

import AmqpMessageBinding0_9_1Element from '../../../../../../elements/bindings/amqp-0-9-1/AmqpMessageBinding0-9-1';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const AmqpMessageBinding0_9_1Visitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'amqp', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new AmqpMessageBinding0_9_1Element();
  },
});

export default AmqpMessageBinding0_9_1Visitor;
