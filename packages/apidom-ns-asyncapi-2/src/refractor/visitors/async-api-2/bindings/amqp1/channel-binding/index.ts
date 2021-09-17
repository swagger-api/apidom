import stampit from 'stampit';
import { always } from 'ramda';

import Amqp1ChannelBindingElement from '../../../../../../elements/bindings/amqp1/Amqp1ChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const Amqp1ChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'amqp1', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new Amqp1ChannelBindingElement();
  },
});

export default Amqp1ChannelBindingVisitor;
