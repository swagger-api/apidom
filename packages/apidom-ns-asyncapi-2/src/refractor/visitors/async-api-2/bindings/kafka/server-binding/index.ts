import stampit from 'stampit';
import { always } from 'ramda';

import KafkaServerBindingElement from '../../../../../../elements/bindings/kafka/KafkaServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const KafkaServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'kafka', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new KafkaServerBindingElement();
  },
});

export default KafkaServerBindingVisitor;
