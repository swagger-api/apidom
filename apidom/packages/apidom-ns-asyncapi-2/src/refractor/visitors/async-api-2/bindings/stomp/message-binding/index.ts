import stampit from 'stampit';
import { always } from 'ramda';

import StompMessageBindingElement from '../../../../../../elements/bindings/stomp/StompMessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const StompMessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'stomp', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new StompMessageBindingElement();
  },
});

export default StompMessageBindingVisitor;
