import stampit from 'stampit';
import { always } from 'ramda';

import MessageTraitElement from '../../../../elements/MessageTrait';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const MessageTraitVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'MessageTrait']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new MessageTraitElement();
  },
});

export default MessageTraitVisitor;
