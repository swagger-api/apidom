import stampit from 'stampit';
import { always } from 'ramda';

import KafkaOperationBindingElement from '../../../../../../elements/bindings/kafka/KafkaOperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const KafkaOperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'kafka', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new KafkaOperationBindingElement();
  },
});

export default KafkaOperationBindingVisitor;
