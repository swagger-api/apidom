import stampit from 'stampit';
import { always } from 'ramda';

import AmqpMessageBindingElement from '../../../../../../elements/bindings/amqp/AmqpMessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const AmqpMessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'amqp', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new AmqpMessageBindingElement();
  },
});

export default AmqpMessageBindingVisitor;
