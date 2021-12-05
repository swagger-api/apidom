import stampit from 'stampit';
import { always } from 'ramda';

import WebSocketChannelBindingElement from '../../../../../../elements/bindings/ws/WebSocketChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const WebSocketChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'ws', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new WebSocketChannelBindingElement();
    this.element.classes.push('channel-binding');
  },
});

export default WebSocketChannelBindingVisitor;
