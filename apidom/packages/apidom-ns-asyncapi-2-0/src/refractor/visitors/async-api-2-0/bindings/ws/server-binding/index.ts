import stampit from 'stampit';
import { always } from 'ramda';

import WebSocketServerBindingElement from '../../../../../../elements/bindings/ws/WebSocketServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const WebSocketServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'ws', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new WebSocketServerBindingElement();
  },
});

export default WebSocketServerBindingVisitor;
