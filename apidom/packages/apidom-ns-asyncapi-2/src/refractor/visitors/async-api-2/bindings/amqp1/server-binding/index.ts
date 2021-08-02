import stampit from 'stampit';
import { always } from 'ramda';

import Amqp1ServerBindingElement from '../../../../../../elements/bindings/amqp1/Amqp1ServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const Amqp1ServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'amqp1', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new Amqp1ServerBindingElement();
  },
});

export default Amqp1ServerBindingVisitor;
