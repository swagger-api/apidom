import stampit from 'stampit';
import { always } from 'ramda';

import SuccessActionElement from '../../../../elements/SuccessAction';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const SuccessActionVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'SuccessAction']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new SuccessActionElement();
  },
});

export default SuccessActionVisitor;
