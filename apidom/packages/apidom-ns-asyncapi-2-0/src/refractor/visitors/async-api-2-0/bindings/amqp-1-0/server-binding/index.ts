import stampit from 'stampit';
import { always } from 'ramda';

import AmqpServerBinding1_0Element from '../../../../../../elements/bindings/amqp-1-0/AmqpServerBinding1-0';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const AmqpServerBinding1_0Visitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'amqp1', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new AmqpServerBinding1_0Element();
  },
});

export default AmqpServerBinding1_0Visitor;
