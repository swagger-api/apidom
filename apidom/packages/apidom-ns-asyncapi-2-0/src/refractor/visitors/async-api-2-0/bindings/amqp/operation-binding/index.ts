import stampit from 'stampit';
import { always } from 'ramda';

import AmqpOperationBindingElement from '../../../../../../elements/bindings/amqp/AmqpOperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const AmqpOperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'amqp', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new AmqpOperationBindingElement();
  },
});

export default AmqpOperationBindingVisitor;
