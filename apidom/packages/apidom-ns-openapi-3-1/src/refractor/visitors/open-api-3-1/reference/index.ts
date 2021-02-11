import stampit from 'stampit';
import { always } from 'ramda';

import ReferenceElement from '../../../../elements/Reference';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const ReferenceVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Reference']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new ReferenceElement();
  },
});

export default ReferenceVisitor;
