import stampit from 'stampit';
import { always } from 'ramda';

import AmqpMessageBinding1_0Element from '../../../../../../elements/bindings/amqp-1-0/AmqpMessageBinding1-0';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const AmqpMessageBinding1_0Visitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'amqp1', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new AmqpMessageBinding1_0Element();
  },
});

export default AmqpMessageBinding1_0Visitor;
