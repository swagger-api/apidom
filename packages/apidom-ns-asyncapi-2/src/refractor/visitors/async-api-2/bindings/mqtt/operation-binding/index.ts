import stampit from 'stampit';
import { always } from 'ramda';

import MqttOperationBindingElement from '../../../../../../elements/bindings/mqtt/MqttOperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const MqttOperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'mqtt', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new MqttOperationBindingElement();
  },
});

export default MqttOperationBindingVisitor;
