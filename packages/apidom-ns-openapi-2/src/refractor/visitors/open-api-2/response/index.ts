import stampit from 'stampit';
import { always } from 'ramda';

import ResponseElement from '../../../../elements/Response';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const ResponseVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Response']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new ResponseElement();
  },
});

export default ResponseVisitor;
