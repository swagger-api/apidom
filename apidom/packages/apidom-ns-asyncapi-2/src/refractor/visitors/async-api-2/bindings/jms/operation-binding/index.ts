import stampit from 'stampit';
import { always } from 'ramda';

import JmsOperationBindingElement from '../../../../../../elements/bindings/jms/JmsOperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const JmsOperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'jms', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new JmsOperationBindingElement();
  },
});

export default JmsOperationBindingVisitor;
