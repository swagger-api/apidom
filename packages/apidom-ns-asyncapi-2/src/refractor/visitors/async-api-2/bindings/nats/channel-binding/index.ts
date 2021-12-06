import stampit from 'stampit';
import { always } from 'ramda';

import NatsChannelBindingElement from '../../../../../../elements/bindings/nats/NatsChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const NatsChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'nats', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new NatsChannelBindingElement();
  },
});

export default NatsChannelBindingVisitor;
