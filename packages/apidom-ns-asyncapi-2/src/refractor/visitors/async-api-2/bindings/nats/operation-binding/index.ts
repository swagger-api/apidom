import stampit from 'stampit';
import { always } from 'ramda';

import NatsOperationBindingElement from '../../../../../../elements/bindings/nats/NatsOperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const NatsOperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'nats', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new NatsOperationBindingElement();
  },
});

export default NatsOperationBindingVisitor;
