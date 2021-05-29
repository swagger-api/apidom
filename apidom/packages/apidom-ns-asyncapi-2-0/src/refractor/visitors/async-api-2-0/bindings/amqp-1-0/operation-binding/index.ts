import stampit from 'stampit';
import { always } from 'ramda';

import AmqpOperationBinding1_0Element from '../../../../../../elements/bindings/amqp-1-0/AmqpOperationBinding1-0';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const AmqpOperationBinding1_0Visitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', '', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new AmqpOperationBinding1_0Element();
  },
});

export default AmqpOperationBinding1_0Visitor;
