import stampit from 'stampit';
import { always } from 'ramda';

import MessageBindingsElement from '../../../../elements/MessageBindings';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const MessageBindingsVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'MessageBindings']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new MessageBindingsElement();
  },
});

export default MessageBindingsVisitor;
