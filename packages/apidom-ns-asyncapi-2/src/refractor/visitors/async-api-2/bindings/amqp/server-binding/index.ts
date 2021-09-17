import stampit from 'stampit';
import { always } from 'ramda';

import AmqpServerBindingElement from '../../../../../../elements/bindings/amqp/AmqpServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const AmqpServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'amqp', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new AmqpServerBindingElement();
  },
});

export default AmqpServerBindingVisitor;
