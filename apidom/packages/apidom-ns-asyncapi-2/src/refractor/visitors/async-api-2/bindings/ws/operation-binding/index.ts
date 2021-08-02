import stampit from 'stampit';
import { always } from 'ramda';

import WebSocketOperationBindingElement from '../../../../../../elements/bindings/ws/WebSocketOperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const WebSocketOperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'ws', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new WebSocketOperationBindingElement();
  },
});

export default WebSocketOperationBindingVisitor;
