import stampit from 'stampit';
import { always } from 'ramda';

import LinkDescriptionElement from '../../../../elements/LinkDescription';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const LinkDescriptionVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'LinkDescription']),
  },
  init() {
    this.element = new LinkDescriptionElement();
  },
});

export default LinkDescriptionVisitor;
