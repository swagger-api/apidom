import stampit from 'stampit';
import { always } from 'ramda';

import NatsMessageBindingElement from '../../../../../../elements/bindings/nats/NatsMessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const NatsMessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'nats', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new NatsMessageBindingElement();
  },
});

export default NatsMessageBindingVisitor;
