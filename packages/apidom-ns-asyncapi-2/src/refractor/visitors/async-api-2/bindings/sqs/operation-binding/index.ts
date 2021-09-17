import stampit from 'stampit';
import { always } from 'ramda';

import SqsOperationBindingElement from '../../../../../../elements/bindings/sqs/SqsOperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const SqsOperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'sqs', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new SqsOperationBindingElement();
  },
});

export default SqsOperationBindingVisitor;
