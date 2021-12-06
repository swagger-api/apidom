import stampit from 'stampit';
import { always } from 'ramda';

import KafkaChannelBindingElement from '../../../../../../elements/bindings/kafka/KafkaChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const KafkaChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'kafka', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new KafkaChannelBindingElement();
  },
});

export default KafkaChannelBindingVisitor;
