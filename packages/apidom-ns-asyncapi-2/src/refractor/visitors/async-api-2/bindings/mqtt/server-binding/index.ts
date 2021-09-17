import stampit from 'stampit';
import { always } from 'ramda';

import MqttServerBindingElement from '../../../../../../elements/bindings/mqtt/MqttServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const MqttServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'mqtt', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new MqttServerBindingElement();
  },
});

export default MqttServerBindingVisitor;
