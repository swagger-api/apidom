import stampit from 'stampit';
import { always } from 'ramda';

import MessageExampleElement from '../../../../elements/MessageExample';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const MessageExampleVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'MessageExample']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new MessageExampleElement();
  },
});

export default MessageExampleVisitor;
