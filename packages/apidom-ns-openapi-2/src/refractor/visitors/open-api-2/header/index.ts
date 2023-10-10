import stampit from 'stampit';
import { always } from 'ramda';

import HeaderElement from '../../../../elements/Header';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const HeaderVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Header']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new HeaderElement();
  },
});

export default HeaderVisitor;
