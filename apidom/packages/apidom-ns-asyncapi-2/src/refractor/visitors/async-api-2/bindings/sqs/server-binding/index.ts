import stampit from 'stampit';
import { always } from 'ramda';

import SqsServerBindingElement from '../../../../../../elements/bindings/sqs/SqsServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const SqsServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'sqs', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new SqsServerBindingElement();
  },
});

export default SqsServerBindingVisitor;
