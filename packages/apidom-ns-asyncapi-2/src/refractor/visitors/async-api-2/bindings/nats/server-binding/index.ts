import stampit from 'stampit';
import { always } from 'ramda';

import NatsServerBindingElement from '../../../../../../elements/bindings/nats/NatsServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const NatsServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'nats', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new NatsServerBindingElement();
  },
});

export default NatsServerBindingVisitor;
