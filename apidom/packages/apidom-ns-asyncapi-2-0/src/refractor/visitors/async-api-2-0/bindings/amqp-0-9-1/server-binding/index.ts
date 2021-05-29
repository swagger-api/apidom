import stampit from 'stampit';
import { always } from 'ramda';

import AmqpServerBinding0_9_1Element from '../../../../../../elements/bindings/amqp-0-9-1/AmqpServerBinding0-9-1';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const AmqpServerBinding0_9_1Visitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'amqp', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new AmqpServerBinding0_9_1Element();
  },
});

export default AmqpServerBinding0_9_1Visitor;
