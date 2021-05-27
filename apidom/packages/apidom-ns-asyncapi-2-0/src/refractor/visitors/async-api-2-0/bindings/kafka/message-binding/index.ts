import stampit from 'stampit';
import { always } from 'ramda';

import KafkaMessageBindingElement from '../../../../../../elements/bindings/kafka/KafkaMessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const KafkaMessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'KafkaMessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new KafkaMessageBindingElement();
  },
});

export default KafkaMessageBindingVisitor;
