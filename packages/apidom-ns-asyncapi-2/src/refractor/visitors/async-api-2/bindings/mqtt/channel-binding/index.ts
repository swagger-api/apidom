import stampit from 'stampit';
import { always } from 'ramda';

import MqttChannelBindingElement from '../../../../../../elements/bindings/mqtt/MqttChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const MqttChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'mqtt', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new MqttChannelBindingElement();
  },
});

export default MqttChannelBindingVisitor;
