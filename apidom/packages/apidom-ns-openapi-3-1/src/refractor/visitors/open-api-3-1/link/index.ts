import stampit from 'stampit';
import { always } from 'ramda';

import LinkElement from '../../../../elements/Link';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const LinkVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Link']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new LinkElement();
  },
});

export default LinkVisitor;
