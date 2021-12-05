import stampit from 'stampit';
import { always } from 'ramda';

import Mqtt5ChannelBindingElement from '../../../../../../elements/bindings/mqtt5/Mqtt5ChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const Mqtt5ChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'mqtt5', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new Mqtt5ChannelBindingElement();
    this.element.classes.push('channel-binding');
  },
});

export default Mqtt5ChannelBindingVisitor;
