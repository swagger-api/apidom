import stampit from 'stampit';
import { always } from 'ramda';

import WebSocketMessageBindingElement from '../../../../../../elements/bindings/ws/WebSocketMessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const WebSocketMessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'ws', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new WebSocketMessageBindingElement();
  },
});

export default WebSocketMessageBindingVisitor;
