import stampit from 'stampit';
import { always } from 'ramda';

import Amqp1MessageBindingElement from '../../../../../../elements/bindings/amqp1/Amqp1MessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const Amqp1MessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'amqp1', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new Amqp1MessageBindingElement();
  },
});

export default Amqp1MessageBindingVisitor;
