import stampit from 'stampit';
import { always } from 'ramda';

import StompServerBindingElement from '../../../../../../elements/bindings/stomp/StompServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const StompServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'stomp', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new StompServerBindingElement();
  },
});

export default StompServerBindingVisitor;
