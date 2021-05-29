import stampit from 'stampit';
import { always } from 'ramda';

import SqsChannelBindingElement from '../../../../../../elements/bindings/sqs/SqsChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const SqsChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'sqs', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new SqsChannelBindingElement();
  },
});

export default SqsChannelBindingVisitor;
