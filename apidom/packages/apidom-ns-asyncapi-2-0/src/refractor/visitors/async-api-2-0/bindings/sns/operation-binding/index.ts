import stampit from 'stampit';
import { always } from 'ramda';

import SnsOperationBindingElement from '../../../../../../elements/bindings/sns/SnsOperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const SnsOperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'sns', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new SnsOperationBindingElement();
  },
});

export default SnsOperationBindingVisitor;
