import stampit from 'stampit';
import { always } from 'ramda';

import SqsMessageBindingElement from '../../../../../../elements/bindings/sqs/SqsMessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const SqsMessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'sqs', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new SqsMessageBindingElement();
  },
});

export default SqsMessageBindingVisitor;
