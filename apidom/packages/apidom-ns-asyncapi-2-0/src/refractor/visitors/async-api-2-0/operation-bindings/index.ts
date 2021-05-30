import stampit from 'stampit';
import { always } from 'ramda';

import OperationBindingsElement from '../../../../elements/OperationBindings';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const OperationBindingsVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'OperationBindings']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new OperationBindingsElement();
  },
});

export default OperationBindingsVisitor;
