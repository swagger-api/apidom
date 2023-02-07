import stampit from 'stampit';
import { always } from 'ramda';

import PulsarOperationBindingElement from '../../../../../../elements/bindings/pulsar/PulsarOperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const PulsarOperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'pulsar', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new PulsarOperationBindingElement();
  },
});

export default PulsarOperationBindingVisitor;
