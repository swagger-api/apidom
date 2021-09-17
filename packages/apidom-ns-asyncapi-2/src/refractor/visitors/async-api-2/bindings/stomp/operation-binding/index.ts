import stampit from 'stampit';
import { always } from 'ramda';

import StompOperationBindingElement from '../../../../../../elements/bindings/stomp/StompOperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const StompOperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'stomp', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new StompOperationBindingElement();
  },
});

export default StompOperationBindingVisitor;
