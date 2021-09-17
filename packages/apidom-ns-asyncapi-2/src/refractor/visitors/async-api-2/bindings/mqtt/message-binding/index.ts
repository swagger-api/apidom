import stampit from 'stampit';
import { always } from 'ramda';

import MqttMessageBindingElement from '../../../../../../elements/bindings/mqtt/MqttMessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const MqttMessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'mqtt', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new MqttMessageBindingElement();
  },
});

export default MqttMessageBindingVisitor;
