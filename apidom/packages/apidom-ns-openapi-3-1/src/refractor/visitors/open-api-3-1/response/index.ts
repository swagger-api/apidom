import stampit from 'stampit';
import { always } from 'ramda';

import ResponseElement from '../../../../elements/Response';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const ResponseVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Response']),
  },
  init() {
    this.element = new ResponseElement();
  },
});

export default ResponseVisitor;
