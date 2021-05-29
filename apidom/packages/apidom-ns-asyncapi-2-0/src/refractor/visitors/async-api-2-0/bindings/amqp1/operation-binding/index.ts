import stampit from 'stampit';
import { always } from 'ramda';

import Amqp1OperationBindingElement from '../../../../../../elements/bindings/amqp1/Amqp1OperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const Amqp1OperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', '', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new Amqp1OperationBindingElement();
  },
});

export default Amqp1OperationBindingVisitor;
